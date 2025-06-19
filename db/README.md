# 🗄️ Database - PostgreSQL

This directory contains the **database schema, migrations, and seed data** for the La Fontaine Mons restaurant application.

## 📦 Tech Stack

- 🐘 **PostgreSQL 17** – Relational database
- 🧩 **Drizzle ORM** – Type-safe schema and migrations
- 🌱 **SQL Seeds** – Initial menu data
- 🐳 **Docker** – Containerized deployment

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

# Run migrations
cd backend/drizzle && npx drizzle-kit push

# Load seed data
psql -U lafontaine_user -d la_fontaine_mons -f db/seeds/insert_data.sql
```

---

## 🔧 Management

### Database GUI
```bash
# Open Drizzle Studio
cd backend/drizzle && npm run db:studio
# Access at http://localhost:4983
```

### Backup & Restore
```bash
# Backup
pg_dump -U lafontaine_user -d la_fontaine_mons > backup.sql

# Restore  
psql -U lafontaine_user -d la_fontaine_mons < backup.sql
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check PostgreSQL is running |
| Authentication failed | Verify credentials in `.env` |
| Table doesn't exist | Run migrations: `npx drizzle-kit push` |
| Permission denied | Grant user permissions to database |

```bash
# Test connection
psql -U lafontaine_user -d la_fontaine_mons -c "SELECT version();"

# View tables
psql -U lafontaine_user -d la_fontaine_mons -c "\dt"
```

---

## 🔗 Related Documentation

- 📦 **[Backend API](../backend/README.md)** - API using this database
- 🐳 **[Docker Deployment](../DOCKER.README.md)** - Container setup
- 📋 **[Project Overview](../README.md)** - Complete setup guide