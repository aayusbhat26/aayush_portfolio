---
title: "Sub-second OLAP without a warehouse: DuckDB + FastAPI"
published: false
description: "Zero-copy Arrow queries over a Delta Lake gold layer, served through FastAPI, with every response carrying its own query latency."
tags: python, duckdb, fastapi, dataengineering
---

A dashboard does not need a warehouse on day one.

On the HVAC telemetry app I worked on, the analytical surface had to answer questions over a large PyArrow dataset while the product was still small. A warehouse would have meant a second system, a second deployment and a second bill. DuckDB gave us an in-process OLAP engine instead: the API was already Python, the data was already Parquet inside Delta Lake, and the queries needed to be fast, not distributed.

The public proof of concept for that app is here: [poc_latency_test](https://github.com/aayusbhat26/poc_latency_test). It is a Next.js front end, a FastAPI service and a medallion pipeline. This is what the read path looks like.

## The whole trick is not copying anything

DuckDB can query Parquet files directly. The pipeline already writes Delta tables, so the query path starts from the Delta table and hands DuckDB an Arrow dataset.

```python
from deltalake import DeltaTable

def get_delta_dataset(layer: str, table: str | None = None):
    path = (
        os.path.join(DATA_LAKE_PATH, layer, table)
        if table
        else os.path.join(DATA_LAKE_PATH, layer)
    )
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail=f"Table path not found: {path}")
    try:
        dt = DeltaTable(path)
        return dt.to_pyarrow_dataset()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Error reading Delta table: {str(exc)}")
```

Registering that dataset is one call:

```python
con = duckdb.connect()
con.register("fact_hourly_telemetry", get_delta_dataset("gold", "fact_hourly_telemetry"))
```

`register` is the part that matters. DuckDB does not ingest the table, does not copy it, does not write a catalog entry. It reads the Parquet files through the Arrow interface and pushes the filters down into the scan. The data is never materialised anywhere else.

That is what zero-copy means in practice, and it is why the read path could be added to a pipeline that already existed instead of requiring a migration to a warehouse first.

## One connection per request

The paged endpoint opens its connection inside the handler:

```python
@app.get("/api/data/{layer}/{table}")
def get_table_data(layer: str, table: str, page: int = 1, limit: int = 50):
    start_time = time.time()

    target_table = table if layer == "gold" else None
    dataset = get_delta_dataset(layer, target_table)
    offset = (page - 1) * limit

    try:
        con = duckdb.connect()
        result_df = con.query(f"SELECT * FROM dataset LIMIT {limit} OFFSET {offset}").df()
        total_records = con.query("SELECT COUNT(*) as total FROM dataset").fetchone()[0]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Query error: {str(exc)}")
```

Notice that the query says `FROM dataset` and the dataset was never registered. It still works, because DuckDB resolves the table name to the Python object sitting in the calling scope. That feature is called a replacement scan, and it is quietly excellent for a notebook and quietly risky in a service.

I would keep the behaviour and remove the surprise: `con.register("dataset", dataset)` on the line before the query makes the dependency visible to the next person. Implicit behaviour is fine in a script and expensive in code other people maintain.

The bigger mistake to avoid here is a single global connection shared across request threads. A DuckDB connection is stateful, and sharing one without a clear ownership rule is how you get the kind of intermittent error that never reproduces on your machine. Opening a connection is cheap next to the query it serves, so the honest default is one per request.

Two smaller details in that handler are worth copying. The `page` and `limit` values arrive as typed query parameters, so the f-string is not an injection hole, but binding them as parameters is still better style. And the `COUNT(*)` is the part that does not scale: it walks the whole table on every page request. Fine for a fact table of this size, wrong for a table that grows without bound.

## Measure the latency on every response

Every endpoint returns the time it took.

```python
latency_ms = round((time.time() - start_time) * 1000, 2)

return {
    "data": result_df.to_dict(orient="records"),
    "pagination": {"page": page, "limit": limit, "total": total_records},
    "latency_ms": latency_ms,
}
```

The front end renders it next to the result, as "Loaded in X ms" for the explorer and "Executed in X ms" for the SQL console.

That single field changed how I talk about the architecture. "Sub-second" stops being a claim in a README and becomes something the user sees on every request. When the number moves, I know before a user tells me. I do not have a published benchmark for this dataset, and I would rather show the mechanism than a number I picked on a good day.

## If you let people type SQL, bound it

There is a second endpoint that runs raw SQL against the gold layer.

```python
@app.post("/api/query")
def run_custom_query(request: QueryRequest):
    con = duckdb.connect()
    try:
        if os.path.exists(os.path.join(DATA_LAKE_PATH, "silver")):
            con.register("silver", get_delta_dataset("silver"))

        gold_path = os.path.join(DATA_LAKE_PATH, "gold")
        if os.path.exists(gold_path):
            for table in os.listdir(gold_path):
                table_path = os.path.join(gold_path, table)
                if os.path.isdir(table_path):
                    con.register(f"gold_{table}", get_delta_dataset("gold", table))
    except Exception as exc:
        print(f"Warning: Failed to register some datasets. {exc}")

    clean_query = request.query.strip()
    if clean_query.endswith(";"):
        clean_query = clean_query[:-1]

    if "LIMIT" not in clean_query.upper():
        query_to_run = f"{clean_query} LIMIT 1000"
    else:
        query_to_run = clean_query
```

The forced `LIMIT` is the minimum. An unconstrained `SELECT *` over a wide gold table will happily read the whole file and turn a fast API into a slow one. The same endpoint also exposes every gold table by name, which is convenient for an internal tool and a decision you should make on purpose.

The other trap is not SQL at all. DuckDB returns NaN for missing floats, and JSON has no NaN, so the response fails to serialise at the worst possible moment:

```python
result_df = result_df.replace({float("nan"): None})
```

One line, and it took me longer to find than the query engine did.

## Where this stops being the right tool

DuckDB is not a warehouse replacement in every case. I would move on when:

- Multiple writers need concurrent mutations of the same tables.
- The data no longer fits comfortably on one machine, or memory pressure makes query latency unpredictable.
- Several services need shared, governed access with independent scaling.
- You need long-running ETL with fine-grained scheduling and lineage that the application should not own.

For a read-heavy analytical surface over a batch snapshot, it is a very good fit. For a multi-tenant write-heavy system, it is the wrong layer.

## The lesson

The warehouse is not the goal. Fast, trustworthy answers are. DuckDB let a small product keep the data close to the API, skip a distributed system, and still answer analytical questions in milliseconds.

The next time a dashboard needs OLAP, ask whether the data is already a file. If it is, you may not need a warehouse yet.

*This is a pattern from a working app and its public proof of concept, not a benchmark. Measure your own dataset and query shapes before making an architecture decision.*
