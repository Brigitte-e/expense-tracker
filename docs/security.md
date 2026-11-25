# Security & data handling

_Last reviewed: 2026-11-25_

## Scope

This repository has no contractual compliance certification or framework in scope today. It processes account, category, import, and transaction data that may be personally or financially sensitive. Configure and review external production controls even though no formal compliance claim is made.

| Topic | Current posture |
|---|---|
| GDPR | No contractual scope is documented; determine applicability for deployed users and data residency requirements. |
| SOC 2 | Not claimed or configured by this repository. |
| HIPAA | No PHI handling is implemented or expected. |
| PCI-DSS | The API does not accept or store card, bank credentials, or payment-card data directly. Uploaded statements may still contain financial identifiers or personal details. |

## Trust boundaries

The API is the trusted HTTP application and owns authentication, authorization, persistence, parsing, and statistics. Clients are untrusted, including Swagger/browser users.

Trust boundaries include:

1. **HTTP input** — credentials, file uploads, route parameters, query parameters, and multipart fields must be validated.
2. **Authentication** — bearer JWT access must be verified before protected operations.
3. **Authorization** — each user-owned resource must be checked against the authenticated `userId`.
4. **Database data** — database rows are not public response objects until explicitly mapped.
5. **Uploaded statements** — files are external input and may contain sensitive financial contents.
6. **Prisma contract and migrations** — database-facing changes must preserve constraints and ownership invariants.

The application does not proxy access through a service token. Protect all protected routes with the global `AuthGuard` unless a route is intentionally marked public.

## Authentication

- `AuthGuard` is registered globally through `AuthModule`.
- Protected requests require `Authorization: Bearer <token>`.
- JWT payloads contain `sub` and `email`.
- JWT signing uses `JWT_SECRET` and tokens expire after seven days.
- Only `/auth/register` and `/auth/login` are currently public.
- `/auth/me` returns the authenticated user's public identity.

Do not:

- Set `JWT_SECRET` to the `dev-secret` development fallback in deployed environments.
- Commit `.env` or secret values.
- Place bearer tokens in URLs, logs, tickets, screenshots, or source code.
- Accept an identifier supplied by a client instead of the authenticated `sub` claim for owner scoping.

## Password handling

- Passwords are hashed with `bcryptjs` using cost factor 10 before persistence.
- The API stores `passwordHash`, not plaintext passwords.
- Login compares the submitted password with `passwordHash` using `bcryptjs.compare`.
- Invalid credentials return a generic unauthorized response.
- Registration and login credentials are parsed and validated before the auth service is called.

Never log, export, or return password or password hash values. Public user projections must contain identity fields that are intentionally safe to expose, such as `id`, `email`, and `createdAt`.

## Authorization and ownership

Every operation on user-owned data must include and verify `userId`:

- accounts;
- imports;
- transactions;
- categories;
- category rules;
- default resources provisioned during registration.

The account and import ownership rules are especially sensitive:

- An account lookup must match both `accountId` and authenticated `userId`.
- The selected import bank must match the owned account bank.
- Import updates must not modify records owned by another user.
- Transaction reads, updates, deletions, filtering, and bulk-import writes must remain scoped.

Do not rely only on route/resource UUIDs. A client that knows a UUID must not be able to read or mutate another user's resource.

## Request validation

- Use DTO parsing and Nest pipes before database access.
- UUID route and body fields must be validated as UUIDs where supported.
- Bank values must be resolved through `ParseBankPipe` and remain one of `REVOLUT`, `MONOBANK`, or `PRIVAT`.
- Credential parsing must validate malformed auth input.
- Transaction filters must be normalized and validated before ORM calls.
- Unknown fields should be handled according to Nest and DTO validation policy rather than passed directly to services or the database.

Avoid dynamic ORM field selection or raw filter construction from unvalidated client input.

## Statement upload security

`POST /imports` accepts multipart statement files. It validates:

- file presence;
- maximum file size of 10 MiB;
- allowed extension: `.csv`, `.xls`, or `.xlsx`;
- declared MIME type;
- bank/parser compatibility;
- ownership and bank compatibility of the selected account.

Additional controls:

- Parse external file formats before database writes.
- Keep bank parsers separate from categorization and persistence.
- Deduplicate records by globally unique `transactionHash`.
- Mark failed imports `FAILED` without persisting partial financial imports unless the transaction bulk path explicitly defines atomic behavior.
- Never log uploaded financial contents, raw parsed rows, or file buffers.

A MIME or extension check is not proof of safe file contents. Validation must be paired with parser-specific format checks and bounded file size.

## Data handling

### What the API processes

| Data category | Examples | Handling |
|---|---|---|
| Account identity | email, password hash, user ID | Authentication and ownership |
| Accounts | account metadata and selected bank | User-owned records |
| Imports | file name, bank, status, account linkage | Operational and potentially sensitive |
| Transactions | descriptions, amounts, dates, categories, type | Financial data |
| Category rules | description patterns, priority, category linkage | User-owned configuration |
| Category statistics | summaries and aggregations | Derived financial data |

File names and statement descriptions may reveal personal or financial details. Treat import and transaction records as sensitive even if they do not contain card credentials.

### Storage

The source of truth is PostgreSQL. The Prisma contract is in `src/prisma/contract.prisma`, with generated runtime/typing artifacts under `src/prisma/` and migrations and snapshots under `migrations/`.

Database controls should include:

- encrypted transport in deployed environments;
- private network or platform database access where possible;
- least-privilege application credentials;
- backups appropriate to retained financial data;
- secret rotation for database credentials and JWT signing keys;
- migration review because schema changes may affect ownership or retention.

There is no cache or queue for user data in the current application. Import processing is synchronous; there is no background worker containing uploaded financial content.

### Retention

Retention periods are not documented in the repository. Define them before deployment if required by policy or law. Deleted and deactivated functionality must respect database constraints and avoid retaining exported statement contents longer than necessary.

Do not add account deletion, export, or purge features that bypass user ownership checks or database constraints.

## API responses and errors

- Map ORM records into explicit public response interfaces.
- Do not expose `passwordHash`, database internals, raw Prisma rows, or unneeded ownership fields.
- Return generic unauthorized responses for bad credentials and invalid bearer tokens.
- Use Nest exceptions for not-found and validation conditions.
- Avoid including uploaded file contents or detailed database errors in client-facing responses.
- Logs, if added, must exclude passwords, JWT secrets, database URLs, tokens, and statement data.

The Swagger UI is a development and testing surface. In production, restrict Swagger if the deployment policy requires hiding the API contract or exposes test-only operations.

## Secrets and configuration

Required secrets:

- `JWT_SECRET` — JWT signing and verification.
- `DATABASE_URL` — PostgreSQL connection and credentials.

Store deployed secrets in the platform's secret/configuration mechanism. Local values belong in `.env`, which must remain uncommitted.

Review secret handling for:

- rotation after suspected exposure;
- key consistency across API replicas or restarts;
- separate development and production credentials;
- absence from tests, fixtures, logs, screenshots, and source control;
- database and token separation rather than one shared secret.

## Network and deployment

No external hosting, CORS, TLS, or reverse-proxy configuration is fully documented in this repository snapshot.

Before deployment, verify:

- HTTPS termination and HTTP-to-HTTPS redirect;
- database access restricted to the application environment;
- CORS policy permits only required clients;
- no debug or development secret fallback is enabled;
- Swagger exposure matches the environment policy;
- multipart request size and platform limits match `MAX_STATEMENT_BYTES`;
- application logs and platform logs do not capture request bodies containing credentials or statements.

## Supply-chain and scanning

No dedicated supply-chain scanner or APM is configured in this repository snapshot. The project should at minimum maintain:

- dependency vulnerability checks;
- secret scanning in source control;
- image/container scanning if the application is packaged;
- repeatable lockfile use with `pnpm-lock.yaml`;
- pinned package-manager metadata;
- dependency review before Prisma and Nest major upgrades.

Commands for routine code quality checks:

```bash
pnpm lint
pnpm build
pnpm test
pnpm test:e2e
```

## Incident response

### Authentication or secret exposure

1. Stop or contain the affected deployment.
2. Rotate `JWT_SECRET` if it may have been exposed.
3. Rotate database credentials if `DATABASE_URL` or credentials were exposed.
4. Review authentication logs only for non-sensitive metadata.
5. Invalidate the practical effect of old JWTs by deploying the new signing secret and requiring re-login.
6. Do not publish secrets or tokens in incident evidence.

### Unauthorized data access

1. Stop the vulnerable operation or deployment if active exploitation is likely.
2. Identify the affected `userId` resources and operations.
3. Review database and application access logs where available.
4. Preserve evidence that omits passwords, hashes, statement contents, and JWTs.
5. Fix ownership scoping and add a regression test.
6. Assess notification obligations according to applicable policy or law.

### Database or contract incident

1. Pause deployments and migrations.
2. Restore database connectivity or access using approved credentials.
3. Verify `contract.prisma`, generated contract artifacts, migrations, and snapshots agree.
4. Avoid ad hoc database edits that bypass ownership constraints or migration history.
5. Back up affected data before destructive remediation.

### Statement import exposure

1. Remove any logs or diagnostic artifacts containing file names or parsed financial rows.
2. Verify parser and validation boundaries contain external data safely.
3. Confirm no uploaded buffer is persisted outside PostgreSQL records.
4. Repair parser or authorization defects and add malformed/ownership regression coverage.

## Security checklist

- [ ] Global JWT guard remains active.
- [ ] Only registration and login are public unless intentionally changed.
- [ ] Every user-owned query and mutation is scoped by `userId`.
- [ ] Account and import bank/owner checks remain enforced.
- [ ] Password hashes and JWT secrets never appear in logs or diffs.
- [ ] Statement files are size-limited and format-validated.
- [ ] Raw ORM records are not returned from controllers.
- [ ] Database, JWT, and deployment secrets are managed outside source control.
- [ ] Prisma contract and migrations preserve ownership and integrity constraints.
- [ ] Imports and transaction deduplication are covered by authorization and regression tests.
- [ ] HTTPS, database network access, and production secret handling are verified.
