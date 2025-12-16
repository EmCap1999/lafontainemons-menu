# Frontend - Angular

Angular application for the restaurant menu website.

## Tech Stack

- Angular 20, TypeScript 5.9
- SCSS, SSR
- Shared types from @lafontaine/backend

## Setup

```bash
npm run generate-env  # Generate environment config
npm start             # Development server
npm run build:prod    # Production build
npm test              # Run tests
```

Development server runs on `http://localhost:4200`

## Environment

Environment is auto-generated from root `.env` on start:
- `apiUrl` - Backend API endpoint
- `frontendUrl` - Frontend URL
- `production` - Environment flag

## API Integration

```typescript
import { MenuService } from './services/menu.service'
import type { PublicSection, PublicItem } from '@lafontaine/backend'

sections: PublicSection[] = []
items: PublicItem[] = []
```

## Project Structure

```
src/
├── app/
│   ├── components/    # Angular components
│   ├── services/      # API services
│   └── app.config.ts  # App configuration
├── environments/      # Generated env files
├── assets/            # Static assets
└── styles.scss        # Global styles

scripts/
└── generate-env.ts    # Environment generator
```

## Angular CLI

```bash
ng generate component component-name
ng build --configuration production
ng test
```
