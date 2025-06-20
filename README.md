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
├── 📊 db/                     # PostgreSQL database
├── ⚙️  backend/                # Node.js API 
├── 💻 frontend/               # Angular application
├── 🐳 docker-compose.dev.yml  # Development containers
├── 🌐 NGINX.README.md         # Production deployment
└── 🐳 DOCKER.README.md        # Container guide
```

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express + PostgreSQL + Drizzle ORM
- **Frontend**: Angular 19 + TypeScript + SCSS + SSR
- **Infrastructure**: Docker + Nginx + Let's Encrypt + OVH VPS

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
# 3. Start backend services
docker compose -f docker-compose.dev.yml up -d

# 4. Start frontend
cd frontend && npm install && npm start
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
- 🗄️ [Database](./db/README.md) - PostgreSQL setup

**Deployment:**
- 🐳 [Docker Deployment](./DOCKER.README.md) - Backend & Database
- 🌐 [Nginx Deployment](./NGINX.README.md) - Frontend & SSL

---

## 🔧 Development Commands

```bash
# Backend
cd backend && npm start
npm run db:studio  # Database GUI

# Frontend  
cd frontend && npm start
npm run build:prod

# Docker
docker compose -f docker-compose.dev.yml up -d
docker logs -f lafontaine-backend-dev
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | `docker ps` to check containers |
| DB connection error | Verify `DATABASE_URL` in .env |
| Frontend API error | Check backend port in .env |
| SSL issues | `sudo certbot renew` |

---

## 📈 Project Status

- ✅ Backend API operational
- ✅ Frontend deployed with SSR
- ✅ Database with seed data
- ✅ HTTPS production site live
- ✅ Monitoring configured

---

## 👨‍💻 Author

**Manu Caputo** - caputoemmanuel1999@gmail.com