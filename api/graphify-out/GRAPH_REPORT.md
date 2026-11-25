# Graph Report - api  (2026-11-25)

## Corpus Check
- 111 files · ~49,740 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 4, .example 1, .prisma 1)

## Summary
- 701 nodes · 1404 edges · 35 communities (31 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.85)
- Token cost: 120,920 input · 0 output

## Graph Freshness
- Built from commit: `1726596d`
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
- Dev Dependencies
- Statement Import Pipeline
- Package Manifest
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
- @nestjs/mau@^0.2.6
- Prisma Composer Deploy
- Oxlint Config
- Prettier
- supertest
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
9. `scripts` - 17 edges
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

## Communities (35 total, 4 thin omitted)

### Community 0 - "Categorization & Transaction API"
Cohesion: 0.07
Nodes (25): isCategory(), isTransactionType(), Transaction, TRANSACTION_TYPES, TransactionFilters, TransactionType, UpdateTransactionBody, UpdateTransactionDto (+17 more)

### Community 1 - "Auth & Users"
Cohesion: 0.06
Nodes (22): bcryptjs, @nestjs/jwt, AuthController, user, AuthService, AuthTokenResponse, user, toPublicUser() (+14 more)

### Community 2 - "Accounts & Controller Tests"
Cohesion: 0.07
Nodes (19): @nestjs/common, @nestjs/testing, AccountsController, AccountResponse, AccountsService, account, user, AuthUser (+11 more)

### Community 3 - "Bank Statement Parsers"
Cohesion: 0.08
Nodes (35): csv-parse, xlsx, CategoryRuleRow, Category, CategoryRuleMatch, matchCategory(), parseAndCategorize(), ImportsService (+27 more)

### Community 4 - "Nest Module Wiring"
Cohesion: 0.06
Nodes (17): @nestjs/swagger@^12.0.1, @nestjs/core, @nestjs/swagger, AccountsModule, AppController, AppModule, AppService, AuthGuard (+9 more)

### Community 5 - "Imports Controller & Upload"
Cohesion: 0.09
Nodes (11): ImportsController, ImportStatementBody, user, StatementUpload, ImportResult, ParseBankPipe, MAX_STATEMENT_BYTES, StatementFileValidator (+3 more)

### Community 6 - "Category Rules Management"
Cohesion: 0.10
Nodes (9): CategoriesService, CategoryRuleResponse, CategoryRulesController, CreateCategoryRuleBody, CreateCategoryRuleDto, parseCreateCategoryRule(), ParseCreateCategoryRulePipe, readPriority() (+1 more)

### Community 7 - "AuthGuard (global JWT bearer guard)"
Cohesion: 0.25
Nodes (8): AuthGuard (global JWT bearer guard), AuthModule, @CurrentUser() decorator, @Public() decorator, Compliance posture (GDPR, SOC 2, HIPAA, PCI-DSS not claimed), bcryptjs password hashing (cost 10, passwordHash), Security & data handling, Trust boundaries

### Community 8 - "TypeScript Config"
Cohesion: 0.07
Nodes (26): compilerOptions, rootDir, exclude, extends, include, compilerOptions, allowSyntheticDefaultImports, declaration (+18 more)

### Community 9 - "Dev Dependencies"
Cohesion: 0.09
Nodes (22): devDependencies, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, oxlint@^1.58.0, ts-loader@^9.5.2, ts-node@^10.9.2, tsx@^4.23.12, @types/express@^5.0.0 (+14 more)

### Community 10 - "Statement Import Pipeline"
Cohesion: 0.19
Nodes (12): Import status lifecycle (PENDING/PROCESSING/COMPLETED/FAILED), ImportsModule, ImportsService, ParseTransactionFiltersPipe, Statement import flow, transactionHash global deduplication, TransactionsModule, TransactionsService (+4 more)

### Community 11 - "Package Manifest"
Cohesion: 0.12
Nodes (15): author, description, @nestjs/cli@^12.0.0, prisma@8.0.0-rc.12, source-map-support@^0.5.21, tsconfig-paths@^4.2.0, license, name (+7 more)

### Community 12 - "Runtime Dependencies"
Cohesion: 0.11
Nodes (19): dependencies, alchemy@2.0.0-beta.74, bcryptjs@^3.0.3, csv-parse@^7.0.2, effect@4.0.0-rc.112, @nestjs/common@^12.0.1, @nestjs/core@^12.0.1, @nestjs/jwt@^12.0.1 (+11 more)

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
Cohesion: 0.05
Nodes (35): AggregateTypes, CodecTypes, Contract, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes (+27 more)

### Community 17 - "pnpm Scripts"
Cohesion: 0.12
Nodes (17): scripts, build, contract:emit, db:init, db:seed, deploy, format, lint (+9 more)

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

### Community 30 - "Prisma Composer Deploy"
Cohesion: 0.38
Nodes (4): @prisma/composer@0.16.0, @prisma/composer-prisma-cloud@0.16.0, @prisma/composer, @prisma/composer-prisma-cloud

### Community 31 - "Oxlint Config"
Cohesion: 0.29
Nodes (6): env, node, rules, @typescript-eslint/no-explicit-any, @typescript-eslint/no-floating-promises, $schema

## Knowledge Gaps
- **14 isolated node(s):** `MAX_STATEMENT_BYTES`, `graphify skill (/graphify trigger)`, `Data model (User, Account, Import, Transaction, Category, CategoryRule)`, `Oxlint (pnpm lint)`, `Seed data (src/prisma/seed.ts, src/users/user-defaults.ts)` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 257 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@prisma/orm-postgres` connect `prisma/contract.d.ts` to `Categorization & Transaction API`, `Package Manifest`, `Contract Snapshot 0ed4`, `Contract Snapshot 6946`, `Contract Snapshot d13a`, `Prisma Config & Environment`?**
  _High betweenness centrality (0.234) - this node is a cross-community bridge._
- **What connects `MAX_STATEMENT_BYTES`, `graphify skill (/graphify trigger)`, `Data model (User, Account, Import, Transaction, Category, CategoryRule)` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Categorization & Transaction API` be split into smaller, more focused modules?**
  _Cohesion score 0.0726775956284153 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/common` connect `Accounts & Controller Tests` to `Categorization & Transaction API`, `Auth & Users`, `Bank Statement Parsers`, `Nest Module Wiring`, `Imports Controller & Upload`, `Category Rules Management`, `Package Manifest`, `Runtime Dependencies`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **Should `Auth & Users` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Why does `transactionHash global deduplication` connect `Statement Import Pipeline` to `Bank statement parsers (REVOLUT, MONOBANK, PRIVAT)`, `Bank Statement Parsers`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Should `Accounts & Controller Tests` be split into smaller, more focused modules?**
  _Cohesion score 0.07412587412587412 - nodes in this community are weakly interconnected._