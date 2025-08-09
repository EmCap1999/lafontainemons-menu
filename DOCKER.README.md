# 🐳 Docker Backend Deployment

Docker Compose setup for backend services (API + Database layer).

## 📋 Prerequisites

- **Docker** 20.10+ and **Docker Compose** v2+
- **Environment file** configured (see main README)

---

## 🏗️ Container Architecture

```
PostgreSQL Database ← Database Migration ← TypeScript Seeder
         ↑
Backend API (TypeScript/Node.js)
```

**4 containers:**
- `postgres` - PostgreSQL database (port 5432)
- `drizzle-migration` - Database schema setup from `/database`
- `seeder` - TypeScript seeding with 95 menu items (uses `tsx` for direct TypeScript execution)
- `backend` - TypeScript/Node.js API server (uses `tsx` for direct TypeScript execution)

---

## 🚀 Quick Start

```bash
# Start all back services
docker compose -f docker-compose.yml up -d

# Check status
docker ps

# View logs
docker compose -f docker-compose.yml logs -f
```

---

## 🔧 Management Commands

### Service Control
```bash
# Start/stop all services
docker compose -f docker-compose.yml up -d
docker compose -f docker-compose.yml down

# Restart specific service
docker compose -f docker-compose.yml restart backend

# View logs
docker logs -f lafontaine-backend-dev
docker logs -f lafontaine-postgres-dev
docker logs -f lafontaine-seeder
```

### Database Operations
```bash
# Connect to database
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB

# View tables and data
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\dt"
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "SELECT COUNT(*) FROM item;"

# Backup database
docker exec lafontaine-postgres-dev pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup.sql

# Restore database
docker exec -i lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB < backup.sql
```

### Re-run Database Setup
```bash
# Re-run migrations only
docker compose -f docker-compose.yml up drizzle-migration

# Re-run seeding only (95 items)
docker compose -f docker-compose.yml up seeder

# Complete database reset
docker compose -f docker-compose.yml up drizzle-migration seeder
```

---

## 🗄️ Database Layer Integration

The containers now work with the refactored `/database` TypeScript structure:

- **Migration**: Uses `/database/drizzle.config.ts` and `/database/src/schema/`
- **Seeding**: Executes `/database/seeds/seed.ts` with TypeScript data modules
- **Backend**: Imports CRUD commands from `/database/src/commands/`

### Database Verification
```bash
# Check seeded data
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "
SELECT s.name as section, COUNT(i.item_id) as items 
FROM section s 
LEFT JOIN item i ON s.section_id = i.section_id 
GROUP BY s.name 
ORDER BY s.display_order;"
```

---

## ✅ Recent Improvements

### TypeScript Execution
- **Seeder**: Now uses `tsx` directly instead of `npm run build` to avoid TypeScript compilation issues
- **Backend**: Uses `tsx` for direct TypeScript execution, eliminating build step requirements
- **Healthcheck**: Updated to test `/api/sections` instead of non-existent root route

### Fixed Issues
- ✅ Seeder Docker container now works properly with TypeScript files
- ✅ Backend healthcheck tests correct API endpoint
- ✅ Eliminated TypeScript compilation errors in Docker containers
- ✅ Consistent `tsx` usage across seeder and backend services

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | Check logs: `docker logs lafontaine-backend-dev` |
| **Database connection error** | Verify `DATABASE_URL` in .env |
| **Port already in use** | Stop conflicting services or change ports |
| **Migration fails** | Check `/database` structure and permissions |
| **Seeder fails** | Verify TypeScript data files in `/database/seeds/data/` |
| **Wrong item count** | Should show 95 items after seeding |
| **Out of disk space** | Clean Docker: `docker system prune -f` |

### Debug Commands
```bash
# Check container status
docker ps

# Test API endpoints (replace ${BACKEND_PORT} with actual port, e.g. 3001)
curl http://localhost:${BACKEND_PORT}/api/sections
curl http://localhost:${BACKEND_PORT}/api/items

# Test database connection
docker exec lafontaine-postgres-dev pg_isready -U $POSTGRES_USER

# View container resources
docker stats lafontaine-backend-dev lafontaine-postgres-dev

# Check seeding results
docker logs lafontaine-seeder | grep "Inserted"
```

---

## 🔗 Integration

**Development:**
- Frontend calls `http://localhost:${BACKEND_PORT}` directly (default 3001)
- Backend TypeScript executed directly with `tsx` (no compilation needed)
- Database layer in `/database` provides type-safe CRUD operations
- Workspace setup enables shared types between database/backend

**Production:**
- Frontend calls via Nginx proxy `/api/*`
- All services containerized with Docker
- See [NGINX.README.md](./NGINX.README.md) for complete setup

---

## 📚 Related Documentation

- 🌐 [Frontend Deployment](./NGINX.README.md) - Nginx & SSL setup
- 📦 [Backend API](backend/README.md) - TypeScript API server development
- 🗄️ [Database Layer](./database/README.md) - Schemas, commands & seeding
- 📋 [Project Overview](./README.md) - Complete documentation