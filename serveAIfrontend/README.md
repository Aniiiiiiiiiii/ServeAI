# ServeAI POS Frontend

## Project Overview

ServeAI POS is an AI-powered hotel ordering and POS SaaS frontend built with Next.js App Router, TypeScript, Tailwind CSS, lucide-react, Zustand, Axios, Sonner, React Hook Form, Zod, and TanStack Table-ready dependencies. The app is login-first and role-based: admins manage the full system, chefs work from the kitchen board, and waiters handle ordering and delivery workflows.

## Folder Structure

```txt
src/
├── app/                 # App Router pages and layouts
├── components/          # Reusable UI building blocks
├── features/            # Feature module exports
├── hooks/               # Reserved for reusable hooks
├── lib/                 # API facade and demo data
├── store/               # Zustand cart state
├── types/               # Domain TypeScript types
└── utils/               # Formatting and UI helpers
```

## Components

Reusable components live in `src/components/app-components.tsx`, including sidebar, topbar, mobile navigation, page headers, stat cards, section cards, status badges, search input, loading/error/empty states, data table, order cards, product cards, menu cards, cart items, quantity selector, timeline, confirm dialog, reusable form, filter bar, dashboard cards, metric cards, and AI insight cards.

## Features

Feature modules in `src/features` expose orders, menu, cart, reviews, auth demo session, and AI insight capabilities without coupling screens directly to data files.

## Demo Data

Demo data is stored in `src/lib/demo`:

- `orders.ts`
- `menu.ts`
- `categories.ts`
- `reviews.ts`
- `staff.ts`
- `rooms.ts`
- `insights.ts`
- `users.ts`

## Auth Flow

The root route `/` renders the login screen, and `/auth/login` renders the same login experience. Login is currently mock/demo based:

1. The form validates email and password with React Hook Form and Zod.
2. `loginUser(email, password)` checks credentials against `src/lib/demo/users.ts`.
3. The safe user object and role are stored in `localStorage`.
4. The user is redirected to the default route for their role.
5. `AuthGate` protects routes on the client and redirects unauthenticated or unauthorized users.

## Mock Credentials

| Role   | Email                                           | Password  | Access                   |
| ------ | ----------------------------------------------- | --------- | ------------------------ |
| Admin  | [admin@serveai.com](mailto:admin@serveai.com)   | admin123  | Full system              |
| Chef   | [chef@serveai.com](mailto:chef@serveai.com)     | chef123   | Kitchen board only       |
| Waiter | [waiter@serveai.com](mailto:waiter@serveai.com) | waiter123 | Order/Menu/Cart/Delivery |

## Role Permissions

- Admin: full access to admin, kitchen, delivery, and ordering routes.
- Chef: kitchen board only.
- Waiter: order/menu/cart/checkout/tracking and delivery board.

## Redirect Rules

- Admin redirects to `/admin/dashboard`.
- Chef redirects to `/kitchen`.
- Waiter redirects to `/order`.
- Logged-out users opening protected routes redirect to `/auth/login`.
- Logged-in users opening unauthorized routes redirect to their default route.

## Protected Routes

Route protection is centralized in `src/components/auth-gate.tsx` using helpers from `src/lib/auth.ts`:

- `getCurrentUser()`
- `loginUser(email, password)`
- `logoutUser()`
- `getDefaultRouteByRole(role)`
- `canAccessRoute(role, pathname)`

## API Layer

`src/lib/api.ts` centralizes all API-like calls and currently returns demo data with a small async delay. Backend integration can replace these functions without rewriting components:

- `getOrders()`
- `getOrderById()`
- `updateOrderStatus()`
- `getMenuItems()`
- `createMenuItem()`
- `updateMenuItem()`
- `deleteMenuItem()`
- `getCategories()`
- `getReviews()`
- `getStaff()`
- `getRooms()`
- `getInsights()`

## How To Run

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:3000/admin/dashboard`
- `http://localhost:3000/order`
- `http://localhost:3000/kitchen`
- `http://localhost:3000/delivery`

## Future Backend Integration

Replace the demo-backed functions in `src/lib/api.ts` with real Axios calls, connect kitchen and delivery updates to WebSockets or server-sent events, and persist cart/order checkout state through the backend.

## Future Backend Auth Integration

The mock auth layer is intentionally isolated so it can be replaced with backend JWT auth later. Swap `src/lib/auth.ts` for API-backed login/logout/session refresh, move route enforcement to middleware or server checks where appropriate, store secure tokens in HTTP-only cookies, and map backend roles to the existing `UserRole` permissions.

## Design System

The UI uses a vibrant Blinkit-inspired lime primary color with a dark charcoal/navy secondary accent. The global theme is configured in `src/app/globals.css` with soft shadows, spacious cards, high-contrast typography, and responsive layouts for desktop, tablet, and mobile.

## State Management

Zustand is used only for guest cart state in `src/store/cart-store.ts`. Other screens use local state around demo data to keep the frontend foundation simple and easy to replace with backend data.

# Implementation Progress

## Completed

- Admin shell with collapsible sidebar, topbar, and responsive content area
- Login-first auth flow with admin, chef, and waiter roles
- Role-based route protection and redirects
- Role-aware navigation and logout controls
- Admin dashboard, orders, menu, categories, rooms, staff, reviews, AI insights, and settings routes
- Kitchen Kanban board with one-click status movement
- Delivery pickup, active, and completed delivery views
- Guest menu, product details, cart, checkout, and tracking flow
- Centralized API facade
- Strong domain types
- Demo data for all modules
- Reusable UI component foundation
- Toasts for create, update, delete, cart, and order actions
- Loading and error route states
- Production build verification

## Placeholder

- Chart visuals are styled placeholders ready for real analytics data.
- QR blocks are visual placeholders ready for generated QR images.
- Auth uses localStorage and mock users until backend auth is connected.

## Future Work

- Real backend and database integration
- Backend JWT authentication and server-side protected routes
- WebSocket/SSE live order updates
- Payment and room charge integration
- Production QR generation
- Automated UI and interaction tests
