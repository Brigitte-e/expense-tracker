# Setup & local development

_Last reviewed: 2026-11-25_

## Prerequisites

| Tool | Recommended version | Installation |
|---|---:|---|
| Node.js | 24.x | `nvm install 24` |
| pnpm | 10.32.1 | `corepack enable` or install the package manager declared in `package.json` |
| PostgreSQL | A compatible local or hosted PostgreSQL instance | Docker or platform-managed PostgreSQL |

Use pnpm for all repository commands. The package manager is declared in `package.json`.

## Clone and install

```bash
git clone <repository-url>
cd expense-tracker-api
pnpm install
```

## Configure environment

Create a local `.env` file in the repository root:

```bash
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
JWT_SECRET=<a-private-secret-at-least-32-characters>
PORT=3000
```

Environment variables:

| Variable | Purpose | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection used by the Prisma 8 ORM contract/runtime | Required |
| `JWT_SECRET` | JWT signing and verification secret | Development-only fallback `dev-secret` |
| `PORT` | HTTP listen port | `3000` |

Never commit `.env`, database credentials, or JWT secrets.

The development fallback in `jwtConstants` must not be relied on in deployed environments. Use a unique private `JWT_SECRET` for each environment.

## Database setup

For a local PostgreSQL database, create the target database and set `DATABASE_URL` to a connection string for it.

Initialize database configuration if needed:

```bash
pnpm db:init
```

Apply repository migrations using the existing migration tooling. Before schema changes, inspect:

- `prisma.config.ts`
- `src/prisma/contract.prisma`
- generated files under `src/prisma/`
- `migrations/`
- database snapshots under `migrations/snapshots/`

Emit Prisma contract artifacts after contract changes:

```bash
pnpm contract:emit
```

Seed the database:

```bash
pnpm db:seed
```

Seed behavior provisions categories and category rules for new users. Review `src/prisma/seed.ts` and `src/users/user-defaults.ts` before changing seed data.

## Start the API

Development watch mode:

```bash
pnpm start:dev
```

The API starts at:

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/docs`

Other startup modes:

```bash
pnpm start
pnpm start:debug
pnpm start:prod
```

`pnpm start:prod` runs the compiled `dist/main` entry point after `pnpm build`.

## Verify the setup

1. Confirm PostgreSQL is reachable with `DATABASE_URL`.
2. Start the API.
3. Open `http://localhost:3000/docs`.
4. Call `POST /auth/register` to create a user and receive a bearer token.
5. In Swagger, authorize with that token.
6. Call `GET /auth/me` and an account or statistics endpoint.

Alternatively, log in with:

```text
POST /auth/login
```

Registration and login are currently public. Every other route is protected by the global JWT bearer guard unless explicitly marked `@Public()`.

## Build

```bash
pnpm build
```

The Nest CLI emits compiled application files under `dist/`.

## Tests

Run unit and integration-style Jest specs:

```bash
pnpm test
```

Run with coverage:

```bash
pnpm test:cov
```

Run tests continuously:

```bash
pnpm test:watch
```

Run end-to-end tests:

```bash
pnpm test:e2e
```

Run one focused spec:

```bash
pnpm test -- --runInBand src/transactions/transactions.service.spec.ts
```

Jest unit specs live beside source files in `src/**/*.spec.ts`. E2E configuration is in `test/jest-e2e.json`.

## Lint and format

Run the Oxlint codebase check:

```bash
pnpm lint
```

Format source and test files:

```bash
pnpm format
```

Formatting writes files, so review the resulting diff before committing.

## Statements for manual testing

The repository contains sample statements under:

- `src/test-data/monobank.csv`
- `src/test-data/revolut.csv`
- `src/test-data/statement.csv`
- `test-data/`

Use a sample to test `POST /imports` in Swagger:

- select `file`;
- select `REVOLUT`, `MONOBANK`, or `PRIVAT`;
- provide a UUID for a user-owned account whose `bank` matches the selected parser.

Supported uploads are CSV, XLS, and XLSX. The configured maximum size is 10 MiB.

## Project layout

```text
src/
  app.module.ts
  auth/
  users/
  accounts/
  transactions/
  imports/
    parsers/
    types/
  categories/
  statistics/
  prisma/
test/
docs/
migrations/
```

Key architecture rules:

- Controllers validate input and delegate to services.
- Services own business rules and database operations.
- Feature services use `PrismaService.client.orm.public`.
- Every account, category, import, rule, and transaction operation must be scoped to `userId`.
- Bank parsers stay separate from categorization and persistence.

## Common issues

### `DATABASE_URL` is missing

`src/prisma/db.ts` and `prisma.config.ts` require `DATABASE_URL`. Restart the process after setting it in `.env`.

### Authentication returns 401

- Confirm `JWT_SECRET` is set consistently.
- Confirm the request uses `Authorization: Bearer <token>`.
- Confirm the token is less than seven days old.
- Re-login if the token was signed by an old or missing secret.

### Import is rejected

- Confirm the file extension and MIME type are supported.
- Confirm file size is 10 MiB or less.
- Confirm the selected bank parser matches the statement format.
- Confirm `accountId` belongs to the authenticated user and matches the selected bank.

### Prisma contract and database disagree

- Stop the deployment or migration sequence.
- Compare `src/prisma/contract.prisma`, generated contract files, migrations, and snapshots.
- Run `pnpm contract:emit` after a confirmed contract change.
- Rebuild and run the focused affected spec.

### Test failures after contract or dependency changes

- Run `pnpm install` again.
- Run `pnpm build`.
- Run the specific failing spec with `pnpm test -- --runInBand <spec>`.
- Verify mock operations match `PrismaService.client.orm.public` boundaries.

---

If setup differs on a deployment or development machine, document the platform-specific environment settings in a follow-up change rather than committing secrets.
