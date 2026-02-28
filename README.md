# E-Commerce Marketplace

**Live Demo**

---

## About

A single-page e-commerce application featuring a customer-facing shop and an admin backoffice. Built to practice modern React architecture, strict TypeScript typing, and asynchronous state management.

### Key Features

- **Shop**: Browse and search products, filter by category/price/rating, product details with image gallery, favorites
- **Backoffice**: Admin panel for managing products and users
- **Authentication**: Role-based access (admin/user) with route guards
- **Real-time Chat**: WebSocket-powered chat for customer support
- **Responsive Design**: Mobile and desktop friendly

---

## Tech Stack

- **React 19** with **TypeScript 5.9** (strict mode, no `any`)
- **TanStack Router** for file-based routing
- **TanStack Query** for server state management
- **Material UI** for component library
- **Vite** for fast build and development
- **DummyJSON API** for backend data
- **WebSocket** for real-time chat (`wss://ws.ifelse.io`)

---

## Dependencies

```json
{
  "react": "^19.0.0",
  "typescript": "^5.9.3",
  "@tanstack/react-router": "^1.117.1",
  "@tanstack/react-query": "^5.90.21",
  "@mui/material": "^7.3.8",
  "vite": "^6.0.3"
}
```

---

## Getting Started

**Prerequisites:** Node.js ≥ 18, Yarn 4

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Open http://localhost:3000
```

### Login Credentials

Use any [DummyJSON user](https://dummyjson.com/users):

- **Admin**: `emilys` / `emilyspass`
- **User**: `michaelw` / `michaelwpass`

---

## Project Structure

```
src/
├── api/            # API client and endpoints
├── features/       # Feature modules (auth, shop, backoffice, chat)
├── routes/         # TanStack Router pages
├── shared/ui/      # Shared UI components
├── core/ui/        # Core reusable components
├── hooks/          # Custom React hooks
├── styles/         # Theme and global styles
└── utils/          # Helpers and constants
```

---

## Scripts

```bash
yarn dev        # Start dev server
yarn build      # Production build
yarn serve      # Preview production build
yarn typecheck  # TypeScript type checking
```

---

## Highlights

- Strict TypeScript typing (no `any` allowed)
- Clean architecture with modular feature structure
- TanStack Router with file-based routing
- TanStack Query for efficient data fetching and caching
- Material UI for polished interface components
- Real-time WebSocket chat with message persistence
- Role-based authentication and route guards
- Responsive design for mobile and desktop

---

## Resources

- [React Documentation](https://react.dev/)
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Query](https://tanstack.com/query/latest)
- [Material UI](https://mui.com/)
- [DummyJSON API](https://dummyjson.com/)
- [Vite](https://vite.dev/)
