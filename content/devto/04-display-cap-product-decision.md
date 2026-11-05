---
title: "The 400-event cap is a product decision"
published: false
description: "When a data product can only show part of the world, the interface should say so. A pattern for honest display caps."
tags: data, ux, webdev, design
---

A news atlas might ingest 621 events in a 24-hour window. A browser cannot draw all of them legibly, so the map has a cap: 400 events.

That cap is an implementation detail until someone looks at the dock and assumes the world contains exactly 400 things. Then it becomes a product lie.

## Make the cap visible

Globe News Atlas states the cap where the reader is already looking:

```text
400 of 621 events
```

The number does two jobs. It tells the reader that the view is a sample, and it tells them what the sample is a sample of. If the window changes and the total drops, the label updates. If the pipeline has no snapshot, the interface says that too.

The same pattern applies to less visible limits:

- Country desks show a top ten, not a complete bibliography.
- Rewind is sampled to a bounded number of frames.
- A crawler stops at a URL or time budget.
- A summary is labelled as generated or extractive.

None of these limits are embarrassing. They are the shape of a system running with real constraints. Hidden, they become trust bugs. Stated, they become contracts.

## Model the limit, not just the label

A display cap should exist in the data contract, not only in a footer sentence.

```ts
type Snapshot = {
  shown: number;
  total: number;
  capturedAt: string;
  cap: number;
  source: string;
};
```

The UI can then render a sentence from facts rather than hard-coding a number in a component. The server can test that `shown <= cap` and `shown <= total`. When the total is unknown, do not invent a denominator; say "total unavailable" instead.

## Separate the empty states

A data product needs at least three distinct empty states:

1. **No data yet.** The pipeline has not produced a snapshot.
2. **No matching data.** The snapshot exists, but this filter, country, or time window has nothing.
3. **Data exists, but it is not corroborated.** A story is present, but it rests on one outlet or a coverage gap.

Those states should not share a generic "Nothing to see here" card. They mean different things, and the reader may want to act differently. "No sources found" is not the same as "sources found, but not yet verified."

## Show provenance beside the number

A count without provenance is easy to over-trust. A useful row carries:

- The outlet count.
- The political spectrum split, with an "unrated" bucket.
- A single-source flag.
- The location precision.
- The snapshot time.

The reader should be able to ask "where did this come from?" without leaving the event. If the interface cannot support that, the number is decoration.

## The anti-patterns

The worst version of this problem is not a cap. It is a cap hidden under a confident total.

Avoid:

- Randomly placing unresolved events so the map looks busy.
- Filling missing data with synthetic demo rows in a public build.
- Averaging left and right coverage into a false middle.
- Rounding a sampled count up to the full total.
- Showing a "live" badge for a batch snapshot.

Each of these makes the interface easier to demo and harder to trust.

## A simple test

Take a screenshot of the interface and remove the surrounding explanation. Does the remaining number still tell the truth?

If the answer is no, the interface is relying on context it cannot guarantee.

A cap is not the problem. An unlabeled cap is.

*The 400/621 example comes from Globe News Atlas, a live data product with a stated display cap, snapshot label, and source links.*
