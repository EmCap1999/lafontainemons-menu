# Backend — Express API

RESTful API server built with TypeScript and Express 5.

## Tech Stack

- Node.js 26, TypeScript
- Express 5, CORS
- Drizzle ORM (via `@lafontaine/database`)

## Setup

Run from the repo root (or drop the `yarn workspace @lafontaine/backend` prefix if you're already inside `backend/`).
These are independent alternatives — run one at a time.

Development with hot reload:

```bash
yarn workspace @lafontaine/backend dev
```

Build for production:

```bash
yarn workspace @lafontaine/backend build
```

Start production server (after building):

```bash
yarn workspace @lafontaine/backend start
```

Server runs on `http://localhost:8080` (configurable via `BACKEND_PORT`).

## API Endpoints

| Method | Endpoint                  | Description         |
|--------|---------------------------|---------------------|
| GET    | `/api/sections`           | All menu sections   |
| GET    | `/api/sections/:id/items` | Items for a section |

### Response Format

```json
{
  "status": "success",
  "results": 7,
  "data": {
    "sections": [
      ...
    ]
  }
}
```

## Environment Variables

Required in root `.env` — see [getting-started.md](getting-started.md):

- `BACKEND_PORT` — Server port (default: 8080)
- `DATABASE_URL` — PostgreSQL connection string
- `FRONTEND_URL` — CORS origin

## Project Structure

```
src/
├── config/        # Environment, CORS config
├── controllers/   # Request handlers
├── errors/        # Error handling
├── routes/        # API routes
├── types/         # TypeScript types
└── server.ts      # Entry point
```

## Docker

```bash
docker compose up -d backend
```

Follow logs (long-running — run on its own):

```bash
docker logs -f lafontaine-backend-dev
```

See [deployment/docker.md](deployment/docker.md) for the full Docker setup.