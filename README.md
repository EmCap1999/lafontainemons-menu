# 🍽️ La Fontaine Mons - Restaurant Website

A **modern, responsive menu website** for La Fontaine Mons restaurant with dynamic menu sections and real-time API integration.

**🌐 Live Site**: [https://carte.lafontainemons.be](https://carte.lafontainemons.be) 🔗

---

## ✨ Features

- 🍽️ Dynamic menu display from database
- 📱 Fully responsive design
- ⚡ Fast loading with Angular SSR
- 🔒 HTTPS secured with Let's Encrypt
- 🌐 Production ready on OVH

---

## 📁 Project Structure

```
├── 🗄️ database/               # TypeScript database layer
├── ⚙️  backend/                # Node.js API 
├── 💻 frontend/               # Angular application
├── 🐳 docker-compose.yml      # Production containers
├── 🌐 NGINX.README.md         # Production deployment
├── 🐳 DOCKER.README.md        # Container guide
```

---

## 🛠️ Tech Stack

- **Backend**: Node.js + TypeScript + Express + PostgreSQL + Drizzle ORM
- **Frontend**: Angular 19 + TypeScript + SCSS + SSR
- **Database**: Drizzle ORM + PostgreSQL + TypeScript schemas
- **Infrastructure**: Docker + Nginx + Let's Encrypt + OVH VPS
- **DevOps**: Biome (linting) + Husky (git hooks)
- **Type Safety**: Full TypeScript integration across all layers

---

## 🚀 Quick Start

### Prerequisites
- Node.js 22+, Docker, Git

### Development Setup

```bash
# 1. Clone and setup
git clone <repository-url>
cd lafontainemons-menu

# 2. Create .env file
```

**Create `.env` file in project root:**
ask the author if needed.

```bash
# 3. Install dependencies (monorepo setup)
npm install

# 4. Start services (PostgreSQL + Backend)
docker compose up -d

# 5. Run database migrations manually
npm run db:migrate --workspace=@lafontaine/database

# 6. (Optional) Seed database
npm run db:seed --workspace=@lafontaine/database

# 7. Start frontend
cd frontend && npm start

# 8. Stop containers when not needed
docker compose stop
```

**Access:**
- Frontend: http://localhost:4200
- Backend API: http://localhost:3001
- Database: localhost:5432

---

## 🌐 Production Architecture

```
Internet → Nginx → Angular Frontend
              ↓
         API Proxy → Node.js Backend → PostgreSQL
```

---

## 📚 Documentation

**Component Setup:**
- 📦 [Backend](backend/README.md) - API development
- 💻 [Frontend](frontend/README.md) - Angular development
- 🗄️ [Database](./database/README.md) - TypeScript database layer

**Deployment:**
- 🐳 [Docker Deployment](./DOCKER.README.md) - Backend & Database
- 🌐 [Nginx Deployment](./NGINX.README.md) - Frontend & SSL

---

## 🔧 Development Commands

### Core Development
```bash
# Monorepo management
npm run lint              # Lint entire project with Biome
npm run lint:fix          # Auto-fix linting issues
npm run update            # Update all dependencies safely

# Backend
cd backend && npm start
npm run db:studio --workspace=database  # Database GUI

# Frontend  
cd frontend && npm start
npm run build:prod

# Docker - Full stack
docker compose up -d                    # Start all services
docker compose stop                     # Stop all services
docker compose down                     # Remove containers
docker logs lafontaine-backend-dev -f   # View backend logs

# Docker - Database only (for local backend dev)
docker compose up -d postgres           # Start only PostgreSQL
docker compose stop postgres            # Stop only PostgreSQL

# Database operations
npm run db:migrate --workspace=@lafontaine/database  # Run migrations
npm run db:seed --workspace=@lafontaine/database     # Seed database
```

### Dependency Management
```bash
# Check outdated packages
npm run update:check

# Update all workspaces
npm run update

# Security audit & fixes
npm run update:force
```

---

## 🤖 Development Tools

### Git Workflow
- **Pre-commit**: Automatic linting with lint-staged on modified files
- **Biome integration**: Unified formatting and linting across the monorepo

```bash
# Commits automatically trigger:
# Pre-commit linting on modified files
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | `docker ps` to check containers |
| DB connection error | Verify `DATABASE_URL` in .env |
| Frontend API error | Check backend port in .env |
| SSL issues | `sudo certbot renew` |
| Lint errors | `npm run lint:fix` to auto-fix |
| Pre-commit fails | Check `.husky/pre-commit` permissions |

---

## 📈 Project Status

- ✅ **Backend API** - TypeScript migration completed
- ✅ **Frontend** - Angular with full TypeScript integration 
- ✅ **Database** - TypeScript schemas with Drizzle ORM
- ✅ **Type Safety** - End-to-end TypeScript across all layers
- ✅ **Production Site** - HTTPS live deployment
- ✅ **Code Quality** - Automated linting with Biome
- ✅ **Development Experience** - Hot reload, type checking, modern tooling

---

## 👨‍💻 Author

**Manu Caputo** - caputoemmanuel1999@gmail.com