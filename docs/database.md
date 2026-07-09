# Database Layer — Drizzle ORM

TypeScript database layer with Drizzle ORM and PostgreSQL, shared as the `@lafontaine/database` workspace package.

## Tech Stack

- PostgreSQL 18
- Drizzle ORM with type inference
- Drizzle-Zod for runtime validation

## Schema

```
Section (7 categories)
    └── Subsection (3 subcategories)
            └── Item (95 menu items)
```

## Setup

Run in order, once, from the repo root:

```bash
docker compose up -d postgres
yarn workspace @lafontaine/database db:migrate
yarn workspace @lafontaine/database db:seed
```

Database GUI (long-running — run on its own):

```bash
yarn workspace @lafontaine/database db:studio
```

## Commands

Run from the repo root (or drop the `yarn workspace @lafontaine/database` prefix if you're already inside `database/`).

Build TypeScript:

```bash
yarn workspace @lafontaine/database build
```

Generate a migration:

```bash
yarn workspace @lafontaine/database db:generate
```

Apply migrations:

```bash
yarn workspace @lafontaine/database db:migrate
```

Seed database:

```bash
yarn workspace @lafontaine/database db:seed
```

Open Drizzle Studio (long-running — run on its own):

```bash
yarn workspace @lafontaine/database db:studio
```

## Environment Variables

Required in root `.env` — see [getting-started.md](getting-started.md):

- `DATABASE_URL` — PostgreSQL connection string
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`

## Usage

```typescript
import { db, sectionCommand } from '@lafontaine/database'
import type { SectionSelect } from '@lafontaine/database'

const sections: SectionSelect[] = await sectionCommand.selectAll(db)
```

## Project Structure

```
src/
├── schema/     # Table definitions
├── commands/   # CRUD operations
└── db.ts       # Database connection

seeds/
├── data/       # Seed data
└── seeders/    # Seeding logic
```