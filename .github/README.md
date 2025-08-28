# Dependabot Configuration - La Fontaine Mons

## Overview

This project uses Dependabot to automatically and intelligently manage dependency updates. The configuration is optimized for a monorepo project with multiple workspaces (backend, frontend, database).

## Configuration Structure

### 1. **Update Schedule**

Updates are staggered throughout the week to avoid overload:

- **Monday 4:00 AM**: Root workspace and Backend
- **Tuesday 4:00 AM**: Frontend (Angular)
- **Wednesday 4:00 AM**: Database (Drizzle)
- **Thursday 4:00 AM**: GitHub Actions

Timezone: Europe/Brussels

### 2. **Intelligent Dependency Grouping**

Dependencies are grouped by ecosystem to reduce the number of PRs:

#### Backend
- **express-ecosystem**: Express and its types, CORS
- **dotenv-ecosystem**: All dotenv dependencies
- **typescript-tooling**: TypeScript, TSX, Node types, esbuild

#### Frontend
- **angular-core**: All @angular/* packages (except build tools)
- **angular-tooling**: Angular CLI and development tools
- **testing-tools**: Jasmine, Karma and their plugins
- **typescript-and-types**: TypeScript and type definitions

#### Database
- **drizzle-ecosystem**: All Drizzle packages
- **database-tools**: Postgres, Zod, dotenv
- **dev-tools**: Development tools

### 3. **Auto-merge Strategy**

The auto-merge system is configured with multiple security levels:

#### Automatic merge for:
- ✅ **Security updates** (all)
- ✅ **Patches** (bug fixes)
- ✅ **Minor updates** for development dependencies only

#### Manual review required for:
- ⚠️ **Minor updates** for production dependencies
- ⚠️ **Major updates** (all)
- ⚠️ Critical dependencies (Angular, TypeScript, Express, Drizzle)

### 4. **Automatic Labels**

Each Dependabot PR automatically receives labels:

- `dependencies`: All dependency PRs
- `backend`, `frontend`, `database`: Based on workspace
- `patch-update`, `minor-update`, `major-update`: Based on update type
- `security`: For security updates
- `auto-merge`: If eligible for automatic merge

### 5. **Automatic Validation**

Each PR automatically triggers:

1. **Build tests**: Build for each workspace
2. **Type checking**: TypeScript verification
3. **Linting**: Biome verification
4. **Security audit**: npm audit
5. **License check**: License checker
6. **Size analysis**: Bundle size (frontend)

## Useful Commands

### Force Manual Check
```bash
# Check available updates
npm run update:check

# Install updates
npm run update:install

# Security audit
npm run update:audit
```

### Create GitHub Labels
```bash
# Manually trigger the workflow
gh workflow run create-labels.yml
```

## Security

### Ignored Dependencies

Major updates are blocked for:
- TypeScript (all workspaces)
- Angular and its core dependencies
- Express
- Drizzle ORM
- RxJS and Zone.js

These updates require a planned manual migration.

### PR Limits

- Maximum 5 open PRs per workspace
- Maximum 3 PRs for GitHub Actions
- PRs are grouped when possible

## Maintenance

### Adding a New Critical Dependency

To mark a dependency as critical (no major auto-update):

```yaml
ignore:
  - dependency-name: "package-name"
    update-types: ["version-update:semver-major"]
```

### Adding a New Group

To create a new dependency group:

```yaml
groups:
  group-name:
    patterns:
      - "pattern-*"
    update-types:
      - "minor"
      - "patch"
```

## Troubleshooting

### Blocked PR
1. Check validation workflow logs
2. Manually fix build/type errors
3. Re-run workflows

### Too Many Open PRs
1. Merge or close existing PRs
2. Adjust `open-pull-requests-limit` if necessary

### Problematic Dependency
1. Add to `ignore` section in dependabot.yml
2. Manage this dependency manually

## Contact

For questions about Dependabot configuration:
- Create an issue in the repository
- Contact @EmCap1999