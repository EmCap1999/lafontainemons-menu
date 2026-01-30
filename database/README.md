# Database Layer - Drizzle ORM

TypeScript database layer with Drizzle ORM and PostgreSQL.

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

```bash
# Start PostgreSQL
docker compose up -d postgres

# Run migrations
yarn workspace @lafontaine/database db:migrate

# Seed data
yarn workspace @lafontaine/database db:seed

# Database GUI
yarn db:studio
```

## Commands

```bash
yarn build        # Build TypeScript
yarn db:generate  # Generate migration
yarn db:migrate   # Apply migrations
yarn db:seed      # Seed database
yarn db:studio    # Open Drizzle Studio
```

## Environment Variables

Required in root `.env`:
- `DATABASE_URL` - PostgreSQL connection string
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