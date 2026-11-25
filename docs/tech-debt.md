# Technical Debt Register

_Last reviewed: 2026-11-25_

This register tracks known correctness gaps, risky shortcuts, and accepted compromises. Add or update an entry for any change that relies on a listed gap.

Each entry describes the gap, why it exists, trigger conditions, impact, detection, and closing path.

## TD-001 — Statement import database writes are not atomic

**Status:** Open
**Severity:** Medium
**Owner:** Backend

### What the gap is

`ImportsService.importStatement()` creates an `PROCESSING` import record, parses and categorizes the file, inserts transactions, and then updates the import to `COMPLETED`. These steps are separate database operations and are not wrapped in a transaction.

If transaction insertion succeeds but import status updating fails, or a later step fails after partial work, the import may be left `PROCESSING`, while the catch block may mark it `FAILED`. The exact partial-state behavior depends on which database operation throws.

### Why we accepted it

The import pipeline was implemented first as an HTTP request flow with explicit status transitions. The current Prisma contract runtime integration is available, but an atomic multi-model import operation was not added when the pipeline was introduced.

### Trigger conditions

- Database availability changes during an import.
- A transaction insert conflicts or fails after some rows are created.
- Import status update fails after transaction insertion.
- A long-running upload is interrupted or retried.

### Impact

A user can receive `FAILED` or an HTTP error while some transactions already exist, or an import can remain `PROCESSING`. Re-uploading may deduplicate by `transactionHash`, but recovery is not clearly visible to the API consumer.

### Detection

- Count import records by status.
- Compare imported transaction counts with file totals.
- Look for transactions associated with `PROCESSING` imports or imports missing a terminal status.

### Closing path

Wrap import status, transaction insertion, and all related category lookups in one database transaction if the ORM contract supports the required primitive. Otherwise, define and test a compensation/reconciliation routine. Preserve `COMPLETED` or `FAILED` status as a terminal outcome and avoid returning success unless all expected writes are committed.

## TD-002 — Import deduplication combines pre-read filtering and fallback inserts

**Status:** Open
**Severity:** Low
**Owner:** Backend

### What the gap is

`TransactionsService.createFromImport()` first builds in-file deduplication by hash, then checks existing transaction hashes for the account, and filters inserts. If bulk creation throws a unique violation, it retries each row individually.

This is race tolerant and preserves global uniqueness, but the implementation depends on unique-constraint exception handling and can perform several database round trips.

### Why we accepted it

The Prisma/ORM bulk API and generated contract may surface a single bulk unique-violation before more targeted conflict reporting is available. Per-row fallback was added to skip only duplicate rows instead of failing the whole import.

### Trigger conditions

- Concurrent imports contain the same transaction hash.
- A unique violation occurs for a reason other than `transactionHash`.
- Multiple accounts or imports race while sharing a global hash.

### Impact

Usually, repeated transactions are skipped correctly. Rarely, concurrent inserts or unexpected uniqueness errors can be retried inconsistently or can hide the real failing constraint.

### Detection

- Regressions in import counts.
- Duplicate `transactionHash` attempts.
- Database unique violations with unexpected constraint names.

### Closing path

Centralize hash deduplication in an explicit database operation or supported upsert primitive. Verify that duplicate handling distinguishes `transactionHash` violations from every other constraint. Add concurrency tests that run two imports for the same account and transaction concurrently.

## TD-003 — XLS support is declared but only XLSX and CSV parsing are explicitly implemented

**Status:** Open
**Severity:** Medium
**Owner:** Backend

### What the gap is

The upload validator allows `.xls` and `application/vnd.ms-excel`, but `readSpreadsheet()` identifies XLSX by ZIP signature and otherwise sends every file to the CSV parser. The XLSX library can read older workbook formats, but `readSpreadsheet()` does not explicitly use that capability for `.xls` files.

### Trigger conditions

- A user uploads a legacy binary `.xls` file.
- A parser test fixture uses `application/vnd.ms-excel` or `.xls`.
- The CSV parser interprets binary workbook bytes as text and fails with a malformed statement.

### Impact

The API may advertise XLS support and then reject or misparse valid `.xls` statements inconsistently.

### Detection

- Import requests fail only for legacy XLS fixtures.
- Logs or error responses describe malformed CSV data for a valid workbook.

### Closing path

Either implement a real legacy XLS parsing branch and add fixtures/tests, or remove `.xls` from validation and documentation so the API accurately supports CSV and XLSX only.

## TD-004 — Statistics endpoints load or scan data without pagination or bounded aggregation work

**Status:** Open
**Severity:** Medium
**Owner:** Backend

### What the gap is

The monthly statistics endpoint loads every user transaction through `select('date', 'type', 'amount').all()` and aggregates it in application memory. Summary and category aggregation use ORM aggregation or grouping, but response work still depends on user transaction volume.

### Trigger conditions

- A user imports several years of transactions.
- Transaction history reaches tens or hundreds of thousands of rows.
- Multiple statistics requests run concurrently.

### Impact

Higher database transfer, memory usage, request latency, and CPU consumption as history grows.

### Detection

- Slow `/statistics/monthly` requests.
- Application memory growth during statistics requests.
- Database query rows or duration spikes.

### Closing path

Push monthly and category aggregation into bounded database queries or a dedicated query service. Add date-range parameters or pagination where useful, and benchmark large transaction sets. Keep all queries scoped to `userId`.

## TD-005 — No dedicated health, metrics, or tracing endpoint

**Status:** Open
**Severity:** Medium
**Owner:** Backend / DevOps

### What the gap is

The application exposes Swagger at `/docs`, but it has no repository-documented liveness/readiness or metrics endpoint. There is no dedicated APM, trace provider, queue, or structured operational dashboard in this repository snapshot.

Database connection failures are visible mainly through NestJS/ORM logs and request behavior.

### Trigger conditions

- PostgreSQL is unreachable at startup or during deployment.
- Import or transaction latency regresses.
- An API instance fails repeatedly and needs platform-level health detection.
- Operators need to distinguish authentication, database, validation, or parser failures.

### Impact

Slower incident detection and limited evidence for database, request, and import failures.

### Detection

- Application logs or failed platform checks.
- Intermittent HTTP 500/400 responses.
- Database or API dashboard alerts if configured externally.

### Closing path

Add a non-sensitive health endpoint that reports application readiness and database connectivity without exposing configuration or data. Integrate structured logs and optional OpenTelemetry/APM. Ensure health checks do not log secrets or uploaded statement content.

## TD-006 — Authentication and uploads lack configurable abuse controls

**Status:** Open
**Severity:** Medium
**Owner:** Backend / Platform

### What the gap is

The API has bcrypt password hashing and bearer JWT authentication, and statement uploads are limited to 10 MiB, but this repository has no explicit login rate limiting, upload rate limiting, account lockout, or distributed abuse protection.

### Trigger conditions

- A public registration/login endpoint is exposed to the internet.
- Automated clients repeatedly submit credentials or large uploads.
- One IP or account can consume excessive password hashing or parser/database work.

### Impact

Credential-guessing risk, CPU amplification, database load, and unnecessary import work.

### Detection

- Platform or proxy request-rate metrics.
- High failed-login volume.
- High multipart-upload volume or repeated 10 MiB requests.

### Closing path

Add platform or application rate limits for auth and import endpoints. Add monitoring for failed authentication and rejected uploads. Prefer a proxy or platform limiter for distributed protection, and keep per-route application guards as defense in depth.

## TD-007 — JWT fallback secret is development-only but is easy to misuse

**Status:** Open
**Severity:** High if deployed
**Owner:** Backend / DevOps

### What the gap is

JWT configuration falls back to `dev-secret` in development code. The fallback is acceptable only for local development, but a deployed process that starts without `JWT_SECRET` could silently use a predictable signing key.

### Trigger conditions

- Deployed environment omits `JWT_SECRET`.
- Secret configuration is copied between environments.
- A process is started in a mode that falls back without a visible startup guard.

### Impact

An attacker could forge bearer tokens if the fallback reaches a deployed environment.

### Detection

- Startup configuration review.
- Platform secret audit.
- Verification that production `JWT_SECRET` is not the documented fallback.

### Closing path

Require `JWT_SECRET` at startup outside explicit development/test modes, fail fast on missing or weak values, and document secret rotation. Add startup validation and deployment checks.

## TD-008 — Prisma contract, migration, and deployment workflows are not fully automated or documented

**Status:** Open
**Severity:** Medium
**Owner:** Backend / DevOps

### What the gap is

The repository has Prisma contract generation and migration/snapshot tooling, but its deployment workflow does not clearly define a required order for contract emission, migrations, backup, and application startup. The deployment target and migration owner are not fully recorded in this repository snapshot.

### Trigger conditions

- Contract changes are deployed without emitted artifacts.
- Migrations are applied while the old application is running.
- Application startup precedes migration completion.
- A database snapshot is not available before a destructive migration.

### Impact

Contract/runtime drift, startup failure, migration downtime, or irreversible data loss.

### Detection

- ORM contract errors after deployment.
- Migration/snapshot mismatch.
- Application startup failure against the target PostgreSQL schema.

### Closing path

Document and automate a release pipeline: backup, contract check/emission, migration application, application deployment, smoke test, and rollback. Require migration review for schema changes and make contract drift a CI/build failure where practical.
