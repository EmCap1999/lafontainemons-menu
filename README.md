# 🍽️ Restaurant Website

## 📝 Overview

A **responsive menu website** for a local restaurant.
This is the **latest stable development branch**.  
👉 Live demo: [http://carte.lafontainemons.be/](http://carte.lafontainemons.be/) 🔗
---

## 📁 Project Structure

- `./db` — PostgreSQL DataBase
- `./backend` — Node.js API using Express
- `./frontend` — Angular app *(coming soon)*

---

## 🛠️ Tech Stack

- 🗄️ **Database**: PostgreSQL
- ⚙️ **Backend**: Node.js (Express)
- 💻 **Frontend**: Angular
- 📦 **Deployment**: Docker containers on OVH

---

## ⚙️ Getting Started

### Environment Configuration

create a single .env file in the root of the project depending on the environment:

- **Local**
- **Development**
- **Production**

### Example Files

**.env**:
```
NODE_ENV=local
FRONTEND_URL=http://localhost:4200
BACKEND_PORT=8080

# Configuration de la base de données
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=postgres
POSTGRES_PORT=5432

# URL de connexion pour accès local (depuis le VPS)
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}"

# URL de connexion pour accès depuis les conteneurs Docker
# DATABASE_URL_DOCKER="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/${POSTGRES_DB}"
```

Refer to the specific README files for each part of the project:

- 📦 [Backend Setup](./backend/README.md)
- 💻 [Frontend Setup](./frontend/README.md) *(coming soon)*
- 🗄️ [Database Setup](./db/README.md)