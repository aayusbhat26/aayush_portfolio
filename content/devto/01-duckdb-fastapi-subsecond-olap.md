---
title: "Sub-second OLAP without a warehouse: DuckDB + FastAPI"
published: false
description: "A practical pattern for keeping analytical queries fast in a small product without adding a warehouse."
tags: python, duckdb, fastapi, dataengineering
---

A dashboard does not need a warehouse on day one.

On a production app I worked on, the analytical surface had to answer questions over a large PyArrow dataset while the product was still small. Adding a warehouse would have introduced a second system, a second deployment, and a second bill. DuckDB gave us an in-process OLAP engine instead: the API was already in Python, the data was already Parquet, and the queries needed to be fast, not distributed.

This is the pattern that worked.

## The shortest useful version

DuckDB can query Parquet files directly. No ingestion step, no table catalog, no service to keep alive.

```python
import duckdb

con = duckdb.connect()
rows = con.execute(
    """
    select service, count(*) as events
    from read_parquet('data/events/*.parquet')
    where event_time >= now() - interval '24 hours'
    group by service
    order by events desc
    """
).fetch_arrow_table()
```

`fetch_arrow_table()` is the important part. The result stays in Arrow, so the common path is Arrow in, Arrow out. If the caller needs JSON, serialize once at the edge. Do not convert to pandas in the middle just because it is convenient.

For parameters, keep the query shape stable and bind values:

```python
result = con.execute(
    """
    select *
    from read_parquet(?)
    where service = ?
    limit ?
    """,
    ["data/events/*.parquet", service, limit],
).fetch_arrow_table()
```

## Put it behind FastAPI carefully

A common mistake is creating one global DuckDB connection and sharing it across request threads. DuckDB is fast, but a connection is still a stateful object. I prefer a connection per request, or a small explicit pool with a clear ownership rule. The overhead is tiny compared with the query, and it removes a class of concurrency surprises.

```python
from fastapi import FastAPI, Query
from fastapi.responses import Response

app = FastAPI()

@app.get("/api/events")
def events(
    service: str,
    limit: int = Query(default=100, le=1_000),
) -> Response:
    con = duckdb.connect()
    try:
        table = con.execute(
            """
            select event_time, service, severity, message
            from read_parquet('data/events/*.parquet')
            where service = ?
            order by event_time desc
            limit ?
            """,
            [service, limit],
        ).fetch_arrow_table()
        return Response(
            content=table.to_pandas().to_json(orient="records"),
            media_type="application/json",
        )
    finally:
        con.close()
```

If Arrow can be consumed directly by the frontend or another service, return Arrow bytes instead of JSON. For a browser dashboard, JSON is usually fine. For an internal service-to-service hop, Arrow avoids a full serialization round trip.

## Cache the snapshot, not the whole API

The data changes in batches in this setup. The file list changes, the query does not. Cache on the snapshot identity: the dataset path plus the latest Parquet `mtime`, or a manifest hash produced by the pipeline.

Then a request can reuse the last result until the snapshot changes. No Redis is required. A small process-local cache keyed by `(where_clause, snapshot_id)` is enough for a single instance, and it fails safely when the app restarts.

This is also a good place to expose a real freshness signal:

```json
{
  "snapshot": "2026-10-24T09:15:00Z",
  "rows": 400,
  "total": 621,
  "source": "events/gold"
}
```

The dashboard can say "400 of 621" instead of pretending the sample is the whole world. That is a product improvement, not just an API field.

## Where this stops being the right tool

DuckDB is not a replacement for a warehouse in every case. I would move on when:

- Multiple writers need concurrent mutations of the same tables.
- The data no longer fits comfortably on one machine, or memory pressure makes query latency unpredictable.
- Several services need shared, governed access with independent scaling.
- You need long-running ETL with fine-grained scheduling and lineage that the application should not own.

For a read-heavy analytical surface over a batch snapshot, it is a very good fit. For a multi-tenant write-heavy system, it is the wrong layer.

## The lesson

The warehouse is not the goal. Fast, trustworthy answers are. DuckDB let a small product keep the data close to the API, skip a distributed system, and still return analytical queries in under a second.

The next time a dashboard needs OLAP, ask whether the data is already a file. If it is, you may not need a warehouse yet.

*This is a pattern from a production app, not a benchmark. Measure your own dataset and query shapes before making an architecture decision.*
