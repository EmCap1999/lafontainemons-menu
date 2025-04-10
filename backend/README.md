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
```
NODE_ENV=development
PORT=8080
DB_HOST=http://localhost
```

**.env.prod**
```
NODE_ENV=production
PORT=80
DB_HOST=https://yourproductionurl.com/
```

## Run the Application

Once the environment variables are set, you can start the backend server:

### For development:
```bash
npm run start:dev
```
This will start the server on http://localhost:8080.

### For production:
```bash
npm run start:prod
```
This will start the server on the configured production URL (defined by `DB_HOST`).
