# 🐳 Docker Deployment
This project is fully containerized using Docker, making it easy to deploy in any environment.

## Prerequisites
- Docker and Docker Compose installed on your server
- Git to clone the repository

## Deployment Steps

### Clone the repository:
```bash
git clone https://github.com/your-username/lafontainemons-menu.git
cd lafontainemons-menu
```

### Managing the Deployment
Update the application before deploying:
```bash
git checkout dev
git pull
```

### Create environment file:
Check if .env file is set up in root directory [project Setup](./README.md)

### Deploy with Docker Compose (dev - prod comming soon...):
```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up -d
```

### Check database connection
```bash
docker exec -it lafontaine-postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\dt"
```

### Container Structure
The docker-compose.dev.yml file defines the following services:
```
- postgres: PostgreSQL database server
- drizzle-migration: Runs Drizzle ORM migrations to set up the database schema
- seeder: Inserts initial data into the database
- backend: Node.js Express API server
```

### View logs:
```bash
docker logs -f lafontaine-backend-dev
docker logs -f lafontaine-postgres-dev
```

Troubleshooting

Container won't start: Check logs with docker logs [container-name]
Database connection issues: Verify environment variables and network configuration
Migration errors: Check the Drizzle configuration and database schema

For more detailed information about each component, refer to the specific README files linked above.