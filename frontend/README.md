# 💻 Frontend - La Fontaine Mons

Angular application for the La Fontaine Mons restaurant website.

## 📦 Tech Stack

- 🅰️ **Angular 19** – Web framework with SSR
- 🎨 **SCSS** – Advanced CSS styling
- 📱 **Responsive Design** – Mobile-first approach
- 🔧 **TypeScript** – Type-safe development
- 🌐 **HTTP Client** – API communication

---

## 🔧 Environment Configuration

The frontend automatically generates environment files from the root `.env` file.

```bash
npm run generate-env
```

**Environment Variables:**
- `apiUrl`: Backend API endpoint
  - **Development**: `http://localhost:${BACKEND_PORT}`
  - **Production**: `${FRONTEND_URL}/api` (via Nginx)
- `frontendUrl`: Frontend URL
- `production`: Environment flag

---

## 🚀 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build:prod

# Standard build
npm run build

# Run tests
npm test
```

Development server runs on `http://localhost:4200/`

---

## 🛠️ Angular CLI Tools

```bash
# Generate component
ng generate component component-name

# View available schematics
ng generate --help

# End-to-end testing
ng e2e
```

---

## 📦 Production Deployment

See [Nginx Deployment Guide](../NGINX.README.md) for production setup.

**Production optimizations:**
- Tree-shaking for smaller bundles
- Minification and compression
- Ahead-of-Time (AOT) compilation

---

## 🔗 API Integration

- **Development**: Direct API calls to `localhost:${BACKEND_PORT}`
- **Production**: API proxied through Nginx at `/api/*`

**Main Endpoints:**
- `GET /api/sections` - Menu sections
- `GET /api/menus` - Menu items

---

## 📱 Features

- 🍽️ Dynamic menu display
- 📱 Responsive design
- 🔄 Real-time API updates
- 🎨 Modern UI design
- ⚡ SSR ready

---

## 🔗 Related Documentation

- 📦 [Backend Setup](../backend/README.md)
- 🗄️ [Database Setup](../database/README.md)
- 🐳 [Docker Deployment](../DOCKER.README.md)
- 🌐 [Nginx Deployment](../NGINX.README.md)
