# 🐳 Docker Backend Deployment

Docker Compose setup for backend services (API + Database).

## 📋 Prerequisites

- **Docker** 20.10+ and **Docker Compose** v2+
- **Environment file** configured (see main README)

---

## 🏗️ Container Architecture

```
PostgreSQL Database ← Drizzle Migration ← Seeder (SQL data)
         ↑
Backend API (Node.js)
```

**4 containers:**
- `postgres` - PostgreSQL database (port 5432)
- `drizzle-migration` - Database schema setup
- `seeder` - Insert initial menu data
- `backend` - Node.js API server (port 3001)

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
# Re-run migrations
docker compose -f docker-compose.dev.yml up drizzle-migration

# Re-run seeder
docker compose -f docker-compose.dev.yml up seeder
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | Check logs: `docker logs lafontaine-backend-dev` |
| **Database connection error** | Verify `DATABASE_URL` in .env |
| **Port already in use** | Stop conflicting services or change ports |
| **Migration fails** | Check migration logs and DB permissions |
| **Out of disk space** | Clean Docker: `docker system prune -f` |

### Debug Commands
```bash
# Check container status
docker ps

# Test API
curl http://localhost:3001/sections

# Test database connection
docker exec lafontaine-postgres-dev pg_isready -U $POSTGRES_USER

# View container resources
docker stats lafontaine-backend-dev lafontaine-postgres-dev
```

---

## 🔗 Integration

**Development:**
- Frontend calls `http://localhost:3001` directly
- Backend exposes port 3001 to host

**Production:**
- Frontend calls via Nginx proxy `/api/*`
- See [NGINX.README.md](./NGINX.README.md) for complete setup

---

## 📚 Related Documentation

- 🌐 [Frontend Deployment](./NGINX.README.md) - Nginx & SSL setup
- 📦 [Backend Development](./backend/README.md) - API development
- 🗄️ [Database Schema](./db/README.md) - Database structure
- 📋 [Project Overview](./README.md) - Complete documentation