# 🗄️ Database Layer - PostgreSQL

This directory contains the **complete database layer** for the La Fontaine Mons restaurant application, including schemas, commands, validation, and seeding.

## 📦 Tech Stack

- 🐘 **PostgreSQL 17** – Relational database
- 🧩 **Drizzle ORM** – Type-safe schema and migrations
- 📝 **Zod** – Runtime data validation
- 🌱 **JavaScript Seeders** – Modular data seeding
- 🐳 **Docker** – Containerized deployment

---

## 🏗️ Architecture

```
db/
├── config/          # Database configuration and connection
├── schema/          # Drizzle table definitions (modular)
├── validation/      # Zod schemas for data validation
├── commands/        # Database CRUD operations
├── seeds/           # JavaScript seeding system
├── migrations/      # Drizzle Kit generated migrations
└── package.json     # DB layer dependencies and scripts
```

## 📊 Database Schema

```
Section (Softs, Desserts, etc.)
    ↓ 1:many
Subsection (On tap, Bottles, etc.)
    ↓ 1:many  
Item (Individual menu items with prices)
```

**Main Tables:**
- `section` - Menu categories (7 sections)
- `subsection` - Subcategories within sections
- `item` - Individual menu items with prices

---

## 🚀 Setup

### Docker (Recommended)

```bash
# Start database and setup
docker compose -f docker-compose.dev.yml up -d postgres
docker compose -f docker-compose.dev.yml up drizzle-migration
docker compose -f docker-compose.dev.yml up seeder

# Verify setup
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\dt"
```

### Local Development

```bash
# Install dependencies
cd db
npm install

# Test database connection
node -e "import('./config/database.config.js').then(m => m.testConnection())"

# Push schema to database
npm run db:push

# Seed database with initial data
npm run db:seed
```

---

## 🔧 Available Commands

### Database Management
```bash
cd db

# Open Drizzle Studio GUI
npm run db:studio

# Generate migrations
npm run db:generate

# Push schema changes (development)
npm run db:push

# Run migrations (production)
npm run db:migrate

# Seed database
npm run db:seed

# Fresh seeding (push + seed)
npm run db:seed:fresh
```

### Connection Testing
```bash
# Test database connection
node -e "
import { testConnection } from './config/database.config.js';
testConnection().then(console.log);
"
```

---

## 🏗️ Layer Architecture

### 📄 Schemas (`schema/`)
Modular Drizzle table definitions:
- `section.schema.js` - Section table structure
- `subsection.schema.js` - Subsection with foreign keys
- `item.schema.js` - Complete item structure
- `index.js` - Exports and table relations

### ✅ Validation (`validation/`)
Zod schemas for runtime validation:
- Type-safe data validation
- Create/Update schema variants
- Input sanitization and parsing

### 🛠️ Commands (`commands/`)
Database operation functions:
- CRUD operations for each table
- Query builders with error handling
- Reusable database functions

### 🌱 Seeds (`seeds/`)
JavaScript-based seeding system:
- Modular data files by table
- Validation before insertion
- Logging and error handling
- Selective seeding capabilities

---

## 🌱 Seeding System

### Data Structure
```
seeds/
├── data/            # Raw data by table
│   ├── sections.data.js
│   ├── subsections.data.js
│   └── items.data.js
├── seeders/         # Seeding logic
│   ├── SectionSeeder.js
│   ├── SubsectionSeeder.js
│   └── ItemSeeder.js
└── utils/           # Helper functions
```

### Seeding Process
```bash
# Complete database reset and seed
npm run db:seed:fresh

# Seed only (keep existing data structure)
npm run db:seed

# Individual seeders (for development)
node -e "import('./seeds/seeders/SectionSeeder.js').then(m => m.runSectionSeeding())"
```

---

## 🔧 Integration with Backend

The database layer is consumed by the backend service layer:

```javascript
// Backend service example
import { getAllSections, createSection } from '../../db/commands/index.js'
import { SectionSchema } from '../../db/validation/index.js'

export const getSections = async () => {
  const sections = await getAllSections()
  return sections.map(section => SectionSchema.parse(section))
}
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check PostgreSQL is running |
| Authentication failed | Verify credentials in root `.env` |
| Schema out of sync | Run `npm run db:push` |
| Seeding fails | Check data validation and foreign keys |
| Module not found | Run `npm install` in db directory |

### Debug Commands

```bash
# Test connection
npm run test:connection

# Check database tables
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\dt"

# View seeded data counts
node -e "
import { db } from './config/database.config.js';
Promise.all([
  db.execute('SELECT COUNT(*) FROM section'),
  db.execute('SELECT COUNT(*) FROM subsection'),
  db.execute('SELECT COUNT(*) FROM item')
]).then(([s,sub,i]) => console.log('Sections:', s.rows[0].count, 'Subsections:', sub.rows[0].count, 'Items:', i.rows[0].count))
"
```

---

## 🔗 Related Documentation

- 📦 **[Backend API](../backend/README.md)** - API using this database layer
- 🐳 **[Docker Deployment](../DOCKER.README.md)** - Container setup
- 📋 **[Project Overview](../README.md)** - Complete setup guide