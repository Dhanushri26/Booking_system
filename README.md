# Booking System Prototype

This repository contains a **simple booking management prototype** built with a Node.js/Express backend and a React (Vite/TailwindCSS) frontend. It integrates with Supabase for authentication and data storage, providing a minimal but functional UI for scheduling resources (e.g. meeting rooms).

## 🚀 Features

- Supabase authentication (`sign up`, `login`, `logout`, `password reset`)
- Protected REST API for resources and bookings
- Dashboard displaying active bookings and available resources
- Create new bookings with real‑time availability filtering
- Mobile‑friendly, responsive UI using Tailwind CSS
- Error handling and feedback alerts for better UX

## 🏗️ Project Structure

```
backend/             # Express API server
  config/            # Supabase client config
  controllers/       # Route handlers
  repositories/      # DB interaction logic
  services/          # Business logic
  middleware/        # Error handling, etc.
  routes/            # Express routers
  server.js          # Entry point

frontend/            # React (Vite) SPA
  src/
    pages/           # Login, Dashboard
    components/      # Shared UI components
    services/        # API wrappers
    supabaseClient.js# Supabase SDK instance
    utils/           # Helpers
    App.jsx          # Root component with auth flow
    main.jsx         # Vite bootstrap

README.md            # This file
```

## ⚡ Getting Started

### Prerequisites

- Node.js 18+ (or compatible LTS)
- npm or yarn
- Supabase project (the config is already filled in source files, but you can replace with your own credentials)

### Backend

```bash
cd backend
npm install
npm run dev      # starts server on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev      # launches Vite dev server on http://localhost:5173
```

### Authentication

- Use the login page to sign up or sign in with an email/password.
- Password reset link is sent to the provided email.
- After login, the dashboard becomes accessible.

## 🔒 API Endpoints

| Route               | Method | Description                        |
|--------------------|--------|------------------------------------|
| `/api/resources`   | GET    | List all resources                 |
| `/api/bookings`    | GET    | Retrieve bookings                  |
| `/api/bookings`    | POST   | Create a new booking (JSON body)   |

All endpoints currently assume clients handle auth tokens via Supabase session tokens.

## 🎨 UI/UX Notes

- Tailwind CSS is used for rapid prototyping.
- Login page features toggleable password visibility, loading states, and inline error messages.
- Header shows current user email and logout button when authenticated.
- Dashboard lists available resources (including a special case for "Conference Room A") and active bookings.

## 🛠️ Customization

Feel free to modify or extend:

- Add more resource types or booking rules in `backend/services`.
- Protect API routes with middleware and verify Supabase JWTs.
- Improve UI components or migrate to a different style library.

## 📄 License

This prototype is provided **as-is** for demonstration purposes. No license is specified.

---
