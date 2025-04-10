# 🧠 Backend - Node.js API

This folder contains the source code for the **backend** of the project.

## 📦 Tech Stack
- ⚙️ **Node.js** - Backend runtime environment
- 🚀 **Express** - Web framework for Node.js
- 🔐 **dotenv** - To manage environment variables
- 🌐 **CORS** - Cross-Origin Resource Sharing handling
- 🐘 **PostgreSQL** - To be integrated for database management
- 📦 **Docker** - For deployment

## 🛠️ Getting Started

```bash
cd ./backend
npm install
```

# Environment Configuration

## Configure Environment Variables

The application uses two environment files based on the environment:

- **Development**: Create a `.env.dev` file in the `./environments/` folder
- **Production**: Create a `.env.prod` file in the `./environments/` folder

### Example Files

**.env.dev**
NODE_ENV=development
FRONTEND_URL=http://localhost:4200
BACKEND_PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASS=your_password
DB_NAME=la_fontaine_mons

**.env.prod**
NODE_ENV=production
FRONTEND_URL=https://carte.lafontainemons.be
etc.

## Run the Application

Once the environment variables are set, you can start the backend server:

### For development:
```bash
npm run start:dev
This will start the server using the .env.dev configuration.
```
### For development:
```bash
npm run start:prod
This will start the server using the .env.prod configuration.
```