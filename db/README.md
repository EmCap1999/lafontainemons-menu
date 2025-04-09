# 🗄️ Database - PostgreSQL

This directory contains everything related to the project's database setup.

## 📦 Tech Stack

- 🐘 **PostgreSQL 17**
- 🧩 **Node.js** for migrations and seeding

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

CREATE USER "user" WITH PASSWORD 'xxxxxx';
CREATE DATABASE la_fontaine_mons OWNER "user";
GRANT ALL PRIVILEGES ON DATABASE la_fontaine_mons TO "user";
```

---

## 📋 Database Schema

### Tables

- **section**: Main categories (e.g., Softs, Desserts)
- **subsection**: Subcategories within a section (e.g., Au fût)
- **item**: Individual menu items

## 🚀 Getting Started

### Set Up Locally

```bash
cd lafontainemons-menu

brew services start postgresql

psql -d la_fontaine_mons -f db/migrations/001_initial_schema.sql
psql -d la_fontaine_mons -f db/seeds/insert_data.sql
```

---

## 🛠️ IDE Integration (WebStorm)

- Open the **Database** tool window
- Add a PostgreSQL data source
- Configuration:

```
Host: localhost  
Port: 5432  
Database: la_fontaine_mons  
User: user  
Password: xxxxxx  
```

- Test and save the connection

---

## 📊 Example Queries

For more, check the `db/examples/` directory.
