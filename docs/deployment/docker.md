# Docker Deployment

Docker Compose setup for backend services (Postgres + API).

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

Independent commands — run one at a time.

Start all:

```bash
docker compose up -d
```

Stop all:

```bash
docker compose down
```

Restart backend:

```bash
docker compose restart backend
```

Follow backend logs (long-running — run on its own):

```bash
docker logs -f lafontaine-backend-dev
```

Follow postgres logs (long-running — run on its own):

```bash
docker logs -f lafontaine-postgres-dev
```

### Database Operations

Connect to database (interactive):

```bash
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB
```

View tables:

```bash
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\dt"
```

Backup:

```bash
docker exec lafontaine-postgres-dev pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup.sql
```

Restore:

```bash
docker exec -i lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB < backup.sql
```

## Troubleshooting

| Issue                     | Solution                                  |
|---------------------------|-------------------------------------------|
| Backend won't start       | `docker logs lafontaine-backend-dev`      |
| Database connection error | Verify `DATABASE_URL` in `.env`           |
| Port already in use       | Change ports or stop conflicting services |
| Out of disk space         | `docker system prune -f`                  |

### Debug

```bash
docker ps
curl http://localhost:8080/api/sections
docker exec lafontaine-postgres-dev pg_isready -U $POSTGRES_USER
```

Live resource usage (long-running — run on its own):

```bash
docker stats lafontaine-backend-dev lafontaine-postgres-dev
```

## Related

- [Nginx deployment](nginx.md)
- [Backend](../backend.md)
- [Database](../database.md)