# Expense Tracker

Two independent apps share this repository. Each has its own `package.json`, lockfile, `node_modules`, tooling config, Claude Code config (`.claude/`), and graphify knowledge graph (`graphify-out/`).

| App | Path | Stack |
| --- | --- | --- |
| API | [`api`](api) | NestJS, Prisma, PostgreSQL |
| Web | [`web`](web) | Not scaffolded yet |

Work inside one app at a time:

```bash
cd api
pnpm install
pnpm start:dev
```

Open `api` or `web` as the project root in your editor or Claude Code session so that app's `.claude/` config, hooks, and graph are used.

CI lives in `.github/workflows/` (GitHub only reads workflows from the repository root). `api-deploy.yml` deploys `api` to Prisma Cloud.
