# Dev.to drafts

Four ready-to-edit drafts. They are not published.

| File | Working title |
|---|---|
| `01-duckdb-fastapi-subsecond-olap.md` | Sub-second OLAP without a warehouse: DuckDB + FastAPI |
| `02-pyspark-watermarks-contract.md` | Watermarks are a contract: validating 150+ PySpark streams |
| `03-one-deploy-three-services.md` | One deploy, three services: the trade-offs of a single-container product |
| `04-display-cap-product-decision.md` | The 400-event cap is a product decision |

## Before publishing

1. Read the draft and correct any detail that does not match the exact
   implementation it describes.
2. Add a cover image and a canonical URL in the Dev.to editor if desired.
3. Keep `published: false` until the review is finished.
4. Publish through the Dev.to UI, or through the API after an explicit
   decision to publish.

## Publishing through the Dev.to API

The API key belongs in a local ignored file, never in chat, source, or a commit:

```text
.secrets/devto.env
DEVTO_API_KEY=...
```

`.secrets/` is ignored by git. The API endpoint is:

```text
POST https://dev.to/api/articles
api-key: <key>
Content-Type: application/json
```

The request body is `{"article": {"title": "...", "published": false, "body_markdown": "..."}}`.
The Dev.to front matter is also supported when publishing through the editor.

Do not bulk-publish. Publish one draft, check the rendered post, then update the
portfolio Writing section with the live URL.
