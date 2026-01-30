# Docker Deployment

Docker Compose setup for backend services.

## Architecture

```
PostgreSQL (port 5432)
       ↑
Backend API (port 8080)
```

## Quick Start

```bash
# Start services
docker compose up -d

# Run migrations (manual)
yarn workspace @lafontaine/database db:migrate

# Seed database (optional)
yarn workspace @lafontaine/database db:seed

# Check status
docker ps
```

## Commands

### Service Control

```bash
docker compose up -d              # Start all
docker compose down               # Stop all
docker compose restart backend    # Restart backend
docker logs -f lafontaine-backend-dev
docker logs -f lafontaine-postgres-dev
```

### Database Operations

```bash
# Connect to database
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB

# View tables
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\dt"

# Backup
docker exec lafontaine-postgres-dev pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup.sql

# Restore
docker exec -i lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB < backup.sql
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | `docker logs lafontaine-backend-dev` |
| Database connection error | Verify `DATABASE_URL` in .env |
| Port already in use | Change ports or stop conflicting services |
| Out of disk space | `docker system prune -f` |

### Debug

```bash
docker ps
curl http://localhost:8080/api/sections
docker exec lafontaine-postgres-dev pg_isready -U $POSTGRES_USER
docker stats lafontaine-backend-dev lafontaine-postgres-dev
```

## Related

- [Nginx Deployment](NGINX.README.md)
- [Backend](backend/README.md)
- [Database](database/README.md)
