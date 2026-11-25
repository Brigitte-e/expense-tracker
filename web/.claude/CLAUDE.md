# CLAUDE.md

This file provides guidance for working on the Expense Tracker web app.

## Project summary

Frontend for the Expense Tracker. It is a standalone app with its own `package.json`, lockfile, `node_modules`, tooling config, and Claude/graphify setup. It shares no code or dependencies with `../api`.

The app is not scaffolded yet.

## Backend

The web app talks to the Expense Tracker API (`../api`) over HTTP only:

- Local base URL: `http://localhost:3000`
- OpenAPI/Swagger: `http://localhost:3000/docs` (JSON at `/docs-json`)
- Auth: `POST /auth/register` and `POST /auth/login` return a JWT bearer token; every other endpoint requires `Authorization: Bearer <token>`.

Do not import files from `../api`. If API types are needed, generate them from `/docs-json`.

## Commands

Run all commands from this directory (`web`) with pnpm.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

The graphify skill lives at `.claude/skills/graphify/SKILL.md`. When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. When the answer is under a Markdown heading, `graphify section "<heading>"` prints that section's text, so the .md need not be opened. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
