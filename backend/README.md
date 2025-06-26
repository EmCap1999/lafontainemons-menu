# 🧠 Backend - Node.js API

This folder contains the **RESTful API server** for the La Fontaine Mons restaurant application.

## 📦 Tech Stack

- ⚙️ **Node.js 22** – JavaScript runtime environment
- 🚀 **Express.js 5** – Web framework for API routes
- 🗄️ **Database Layer** – Modular DB operations from `../db/`
- 🔐 **dotenv** – Environment variable management
- 🌐 **CORS** – Cross-Origin Resource Sharing
- 📝 **Zod** – Runtime type validation (via DB layer)
- 🐳 **Docker** – Containerized deployment

---

## 🏗️ Architecture

The backend now uses a **layered architecture** with clear separation of concerns:

```
Backend Service Layer
        ↓
Database Commands Layer (../db/commands/)
        ↓
Database Schema Layer (../db/schema/)
        ↓
PostgreSQL Database
```

**Clean Architecture Benefits:**
- 🎯 **Separation of Concerns** - Business logic vs. data access
- 🔄 **Reusability** - DB commands shared across services
- 🧪 **Testability** - Easy to mock database layer
- 🛠️ **Maintainability** - Changes in one layer don't affect others

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
- `NODE_ENV` - Environment mode (development/production)
- `BACKEND_PORT` - Server port (default: 8080)
- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - CORS origin URL

### Database Setup

Ensure the database layer is configured (see [Database README](../db/README.md)):

```bash
# Setup database layer
cd ../db
npm install
npm run db:push
npm run db:seed
```

### Start the Server

```bash
cd backend
npm start
```

Server runs on `http://localhost:8080` (or your configured `BACKEND_PORT`)

---

## 📡 API Endpoints

### Menu API
- `GET /sections` - Retrieve all menu sections
- `GET /sections/:id` - Get specific section by ID
- `GET /sections/:id/items` - Get items for a specific section
- `GET /subsections` - Get all subsections
- `GET /sections/:sectionId/subsections` - Get subsections for a section
- `GET /items` - Get all items
- `GET /subsections/:subsectionId/items` - Get items for a subsection

### Response Format
All endpoints return JSON with consistent structure:
```json
{
  "status": "success",
  "results": 7,
  "data": { 
    "sections": [...]
  }
}
```

---

## 🔧 Development Commands

```bash
# Start development server
npm start

# The backend no longer includes db:studio
# Use the database layer instead:
cd ../db && npm run db:studio
```

---

## 🐳 Docker Usage

The backend runs in a containerized environment:

```bash
# Start backend with Docker
docker compose -f docker-compose.dev.yml up -d backend

# View logs
docker logs -f lafontaine-backend-dev

# Restart backend
docker compose -f docker-compose.dev.yml restart backend
```

---

## 📁 Project Structure

```
backend/
├── config/          # Environment and CORS configuration
├── controllers/     # API request handlers
├── errors/          # Error handling utilities
├── routes/          # API endpoint definitions
├── services/        # Business logic layer
└── server.js        # Main application entry point
```

**Note:** Database-related files have been moved to `../db/`:
- ~~`drizzle/`~~ → `../db/schema/` and `../db/config/`
- ~~`schemas/zod.schemas.js`~~ → `../db/validation/`

---

## 🔄 Service Layer Pattern

The backend services now consume the database layer:

```javascript
// backend/services/menu.service.js
import * as dbCommand from '../../db/commands/index.js'
import * as schema from '../../db/validation/index.js'

export const getAllSections = async () => {
  const sections = await dbCommand.getAllSections()
  return sections.map(section => schema.SectionSchema.parse(section))
}
```

**Benefits:**
- ✅ **Clean separation** of business logic and data access
- ✅ **Validation** handled by database layer
- ✅ **Error handling** centralized in commands
- ✅ **Type safety** with Zod schemas

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change `BACKEND_PORT` in .env |
| Database connection error | Check `DATABASE_URL` and run `cd ../db && npm run test:connection` |
| Import errors from db layer | Ensure `cd ../db && npm install` is run |
| CORS errors | Check `FRONTEND_URL` matches client origin |
| Module not found | Run `npm install` |

### Debug Commands

```bash
# Test API health
curl http://localhost:8080/sections

# Check container status
docker ps | grep backend

# Test database layer integration
node -e "
import('./services/menu.service.js')
  .then(service => service.getAllSections())
  .then(sections => console.log('Sections:', sections.length))
  .catch(console.error)
"

# View environment variables
docker exec lafontaine-backend-dev env | grep -E "(BACKEND|DATABASE|FRONTEND)"
```

---

## 🔗 Related Documentation

- 🗄️ **[Database Layer](../db/README.md)** - Database schemas, commands, and seeding
- 🐳 **[Docker Deployment](../DOCKER.README.md)** - Container setup guide
- 🌐 **[Nginx Configuration](../NGINX.README.md)** - Production deployment
- 📋 **[Project Overview](../README.md)** - Complete setup guide