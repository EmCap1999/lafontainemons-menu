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
npm run db:migrate --workspace=@lafontaine/database

# Seed data
npm run db:seed --workspace=@lafontaine/database

# Database GUI
npm run db:studio
```

## Commands

```bash
npm run build        # Build TypeScript
npm run db:generate  # Generate migration
npm run db:migrate   # Apply migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Drizzle Studio
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