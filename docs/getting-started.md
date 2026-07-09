# Getting Started

## Prerequisites

- Node.js 26+
- Yarn 4 (Berry) — enable via `corepack enable`
- Docker (for local PostgreSQL + backend container)

## Setup

```bash
yarn install
```

Create a `.env` file at the repo root with:

```bash
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
BACKEND_PORT=8080

POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=...
POSTGRES_PORT=5432

DATABASE_URL=postgres://<user>:<password>@localhost:5432/<db>
```

## Run everything

```bash
yarn dev
```

This starts Postgres + the backend via Docker Compose and runs `turbo dev` for all workspaces.

- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Database: localhost:5432

## Run a single workspace

These are independent alternatives — run one at a time, not as a sequence.

Frontend only (Vite dev server):
```bash
yarn dev:frontend
```

Backend only:
```bash
yarn dev:backend
```

Stop Docker services:
```bash
yarn dev:stop
```

## Common commands

Lint project (Biome):
```bash
yarn lint
```

Auto-fix lint issues:
```bash
yarn lint:fix
```

Build all workspaces (turbo):
```bash
yarn build
```

Typecheck all workspaces:
```bash
yarn typecheck:all
```

Database GUI (Drizzle Studio, long-running — run on its own):
```bash
yarn workspace @lafontaine/database db:studio
```

## Next steps

- [Backend](backend.md) — API endpoints, env vars
- [Frontend](frontend.md) — structure, scripts
- [Database](database.md) — schema, migrations, seed
- [Docker deployment](deployment/docker.md)
- [Nginx deployment](deployment/nginx.md)