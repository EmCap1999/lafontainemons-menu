# La Fontaine Mons - Restaurant Menu

Dynamic menu website for La Fontaine Mons restaurant.

**Live**: [carte.lafontainemons.be](https://carte.lafontainemons.be)

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express 5, TypeScript
- **Database**: PostgreSQL 18, Drizzle ORM
- **Infrastructure**: Docker, Nginx, Let's Encrypt

## Project Structure

```
├── frontend/          # React application
├── backend/           # Express API
├── database/          # Drizzle ORM layer
└── docker-compose.yml # Development containers
```

## Quick Start

```bash
yarn install
yarn dev
```

See [docs/getting-started.md](docs/getting-started.md) for environment setup and full details.

## Documentation

- [Architecture](docs/architecture.md) — monorepo structure, stack, data flow
- [Getting Started](docs/getting-started.md) — local setup
- [Backend](docs/backend.md) — API reference
- [Frontend](docs/frontend.md) — structure, scripts
- [Database](docs/database.md) — schema, migrations
- [Docker Deployment](docs/deployment/docker.md)
- [Nginx Deployment](docs/deployment/nginx.md)
- [Changelog](CHANGELOG.md)

## Author

Manu Caputo - caputoemmanuel1999@gmail.com