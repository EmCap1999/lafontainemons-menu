# 🐳 Docker Backend Deployment

Docker Compose setup for backend services (API + Database layer).

## 📋 Prerequisites

- **Docker** 20.10+ and **Docker Compose** v2+
- **Environment file** configured (see main README)

---

## 🏗️ Container Architecture

```
PostgreSQL Database ← Database Migration ← JavaScript Seeder
         ↑
Backend API (Node.js)
```

**4 containers:**
- `postgres` - PostgreSQL database (port 5432)
- `drizzle-migration` - Database schema setup from `/db`
- `seeder` - JavaScript seeding with 95 menu items from `/db`
- `backend` - Node.js API server

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
docker compose -f docker-compose.dev.yml up drizzle-migration

# Re-run seeding only (95 items)
docker compose -f docker-compose.dev.yml up seeder

# Complete database reset
docker compose -f docker-compose.dev.yml up drizzle-migration seeder
```

---

## 🗄️ Database Layer Integration

The containers now work with the refactored `/db` structure:

- **Migration**: Uses `/db/drizzle.config.js` and `/db/schema/`
- **Seeding**: Executes `/db/seeds/seed.js` with JavaScript data
- **Backend**: Imports CRUD commands from `/db/commands/`

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

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | Check logs: `docker logs lafontaine-backend-dev` |
| **Database connection error** | Verify `DATABASE_URL` in .env |
| **Port already in use** | Stop conflicting services or change ports |
| **Migration fails** | Check `/db` structure and permissions |
| **Seeder fails** | Verify JavaScript data files in `/db/seeds/data/` |
| **Wrong item count** | Should show 95 items after seeding |
| **Out of disk space** | Clean Docker: `docker system prune -f` |

### Debug Commands
```bash
# Check container status
docker ps

# Test API endpoints
curl http://localhost:port/sections
curl http://localhost:port/items

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
- Frontend calls `http://localhost:8080` directly
- Backend exposes port 8080 to host
- Database layer in `/db` provides CRUD operations

**Production:**
- Frontend calls via Nginx proxy `/api/*`
- All services containerized with Docker
- See [NGINX.README.md](./NGINX.README.md) for complete setup

---

## 📚 Related Documentation

- 🌐 [Frontend Deployment](./NGINX.README.md) - Nginx & SSL setup
- 📦 [Backend API](./backend/README.md) - API server development
- 🗄️ [Database Layer](./db/README.md) - Schemas, commands & seeding
- 📋 [Project Overview](./README.md) - Complete documentation