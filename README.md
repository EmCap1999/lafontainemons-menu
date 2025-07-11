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
- 🤖 Automated dependency management with Dependabot

---

## 📁 Project Structure

```
├── 📊 db/                     # PostgreSQL database
├── ⚙️  backend/                # Node.js API 
├── 💻 frontend/               # Angular application
├── 🐳 docker-compose.dev.yml  # Development containers
├── 🌐 NGINX.README.md         # Production deployment
├── 🐳 DOCKER.README.md        # Container guide
└── 🔧 .github/                # CI/CD & automation
   ├── dependabot.yml          # Automated dependency updates
   └── workflows/
      ├── pr-check.yml         # Quality gates
      └── dependabot.yml       # Auto-merge safe updates
```

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express + PostgreSQL + Drizzle ORM
- **Frontend**: Angular 19 + TypeScript + SCSS + SSR
- **Infrastructure**: Docker + Nginx + Let's Encrypt + OVH VPS
- **DevOps**: Biome (linting) + Husky (git hooks) + Dependabot (auto-updates)

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

# 4. Start backend services
docker compose -f docker-compose.dev.yml up -d

# 5. Start frontend
cd frontend && npm start
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
- 📦 [Backend](./backend/README.md) - API development
- 💻 [Frontend](./frontend/README.md) - Angular development
- 🗄️ [Database](database/README.md) - PostgreSQL setup

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
npm run database:studio         # Database GUI

# Frontend  
cd frontend && npm start
npm run build:prod

# Docker
docker compose -f docker-compose.dev.yml up -d
docker logs -f lafontaine-backend-dev
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

## 🤖 Automation & CI/CD

### Automated Dependency Updates
- **📅 Weekly**: Monday 9:00 AM - All dependency updates via Dependabot
- **🚨 Daily**: Security patches auto-merged immediately
- **✅ Auto-merge**: Patch updates and security fixes merge automatically
- **⚠️ Manual review**: Major versions and breaking changes require approval

### Quality Gates
- **Pre-commit**: Automatic linting with lint-staged on modified files
- **PR checks**: Auto-fix + comprehensive testing before merge
- **Auto-healing CI**: Automatically corrects fixable lint issues during PR validation
- **Biome integration**: Unified formatting and linting across the monorepo

### Git Workflow
```bash
# Commits automatically trigger:
# 1. Pre-commit linting on modified files
# 2. CI/CD pipeline with auto-fix + validation on PR
# 3. Auto-merge for safe dependency updates
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
| Dependency conflicts | `npm run update:force` for security fixes |
| Pre-commit fails | Check `.husky/pre-commit` permissions |

---

## 📈 Project Status

- ✅ Backend API operational
- ✅ Frontend deployed with SSR
- ✅ Database with seed data
- ✅ HTTPS production site live
- ✅ Monitoring configured
- ✅ Automated dependency management
- ✅ Quality gates & auto-healing CI/CD pipeline
- ✅ Streamlined development workflow

---

## 👨‍💻 Author

**Manu Caputo** - caputoemmanuel1999@gmail.com