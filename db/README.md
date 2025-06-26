# 🗄️ Database - PostgreSQL

This directory contains the **complete database configuration, schema, migrations, and seed data** for the La Fontaine Mons restaurant application.

## 📦 Tech Stack

- 🐘 **PostgreSQL 17** – Relational database
- 🧩 **Drizzle ORM** – Type-safe schema and migrations
- 🌱 **SQL Seeds** – Initial menu data
- 🐳 **Docker** – Containerized deployment

---

## 📁 Structure

```
db/
├── config/              # Database configuration
│   ├── connection.js    # Drizzle DB connection
│   └── drizzle.config.js # Drizzle configuration
├── schema/              # Database schema
│   └── schema.js        # Drizzle ORM schema definitions
├── migrations/          # Database migrations (auto-generated)
├── seeds/               # Initial data
│   └── insert_data.sql  # Menu seed data
└── examples/            # SQL examples and utilities
    ├── additional_checks.sql
    ├── create_data.sql
    ├── delete_data.sql
    ├── read_data.sql
    └── update_data.sql
```

---

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

### Local PostgreSQL

```bash
# Install PostgreSQL
brew install postgresql@17  # macOS
sudo apt install postgresql # Ubuntu

# Create database
psql -d postgres -c "CREATE USER lafontaine_user WITH PASSWORD 'password';"
psql -d postgres -c "CREATE DATABASE la_fontaine_mons OWNER lafontaine_user;"

# Run migrations from project root
npx drizzle-kit push --config=./db/config/drizzle.config.js

# Load seed data
psql -U lafontaine_user -d la_fontaine_mons -f db/seeds/insert_data.sql
```

---

## 🔧 Management

### Database Operations

```bash
# From project root:

# Apply schema changes
npx drizzle-kit push --config=./db/config/drizzle.config.js

# Generate migrations
npx drizzle-kit generate --config=./db/config/drizzle.config.js

# Open Drizzle Studio
npx drizzle-kit studio --config=./db/config/drizzle.config.js
# Access at http://localhost:4983
```

### From Backend

```bash
# From backend directory:
npm run db:push     # Apply schema changes
npm run db:generate # Generate migrations
npm run db:studio   # Open Drizzle Studio
```

### Backup & Restore

```bash
# Backup
pg_dump -U lafontaine_user -d la_fontaine_mons > backup.sql

# Restore  
psql -U lafontaine_user -d la_fontaine_mons < backup.sql
```

---

## 🧩 Drizzle ORM Usage

### Connection

```javascript
import { db } from './db/config/connection.js'
```

### Schema Imports

```javascript
import { section, subsection, item } from './db/schema/schema.js'
```

### Example Queries

```javascript
// Get all sections
const sections = await db.select().from(section)

// Get items by section
const items = await db
  .select()
  .from(item)
  .where(eq(item.sectionId, sectionId))
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check PostgreSQL is running |
| Authentication failed | Verify credentials in `.env` |
| Table doesn't exist | Run: `npx drizzle-kit push --config=./db/config/drizzle.config.js` |
| Permission denied | Grant user permissions to database |
| Schema changes not applied | Run `npm run db:push` from backend |

### Debug Commands

```bash
# Test connection
psql -U lafontaine_user -d la_fontaine_mons -c "SELECT version();"

# View tables
psql -U lafontaine_user -d la_fontaine_mons -c "\dt"

# Check schema
npx drizzle-kit studio --config=./db/config/drizzle.config.js
```

---

## 🔗 Related Documentation

- 📦 **[Backend API](../backend/README.md)** - API using this database
- 🐳 **[Docker Deployment](../DOCKER.README.md)** - Container setup
- 📋 **[Project Overview](../README.md)** - Complete setup guide

---

## 📝 Migration Guide

### From Old Structure

If migrating from the old structure where DB files were in `backend/drizzle/`:

1. **Backup your database** first
2. **Update imports** in backend services
3. **Run migrations** with new config path
4. **Test thoroughly** before deployment

### Important Notes

- All database operations now use the centralized `/db` configuration
- Schema is defined in `/db/schema/schema.js`
- Migrations are stored in `/db/migrations/`
- Seed data remains in `/db/seeds/`