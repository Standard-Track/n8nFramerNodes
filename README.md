# n8n-nodes-framer-api

Community node for n8n to call the Framer Server API via the official `framer-api` SDK.

- Get Project Info
- Get Changed Paths
- Get Change Contributors
- Publish
- Deploy
- Publish To Production
- Create Managed Collection
- Get Collections
- Get Collection Items
- Upsert Collection Items
- Remove Collection Items

## Credentials

The package adds a credential type named **Framer API** in the n8n Credentials tab.

Required fields:

- Framer URL (project URL or project ID)
- Framer API Key

## Node behavior

The node uses `connect(projectUrl, apiKey)` and always closes connections with
`disconnect()` per execution item.

Available operations:

- Get Project Info
- Get Changed Paths
- Get Change Contributors (optional version range)
- Publish (create preview deployment)
- Deploy (promote deployment ID to production)
- Publish To Production (publish preview, then deploy it to production in one step)
- Create Managed Collection
- Get Collections
- Get Collection Items
- Upsert Collection Items
- Remove Collection Items

### Upsert Collection Items payload

`Upsert Collection Items` expects an `Items JSON` array compatible with Framer `collection.addItems()`.

Example:

```json
[
  {
    "id": "notion_page_123",
    "slug": "my-post",
    "draft": true,
    "fieldData": {
      "title": {
        "type": "string",
        "value": "My Post"
      }
    }
  }
]
```

Notes:

- Set `draft: true` for unpublished Notion items so they stay out of published deployments.
- Use a stable `id` (for example Notion page ID) to safely update existing entries.

## Local install (custom n8n host)

From this project folder:

```bash
npm pack
```

Copy the generated `.tgz` file to your n8n host, then install it as the n8n runtime user:

```bash
npm install /path/to/n8n-nodes-framer-api-0.1.0.tgz
```

Restart n8n service after install.

## Notes

- Ensure community nodes are enabled in your n8n installation.
- Keep API keys in credentials, not in workflow hardcoded fields.
- Framer Server API is WebSocket/streaming based; this node uses the official SDK instead of REST calls.
- For CMS content already synced into Framer (for example from Notion), use `Publish To Production` on a schedule to automatically push the latest Framer state live.
