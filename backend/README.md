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

# Environment Configuration

## Configure Environment Variables

The application uses two environment files based on the environment:

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