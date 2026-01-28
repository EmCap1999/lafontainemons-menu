# La Fontaine Mons - Restaurant Menu

Dynamic menu website for La Fontaine Mons restaurant.

**Live**: [carte.lafontainemons.be](https://carte.lafontainemons.be)

## Tech Stack

- **Frontend**: Angular 21, TypeScript, SCSS, SSR
- **Backend**: Node.js, Express 5, TypeScript
- **Database**: PostgreSQL 18, Drizzle ORM
- **Infrastructure**: Docker, Nginx, Let's Encrypt

## Project Structure

```
├── frontend/          # Angular application
├── backend/           # Express API
├── database/          # Drizzle ORM layer
└── docker-compose.yml # Development containers
```

## Quick Start

```bash
# Install dependencies
npm install

# Start PostgreSQL and backend
docker compose up -d

# Run migrations and seed
npm run db:migrate --workspace=@lafontaine/database
npm run db:seed --workspace=@lafontaine/database

# Start frontend
npm run start --workspace=frontend
```

**Endpoints**:
- Frontend: http://localhost:4200
- Backend: http://localhost:8080
- Database: localhost:5432

## Commands

```bash
npm run lint              # Lint project
npm run lint:fix          # Auto-fix lint issues
npm run build --workspace=frontend
npm run build --workspace=backend
npm run db:studio         # Database GUI
```

## Documentation

- [Backend](backend/README.md)
- [Frontend](frontend/README.md)
- [Database](database/README.md)
- [Docker Deployment](DOCKER.README.md)
- [Nginx Deployment](NGINX.README.md)

## Author

Manu Caputo - caputoemmanuel1999@gmail.com