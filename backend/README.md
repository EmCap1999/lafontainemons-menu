# 🧠 Backend - Node.js API

This folder contains the **RESTful API server** for the La Fontaine Mons restaurant application.

## 📦 Tech Stack

- ⚙️ **Node.js 22** – JavaScript runtime environment
- 🚀 **Express.js 5** – Web framework for API routes
- 🧩 **Drizzle ORM** – Type-safe database operations
- 🔐 **dotenv** – Environment variable management
- 🌐 **CORS** – Cross-Origin Resource Sharing
- 📝 **Zod** – Runtime type validation
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

Ensure PostgreSQL is running and configured (see [Database README](../db/README.md)).

### Start the Server

```bash
npm start
```

Server runs on `http://localhost:3001`

---

## 📡 API Endpoints

### Menu API
- `GET /sections` - Retrieve all menu sections
- `GET /sections/:id/items` - Get items for a specific section
- `GET /health` - Server health check

### Response Format
All endpoints return JSON with consistent structure:
```json
{
  "status": "success",
  "results": 7,
  "data": { ... }
}
```

---

## 🔧 Development Commands

```bash
# Start development server
npm start

# Open database GUI
npm run db:studio

# Apply database migrations
cd drizzle && npx drizzle-kit push
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
├── drizzle/         # Database schema and migrations
├── errors/          # Error handling utilities
├── routes/          # API endpoint definitions
└── server.js        # Main application entry point
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change `BACKEND_PORT` in .env |
| Database connection error | Verify `DATABASE_URL` and PostgreSQL status |
| CORS errors | Check `FRONTEND_URL` matches client origin |
| Module not found | Run `npm install` |

### Debug Commands

```bash
# Test API health
curl http://localhost:3001/health

# Check container status
docker ps | grep backend

# View environment variables
docker exec lafontaine-backend-dev env | grep POSTGRES
```

---

## 🔗 Related Documentation

- 🗄️ **[Database Setup](../db/README.md)** - PostgreSQL configuration and schema
- 🐳 **[Docker Deployment](../DOCKER.README.md)** - Container setup guide
- 🌐 **[Nginx Configuration](../NGINX.README.md)** - Production deployment
- 📋 **[Project Overview](../README.md)** - Complete setup guide