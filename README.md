# TechStore — Task 4 React E-commerce Frontend

A responsive e-commerce training application built with **React and Vite**, using local mock data only.

This project is part of **Web Security Fundamentals — Task 4**. It focuses on building a complete React e-commerce frontend with reusable components, client-side routing, local state management, form validation, responsive design, accessibility considerations, and a simulated customer/admin experience.

> **Important:** This task intentionally does **not** connect to the backend REST API, Neon, or any database. All products, categories, users, carts, and orders are based on local mock data. The REST API integration is planned for the next task.

---

## Technologies

* React
* Vite
* React Router
* Context API
* JavaScript
* CSS
* LocalStorage
* Git & GitHub
* Vercel

---

## Features

### Customer Features

* Responsive home page
* Product listing
* Product details
* Product search
* Category filtering
* Price filtering
* Stock filtering
* Product sorting by name and price
* Product pagination/load-more behavior
* Add products to cart
* Update cart quantities
* Remove products from cart
* Stock-limit validation
* Cart persistence using LocalStorage
* Checkout form with validation
* Simulated order creation
* User profile
* Previous mock orders
* Login and registration forms
* Password visibility controls
* Logout confirmation
* Unauthorized access page
* 404 Not Found page

### Admin Features

* Protected admin dashboard
* Dashboard statistics
* Product management
* Product search and filtering
* Add mock products
* Edit product data locally
* Disable products with confirmation
* Category management
* Order management
* Local order-status updates
* Responsive admin interface
* Customer access restriction

---

## Demo Accounts

### Customer Account

**Email:**
`customer@example.com`

**Password:**
`Customer123!`

### Admin Account

**Email:**
`admin@example.com`

**Password:**
`Admin123!`

> These are training/demo credentials stored in local mock data only. They are not real production credentials.

---

## Routes

The application includes the following React Router routes:

| Route           | Description      |
| --------------- | ---------------- |
| `/`             | Home page        |
| `/products`     | Products listing |
| `/products/:id` | Product details  |
| `/cart`         | Shopping cart    |
| `/checkout`     | Checkout         |
| `/login`        | Login            |
| `/register`     | Registration     |
| `/profile`      | User profile     |
| `/admin`        | Admin dashboard  |
| `*`             | 404 Not Found    |

---

## Project Structure

```text
ecommerce-frontend/
├── public/
│   ├── images/
│   ├── icons.svg
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   │   ├── products/
│   │   └── hero.png
│   │
│   ├── components/
│   │   ├── cart/
│   │   ├── common/
│   │   ├── layout/
│   │   └── products/
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── CatalogContext.jsx
│   │
│   ├── data/
│   │   ├── categories.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── users.js
│   │
│   ├── pages/
│   │   ├── AdminPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── ProductDetailsPage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── UnauthorizedPage.jsx
│   │
│   ├── styles/
│   │   ├── components.css
│   │   ├── global.css
│   │   └── variables.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── TASK_TEST_RESULTS.md
├── vercel.json
└── vite.config.js
```

---

## Reusable Components

The interface is divided into reusable components instead of placing the complete application inside `App.jsx`.

Main reusable components include:

* `Navbar`
* `Footer`
* `MainLayout`
* `ProductCard`
* `CategoryCard`
* `Button`
* `Input`
* `Modal`
* `ConfirmDialog`
* `Loader`
* `Alert`
* `EmptyState`
* `ProtectedRoute`
* `CartItem`
* `CartSummary`

These components are reused across different pages to keep the code organized and maintainable.

---

## State Management

The project uses React Context API for shared application state.

### AuthContext

Used to simulate:

* Login
* Logout
* Current user
* Customer role
* Admin role
* Protected routes

### CartContext

Used to manage:

* Adding products
* Removing products
* Updating quantities
* Cart totals
* Stock limits
* Cart persistence

### CatalogContext

Used for local catalog state and simulated admin modifications.

---

## LocalStorage

The shopping cart is persisted using browser `LocalStorage`.

This allows the cart to remain available after refreshing the page.

The cart totals are calculated from the current cart items and quantities rather than storing a separate total value that could become inconsistent.

---

## Mock Data

All application data is stored locally under:

```text
src/data/
```

The project includes mock:

* Products
* Categories
* Users
* Orders

The product dataset contains multiple products with different prices and stock states to support:

* Search
* Filtering
* Sorting
* Stock validation
* Out-of-stock scenarios

The application does not make network requests to a backend API during this task.

---

## Forms and Validation

Client-side validation is implemented for:

### Login

* Required email
* Valid email format
* Required password
* Clear validation messages
* Password show/hide control

### Registration

* Full name
* Email
* Phone number
* Password
* Password confirmation
* Terms acceptance
* Validation messages

### Checkout

* Customer name
* Phone
* Address
* City
* Payment method
* Required-field validation

### Admin Product Form

* Product name
* Category
* Price
* Stock quantity
* Image/product information

> These validations are educational frontend validations only and are not a replacement for backend validation.

---

## UI States

The application includes the required interface states:

* Loading
* Error
* Success
* Empty
* No Search Results
* Empty Cart
* Out of Stock
* Disabled
* Invalid Form
* Unauthorized
* Not Found

---

## Responsive Design

The interface is designed for the required screen sizes:

* **Desktop:** 1440px
* **Tablet:** 768px
* **Mobile:** 390px

The responsive layout includes:

* Mobile navigation
* Responsive product grids
* Responsive cards
* Flexible images
* Mobile-friendly forms
* Responsive cart and checkout layouts
* Responsive admin interface
* Appropriate spacing and typography
* No intentional horizontal overflow

---

## Accessibility

Accessibility considerations include:

* Semantic HTML landmarks
* `header`
* `nav`
* `main`
* `footer`
* Proper labels for form inputs
* Descriptive image `alt` text
* Visible keyboard focus styles
* Keyboard-friendly controls
* Buttons for actions
* Links for navigation
* Clear validation and status messages
* Dialogs that can be dismissed using the keyboard
* Status information not relying only on color

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/ahmadosama4795-a11y/ecommerce-frontend-task4.git
```

### 2. Enter the project directory

```bash
cd ecommerce-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173/
```

### 5. Create a production build

```bash
npm run build
```

The production build is generated in:

```text
dist/
```

---

## Deployment

The application is deployed using Vercel.

### GitHub Repository

https://github.com/ahmadosama4795-a11y/ecommerce-frontend-task4

### Production Preview

https://ecommerce-frontend-task4.vercel.app/

The project is configured to deploy from the `main` branch.

---

## Vercel SPA Routing

The project includes `vercel.json` to support React Router client-side routes when directly loading or refreshing a route in the deployed application.

The configuration rewrites incoming routes to the Vite application entry point so React Router can handle routes such as:

```text
/products
/products/:id
/cart
/checkout
/login
/register
/profile
/admin
```

and the application's `404` route.

---

## Testing

The project includes:

```text
TASK_TEST_RESULTS.md
```

The manual testing covers important application flows including:

* Navigation
* Product search
* Product filtering
* Product sorting
* Product details
* Cart operations
* LocalStorage persistence
* Stock-limit validation
* Checkout validation
* Customer authentication
* Admin authentication
* Protected routes
* Responsive layouts
* 404 handling
* Production build

---

## Task 4 Scope

This task intentionally focuses on the **React frontend**.

There is no connection to:

* REST API
* Node.js backend
* Express
* Neon
* Production database

The application uses mock data so that the frontend functionality can be developed and tested independently.

In the next task, the frontend can be connected to the real REST API to replace the local mock data with backend functionality.

---

## GitHub

Repository:

https://github.com/ahmadosama4795-a11y/ecommerce-frontend-task4

Latest deployment-related commit:

```text
6276b6c — Fix Vercel SPA routing
```

---

## Task 4 Completion

The project implements the required React/Vite frontend structure, React Router navigation, reusable components, local mock data, cart state management, LocalStorage persistence, form validation, responsive design, accessibility considerations, customer/admin flows, and Vercel deployment.

**Task 4 — React E-commerce Frontend**
