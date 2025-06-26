# 🧠 Backend - Node.js API

This folder contains the **RESTful API server** for the La Fontaine Mons restaurant application.

## 📦 Tech Stack

- ⚙️ **Node.js 22** – JavaScript runtime environment
- 🚀 **Express.js 5** – Web framework for API routes
- 🌐 **CORS** – Cross-Origin Resource Sharing
- 🔐 **dotenv** – Environment variable management
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
- `NODE_ENV` - Environment mode (development/production)
- `BACKEND_PORT` - Server port (default: 3001)
- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - CORS origin URL

### Database Setup

Ensure the database layer is properly configured (see [Database README](../db/README.md)).

### Start the Server

```bash
npm start
```

Server runs on `http://localhost:3001`

---

## 📡 API Endpoints

### Menu API
- `GET /sections` - Retrieve all menu sections
- `GET /sections/:id` - Get a specific section by ID
- `GET /sections/:sectionId/items` - Get items for a specific section
- `GET /subsections` - Retrieve all subsections
- `GET /sections/:sectionId/subsections` - Get subsections for a specific section
- `GET /items` - Retrieve all items
- `GET /subsections/:subsectionId/items` - Get items for a specific subsection

### Response Format
All endpoints return JSON with consistent structure:
```json
{
  "status": "success",
  "results": 7,
  "data": { }
}
```

---

## 🔧 Development Commands

```bash
# Start development server
npm start

# Start with specific environment
npm run start:dev    # Development mode
npm run start:prod   # Production mode
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
├── controllers/     # API endpoint handlers
├── errors/          # Error handling utilities
├── routes/          # API route definitions
├── services/        # Business logic layer
└── server.js        # Main application entry point
```

## 🔗 Database Integration

The backend connects to the database layer located in `/db`:
- **Schemas**: Imported from `/db/schema/`
- **Commands**: CRUD operations from `/db/commands/`
- **Validation**: Zod schemas from `/db/validation/`

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change `BACKEND_PORT` in .env |
| Database connection error | Verify `DATABASE_URL` and database status |
| CORS errors | Check `FRONTEND_URL` matches client origin |
| Module not found | Run `npm install` |

### Debug Commands

```bash
# Test API health
curl http://localhost:3001/sections

# Check container status
docker ps | grep backend

# View environment variables
docker exec lafontaine-backend-dev env | grep DATABASE
```

---

## 🔗 Related Documentation

- 🗄️ **[Database Layer](../db/README.md)** - Database schemas, commands and seeding
- 🐳 **[Docker Deployment](../DOCKER.README.md)** - Container setup guide
- 🌐 **[Nginx Configuration](../NGINX.README.md)** - Production deployment
- 📋 **[Project Overview](../README.md)** - Complete setup guide