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

The application uses tree environment files based on the environment:

- **Local**: Create a `.local.dev` file in the `./environments/` folder
- **Development**: Create a `.env.dev` file in the `./environments/` folder
- **Production**: Create a `.env.prod` file in the `./environments/` folder

### Example Files

**.local.dev**:
```
NODE_ENV=local
FRONTEND_URL=http://localhost:4200
BACKEND_PORT=8080
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/la_fontaine_mons
```

Refer to the specific README files for each part of the project:

- 📦 [Backend Setup](./backend/README.md)
- 💻 [Frontend Setup](./frontend/README.md) *(coming soon)*
- 🗄️ [Database Setup](./db/README.md)