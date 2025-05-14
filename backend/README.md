# 🧠 Backend - Node.js API

This folder contains the source code for the **backend** of the project.

## 📦 Tech Stack

- ⚙️ **Node.js** – Backend runtime environment
- 🚀 **Express** – Web framework for building the API
- 🔐 **dotenv** – Environment variable management
- 🌐 **CORS** – Handles Cross-Origin Resource Sharing
- 🐘 **PostgreSQL** – Database system
- 📦 **Docker** – Containerization and deployment

---

## 🛠️ Getting Started

Install dependencies:

```bash
cd ./backend
npm install
```

## Run the Application

Once the environment variables are set, you can start the backend server:

### For Local:
```bash
npm start
```
This will start the server using the .env.local configuration.

### For development:
```bash
npm run start:dev
```
This will start the server using the .env.dev configuration.

### For production:
```bash
npm run start:prod
```
This will start the server using the .env.prod configuration.