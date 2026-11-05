---
title: "Watermarks are a contract: validating 150+ PySpark streams"
published: false
description: "A watermark is not a config value. It is a promise about lateness, state, and what the job will silently drop."
tags: pyspark, streaming, dataengineering, apachespark
---

A watermark is easy to add and easy to misunderstand.

```python
df = (
    events
    .withWatermark("event_time", "10 minutes")
    .groupBy(window("event_time", "5 minutes"), "service")
    .count()
)
```

That code reads cleanly. It also hides a contract: events arriving more than ten minutes after the latest event time are considered late, state older than the watermark is eligible for cleanup, and the result is only complete relative to that assumption.

On a pipeline processing millions of events per day across more than 150 streams, the watermark was not the hard part. Knowing whether the promise still held was.

## A watermark is a promise

There are three separate questions hidden in `withWatermark`:

1. **Completeness.** How late can an event be before it will not be included in the window?
2. **State.** How long must the job remember old keys and windows?
3. **Latency.** How long do we wait before emitting a result?

Changing the watermark changes all three. A tight bound reduces state and latency, but drops more late data. A loose bound keeps more data correct, but grows state and delays output. There is no universally correct value; there is only an explicit one.

The first step is writing the decision down. For each stream, record the expected lateness distribution, the chosen watermark, and what happens when an event arrives outside the bound. That turns a hidden config into a reviewable contract.

## Validate the promise in three places

I do not trust a watermark because the job does not crash. I trust it when three checks pass.

### 1. Late-event accounting

Every micro-batch should emit counters for input rows, rows with an event time below the current watermark, and rows that were dropped or routed to a late-data sink.

```python
metrics = (
    batch
    .select(
        F.count("*").alias("rows"),
        F.sum(
            F.when(F.col("event_time") < F.col("current_watermark"), 1).otherwise(0)
        ).alias("late_rows"),
    )
)
```

The exact implementation depends on how you expose the watermark. The important part is that late rows have a number and a destination. A silent drop is not a validation strategy.

### 2. Window reconciliation

For a bounded event-time range, recompute the same aggregation as a batch job and compare it to the streaming result. Run this on a sample of windows, not every window forever.

```python
streamed = spark.read.parquet("gold/service_windows")
batched = (
    spark.read.parquet("silver/events")
    .where(F.col("event_time").between(start, end))
    .groupBy(F.window("event_time", "5 minutes"), "service")
    .count()
)

diff = streamed.exceptAll(batched).unionByName(batched.exceptAll(streamed))
```

A few late-arriving records can make a window differ legitimately. That is why the comparison should account for the watermark and the observation time, not just compare numbers blindly. A difference outside the expected lateness window is a bug or an undocumented behavior. Either way, someone should know.

### 3. Schema checks

Streaming jobs tend to fail in the least interesting ways: a new nullable column becomes required, a timestamp changes format, or an upstream producer starts emitting a string where a number used to be.

Validate the schema against an expected contract and quarantine records that do not match instead of dropping the whole batch. Count the rejects. Alert when the rate moves.

```python
def validate(df):
    required = {"event_id", "event_time", "service", "severity"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"missing columns: {sorted(missing)}")

    return df.where(
        F.col("event_id").isNotNull()
        & F.col("event_time").isNotNull()
        & F.col("service").isin(known_services)
    )
```

A small validation library shared across streams is more useful than a different ad hoc query in every job. One place to change the rules, one place to add a metric, one place to explain the contract.

## Make the sink idempotent

Exactly-once is a property of the whole pipeline, not a word you add to a slide. Checkpoints help, but retries, reprocessing, and manual backfills still happen.

Use a deterministic key and an idempotent write pattern. For a Delta or Iceberg sink, a merge on `(window_start, service, event_id)` or a partition overwrite is easier to reason about than an append-only stream that assumes it will never replay. Test the restart path: stop the job, let late data accumulate, restart it, and check the output against the batch truth.

## What I would do differently

The hardest part was not the watermark configuration. It was the absence of a shared vocabulary for correctness. Every stream had a slightly different idea of late, a slightly different validation query, and a slightly different definition of "done".

If I were starting again, I would make the contract explicit first:

- A written lateness expectation per stream.
- A shared metrics schema for rows, late rows, rejects, and windows.
- A batch reconciliation job that can be run on demand.
- A late-data sink that a human can inspect.

Then the watermark is just one line of code implementing a documented decision, not a mysterious parameter that happens to make the dashboard look right.

That is the useful shift: from "the stream is running" to "the stream is keeping its promise."
