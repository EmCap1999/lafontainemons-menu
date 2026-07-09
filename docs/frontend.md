# Frontend — React SPA

Single-page application built with React 19, Vite and Tailwind CSS.

## Tech Stack

- React 19, TypeScript
- Vite 8 (dev server & build)
- Tailwind CSS 4
- base-ui / shadcn components
- lucide-react / react-icons for icons

## Setup

Run from the repo root (or drop the `yarn workspace frontend` prefix if you're already inside `frontend/`). These are
independent alternatives — run one at a time.

Vite dev server with HMR:

```bash
yarn workspace frontend dev
```

Typecheck + production build (`tsc -b && vite build`):

```bash
yarn workspace frontend build
```

Preview the production build locally (after building):

```bash
yarn workspace frontend preview
```

Dev server runs on `http://localhost:5173`.

## Project Structure

```
src/
├── App.tsx           # Root component
├── main.tsx          # Entry point
├── components/        # UI components (Menu, Section, Footer, ui/)
├── hooks/             # Custom React hooks
├── lib/               # constants.ts, utils.ts
├── services/          # API client (menu.ts — calls backend /api/*)
├── types/             # TypeScript types
└── assets/            # Static assets (images, logo)
```

## Backend integration

The frontend fetches menu data from the backend REST API (`/api/sections`, `/api/sections/:id/items`) —
see [backend.md](backend.md). In development, requests go to `http://localhost:8080`; in production, Nginx proxies
`/api/` to the backend (see [deployment/nginx.md](deployment/nginx.md)).