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

### .env File Example
```bash
NODE_ENV=local
FRONTEND_URL=http://localhost:4200
BACKEND_PORT=8080
DATABASE_URL=postgresql://user:password@localhost:5432/la_fontaine_mons
```
### Structure de la Base
Tables:

    section: Main categories (e.g., Softs, Desserts)
    subsection: Subcategories (e.g., On tap)
    item: Individual menu items

Intégration IDE (WebStorm):

    Open the Database tool window
    Add a PostgreSQL data source
    Configure the connection:

Configurer:
```bash
Host: localhost  
Port: 5432  
Database: la_fontaine_mons  
User: user  
Password: password
```
Test and save the connection.

### Example Queries
For more examples, check the ./examples/ directory.