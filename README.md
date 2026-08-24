# TechStore — Task 4 React E-commerce Frontend

A responsive e-commerce training application built with local mock data only. It intentionally has no backend API, Neon, database, or network data dependency.

## Technologies

React, Vite, React Router, Context API, CSS, and LocalStorage.

## Run locally

```bash
npm install
npm run dev
npm run build
```

## Routes

`/`, `/products`, `/products/:id`, `/cart`, `/checkout`, `/login`, `/register`, `/profile`, `/admin`, and a 404 route.

## Demo accounts

- Customer: `customer@example.com` / `Customer123!`
- Admin: `admin@example.com` / `Admin123!`

## Structure

- `src/data`: seeded local products, categories, users, and orders
- `src/context`: authentication, cart, and mutable local catalog state
- `src/components`: reusable layout, common, product, and cart components
- `src/pages`: route-level UI

Products, categories, users, carts, and created orders are held locally and persisted in browser LocalStorage. The layout includes responsive breakpoints, visible focus styles, semantic landmarks, labels, feedback states, and keyboard-dismissible dialogs.

## Preview URL

Not deployed yet — add the deployment URL here when available.
