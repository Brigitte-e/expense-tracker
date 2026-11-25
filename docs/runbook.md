# Runbook

_Last reviewed: 2026-11-25_

## Environments

| Environment | URL | Purpose | Access |
|---|---|---|---|
| Local | `http://localhost:3000` | Development | Developer |
| Swagger | `http://localhost:3000/docs` | API documentation and manual testing | Developer |
| Deployed environments | _Confirm configured hostnames in deployment configuration_ | Shared or production API | Team-controlled |

## Prerequisites

Run commands from the repository root with pnpm.

Required environment variables:

```bash
DATABASE_URL=postgresql://...
JWT_SECRET=<a private secret>
PORT=3000
```

- `DATABASE_URL` is required for database startup and Prisma contract operations.
- `JWT_SECRET` signs and verifies authentication tokens. The development fallback is `dev-secret`; never use or deploy that fallback.
- `PORT` defaults to `3000`.
- Do not commit `.env`, secrets, database URLs, bearer tokens, or financial export contents.

## Local startup

```bash
pnpm install
pnpm start:dev
```

Expected local endpoints:

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/docs`

Stop the process with `Ctrl+C`.

For a non-watch process:

```bash
pnpm start
```

For the inspector:

```bash
pnpm start:debug
```

## Database setup

Initialize database configuration when needed:

```bash
pnpm db:init
```

Apply repository migrations using the project migration tooling. If the Prisma contract changed, emit the contract artifacts before testing:

```bash
pnpm contract:emit
```

Seed local or development data:

```bash
pnpm db:seed
```

The database contract is in `src/prisma/contract.prisma`. Generated contract files under `src/prisma/` must stay aligned with contract and ORM usage:

- `contract.prisma`
- `contract.json`
- `contract.d.ts`
- `db.ts`

Before changing the contract, inspect `prisma.config.ts`, migrations, and snapshots under `migrations/`.

## Build and validation

```bash
pnpm build
pnpm lint
pnpm format
```

`pnpm format` writes files. Review the diff after formatting.

Test commands:

```bash
pnpm test
pnpm test:watch
pnpm test:cov
pnpm test:e2e
```

Run a focused spec while diagnosing a change:

```bash
pnpm test -- --runInBand src/transactions/transactions.service.spec.ts
```

For a release, run at least:

```bash
pnpm lint
pnpm build
pnpm test
```

Run `pnpm test:e2e` when HTTP wiring or application startup behavior may be affected.

## Manual API verification

1. Start the server.
2. Open `http://localhost:3000/docs`.
3. Call `POST /auth/register` or `POST /auth/login`.
4. Copy the returned access token.
5. In Swagger, use the bearer authorize dialog and paste the token.
6. Exercise protected account, import, transaction, category, and statistics endpoints.

Only auth register and login should be public unless an endpoint is intentionally added with `@Public()`.

## Deployment

No deployment workflow or target is documented in this repository snapshot. Before deploying:

1. Confirm the target host and database URL.
2. Set `JWT_SECRET` to a strong private value.
3. Set `DATABASE_URL` to the deployed PostgreSQL database.
4. Set `PORT` if the platform does not provide the default automatically.
5. Apply all approved migrations and verify contract compatibility.
6. Start the application through the platform process manager.

Typical local production-style process:

```bash
pnpm build
pnpm start:prod
```

`pnpm start:prod` runs `dist/main`.

## Database migration procedure

1. Take or verify a database backup for the target environment.
2. Review the contract diff and migration/snapshot files under `migrations/`.
3. Confirm that ownership fields and data constraints remain intact.
4. Emit and validate the Prisma contract if generated files changed.
5. Apply the migration using the repository's established Prisma tooling.
6. Start the API and run a focused smoke test against PostgreSQL.
7. Verify auth, account ownership, transaction filtering, import status, and statistics.

If an operation is irreversible or may delete financial data, stop and obtain explicit review before applying it.

## Logs and monitoring

This repository has no dedicated APM or health endpoint documented today. During operations, use:

- Application stdout/stderr for NestJS startup and request failures.
- PostgreSQL logs or dashboard for connection and query failures.
- Swagger `/docs` for endpoint contract verification.
- Jest output for parser and service regressions.

There is no Redis cache or background queue in the current architecture. PostgreSQL is the source of truth, and statement imports run synchronously within the HTTP request.

Do not log passwords, bearer tokens, JWT secrets, database URLs, or uploaded statement contents.

## Known failure modes

### Database connection failure

Symptoms:

- Application startup or database calls fail.
- Prisma/ORM operations report connection, timeout, or authentication errors.

Checks:

```bash
printenv DATABASE_URL
pnpm start
```

Mitigation:

- Verify `DATABASE_URL` is reachable from the deployment environment.
- Confirm database credentials, host, port, TLS settings, and network allowlists.
- Restart the API after database connectivity is restored.

Do not print credentials or database URLs into incident reports.

### JWT authentication failure

Symptoms:

- Valid login credentials produce a token that is rejected.
- Protected endpoints return 401 responses.

Checks:

- Confirm `JWT_SECRET` is consistent across API instances and restarts.
- Confirm the client sends `Authorization: Bearer <token>`.
- Confirm the token has not expired; tokens expire after seven days.

Mitigation:

- Restore the correct private secret and restart the API.
- Re-authenticate through `/auth/login` if the token was signed with an old or invalid secret.
- Never reuse or commit the development fallback secret.

### Account or import ownership rejection

Symptoms:

- `/imports` returns not-found or bad-request responses.
- An account exists but cannot be used by the authenticated user.

Checks:

- Confirm `accountId` belongs to the current `userId`.
- Confirm the account bank matches the selected `REVOLUT`, `MONOBANK`, or `PRIVAT` bank value.
- Inspect the import record status in PostgreSQL.

Mitigation:

- Create or select a user-owned account with the correct bank.
- Re-upload a valid statement for that account.
- Do not bypass ownership checks to recover a failed import.

### Statement import failure

Symptoms:

- Import remains `FAILED` or request returns a bad-request response.
- A valid-looking file is rejected as malformed.

Checks:

- Verify file extension and content: CSV, XLS, or XLSX.
- Verify file size limits and bank parser resolution.
- Confirm the selected bank parser matches the statement format.
- Check whether category-rule or transaction persistence failed.

Mitigation:

- Re-upload a supported, unmodified statement.
- Correct parser or validation defects and add a regression spec.
- Marked records should remain `FAILED`; do not expose raw parser or financial contents in logs.

### Duplicate import transactions

Symptoms:

- Repeated statements report skipped transactions.
- The transaction count does not increase for repeated imports.

Checks:

- Confirm `transactionHash` is being produced consistently by the import path.
- Inspect import totals for `imported`, `skipped`, and `total`.

Mitigation:

- This is expected when the global transaction hash is already present.
- Investigate hash-generation or parser changes before overriding uniqueness behavior.
- Run deduplication tests in `src/imports/import-pipeline.spec.ts` or the transaction service spec.

### Contract/runtime drift

Symptoms:

- ORM field or model errors after contract, migration, or dependency changes.
- Generated contract types disagree with database operations.

Mitigation:

1. Stop the change or deployment.
2. Compare `contract.prisma`, `contract.json`, `contract.d.ts`, migration files, and snapshots.
3. Run `pnpm contract:emit` only after confirming the contract source is correct.
4. Rebuild and rerun focused Prisma-adjacent tests.

## Ownership and security checklist

Before changing or releasing user-owned features:

- [ ] Every account, import, category, rule, and transaction query is scoped by `userId`.
- [ ] Mutations verify ownership before update or deletion.
- [ ] The global guard remains enabled and only intentional public routes use `@Public()`.
- [ ] Swagger continues to document bearer authentication.
- [ ] Raw ORM records are mapped to explicit public response interfaces.
- [ ] Uploaded statement contents are not logged.
- [ ] `.env`, secrets, and database URLs are absent from the diff.

## Rollback

There is no repository-specific platform rollback command. Use the deployment platform's standard release rollback for the API process, then:

1. Keep database migrations backward compatible unless an approved migration rollback is possible.
2. Re-deploy the previous application release.
3. Verify login and protected endpoints.
4. Verify database connectivity and user-owned account/transaction queries.
5. Confirm no contract/runtime mismatch remains.

Do not roll back a database migration without checking data preservation and application compatibility.

## Escalation

Escalate when:

- Database availability or credentials are lost.
- User-owned data cannot be isolated by `userId`.
- Contract and migration state disagree.
- A statement parser exposes or persists malformed financial data.
- A JWT secret is exposed or a token has been compromised.

Contain the incident first: stop deployments, rotate exposed secrets, and restore database connectivity. Preserve evidence without copying passwords, tokens, database URLs, or statement contents.
