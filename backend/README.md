# 🧠 Backend - TypeScript API

This folder contains the **RESTful API server** for the La Fontaine Mons restaurant application, built with TypeScript for type safety and modern development.

## 📦 Tech Stack

- ⚙️ **Node.js 24** – JavaScript runtime environment
- 🔷 **TypeScript 5.7** – Type-safe JavaScript development
- 🚀 **Express.js 4** – Web framework for API routes
- 🌐 **CORS** – Cross-Origin Resource Sharing
- 🔐 **dotenv** – Environment variable management
- 🗄️ **@lafontaine/database** – Shared database layer with Drizzle ORM
- 🐳 **Docker** – Containerized deployment

---

## 🚀 Getting Started

### Installation

```bash
cd backend
npm install
```

### Environment Configuration

The backend automatically loads environment variables from the root `.env` file.

**Required variables:**
- `NODE_ENV` - Environment mode (development/production/local)
- `BACKEND_PORT` - Server port (default: 8080)
- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - CORS origin URL

### Database Setup

Ensure the database layer is built and configured:

```bash
# Build database layer first
npm run build --workspace=database

# Run migrations
npm run db:migrate --workspace=database

# Seed with sample data
npm run db:seed --workspace=database
```

See [Database README](../database/README.md) for detailed setup.

### Development

```bash
# Development with hot reload
npm run dev

# Type checking
npm run typecheck

# Build for production
npm run build

# Start production server
npm start
```

Server runs on `http://localhost:8080` (or your configured `BACKEND_PORT`)

---

## 📡 API Endpoints

### Menu API
- `GET /api/sections` - Retrieve all menu sections with display order
- `GET /api/sections/:sectionId/items` - Get all items for a specific section

### Response Format
All endpoints return JSON with consistent structure:
```json
{
  "status": "success",
  "results": 7,
  "data": {
    "sections": [
      {
        "sectionId": 1,
        "name": "Vins Rouges",
        "displayOrder": 1
      }
    ]
  }
}
```

### Error Handling
Errors return standardized format:
```json
{
  "error": {
    "message": "Section ID 999 does not exist",
    "statusCode": 404
  }
}
```

---

## 🔧 Development Commands

```bash
# Development server with TypeScript watch
npm run dev

# Type checking only (no compilation)
npm run typecheck

# Build TypeScript to JavaScript
npm run build

# Production modes
npm run start:dev    # Development with compiled JS
npm run start:prod   # Production mode
npm start           # Default start (uses compiled dist/)
```

---

## 🐳 Docker Usage

The backend runs in a containerized environment with automatic TypeScript compilation:

```bash
# Start backend with Docker (includes build step)
docker compose up -d backend

# View logs
docker logs -f lafontaine-backend-dev

# Restart backend
docker compose restart backend

# Build and restart
docker compose up -d --build backend
```

Docker automatically:
1. Installs dependencies
2. Builds database workspace
3. Compiles TypeScript backend
4. Starts the server

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Environment and CORS configuration
│   │   ├── environment.config.ts
│   │   └── cors.config.ts
│   ├── controllers/     # API endpoint handlers
│   │   └── menu.controller.ts
│   ├── errors/          # Error handling utilities
│   │   └── app-error.ts
│   ├── routes/          # API route definitions
│   │   └── menu.routes.ts
│   ├── types/           # TypeScript type definitions
│   │   ├── api.ts       # API response types
│   │   ├── schemas.ts   # Public data schemas
│   │   └── index.ts     # Type exports
│   └── server.ts        # Main application entry point
├── dist/                # Compiled JavaScript output
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🔗 Database Integration

The backend integrates with the shared database workspace:

```typescript
// Import database connection and commands
import { 
  db, 
  itemCommand, 
  sectionCommand 
} from '@lafontaine/database'

// Import Zod schemas for validation
import { 
  SectionSelectZod, 
  ItemSelectZod 
} from '@lafontaine/database'
```

**Integration benefits:**
- **Type Safety**: Shared types between database and API
- **CRUD Operations**: Pre-built command functions
- **Validation**: Zod schemas for request/response validation
- **Workspace Isolation**: Database layer is independently buildable

---

## 🛠️ Type Safety Features

### Request/Response Types
```typescript
import type { Request, Response } from 'express'
import type { SectionsResponse, ItemsResponse } from '../types'

export const getAllSections = asyncHandler(
  async (_req: Request, res: Response<SectionsResponse>) => {
    // Type-safe response
  }
)
```

### Schema Validation
```typescript
import { PublicSectionSchema } from '../types'

// Parse and validate data
const publicSections = sections.map(section => 
  PublicSectionSchema.parse(section)  // Runtime type checking
)
```

### Error Handling
```typescript
import { AppError } from '../errors/app-error'

// Type-safe error throwing
throw new AppError('Invalid section ID', 400)
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **TypeScript errors** | Run `npm run typecheck` to see all type issues |
| **Import errors** | Ensure database workspace is built: `npm run build --workspace=database` |
| **Port already in use** | Change `BACKEND_PORT` in .env |
| **Database connection error** | Verify `DATABASE_URL` and ensure database is running |
| **CORS errors** | Check `FRONTEND_URL` matches client origin |
| **Module not found** | Run `npm install` in root and backend directories |
| **Build fails** | Check TypeScript errors with `npm run typecheck` |

### Debug Commands

```bash
# Test API endpoints
curl http://localhost:8080/api/sections
curl http://localhost:8080/api/sections/1/items

# Check TypeScript compilation
npm run typecheck

# Check container status
docker ps | grep backend

# View environment variables
docker exec lafontaine-backend-dev env | grep DATABASE

# Test database connection from backend
docker exec -it lafontaine-backend-dev npm run typecheck --workspace=database
```

### Development Tips

```bash
# Watch mode for development
npm run dev  # Auto-recompiles on file changes

# Check what got compiled
ls -la dist/  # Should see .js and .js.map files

# Debug specific import issues
node -e "console.log(require.resolve('@lafontaine/database'))"
```

---

## 🔗 Related Documentation

- 🗄️ **[Database Layer](../database/README.md)** - Database schemas, commands and seeding
- 🐳 **[Docker Deployment](../DOCKER.README.md)** - Container setup guide  
- 🌐 **[Nginx Configuration](../NGINX.README.md)** - Production deployment
- 📋 **[Project Overview](../README.md)** - Complete setup guide
- 🔧 **[TypeScript Config](./tsconfig.json)** - Compilation settings