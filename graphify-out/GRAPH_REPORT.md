# Graph Report - expense-tracker-api  (2026-11-25)

## Corpus Check
- Corpus is ~49,861 words - fits in a single context window. You may not need a graph.

## Summary
- 739 nodes · 1455 edges · 33 communities (32 shown, 1 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.86)
- Token cost: 120,920 input · 0 output

## Community Hubs (Navigation)
- Categorization & Transaction API
- Auth & Users
- Accounts & Controller Tests
- Bank Statement Parsers
- Nest Module Wiring
- Imports Controller & Upload
- Category Rules Management
- Prisma Deploy Workflow
- TypeScript Config
- Dev Dependencies
- Statement Import Pipeline
- Package Manifest
- Runtime Dependencies
- Contract Snapshot 0ed4
- Contract Snapshot 6946
- Contract Snapshot d13a
- Contract Snapshot eff3
- pnpm Scripts
- Generated Contract Types
- Project Guide & Docs
- Module Graph & Auth Guards
- Statistics, Security & Tech Debt
- Prisma Config & Environment
- Runbook & Failure Modes
- Engineering Standards & Ownership
- Jest Config
- Effect Package Overrides
- Git Workflow
- Nest CLI Config
- Prisma DB Client & Seed
- Prisma Composer Deploy
- Oxlint Config
- Prettier

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
- `Architecture document` --semantically_similar_to--> `Layered architecture: controllers -> services -> Prisma ORM -> PostgreSQL`  [INFERRED] [semantically similar]
  docs/architecture.md → CLAUDE.md
- `Statement upload pipeline (POST /imports)` --semantically_similar_to--> `Statement import flow`  [INFERRED] [semantically similar]
  CLAUDE.md → docs/architecture.md
- `Expense Tracker API (CLAUDE.md guide)` --references--> `ParseTransactionFiltersPipe`  [EXTRACTED]
  CLAUDE.md → docs/architecture.md
- `src/prisma/db.ts (db client, db.orm.public)` --shares_data_with--> `PrismaService.client.orm.public`  [INFERRED]
  prisma-next.md → docs/architecture.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Statement import pipeline (validate -> parse -> categorize -> dedup -> status)** — docs_security_statement_upload_validation, docs_architecture_bank_statement_parsers, docs_architecture_categoriesservice, docs_architecture_transactionhash_dedup, docs_architecture_import_status_lifecycle, docs_architecture_importsservice [EXTRACTED 1.00]
- **JWT authentication flow** — docs_architecture_authmodule, docs_architecture_authguard, docs_architecture_public_decorator, docs_architecture_currentuser_decorator, docs_setup_jwtconstants [INFERRED 0.85]
- **Prisma contract artifacts that must stay aligned** — prisma_next_data_contract, prisma_next_contract_json, prisma_next_contract_d_ts, prisma_next_db_client, prisma_config [EXTRACTED 1.00]

## Communities (33 total, 1 thin omitted)

### Community 0 - "Categorization & Transaction API"
Cohesion: 0.06
Nodes (32): @nestjs/swagger, CategoryRuleRow, CATEGORIES, Category, CategoryRuleMatch, isCategory(), matchCategory(), SEED_CATEGORY_RULES (+24 more)

### Community 1 - "Auth & Users"
Cohesion: 0.06
Nodes (22): bcryptjs, @nestjs/core, @nestjs/jwt, AuthController, user, AuthGuard, JwtPayload, AuthService (+14 more)

### Community 2 - "Accounts & Controller Tests"
Cohesion: 0.07
Nodes (18): @nestjs/testing, AccountsController, AccountResponse, AccountsService, account, user, rule, user (+10 more)

### Community 3 - "Bank Statement Parsers"
Cohesion: 0.11
Nodes (30): csv-parse@^7.0.2, xlsx@^0.18.5, csv-parse, xlsx, parseAndCategorize(), MonobankParser, PrivatParser, PARSERS (+22 more)

### Community 4 - "Nest Module Wiring"
Cohesion: 0.08
Nodes (15): @nestjs/common, AccountsModule, AppController, AppModule, AppService, AuthModule, parseCredentials(), ParseCredentialsPipe (+7 more)

### Community 5 - "Imports Controller & Upload"
Cohesion: 0.09
Nodes (13): ImportsController, ImportStatementBody, user, StatementUpload, ImportResult, ImportsService, ParseBankPipe, parserForBank() (+5 more)

### Community 6 - "Category Rules Management"
Cohesion: 0.09
Nodes (9): CategoriesService, CategoryRuleResponse, CategoryRulesController, CreateCategoryRuleBody, CreateCategoryRuleDto, parseCreateCategoryRule(), ParseCreateCategoryRulePipe, readPriority() (+1 more)

### Community 7 - "Prisma Deploy Workflow"
Cohesion: 0.07
Nodes (30): concurrency, cancel-in-progress, group, if, runs-on, steps, jobs, deploy (+22 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.07
Nodes (26): compilerOptions, rootDir, exclude, extends, include, compilerOptions, allowSyntheticDefaultImports, declaration (+18 more)

### Community 9 - "Dev Dependencies"
Cohesion: 0.08
Nodes (24): devDependencies, @nestjs/cli@^12.0.0, @nestjs/mau@^0.2.6, @nestjs/schematics@^12.0.0, @nestjs/testing@^12.0.1, oxlint@^1.58.0, source-map-support@^0.5.21, ts-loader@^9.5.2 (+16 more)

### Community 10 - "Statement Import Pipeline"
Cohesion: 0.15
Nodes (17): Statement upload pipeline (POST /imports), Bank statement parsers (REVOLUT, MONOBANK, PRIVAT), Import status lifecycle (PENDING/PROCESSING/COMPLETED/FAILED), ImportsService, Statement import flow, transactionHash global deduplication, TransactionsService, MAX_STATEMENT_BYTES (+9 more)

### Community 11 - "Package Manifest"
Cohesion: 0.11
Nodes (17): author, description, prisma@8.0.0-rc.12, supertest@^7.0.0, ts-node@^10.9.2, @types/express@^5.0.0, @types/jest@^30.0.0, license (+9 more)

### Community 12 - "Runtime Dependencies"
Cohesion: 0.11
Nodes (18): dependencies, alchemy@2.0.0-beta.74, bcryptjs@^3.0.3, effect@4.0.0-rc.112, @nestjs/common@^12.0.1, @nestjs/core@^12.0.1, @nestjs/jwt@^12.0.1, @nestjs/platform-express@^12.0.1 (+10 more)

### Community 13 - "Contract Snapshot 0ed4"
Cohesion: 0.12
Nodes (16): AggregateTypes, CodecTypes, Contract, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes (+8 more)

### Community 14 - "Contract Snapshot 6946"
Cohesion: 0.12
Nodes (16): AggregateTypes, CodecTypes, Contract, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes (+8 more)

### Community 15 - "Contract Snapshot d13a"
Cohesion: 0.12
Nodes (16): AggregateTypes, CodecTypes, Contract, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes (+8 more)

### Community 16 - "Contract Snapshot eff3"
Cohesion: 0.12
Nodes (16): AggregateTypes, CodecTypes, Contract, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes (+8 more)

### Community 17 - "pnpm Scripts"
Cohesion: 0.12
Nodes (17): scripts, build, contract:emit, db:init, db:seed, deploy, format, lint (+9 more)

### Community 18 - "Generated Contract Types"
Cohesion: 0.12
Nodes (15): AggregateTypes, CodecTypes, ContractBase, DefaultLiteralValue, ExecutionHash, FieldInputTypes, FieldOutputTypes, LaneCodecTypes (+7 more)

### Community 19 - "Project Guide & Docs"
Cohesion: 0.18
Nodes (11): graphify skill (/graphify trigger), Expense Tracker API (CLAUDE.md guide), Fixed category values (GROCERIES..OTHER), graphify usage rules, Architecture document, src/prisma/contract.prisma, Data model (User, Account, Import, Transaction, Category, CategoryRule), Swagger/OpenAPI UI at /docs (+3 more)

### Community 20 - "Module Graph & Auth Guards"
Cohesion: 0.17
Nodes (12): AccountsModule, AppModule, AuthGuard (global JWT bearer guard), AuthModule, CategoriesModule, CategoriesService, @CurrentUser() decorator, ImportsModule (+4 more)

### Community 21 - "Statistics, Security & Tech Debt"
Cohesion: 0.17
Nodes (12): StatisticsModule, StatisticsService (summary, by-category, monthly), Compliance posture (GDPR, SOC 2, HIPAA, PCI-DSS not claimed), bcryptjs password hashing (cost 10, passwordHash), Security & data handling, TD-004 Statistics load/scan data without bounded aggregation, TD-005 No health, metrics, or tracing endpoint, TD-006 No rate limiting / abuse controls for auth and uploads (+4 more)

### Community 22 - "Prisma Config & Environment"
Cohesion: 0.22
Nodes (10): Environment variables (DATABASE_URL, JWT_SECRET, PORT), dotenv@^17.4.2, contract.d.ts (contract types), prisma contract emit command, contract.json (compiled contract), Prisma Next data contract (contract.prisma), src/prisma/db.ts (db client, db.orm.public), PostgreSQL 15+ requirement (+2 more)

### Community 23 - "Runbook & Failure Modes"
Cohesion: 0.24
Nodes (10): Contract/runtime drift failure mode, Database migration procedure, Escalation criteria, Known failure modes (DB, JWT, ownership, import, duplicates, drift), Rollback procedure, Runbook, Security incident response, jwtConstants (dev-secret fallback) (+2 more)

### Community 24 - "Engineering Standards & Ownership"
Cohesion: 0.22
Nodes (6): PostgreSQL (source of truth), PrismaModule, PrismaService.client.orm.public, Engineering standards, Pull request checklist, Trust boundaries

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

### Community 29 - "Prisma DB Client & Seed"
Cohesion: 0.29
Nodes (4): @prisma/orm-postgres@8.0.0-rc.8, @prisma/orm-postgres, Contract, db

### Community 30 - "Prisma Composer Deploy"
Cohesion: 0.38
Nodes (4): @prisma/composer@0.16.0, @prisma/composer-prisma-cloud@0.16.0, @prisma/composer, @prisma/composer-prisma-cloud

### Community 31 - "Oxlint Config"
Cohesion: 0.29
Nodes (6): env, node, rules, @typescript-eslint/no-explicit-any, @typescript-eslint/no-floating-promises, $schema

## Knowledge Gaps
- **12 isolated node(s):** `graphify skill (/graphify trigger)`, `NestJS Mau (AWS deployment platform)`, `@Public() decorator`, `@CurrentUser() decorator`, `UsersModule` (+7 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 276 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@prisma/orm-postgres` connect `Prisma DB Client & Seed` to `Categorization & Transaction API`, `Package Manifest`, `Contract Snapshot 0ed4`, `Contract Snapshot 6946`, `Contract Snapshot d13a`, `Contract Snapshot eff3`, `Generated Contract Types`, `Prisma Config & Environment`?**
  _High betweenness centrality (0.211) - this node is a cross-community bridge._
- **What connects `graphify skill (/graphify trigger)`, `NestJS Mau (AWS deployment platform)`, `@Public() decorator` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Categorization & Transaction API` be split into smaller, more focused modules?**
  _Cohesion score 0.059940059940059943 - nodes in this community are weakly interconnected._
- **Why does `@nestjs/common` connect `Nest Module Wiring` to `Categorization & Transaction API`, `Auth & Users`, `Accounts & Controller Tests`, `Imports Controller & Upload`, `Category Rules Management`, `Package Manifest`, `Runtime Dependencies`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **Should `Auth & Users` be split into smaller, more focused modules?**
  _Cohesion score 0.06293706293706294 - nodes in this community are weakly interconnected._
- **Why does `transactionHash global deduplication` connect `Statement Import Pipeline` to `Bank Statement Parsers`, `Project Guide & Docs`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Should `Accounts & Controller Tests` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._