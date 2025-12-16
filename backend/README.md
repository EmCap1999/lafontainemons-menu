# Backend - Express API

RESTful API server built with TypeScript and Express 5.

## Tech Stack

- Node.js 24, TypeScript 5.7
- Express 5, CORS
- Drizzle ORM (via @lafontaine/database)

## Setup

```bash
npm install
npm run dev    # Development with hot reload
npm run build  # Build for production
npm start      # Start production server
```

Server runs on `http://localhost:8080`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sections` | All menu sections |
| GET | `/api/sections/:id/items` | Items for a section |

### Response Format

```json
{
  "status": "success",
  "results": 7,
  "data": { "sections": [...] }
}
```

## Environment Variables

Required in root `.env`:
- `BACKEND_PORT` - Server port (default: 8080)
- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - CORS origin

## Docker

```bash
docker compose up -d backend
docker logs -f lafontaine-backend-dev
```

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
