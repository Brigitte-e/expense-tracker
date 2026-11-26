# Graph Report - api  (2026-11-26)

## Corpus Check
- 116 files · ~54,825 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 4, .example 1, .prisma 1)

## Summary
- 713 nodes · 1426 edges · 34 communities (33 shown, 1 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.85)
- Token cost: 120,920 input · 0 output

## Graph Freshness
- Built from commit: `dc42efb4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Categorization & Transaction API
- Auth & Users
- Accounts & Controller Tests
- Bank Statement Parsers
- Nest Module Wiring
- Imports Controller & Upload
- Category Rules Management
- AuthGuard (global JWT bearer guard)
- TypeScript Config
- package.json
- Statement Import Pipeline
- accounts.controller.ts
- Runtime Dependencies
- Contract Snapshot 0ed4
- Contract Snapshot 6946
- Contract Snapshot d13a
- prisma/contract.d.ts
- pnpm Scripts
- Bank statement parsers (REVOLUT, MONOBANK, PRIVAT)
- Project Guide & Docs
- AppModule
- Technical Debt Register
- Prisma Config & Environment
- Runbook & Failure Modes
- Engineering Standards & Ownership
- Jest Config
- Effect Package Overrides
- Git Workflow
- Nest CLI Config
- eff3b984b6e1cdb7e6cc241ce9014d03fe265420111af14bc75e4d4e5c98f6d2/contract.d.ts
- data.mjs
- Oxlint Config
- @prisma/orm-postgres
- graphify skill (/graphify trigger)

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 45 edges
2. `PrismaService` - 25 edges
3. `AuthUser` - 22 edges
4. `compilerOptions` - 21 edges
5. `CurrentUser` - 20 edges
6. `CategoriesService` - 19 edges
7. `TransactionsService` - 19 edges
8. `NormalizedTransaction` - 18 edges
9. `scripts` - 16 edges
10. `@nestjs/testing` - 16 edges

## Surprising Connections (you probably didn't know these)
- `Prisma Next data contract (contract.prisma)` --semantically_similar_to--> `src/prisma/contract.prisma`  [INFERRED] [semantically similar]
  prisma-next.md → docs/architecture.md
- `Contract/runtime drift failure mode` --references--> `prisma contract emit command`  [INFERRED]
  docs/runbook.md → prisma-next.md
- `src/prisma/db.ts (db client, db.orm.public)` --shares_data_with--> `PrismaService.client.orm.public`  [INFERRED]
  prisma-next.md → docs/architecture.md
- `Pull request checklist` --semantically_similar_to--> `Runbook`  [INFERRED] [semantically similar]
  docs/engineering-standards.md → docs/runbook.md
- `NestJS Observe (observability/APM)` --conceptually_related_to--> `TD-005 No health, metrics, or tracing endpoint`  [INFERRED]
  README.md → docs/tech-debt.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Prisma contract artifacts that must stay aligned** — prisma_next_data_contract, prisma_next_contract_json, prisma_next_contract_d_ts, prisma_next_db_client, prisma_config [EXTRACTED 1.00]
- **Statement import pipeline (validate -> parse -> categorize -> dedup -> status)** — docs_security_statement_upload_validation, docs_architecture_bank_statement_parsers, docs_architecture_categoriesservice, docs_architecture_transactionhash_dedup, docs_architecture_import_status_lifecycle, docs_architecture_importsservice [EXTRACTED 1.00]
- **JWT authentication flow** — docs_architecture_authmodule, docs_architecture_authguard, docs_architecture_public_decorator, docs_architecture_currentuser_decorator, docs_setup_jwtconstants [INFERRED 0.85]

## Communities (34 total, 1 thin omitted)

### Community 0 - "Categorization & Transaction API"
Cohesion: 0.07
Nodes (25): @nestjs/swagger, CATEGORIES, isCategory(), isTransactionType(), Transaction, TRANSACTION_TYPES, TransactionFilters, TransactionType (+17 more)

### Community 1 - "Auth & Users"
Cohesion: 0.06
Nodes (24): bcryptjs, @nestjs/core, @nestjs/jwt, AuthController, user, AuthGuard, JwtPayload, AuthService (+16 more)

### Community 2 - "Accounts & Controller Tests"
Cohesion: 0.10
Nodes (13): @nestjs/testing, rule, user, PrismaService, CategoryStatistic, MonthlyStatistic, StatisticsSummary, user (+5 more)

### Community 3 - "Bank Statement Parsers"
Cohesion: 0.09
Nodes (34): csv-parse, xlsx, CategoryRuleRow, Category, CategoryRuleMatch, matchCategory(), parseAndCategorize(), MonobankParser (+26 more)

### Community 4 - "Nest Module Wiring"
Cohesion: 0.08
Nodes (14): @nestjs/common, AppController, AppModule, AppService, AuthModule, parseCredentials(), ParseCredentialsPipe, readEmail() (+6 more)

### Community 5 - "Imports Controller & Upload"
Cohesion: 0.09
Nodes (12): ImportsController, ImportStatementBody, user, StatementUpload, ImportResult, ImportsService, ParseBankPipe, MAX_STATEMENT_BYTES (+4 more)

### Community 6 - "Category Rules Management"
Cohesion: 0.09
Nodes (9): CategoriesService, CategoryRuleResponse, CategoryRulesController, CreateCategoryRuleBody, CreateCategoryRuleDto, parseCreateCategoryRule(), ParseCreateCategoryRulePipe, readPriority() (+1 more)

### Community 7 - "AuthGuard (global JWT bearer guard)"
Cohesion: 0.25
Nodes (8): AuthGuard (global JWT bearer guard), AuthModule, @CurrentUser() decorator, @Public() decorator, Compliance posture (GDPR, SOC 2, HIPAA, PCI-DSS not claimed), bcryptjs password hashing (cost 10, passwordHash), Security & data handling, Trust boundaries

### Community 8 - "TypeScript Config"
Cohesion: 0.07
Nodes (26): compilerOptions, rootDir, exclude, extends, include, compilerOptions, allowSyntheticDefaultImports, declaration (+18 more)

### Community 9 - "package.json"
Cohesion: 0.06
Nodes (43): author, description, devDependencies, @nestjs/cli@^12.0.0, @nestjs/mau@^0.2.6, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, oxlint@^1.58.0 (+35 more)

### Community 10 - "Statement Import Pipeline"
Cohesion: 0.19
Nodes (12): Import status lifecycle (PENDING/PROCESSING/COMPLETED/FAILED), ImportsModule, ImportsService, ParseTransactionFiltersPipe, Statement import flow, transactionHash global deduplication, TransactionsModule, TransactionsService (+4 more)

### Community 11 - "accounts.controller.ts"
Cohesion: 0.18
Nodes (6): AccountsController, AccountsModule, AccountResponse, AccountsService, account, user

### Community 12 - "Runtime Dependencies"
Cohesion: 0.10
Nodes (21): dependencies, alchemy@2.0.0-beta.74, bcryptjs@^3.0.3, csv-parse@^7.0.2, effect@4.0.0-rc.112, @nestjs/common@^12.0.1, @nestjs/core@^12.0.1, @nestjs/jwt@^12.0.1 (+13 more)

### Community 13 - "Contract Snapshot 0ed4"
Cohesion: 0.12
Nodes (16): AggregateTypes, CodecTypes, Contract, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes (+8 more)

### Community 14 - "Contract Snapshot 6946"
Cohesion: 0.12
Nodes (16): AggregateTypes, CodecTypes, Contract, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes (+8 more)

### Community 15 - "Contract Snapshot d13a"
Cohesion: 0.12
Nodes (16): AggregateTypes, CodecTypes, Contract, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes (+8 more)

### Community 16 - "prisma/contract.d.ts"
Cohesion: 0.10
Nodes (17): AggregateTypes, CodecTypes, Contract, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes (+9 more)

### Community 17 - "pnpm Scripts"
Cohesion: 0.12
Nodes (16): scripts, build, contract:emit, db:init, db:seed, format, lint, start (+8 more)

### Community 18 - "Bank statement parsers (REVOLUT, MONOBANK, PRIVAT)"
Cohesion: 0.33
Nodes (7): Bank statement parsers (REVOLUT, MONOBANK, PRIVAT), MAX_STATEMENT_BYTES, ParseBankPipe, Statement upload validation (10 MiB, .csv/.xls/.xlsx, MIME), Sample statements (src/test-data, test-data/), readSpreadsheet(), TD-003 XLS declared but only XLSX/CSV parsing implemented

### Community 19 - "Project Guide & Docs"
Cohesion: 0.29
Nodes (7): Architecture document, src/prisma/contract.prisma, Data model (User, Account, Import, Transaction, Category, CategoryRule), Swagger/OpenAPI UI at /docs, Oxlint (pnpm lint), Seed data (src/prisma/seed.ts, src/users/user-defaults.ts), Setup & local development

### Community 20 - "AppModule"
Cohesion: 0.25
Nodes (8): AccountsModule, AppModule, CategoriesModule, CategoriesService, StatisticsModule, StatisticsService (summary, by-category, monthly), UsersModule, TD-004 Statistics load/scan data without bounded aggregation

### Community 21 - "Technical Debt Register"
Cohesion: 0.33
Nodes (6): TD-005 No health, metrics, or tracing endpoint, TD-006 No rate limiting / abuse controls for auth and uploads, Technical Debt Register, NestJS Mau (AWS deployment platform), NestJS Observe (observability/APM), NestJS starter README

### Community 22 - "Prisma Config & Environment"
Cohesion: 0.22
Nodes (10): Environment variables (DATABASE_URL, JWT_SECRET, PORT), dotenv@^17.4.2, contract.d.ts (contract types), prisma contract emit command, contract.json (compiled contract), Prisma Next data contract (contract.prisma), src/prisma/db.ts (db client, db.orm.public), PostgreSQL 15+ requirement (+2 more)

### Community 23 - "Runbook & Failure Modes"
Cohesion: 0.24
Nodes (10): Contract/runtime drift failure mode, Database migration procedure, Escalation criteria, Known failure modes (DB, JWT, ownership, import, duplicates, drift), Rollback procedure, Runbook, Security incident response, jwtConstants (dev-secret fallback) (+2 more)

### Community 24 - "Engineering Standards & Ownership"
Cohesion: 0.29
Nodes (5): PostgreSQL (source of truth), PrismaModule, PrismaService.client.orm.public, Engineering standards, Pull request checklist

### Community 25 - "Jest Config"
Cohesion: 0.22
Nodes (8): config, { config: tsconfig }, jest@^30.0.0, ts-jest@^29.4.11, typescript@^6.0.2, jest, ts-jest, typescript

### Community 26 - "Effect Package Overrides"
Cohesion: 0.22
Nodes (9): effect, @effect/platform-bun, @effect/platform-node, @effect/platform-node-shared, @effect/sql-d1, @effect/sql-pg, @effect/vitest, pnpm (+1 more)

### Community 27 - "Git Workflow"
Cohesion: 0.32
Nodes (8): Changelog guidelines, Git workflow documentation, Hotfix workflow (standard and urgent), PR title prefixes (Feature:, Fix:, Hotfix:, Chore:, Refactor:, Docs:), Release process with code freeze, Semantic Versioning (vMAJOR.MINOR.PATCH), Squash merge of working branches, Two-branch model (develop / main)

### Community 28 - "Nest CLI Config"
Cohesion: 0.25
Nodes (7): collection, compilerOptions, assets, deleteOutDir, watchAssets, $schema, sourceRoot

### Community 29 - "eff3b984b6e1cdb7e6cc241ce9014d03fe265420111af14bc75e4d4e5c98f6d2/contract.d.ts"
Cohesion: 0.12
Nodes (16): AggregateTypes, CodecTypes, Contract, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes (+8 more)

### Community 30 - "data.mjs"
Cohesion: 0.22
Nodes (8): appData, arktype@2.2.3, @prisma/composer@0.16.0, arktype, @prisma/composer, @prisma/composer-prisma-cloud, { db }, { jwtSecret }

### Community 31 - "Oxlint Config"
Cohesion: 0.29
Nodes (6): env, node, rules, @typescript-eslint/no-explicit-any, @typescript-eslint/no-floating-promises, $schema

### Community 32 - "@prisma/orm-postgres"
Cohesion: 0.29
Nodes (3): M, @prisma/orm-postgres@8.0.0-rc.8, @prisma/orm-postgres

## Knowledge Gaps
- **14 isolated node(s):** `ParseTransactionFiltersPipe`, `MAX_STATEMENT_BYTES`, `Data model (User, Account, Import, Transaction, Category, CategoryRule)`, `Oxlint (pnpm lint)`, `Seed data (src/prisma/seed.ts, src/users/user-defaults.ts)` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 261 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@prisma/orm-postgres` connect `@prisma/orm-postgres` to `Categorization & Transaction API`, `package.json`, `Contract Snapshot 0ed4`, `Contract Snapshot 6946`, `Contract Snapshot d13a`, `prisma/contract.d.ts`, `Prisma Config & Environment`, `eff3b984b6e1cdb7e6cc241ce9014d03fe265420111af14bc75e4d4e5c98f6d2/contract.d.ts`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **What connects `ParseTransactionFiltersPipe`, `MAX_STATEMENT_BYTES`, `Data model (User, Account, Import, Transaction, Category, CategoryRule)` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Categorization & Transaction API` be split into smaller, more focused modules?**
  _Cohesion score 0.07377049180327869 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/common` connect `Nest Module Wiring` to `Categorization & Transaction API`, `Auth & Users`, `Accounts & Controller Tests`, `Bank Statement Parsers`, `Imports Controller & Upload`, `Category Rules Management`, `package.json`, `accounts.controller.ts`, `Runtime Dependencies`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Should `Auth & Users` be split into smaller, more focused modules?**
  _Cohesion score 0.057902973395931145 - nodes in this community are weakly interconnected._
- **Why does `transactionHash global deduplication` connect `Statement Import Pipeline` to `Bank statement parsers (REVOLUT, MONOBANK, PRIVAT)`, `Bank Statement Parsers`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Should `Accounts & Controller Tests` be split into smaller, more focused modules?**
  _Cohesion score 0.10077519379844961 - nodes in this community are weakly interconnected._