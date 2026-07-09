# Architecture

## Overview

`lafontainemons-menu` is a Yarn 4 (Berry) monorepo managed with **Turborepo**, made of three workspaces:

```
frontend/    React 19 SPA — displays the restaurant menu
backend/     Express 5 REST API — serves menu data
database/    Drizzle ORM layer — schema, migrations, queries (shared package)
```

`backend` depends on `database` as a workspace package (`@lafontaine/database`). `frontend` calls `backend` over HTTP;
it does not import it directly.

## Request flow

```
Browser → Nginx (prod) / Vite dev server (local) → frontend (React SPA)
                                                          │
                                                          ▼ fetch /api/*
                                                     backend (Express)
                                                          │
                                                          ▼ Drizzle ORM
                                                     PostgreSQL
```

In production, Nginx serves the built frontend as static files and reverse-proxies `/api/` to the backend (
see [deployment/nginx.md](deployment/nginx.md)).

## Stack per workspace

| Workspace  | Stack                                                        |
|------------|--------------------------------------------------------------|
| `frontend` | React 19, Vite 8, TypeScript, Tailwind CSS 4, base-ui/shadcn |
| `backend`  | Node.js 26, Express 5, TypeScript, Zod                       |
| `database` | PostgreSQL 18, Drizzle ORM, Drizzle-Zod                      |

Shared tooling: Biome (lint/format), Docker Compose (local Postgres + backend), GitHub Actions (CI checks,
release-please, deploy).

## Data model

```
Section (7 categories)
    └── Subsection (3 subcategories)
            └── Item (95 menu items)
```

## Releases & deployment

Versioning and changelog are automated by [release-please](https://github.com/googleapis/release-please) from
Conventional Commits — see [CHANGELOG.md](../CHANGELOG.md). A merge to `main` that produces a release automatically
triggers deployment via `.github/workflows/deploy.yml`. Details in [deployment/docker.md](deployment/docker.md)
and [deployment/nginx.md](deployment/nginx.md).