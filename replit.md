# Under Armour

An Under Armour e-commerce web app with product browsing, cart, wishlist, checkout, and account management.

## Run & Operate

- `PORT=19131 BASE_PATH=/ pnpm --filter @workspace/under-armour run dev` — run the frontend (port 19131)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript
- Frontend: React + Vite + Tailwind CSS v4
- Routing: wouter
- State: React Context (cart, wishlist)
- UI: shadcn/ui + Radix UI
- Payments: Stripe (react-stripe-js)

## Where things live

- `artifacts/under-armour/src/App.tsx` — router and providers
- `artifacts/under-armour/src/pages/` — all page components
- `artifacts/under-armour/src/components/` — shared components (header, footer, cart, etc.)
- `artifacts/under-armour/src/context/` — cart and wishlist context
- `artifacts/under-armour/src/hooks/` — custom hooks
- `artifacts/under-armour/src/index.css` — Tailwind + theme tokens

## Routes

Home, /men, /women, /shoes, /kids, /accessories, /sale, /new-arrivals, /track-order, /sports/*, /account/*, /checkout/*, /product/:id, /support/*

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
