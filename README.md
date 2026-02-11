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
- Setup Collection Fields

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
- Setup Collection Fields

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

### Setup Collection Fields payload

`Setup Collection Fields` expects a `Fields JSON` array compatible with `collection.addFields()`.

Example:

```json
[
  { "name": "title", "type": "string" },
  { "name": "content", "type": "formattedText" },
  { "name": "image", "type": "image" },
  {
    "name": "category",
    "type": "enum",
    "cases": [{ "name": "News" }, { "name": "Tutorial" }]
  },
  { "name": "width", "type": "number" },
  { "name": "height", "type": "number" }
]
```

Use `Skip Existing Fields By Name = true` to make initialization re-runnable without failing on duplicates.

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

## Auto deploy from GitHub to Proxmox

This repo includes a GitHub Actions workflow at
`.github/workflows/deploy-proxmox-n8n-node.yml` that deploys on every push to
`main` (and can also be run manually from Actions).

### 1) Add GitHub repository secrets

Required:

- `PROXMOX_HOST` (for example `192.168.0.102`)
- `PROXMOX_USER` (for example `root`)
- `PROXMOX_SSH_KEY` (private key contents used by Actions SSH)

Optional (defaults are built into the workflow):

- `PROXMOX_PORT` (default `22`)
- `PROXMOX_REPO_DIR` (default `/root/n8nFramerNodes`)
- `PROXMOX_N8N_NODES_DIR` (default `/root/.n8n/nodes`)
- `PROXMOX_N8N_SERVICE` (default `n8n`)

### 2) One-time server preparation

On Proxmox host (or the VM/container where n8n runs), ensure:

- `git`, `node`, and `npm` are installed
- this repository is cloned at `PROXMOX_REPO_DIR`
- the server can `git pull` from your GitHub repo non-interactively
  (deploy key or SSH agent setup)
- your n8n service is managed by systemd (`systemctl restart n8n`)

### 3) Deployment flow

When code is pushed to `main`, the workflow will:

1. SSH to the server
2. Run `git pull --ff-only` in repo
3. Run `npm ci` and `npm pack`
4. Install the generated `.tgz` into `/root/.n8n/nodes`
5. Restart n8n service

## Notes

- Ensure community nodes are enabled in your n8n installation.
- Keep API keys in credentials, not in workflow hardcoded fields.
- Framer Server API is WebSocket/streaming based; this node uses the official SDK instead of REST calls.
- For CMS content already synced into Framer (for example from Notion), use `Publish To Production` on a schedule to automatically push the latest Framer state live.
