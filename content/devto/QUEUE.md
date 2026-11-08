# Dev.to publishing queue (daily, started 2026-11-06)

Rules per post: universal hook first, then technical depth; no em-dashes; human first-person voice; real code only; tags must match content; POC material framed as co-built/simulated; only provable numbers.

| Day | Date | Post | Source | Status |
|---|---|---|---|---|
| 1 | 2026-11-06 | Watermarks are a contract: validating 150+ PySpark streams | draft 02 + hvac POC code | LIVE: https://dev.to/aayusbhat26/watermarks-are-a-contract-validating-150-pyspark-streams-5dj5 |
| 2 | 2026-11-08 | Sub-second OLAP without a warehouse: DuckDB + FastAPI | draft 01, verified against `poc_latency_test/backend/main.py` | FINAL: cover at `covers/duckdb-olap-cover.png`, code rewritten to match the real repo. Editor hit a stale CSRF token, publish after a hard refresh |
| 3 | 2026-11-08 | One deploy, three services: trade-offs of a single-container product | draft 03 | ready, needs final style pass + cover |
| 4 | 2026-11-09 | The 400-event cap is a product decision | draft 04 | ready, needs final style pass + cover |
| 5 | 2026-11-10 | Merging my first PR into Apache Iceberg | PyIceberg PR #4169 (CLI fix, honest framing) | to write |
| 6 | 2026-11-11 | Turning world news into a reproducible data pipeline | Globe News Atlas: medallion, MinHash LSH, TF-IDF/LSA | to write |
| 7 | 2026-11-12 | Realtime features people actually notice | TaskFlow: Socket.IO rooms, presence, read state | to write |
| 8 | 2026-11-13 | Z-ordering made our queries 42% faster | Nagarro production, Unity Catalog 85+ tables (provable numbers only) | to write |

Verified: day 1 is live with tags `pyspark`, `dataengineering`, `apachespark`. The earlier `#kafka` tag concern no longer applies, the live post does not carry it.

Covers: day 1 cover at covers/watermark-cover.png (1024x1024, navy/truck/clock/waveform). Generate one new cover per post in the same visual family.
