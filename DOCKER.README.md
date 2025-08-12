# 🐳 Docker Backend Deployment

Docker Compose setup for backend services (API + Database layer).

## 📋 Prerequisites

- **Docker** 20.10+ and **Docker Compose** v2+
- **Environment file** configured (see main README)

---

## 🏗️ Container Architecture

```
PostgreSQL Database
         ↑
Backend API (TypeScript/Node.js)
```

**2 containers:**
- `postgres` - PostgreSQL database (port 5432)
- `backend` - TypeScript/Node.js API server (uses `tsx` for direct TypeScript execution)

**Note:** Migration and seeding are now done manually on the VPS for better control.

---

## 🚀 Quick Start

```bash
# Start all services
docker compose up -d

# Then connect to VPS for manual migration/seeding
ssh your-vps
npm run db:migrate --workspace=database
npx tsx database/seeds/seed.ts  # Optional

# Check status
docker ps

# View logs
docker compose logs -f
```

---

## 🔧 Management Commands

### Service Control
```bash
# Start/stop all services
docker compose up -d
docker compose down

# Restart specific service
docker compose restart backend

# View logs
docker logs -f lafontaine-backend-dev
docker logs -f lafontaine-postgres-dev
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

### Manual Database Setup
```bash
# Connect to VPS
ssh your-vps

# Run migrations
npm run db:migrate --workspace=database

# Run seeding (95 items)
npx tsx database/seeds/seed.ts
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
- **Backend**: Uses `tsx` for direct TypeScript execution, eliminating build step requirements
- **Healthcheck**: Tests `/api/sections` endpoint
- **Manual Operations**: Migrations and seeding are now done manually for better control

### Fixed Issues
- ✅ Backend runs with direct TypeScript execution
- ✅ Backend healthcheck tests correct API endpoint
- ✅ Eliminated TypeScript compilation errors in Docker containers
- ✅ Simplified architecture by removing automated migration/seeding containers

### Migration Strategy
Migrations and seeding are now performed manually on the VPS:

- **Database schemas** are defined in the database workspace
- **Migrations** are run manually via SSH for better control
- **Seeding** is executed manually when needed
- **Backend** uses TypeScript files directly via `tsx` without compilation

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | Check logs: `docker logs lafontaine-backend-dev` |
| **Database connection error** | Verify `DATABASE_URL` in .env |
| **Port already in use** | Stop conflicting services or change ports |
| **Migration fails** | SSH to VPS and run `npm run db:migrate --workspace=database` |
| **Seeding fails** | SSH to VPS and run `npx tsx database/seeds/seed.ts` |
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

# Check seeding results via database
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "SELECT COUNT(*) FROM item;"
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