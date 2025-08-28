# 💻 Frontend - TypeScript Angular

Angular application for the La Fontaine Mons restaurant website, built with TypeScript and integrated with the backend API.

## 📦 Tech Stack

- 🅰️ **Angular 20** – Modern web framework with SSR
- 🔷 **TypeScript 5.9** – Type-safe development 
- 🎨 **SCSS** – Advanced CSS styling
- 📱 **Responsive Design** – Mobile-first approach
- 🌐 **HTTP Client** – Type-safe API communication
- 🔧 **@lafontaine/backend** – Shared types with backend

---

## 🔧 Environment Configuration

The frontend uses a TypeScript script to generate environment files from the root `.env` file.

```bash
# Generate environment configuration (runs automatically on start)
npm run generate-env
```

**Generated Environment:**
- `apiUrl`: Backend API endpoint
  - **Development**: `http://localhost:${BACKEND_PORT}`
  - **Production**: `${FRONTEND_URL}/api` (via Nginx proxy)
- `frontendUrl`: Frontend application URL
- `production`: Environment mode flag

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

**Type-safe API communication with shared types from `@lafontaine/backend`:**

```typescript
import { MenuService } from './services/menu.service'
import type { PublicSection, PublicItem } from '@lafontaine/backend'

// Type-safe service calls
sections: PublicSection[] = []
items: PublicItem[] = []
```

**Environment-based endpoints:**
- **Development**: Direct API calls to `localhost:${BACKEND_PORT}`
- **Production**: API proxied through Nginx at `/api/*`

**Main API Endpoints:**
- `GET /api/sections` - Retrieve all menu sections
- `GET /api/sections/:sectionId/items` - Get items for specific section

---

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/      # Angular components
│   │   │   ├── menu/        # Main menu component
│   │   │   ├── section/     # Section display component
│   │   │   └── footer/      # Footer component
│   │   ├── services/        # Angular services
│   │   │   └── menu.service.ts  # API communication
│   │   ├── app.component.*  # Root component
│   │   ├── app.config.ts    # App configuration
│   │   └── app.routes.ts    # Routing configuration
│   ├── environments/        # Generated environment files
│   │   └── environment.ts   # Auto-generated from .env
│   ├── assets/             # Static assets
│   ├── styles.scss         # Global styles
│   └── main.ts            # Application bootstrap
├── scripts/
│   └── generate-env.ts     # TypeScript environment generator
├── tsconfig.json           # TypeScript configuration
└── angular.json           # Angular CLI configuration
```

---

## 🛠️ TypeScript Features

### Type-safe Services
```typescript
import type { 
  SectionsResponse, 
  ItemsResponse, 
  PublicSection, 
  PublicItem 
} from '@lafontaine/backend'

@Injectable()
export class MenuService {
  getAllSections(): Observable<PublicSection[]> {
    return this.http.get<SectionsResponse>(`${this.apiUrl}/sections`)
      .pipe(map(response => response.data?.sections || []))
  }
}
```

### Type-safe Components
```typescript
export class MenuComponent implements OnInit {
  sections: PublicSection[] = []
  sectionItems: { [sectionId: number]: PublicItem[] } = {}
  
  // Type-safe method parameters and returns
  getSectionItems(sectionId: number): PublicItem[] {
    return this.sectionItems[sectionId] || []
  }
}
```

### Environment Script
```typescript
// scripts/generate-env.ts - TypeScript environment generator
import * as dotenv from 'dotenv'

const backendPort = process.env.BACKEND_PORT || '8080'
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200'
// Automatically generates environment.ts with proper typing
```

---

## 📱 Features

- 🍽️ **Dynamic Menu Display** - Real-time menu sections and items
- 🔷 **Type Safety** - Full TypeScript integration with backend types
- 📱 **Responsive Design** - Mobile-first approach with SCSS
- 🔄 **Real-time Updates** - HTTP client with RxJS observables
- 🎨 **Modern UI** - Clean, professional restaurant design
- ⚡ **SSR Ready** - Angular Universal server-side rendering
- 🔧 **Auto Environment** - TypeScript-generated configuration

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Type errors from backend** | Ensure backend is built: `npm run build --workspace=backend` |
| **Environment not generated** | Run `npm run generate-env` manually |
| **API connection fails** | Check `BACKEND_PORT` in root .env file |
| **Import errors** | Verify `@lafontaine/backend` types are available |
| **Build fails** | Check TypeScript config and shared type compatibility |

### Debug Commands

```bash
# Generate environment manually
npm run generate-env

# Check generated environment
cat src/environments/environment.ts

# Test backend connection
curl http://localhost:8080/api/sections

# Check TypeScript compilation
ng build --dry-run
```

---

## 🔗 Related Documentation

- 🧠 **[Backend API](../backend/README.md)** - TypeScript API server setup
- 🗄️ **[Database Layer](../database/README.md)** - Shared database schemas
- 🐳 **[Docker Deployment](../DOCKER.README.md)** - Container setup guide
- 🌐 **[Nginx Deployment](../NGINX.README.md)** - Production frontend deployment
- 📋 **[Project Overview](../README.md)** - Complete project setup
