# 🗄️ Database Layer - PostgreSQL

This directory contains the **complete database layer** for the La Fontaine Mons restaurant application, including schemas, CRUD commands, validation, and seeding.

## 📦 Tech Stack

- 🐘 **PostgreSQL 17** – Relational database with auto-generated IDs
- 🧩 **Drizzle ORM** – Type-safe schema definitions and migrations
- 🛡️ **Zod** – Runtime data validation
- 🌱 **JavaScript Seeding** – Organized data insertion
- 🐳 **Docker** – Containerized deployment

---

## 📊 Database Schema

```
Section (Softs, Desserts, HotDrinks, Les Vins, Bières, Apéritifs, Alcools)
    ↓ 1:many
Subsection (Vin rosé blanc & rouge, Sélection du Patron, Au fût)
    ↓ 1:many  
Item (95 individual menu items with prices, capacity, origin)
```

**Tables:**
- `section` - 7 menu categories with auto-generated serial IDs
- `subsection` - 3 subcategories within sections
- `item` - 95 menu items with prices and details

---

## 🏗️ Architecture

### Schema Organization
```
schema/
├── section.schema.js     # Section table definition
├── subsection.schema.js  # Subsection table definition
├── item.schema.js        # Item table definition
└── index.js             # Combined schema exports
```

### CRUD Commands
```
commands/
├── section.commands.js     # Section CRUD operations
├── subsection.commands.js  # Subsection CRUD operations
├── item.commands.js        # Item CRUD operations
└── index.js               # Command exports
```

### Data Validation
```
validation/
├── section.validation.js     # Section Zod schemas
├── subsection.validation.js  # Subsection Zod schemas
├── item.validation.js        # Item Zod schemas
└── index.js                 # Validation exports
```

### Seeding System
```
seeds/
├── seed.js              # Main seeding script
└── data/               # Organized data files
    ├── sections.ts     # Section data (7 items)
    ├── subsections.ts  # Subsection data (3 items)
    └── items.ts        # Item data (95 items)
```

---

## 🚀 Setup

### Installation

```bash
cd database
npm install
```

### Database Operations

```bash
# Apply database schema
npm run database:migrate

# Seed database with menu data
npm run database:seed

# Open database GUI
npm run database:studio

# Reset database (migrate + seed)
npm run database:reset
```

### Environment Configuration

Database automatically loads environment variables from the root `.env` file:
- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_USER` - Database user
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DB` - Database name

---

## 🐳 Docker Usage

Database layer runs in containerized environment:

```bash
# Start PostgreSQL
docker compose -f docker-compose.dev.yml up -d postgres

# Run migrations
docker compose -f docker-compose.dev.yml up drizzle-migration

# Run seeding
docker compose -f docker-compose.dev.yml up seeder

# Complete setup
docker compose -f docker-compose.dev.yml up -d
```

---

## 📡 Available Commands

### Section Commands
- `getAllSections()` - Get all sections ordered by display order
- `getSectionById(id)` - Get section by ID
- `createSection(data)` - Create new section
- `updateSection(id, data)` - Update section
- `deleteSection(id)` - Delete section

### Subsection Commands
- `getAllSubsections()` - Get all subsections
- `getSubsectionsBySection(sectionId)` - Get subsections for a section
- `getSubsectionById(id)` - Get subsection by ID
- `createSubsection(data)` - Create new subsection
- `updateSubsection(id, data)` - Update subsection
- `deleteSubsection(id)` - Delete subsection

### Item Commands
- `getAllItems()` - Get all items
- `getItemsBySection(sectionId)` - Get items for a section
- `getItemsBySubsection(subsectionId)` - Get items for a subsection
- `getItemById(id)` - Get item by ID
- `createItem(data)` - Create new item
- `updateItem(id, data)` - Update item
- `deleteItem(id)` - Delete item
- `updateItemAvailability(id, isAvailable)` - Toggle item availability

---

## 📊 Data Overview

### Current Menu Data
- **7 Sections**: Softs, Desserts, HotDrinks, Les Vins, Bières, Apéritifs, Alcools
- **3 Subsections**: Wine categories and draft beers
- **95 Items**: Complete menu with prices, capacities, and origins

### Seeding Process
1. **Clear Database**: Remove existing data (respecting foreign keys)
2. **Insert Sections**: 7 main menu categories
3. **Insert Subsections**: 3 subcategories with section references
4. **Insert Items**: 95 menu items with batch processing

---

## 🔧 Development

### Adding New Data

1. **Add to data files**: Update `seeds/data/*.js`
2. **Run seeding**: `npm run db:seed`
3. **Verify**: Check with `npm run db:studio`

### Schema Changes

1. **Update schema**: Modify `schema/*.schema.js`
2. **Generate migration**: `npm run db:generate`
3. **Apply changes**: `npm run db:migrate`

### Using Commands

```javascript
import { sectionCommands } from './/commands/index.js'

// Get all sections
const sections = await sectionCommands.getAllSections()

// Create new section
const newSection = await sectionCommands.createSection({
  name: 'New Category',
  displayOrder: 8
})
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check PostgreSQL is running |
| Authentication failed | Verify credentials in `.env` |
| Migration fails | Check schema syntax and DB permissions |
| Seeding errors | Verify data integrity and foreign keys |

### Debug Commands

```bash
# Test database connection
node -e "import('./connection/index.js').then(({db}) => console.log('Connected!'))"

# Check table structure
npm run database:studio

# View container logs
docker logs lafontaine-postgres-dev
docker logs lafontaine-seeder
```

---

## 🔗 Related Documentation

- 📦 **[Backend API](../backend/README.md)** - API using this database layer
- 🐳 **[Docker Deployment](../DOCKER.README.md)** - Container setup
- 🌐 **[Nginx Configuration](../NGINX.README.md)** - Production deployment
- 📋 **[Project Overview](../README.md)** - Complete setup guide