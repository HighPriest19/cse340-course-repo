# Service Portal

**A full-stack volunteer and service project management platform**

![Service Portal Hero](public/images/hero.jpeg)

---

## 🚀 Overview

**Service Portal** is a web application developed for the **CSE340** course. It enables users to discover service opportunities, volunteer for projects, and allows administrators to manage organizations, projects, and categories.

Users can:
- Browse partner organizations and their active projects
- Explore projects by category
- Register and log in to volunteer
- Track their volunteer commitments in a personal dashboard

Administrators can create and edit organizations, projects, and categories.

---

## ✨ Features

- **User Authentication** – Registration, login, logout with secure password hashing (bcrypt)
- **Role-Based Access** – Regular users vs. Admin roles
- **Organizations** – View details and associated projects
- **Projects & Volunteering** – Browse, view details, sign up or remove volunteer commitment
- **Categories** – Projects tagged with multiple categories (Environmental, Community Service, etc.)
- **Personal Dashboard** – See your volunteered projects at a glance
- **Admin Management** – Tools to add/edit organizations, projects, and categories
- **Session Management** – Persistent login sessions stored in PostgreSQL
- **Error Handling** – Custom 404 and 500 error pages
- **Sample Data** – Automatically seeded with realistic organizations (Habitat for Humanity, Red Cross, Local Food Bank), projects, and categories

---

## 📦 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| **Backend** | Node.js + Express.js (ESM modules) |
| **Frontend**| EJS templating engine + Custom CSS |
| **Database**| PostgreSQL                         |
| **Auth**    | bcryptjs, express-session + connect-pg-simple |
| **Other**   | dotenv, pg driver                  |

---

## 📁 Project Structure

```
cse340-course-repo/
├── public/                 # Static files (CSS, images)
│   ├── css/style.css
│   └── images/ (hero + organization images)
├── scripts/                # Admin utilities
├── src/
│   ├── controllers/        # Route handlers & business logic
│   ├── database/           # Connection & schema initialization
│   ├── middleware/         # Authentication checks
│   ├── models/             # Database query functions
│   └── routes/             # Express router
├── views/                  # EJS templates + partials
├── server.js               # App entrypoint
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm
- PostgreSQL database (local or cloud-hosted such as Neon, Render, or Supabase)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/HighPriest19/cse340-course-repo.git
   cd cse340-course-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:

   ```env
   DATABASE_URL=postgresql://user:password@host:port/dbname
   SESSION_SECRET=replace-this-with-a-long-random-string
   PORT=3000
   NODE_ENV=development
   ```

   > The app automatically handles SSL for hosted Postgres services (e.g. Render).

4. **Start the application**

   ```bash
   npm run dev     # Development with nodemon
   # or
   npm start       # Production
   ```

5. **Open in browser**

   Visit **http://localhost:3000**

> On first launch, the database tables are created and sample data is seeded automatically.

### Default Test Accounts

After the initial seed:

| Role     | Email                | Password   | Notes                              |
|----------|----------------------|------------|------------------------------------|
| Admin    | admin@example.com    | cse340!    | Full management access             |
| User     | user@example.com     | cse340!    | Can volunteer & view dashboard     |

You can also run:
```bash
node scripts/create-admin.js
```
to ensure/reset the admin account.

---

## 🔧 Current Development Status

This is an active course project for **CSE340**. 

- Core browsing, authentication, and volunteering features are functional.
- Management routes (create/edit organizations, projects, categories) are currently open but are designed to be restricted to admin users in later iterations.
- Authentication middleware is applied selectively (dashboard, volunteering actions, user management).

---

## 👤 Author

**Hinckley Olagunju** ([@HighPriest19](https://github.com/HighPriest19))

Built as part of BYU-Pathway / CSE340 coursework.

---

## 📄 License

This project is for educational purposes.

---

*Happy volunteering! 🌱*
```
