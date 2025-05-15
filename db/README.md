# 🗄️ Database - PostgreSQL

This directory contains everything related to the project's database setup.

## 📦 Tech Stack

- 🐘 PostgreSQL 17
- 🧩 [Drizzle ORM](https://orm.drizzle.team/) for schema generation
- 🛠️ Node.js for running migrations and data seeding

---

## 🛠️ Installation

### Install PostgreSQL on macOS

```bash
brew install postgresql@17
brew services start postgresql
```

### Create the Database

```bash
psql -d postgres

CREATE USER "user" WITH PASSWORD 'password';
CREATE DATABASE la_fontaine_mons OWNER "user";
GRANT ALL PRIVILEGES ON DATABASE la_fontaine_mons TO "user";
```

### Schema Generation
The schema is automatically generated via Drizzle Kit.

```bash
cd ../backend/drizzle/
npx drizzle-kit push
```

### Seed the Tables
Once the schema is in place:

```bash
psql -d la_fontaine_mons -f db/seeds/insert_data.sql
```

### Database Structure
Tables

    section: Main categories (e.g., Softs, Desserts)
    subsection: Subcategories (e.g., On tap)
    item: Individual menu items

### Example Queries
For more examples, check the ./examples/ directory.