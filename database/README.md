# 🗄️ Database Layer - TypeScript & Drizzle ORM

This directory contains the **complete database layer** for the La Fontaine Mons restaurant application, built with TypeScript and modern tooling.

## 📦 Tech Stack

- 🐘 **PostgreSQL 17** – Relational database with auto-generated IDs
- 🧩 **Drizzle ORM** – Type-safe schema definitions with full type inference
- 🛡️ **Drizzle-Zod** – Runtime validation from schema
- 🌱 **TypeScript Seeding** – Organized modular data insertion
- 🐳 **Docker** – Containerized deployment

---

## 📊 Database Schema

```
Section (Softs, Desserts, HotDrinks, Les Vins, Bières, Apéritifs, Alcools)
    ↓ 1:many
Subsection (Vin rosé blanc & rouge, Sélection du Patron, Au fût)
    ↓ 1:many  
Item (95 individual menu items with prices, capacity, origin)
```

**Tables:**
- `section` - 7 menu categories with auto-generated serial IDs
- `subsection` - 3 subcategories within sections
- `item` - 95 menu items with prices and details

---

## 🏗️ Architecture

### Schema Organization
```
src/schema/
├── section.ts      # Section table definition with types
├── subsection.ts   # Subsection table definition with types
├── item.ts         # Item table definition with types
├── relations.ts    # Table relationships
└── index.ts        # Combined schema exports
```

### CRUD Commands
```
src/commands/
├── section.ts      # Section CRUD operations
├── subsection.ts   # Subsection CRUD operations
├── item.ts         # Item CRUD operations
└── index.ts        # Command exports
```

### Seeding System
```
seeds/
├── seed.ts              # Main seeding orchestrator
├── data/               # Pure data files
│   ├── sections.ts     # Section data
│   ├── subsections.ts  # Subsection data
│   ├── items.ts        # Item data
│   └── index.ts        # Data exports
└── seeders/            # Seeding logic
    ├── sections.ts     # Section seeding functions
    ├── subsections.ts  # Subsection seeding functions
    ├── items.ts        # Item seeding functions
    └── index.ts        # Seeder exports
```

---

## 🚀 Setup

### Installation

```bash
cd database
npm install
```

### Database Operations

```bash
# Build TypeScript
npm run build

# Apply database schema
npm run db:migrate

# Seed database with menu data
npm run db:seed

# Open database GUI
npm run db:studio

# Generate new migration
npm run db:generate

# Reset database (migrate + seed)
npm run db:reset
```

### Environment Configuration

Database automatically loads environment variables from the root `.env` file:
- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_USER` - Database user
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DB` - Database name

---

## 🐳 Docker Usage

Database layer runs in containerized environment:

```bash
# Start PostgreSQL
docker compose -f docker-compose.yml up -d postgres

# Run migrations
docker compose -f docker-compose.yml up drizzle-migration

# Run seeding
docker compose -f docker-compose.yml up seeder

# Complete setup
docker compose -f docker-compose.yml up -d
```

---

## 📡 Available Commands

### Section Commands
- `selectAll()` - Get all sections ordered by display order
- `selectById(id)` - Get section by ID
- `selectByName(name)` - Get section by name
- `selectWithSubsections()` - Get sections with their subsections
- `insert(data)` - Create new section
- `update(id, data)` - Update section
- `remove(id)` - Delete section
- `count()` - Count total sections

### Subsection Commands
- `selectAll()` - Get all subsections
- `selectBySection(sectionId)` - Get subsections for a section
- `selectById(id)` - Get subsection by ID
- `selectWithSection(id)` - Get subsection with its parent section
- `insert(data)` - Create new subsection
- `update(id, data)` - Update subsection
- `remove(id)` - Delete subsection

### Item Commands
- `selectAll()` - Get all items
- `selectBySection(sectionId)` - Get items for a section
- `selectBySubsection(subsectionId)` - Get items for a subsection
- `selectAvailable()` - Get only available items
- `selectById(id)` - Get item by ID
- `insert(data)` - Create new item
- `update(id, data)` - Update item
- `updateAvailability(id, isAvailable)` - Toggle item availability
- `remove(id)` - Delete item

---

## 🔧 Type Safety

### Using Drizzle Inferred Types

```typescript
import { sectionCommand } from '@lafontaine/database/src/commands'
import type { SectionInsert, SectionSelect } from '@lafontaine/database/src/schema'

// Type-safe insertion
const newSection: SectionInsert = {
  name: 'New Category',
  displayOrder: 8
}
const [section] = await sectionCommand.insert(db, newSection)

// Type-safe selection
const sections: SectionSelect[] = await sectionCommand.selectAll(db)
```

### Validation with Drizzle-Zod

```typescript
import { SectionInsertZod } from '@lafontaine/database/src/schema'

// Runtime validation
const validatedData = SectionInsertZod.parse(inputData)
```

---

## 📊 Data Overview

### Current Menu Data
- **7 Sections**: Softs, Desserts, HotDrinks, Les Vins, Bières, Apéritifs, Alcools
- **3 Subsections**: Wine categories and draft beers
- **95 Items**: Complete menu with prices, capacities, and origins

### Modular Seeding Process
1. **Clear Database**: Remove existing data (respecting foreign keys)
2. **Seed Sections**: Insert sections and return created records
3. **Seed Subsections**: Use section names to resolve foreign keys
4. **Seed Items**: Use section/subsection names to resolve relationships

---

## 🔧 Development

### Adding New Data

1. **Add to data files**: Update `seeds/data/*.ts`
2. **Build**: `npm run build`
3. **Run seeding**: `npm run db:seed`
4. **Verify**: Check with `npm run db:studio`

### Schema Changes

1. **Update schema**: Modify `src/schema/*.ts`
2. **Generate migration**: `npm run db:generate`
3. **Apply changes**: `npm run db:migrate`

### Using Commands

```typescript
import { sectionCommand } from '@lafontaine/database/src/commands'
import { db } from '@lafontaine/database/db'

// Get all sections
const sections = await sectionCommand.selectAll(db)

// Create new section with full type safety
const [newSection] = await sectionCommand.insert(db, {
  name: 'New Category',
  displayOrder: 8
})
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check PostgreSQL is running |
| Type errors | Run `npm run build` to check TypeScript |
| Migration fails | Check schema syntax and DB permissions |
| Seeding errors | Verify data integrity and foreign key references |

### Debug Commands

```bash
# Build and check types
npm run build

# Test database connection
npm run db:studio

# View container logs
docker logs lafontaine-postgres-dev
```

---

## 🔗 Related Documentation

- 📦 **[Backend API](../back/README.md)** - API using this database layer
- 🐳 **[Docker Deployment](../DOCKER.README.md)** - Container setup
- 📋 **[Project Overview](../README.md)** - Complete setup guide