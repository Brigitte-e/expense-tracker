# Engineering standards

_Last reviewed: 2026-11-25_

These conventions apply to changes in this repository. `CLAUDE.md` is the source of truth; if this document and `CLAUDE.md` diverge, update this file to match `CLAUDE.md` in the same change.

## Architecture

The API is a strict NestJS HTTP application organized into feature modules:

```text
HTTP controllers
      ↓
NestJS services
      ↓
Prisma ORM contract/client
      ↓
PostgreSQL
```

`AppModule` registers the auth, users, accounts, transactions, imports, categories, statistics, and Prisma modules. Keep responsibilities in those layers:

- Controllers validate and transport HTTP input and delegate to services.
- Services own business rules, authorization checks, and database operations.
- `PrismaService` owns the PostgreSQL client lifecycle.
- Parsers own bank-specific statement parsing and external-format concerns.
- Never bypass a service or add a separate database abstraction for feature data access.

## Authorization and ownership

- `AuthGuard` is global and registered by `AuthModule`.
- Use `@Public()` only for routes intentionally available without authentication. Registration and login are the public auth endpoints.
- Use `@CurrentUser()` to access `{ id, email }` for authenticated requests.
- Scope every read and mutation involving user-owned data by `userId`, including accounts, imports, categories, category rules, and transactions.
- Verify resource ownership before returning or changing a resource. Do not rely only on a resource ID.
- Bearer tokens contain `sub` and `email` and expire after seven days. Never log tokens, passwords, JWT secrets, database URLs, or uploaded financial contents.

## Validation and HTTP boundaries

- Keep DTO parsing and external input validation at controller or pipe boundaries.
- Whitelist and validate request properties instead of accepting arbitrary objects.
- Use explicit response interfaces for controllers and services. Do not leak raw Prisma or ORM rows to API consumers.
- Map database records to public response objects before returning them.
- Use Nest exceptions with user-safe messages for request and authorization failures.
- Keep detailed internal failures in application logs, if logging is added, but never include secrets or financial record contents.

## Database and Prisma contract

- PostgreSQL is the persistence store and Prisma is the ORM contract runtime.
- The contract is defined in `src/prisma/contract.prisma`.
- Keep `contract.prisma`, generated `contract.json` and `contract.d.ts`, migrations, snapshots, seed data, and database usage aligned.
- Prefer the ORM contract API exposed through `PrismaService.client.orm.public`.
- Run `pnpm contract:emit` after contract changes when contract output generation is required.
- Inspect the existing migration and snapshot tooling before generating or applying schema changes.
- Seed and migration changes must remain deterministic and repeatable.

### Data invariants

- Transaction amounts are positive stored values; `type` distinguishes income from expense.
- `transactionHash` is globally unique and is used for import deduplication.
- Imports use `PENDING`, `PROCESSING`, `COMPLETED`, or `FAILED` status.
- Account and import ownership must match the authenticated user.
- Preserve database constraints and ownership checks even when a feature test currently mocks persistence.

## Statement imports

`POST /imports` accepts multipart data containing:

- `file`: CSV, XLS, or XLSX statement data.
- `bank`: `REVOLUT`, `MONOBANK`, or `PRIVAT`.
- `accountId`: the UUID of a user-owned account for the selected bank.

Keep the pipeline stages separate:

1. Validate file size and statement format.
2. Resolve and validate the bank parser.
3. Parse bank-specific transactions.
4. Apply category rules in descending priority.
5. Deduplicate transactions by hash.
6. Mark the import `COMPLETED` or `FAILED`.

Bank parsers belong under `src/imports/parsers/`. Do not mix raw parsing, categorization, and database persistence in one parser implementation.

## Categories and classification

Categories are fixed application values:

`GROCERIES`, `RESTAURANTS`, `TRANSPORT`, `SHOPPING`, `ENTERTAINMENT`, `HEALTH`, `HOUSING`, `SUBSCRIPTIONS`, `SALARY`, `TRANSFER`, `OTHER`

Keep category names aligned with the contract and seed data. Match rules case-insensitively against description substrings and sort rules by descending priority. Seed rules live in `src/categories/category-rules.ts`.

## Transactions and filtering

- `ParseTransactionFiltersPipe` owns parsing supported transaction filters.
- Supported filters include category, type, date range, account, amount range, and text search.
- Filter parsing must validate and normalize malformed input before a service or database call.
- Transaction list queries must always include the authenticated user's ownership scope.
- Statistics calculations belong in `StatisticsService` and should return explicit response interfaces.

## Code style

- Use strict TypeScript; do not use `any` or unnecessary explicit untyped data.
- Use consistent type imports: `import type` for type-only dependencies.
- Keep Nest decorators and module wiring explicit.
- Follow kebab-case file names and colocate specs beside source modules.
- Keep class names PascalCase and exported function signatures explicitly typed.
- Prettier formatting has no semicolons and uses single quotes.
- Default to small, focused functions and avoid comments for obvious control flow.
- Add comments only for non-obvious financial rules, external-format constraints, or authorization and deduplication invariants.

## Testing

Jest unit and integration-style specs use `ts-jest` and live beside source modules as `*.spec.ts`. E2E tests live in `test/` and use `test/jest-e2e.json`.

Testing conventions:

- Use Nest testing modules to isolate controllers and services.
- Mock `PrismaService.client.orm` operations at the feature boundary.
- Add regression specs for parser changes, categorization, filtering, authorization, ownership checks, and deduplication.
- Test validation pipes and uploaded files with both valid and malformed inputs.
- Test success and failure paths for import lifecycle transitions.
- Run a focused spec first, then the relevant suite and lint/build:

```bash
pnpm test -- --runInBand src/transactions/transactions.service.spec.ts
pnpm test
pnpm test:e2e
pnpm lint
pnpm build
```

Use `pnpm format` only when formatting source and test files is desired; verify the resulting diff before committing.

## API documentation

Swagger/OpenAPI is available at `/docs` when the server is running. All routes are protected by the global JWT bearer guard except routes marked `@Public()`.

To document or change an endpoint:

- Keep controller decorators and DTOs accurate.
- Document success and relevant error behavior when it adds useful API information.
- Update Swagger-visible request or response types when endpoint contracts change.

Run locally with `pnpm start:dev`, then obtain a token from registration or login and use the Swagger authorize dialog.

## Environment

Provide local environment variables in `.env`:

```bash
DATABASE_URL=postgresql://...
JWT_SECRET=<a private secret>
PORT=3000
```

- `DATABASE_URL` is required by `src/prisma/db.ts` and `prisma.config.ts`.
- `JWT_SECRET` is used by authentication and falls back to `dev-secret` only in development code. Do not rely on or commit that fallback.
- `PORT` defaults to `3000`.

## Pull request checklist

- [ ] Every owner-scoped query and mutation includes `userId`.
- [ ] Public-route decorators are limited to intentional authentication endpoints.
- [ ] Raw ORM records are not exposed as API responses.
- [ ] Prisma contract, generated contract files, migrations, snapshots, and seeds agree.
- [ ] Import parsing, categorization, deduplication, and file validation are covered by regressions.
- [ ] Focused tests pass before broader tests.
- [ ] `pnpm lint` and `pnpm build` pass.
- [ ] Secrets, passwords, JWTs, database URLs, and uploaded financial contents are absent from logs and diffs.
