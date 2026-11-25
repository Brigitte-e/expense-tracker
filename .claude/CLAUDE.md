# CLAUDE.md

This file provides guidance for working on the Expense Tracker API repository.

## Project summary

NestJS 12 HTTP API for user accounts, bank statement imports, transaction classification, and expense statistics. TypeScript runs in strict mode against PostgreSQL through the Prisma 8 ORM contract/Postgres runtime.

The API exposes Swagger/OpenAPI at `/docs` and is protected by a global JWT bearer guard. Register and login are the public auth endpoints.

## Commands

Run all commands from the repository root with pnpm.

```bash
pnpm install
pnpm start:dev       # watch-mode development server
pnpm start           # start without watch mode
pnpm start:debug     # start with Node inspector and watch mode
pnpm start:prod      # run dist/main
pnpm build
pnpm test
pnpm test:watch
pnpm test:cov
pnpm test:e2e
pnpm lint
pnpm format
pnpm contract:emit
pnpm db:init
pnpm db:seed
```

Run a single Jest spec:

```bash
pnpm test -- --runInBand src/transactions/transactions.service.spec.ts
```

## Environment

Provide these variables in a local `.env` file:

```bash
DATABASE_URL=postgresql://...
JWT_SECRET=<a private secret>
PORT=3000
```

- `DATABASE_URL` is required by `src/prisma/db.ts` and `prisma.config.ts`.
- `JWT_SECRET` is used by the auth module and falls back to `dev-secret` in development code. Do not rely on or commit that fallback for deployed environments.
- `PORT` defaults to `3000`.

## Architecture

```text
HTTP controllers
      ↓
NestJS services
      ↓
Prisma ORM contract/client
      ↓
PostgreSQL
```

`AppModule` registers the feature modules:

- `auth` — registration, login, current-user lookup, JWT guard, bearer parsing.
- `users` — user persistence and public user projections.
- `accounts` — account listing and account ownership checks.
- `transactions` — filtering, retrieval, updates, deletion, import bulk creation, and deduplication.
- `imports` — multipart statement uploads, bank-specific parsing, import lifecycle, and categorization.
- `categories` — category and category-rule management plus description-based classification.
- `statistics` — summary, category breakdown, and monthly expense statistics.
- `prisma` — database client lifecycle and generated Prisma contract integration.

### Authentication

- `AuthGuard` is registered as an application-wide guard in `AuthModule`.
- Public routes use `@Public()`; only auth register/login are currently public.
- `@CurrentUser()` supplies `{ id, email }` to controllers.
- Bearer tokens contain `sub` and `email` and expire after 7 days.
- Every user-owned data query must continue to scope reads and mutations by `userId`.

### Database

The data model is declared in `src/prisma/contract.prisma`:

- `User`
- `Account`
- `Import`
- `Transaction`
- `Category`
- `CategoryRule`

The Prisma contract and generated files under `src/prisma/` are significant: keep `contract.prisma`, `contract.json`, `contract.d.ts`, and database usage aligned. Prefer the ORM contract API exposed through `PrismaService.client.orm.public` rather than adding a separate database abstraction.

Migrations and snapshots live under `migrations/`. When changing the contract, inspect existing migration tooling and the repository's Prisma configuration before generating or applying schema changes.

Important transaction rules:

- Transaction amounts are positive stored values; `type` distinguishes income from expense.
- `transactionHash` is globally unique and is used for import deduplication.
- Import records track `PENDING`, `PROCESSING`, `COMPLETED`, or `FAILED` status.
- `Account` and `Import` ownership must match the authenticated user.

### Statement imports

`POST /imports` accepts multipart form data:

- `file` — CSV/XLS/XLSX statement data, validated before processing.
- `bank` — `REVOLUT`, `MONOBANK`, or `PRIVAT`.
- `accountId` — UUID of a user-owned account using the selected bank.

The upload pipeline:

1. Validate file size and statement format.
2. Resolve and validate the bank parser.
3. Parse bank-specific transactions.
4. Apply category rules ordered by priority.
5. Deduplicate transactions by hash.
6. Mark the import as `COMPLETED` or `FAILED`.

Bank parser implementations live in `src/imports/parsers/`. Keep raw parsing concerns separate from categorization and database persistence.

### Categories

Categories are fixed application values:

`GROCERIES`, `RESTAURANTS`, `TRANSPORT`, `SHOPPING`, `ENTERTAINMENT`, `HEALTH`, `HOUSING`, `SUBSCRIPTIONS`, `SALARY`, `TRANSFER`, `OTHER`

Category matching is performed from case-insensitive description substrings. Rules are sorted by descending priority. Seed rules are in `src/categories/category-rules.ts`.

### Transactions and statistics

Transaction filtering is parsed by `ParseTransactionFiltersPipe`. Supported filters include category, type, date range, account, amount range, and text search.

Statistics endpoints:

- `GET /statistics/summary`
- `GET /statistics/by-category`
- `GET /statistics/monthly`

Keep calculations in the statistics service and return explicit response interfaces rather than leaking ORM rows.

## Testing

Jest unit and integration-style specs use `ts-jest` and live beside source modules as `*.spec.ts`. E2E tests live in `test/` and use `test/jest-e2e.json`.

Conventions:

- Use Nest testing modules for controller/service dependency isolation.
- Mock `PrismaService.client.orm` operations at the feature boundary.
- Add a regression spec for parsing, categorization, filtering, authorization, and deduplication changes.
- For validation pipes and uploaded files, test both success and malformed input.
- Run a focused spec first, then the relevant suite and lint/build.

## Conventions

- Strict TypeScript: avoid `any` and explicit untyped data where a useful interface exists.
- Use `consistent-type-imports`; import types with `import type`.
- Keep decorators and Nest module wiring explicit.
- Controllers validate input and delegate to services.
- Services own business rules and database operations.
- Parse and validate external file input before database writes.
- Scope every account, category, import, rule, and transaction operation to the authenticated `userId`.
- Return mapped response objects rather than raw Prisma/ORM rows.
- Never log passwords, JWT secrets, database URLs, or uploaded financial contents.
- Do not commit generated secrets or local environment files.

## API documentation

Run the server and open:

- Swagger UI: `http://localhost:3000/docs`
- Bearer auth: obtain a token from `POST /auth/register` or `POST /auth/login`, then use the Swagger authorize dialog.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

The graphify skill lives at `.claude/skills/graphify/SKILL.md`. When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. When the answer is under a Markdown heading, `graphify section "<heading>"` prints that section's text, so the .md need not be opened. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
