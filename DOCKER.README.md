# 🐳 Docker Backend Deployment

Docker Compose setup for backend services with the new **modular database architecture**.

## 📋 Prerequisites

- **Docker** 20.10+ and **Docker Compose** v2+
- **Environment file** configured (see main README)

---

## 🏗️ Container Architecture

```
PostgreSQL Database ← Drizzle Migration ← JavaScript Seeder
         ↑
Backend API (Node.js) → Database Layer (../db/)
```

**4 containers:**
- `postgres` - PostgreSQL database (port 5432)
- `drizzle-migration` - Database schema setup using `db/config/`
- `seeder` - JavaScript-based seeding using `db/seeds/`
- `backend` - Node.js API server (configurable port via `BACKEND_PORT`)

---

## 🚀 Quick Start

```bash
# Start all backend services
docker compose -f docker-compose.dev.yml up -d

# Check status
docker ps

# View logs
docker compose -f docker-compose.dev.yml logs -f
```

---

## 🔧 Management Commands

### Service Control
```bash
# Start/stop all services
docker compose -f docker-compose.dev.yml up -d
docker compose -f docker-compose.dev.yml down

# Restart specific service
docker compose -f docker-compose.dev.yml restart backend

# View logs
docker logs -f lafontaine-backend-dev
docker logs -f lafontaine-postgres-dev
```

### Database Operations
```bash
# Connect to database
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB

# View tables
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\dt"

# Backup database
docker exec lafontaine-postgres-dev pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup.sql

# Restore database
docker exec -i lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB < backup.sql
```

### Re-run Setup
```bash
# Re-run migrations (uses new db/config/)
docker compose -f docker-compose.dev.yml up drizzle-migration

# Re-run seeder (uses new JavaScript seeders)
docker compose -f docker-compose.dev.yml up seeder

# Fresh setup (migration + seeding)
docker compose -f docker-compose.dev.yml up drizzle-migration seeder
```

---

## 🔄 Updated Services

### Drizzle Migration Service
- **New Location**: Uses `db/config/drizzle.config.js` instead of `backend/drizzle/`
- **Command**: `cd db && npx drizzle-kit push --config=./config/drizzle.config.js`
- **Dependencies**: Installs npm packages in `db/` directory

### Seeder Service
- **New System**: JavaScript-based seeding instead of raw SQL
- **Command**: `cd db && npm run db:seed`
- **Features**:
    - Modular data files
    - Validation with Zod
    - Logging and error handling
    - Foreign key resolution

### Backend Service
- **Port Configuration**: Uses `${BACKEND_PORT}` environment variable
- **Database Integration**: Consumes modular database layer from `../db/`
- **Dependencies**: Auto-installs both backend and database dependencies

---

## 🌱 New Seeding System

The seeding process has been completely modernized:

### Before (SQL-based)
```bash
# Old approach
psql -U $USER -d $DB -f db/seeds/insert_data.sql
```

### After (JavaScript-based)
```bash
# New approach with validation and logging
cd db && npm run db:seed
```

**Benefits:**
- ✅ **Data validation** before insertion
- ✅ **Detailed logging** of the seeding process
- ✅ **Error handling** with rollback capabilities
- ✅ **Foreign key resolution** by name references
- ✅ **Modular data** easy to maintain and extend

---

## 🔧 Environment Variables

Updated environment requirements:

```bash
# Port configuration (replaces hardcoded 3001)
BACKEND_PORT=8080

# Database credentials
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=la_fontaine_mons
POSTGRES_PORT=5432

# Full database URL
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}"
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | Check logs: `docker logs lafontaine-backend-dev` |
| **Database connection error** | Verify `DATABASE_URL` in .env and test: `cd db && npm run test:connection` |
| **Seeding fails** | Check seeder logs: `docker logs lafontaine-seeder` |
| **Migration fails** | Verify schema files in `db/schema/` |
| **Port conflicts** | Update `BACKEND_PORT` in .env |
| **Import errors** | Ensure both `backend/` and `db/` dependencies are installed |

### Debug Commands
```bash
# Check container status
docker ps

# Test API with correct port
curl http://localhost:${BACKEND_PORT}/sections

# Test database connection
docker exec lafontaine-postgres-dev pg_isready -U $POSTGRES_USER

# View seeding results
docker exec lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "
SELECT 
  (SELECT COUNT(*) FROM section) as sections,
  (SELECT COUNT(*) FROM subsection) as subsections,
  (SELECT COUNT(*) FROM item) as items;
"

# View container resources
docker stats lafontaine-backend-dev lafontaine-postgres-dev
```

---

## 🔗 Integration

### Development
- Frontend calls `http://localhost:${BACKEND_PORT}` directly
- Backend exposes configured port to host
- Database layer provides modular commands and validation

### Production
- Frontend calls via Nginx proxy `/api/*`
- See [NGINX.README.md](./NGINX.README.md) for complete setup

---

## 📊 Service Dependencies

```mermaid
graph TD
    A[postgres] --> B[drizzle-migration]
    B --> C[seeder]
    A --> D[backend]
    
    E[db/config/] --> B
    F[db/seeds/] --> C
    G[db/commands/] --> D
```

**Startup Order:**
1. `postgres` - Database server
2. `drizzle-migration` - Schema setup
3. `seeder` - Data population
4. `backend` - API server (can start in parallel with seeder)

---

## 📚 Related Documentation

- 🌐 [Frontend Deployment](./NGINX.README.md) - Nginx & SSL setup
- 🗄️ [Database Layer](./db/README.md) - New modular database architecture
- 📦 [Backend Development](./backend/README.md) - API development with new architecture
- 📋 [Project Overview](./README.md) - Complete documentation