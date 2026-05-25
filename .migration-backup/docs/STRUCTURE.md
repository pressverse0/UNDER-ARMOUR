# Project Structure

```
under-armour/
├── .git/                          # Git repository
├── .next/                         # Next.js build output
├── .vercel/                       # Vercel deployment config
├── node_modules/                  # Dependencies
├── public/                        # Static assets
│   ├── ARMOUR/                   # Product images
│   │   ├── Charged Assert 10.jpg
│   │   ├── HOVR Phantom 3.jpg
│   │   ├── HeatGear Training Shirt.jpg
│   │   └── ... (24 product images)
│   ├── athletic-gear-display.png
│   ├── intense-athlete-training-sketch.png
│   ├── placeholder-logo.png
│   ├── placeholder-user.jpg
│   ├── icon.png
│   ├── icon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── app/                           # Next.js App Router
│   ├── account/                  # User account pages
│   │   ├── orders/              # Order history
│   │   │   ├── orders-client.tsx
│   │   │   └── page.tsx
│   │   ├── settings/            # Account settings
│   │   │   └── page.tsx
│   │   ├── wishlist/            # Saved products
│   │   │   └── page.tsx
│   │   ├── account-client.tsx   # Profile client component
│   │   └── page.tsx             # Profile page
│   ├── accessories/              # Accessories category
│   │   └── page.tsx
│   ├── api/                      # API routes
│   │   └── checkout/            # Stripe checkout
│   │       └── route.ts
│   ├── checkout/                 # Checkout flow
│   │   ├── success/             # Order confirmation
│   │   │   └── page.tsx
│   │   └── page.tsx             # Checkout form
│   ├── kids/                     # Kids category
│   │   └── page.tsx
│   ├── men/                      # Men's category
│   │   └── page.tsx
│   ├── product/                  # Product details
│   │   └── [id]/                # Dynamic route
│   │       └── page.tsx
│   ├── shoes/                    # Shoes category
│   │   └── page.tsx
│   ├── sports/                   # Sports categories
│   │   ├── basketball/
│   │   │   └── page.tsx
│   │   ├── football/
│   │   │   └── page.tsx
│   │   ├── golf/
│   │   │   └── page.tsx
│   │   ├── running/
│   │   │   └── page.tsx
│   │   ├── training/
│   │   │   └── page.tsx
│   │   └── page.tsx             # Sports hub
│   ├── support/                  # Support pages
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   ├── returns/
│   │   │   └── page.tsx
│   │   ├── shipping/
│   │   │   └── page.tsx
│   │   └── size-guide/
│   │       └── page.tsx
│   ├── women/                    # Women's category
│   │   └── page.tsx
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── not-found.tsx            # 404 page
│   └── page.tsx                 # Home page
├── components/                    # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button-group.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── empty.tsx
│   │   ├── field.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-group.tsx
│   │   ├── input-otp.tsx
│   │   ├── input.tsx
│   │   ├── item.tsx
│   │   ├── kbd.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   ├── tooltip.tsx
│   │   └── use-toast.ts
│   ├── cart-sidebar.tsx         # Shopping cart sidebar
│   ├── footer.tsx               # Footer component
│   ├── header.tsx               # Header/navigation
│   ├── theme-provider.tsx       # Theme context
│   └── wishlist-sidebar.tsx     # Wishlist sidebar
├── hooks/                         # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection
│   └── use-toast.ts             # Toast notifications
├── lib/                           # Utility functions
│   └── utils.ts                 # Helper functions
├── styles/                        # Additional styles
│   └── globals.css              # Global CSS
├── docs/                          # Documentation
│   ├── CHANGELOG.md             # Version history
│   ├── CODE_OF_CONDUCT.md       # Community guidelines
│   ├── CONTRIBUTING.md          # Contribution guide
│   ├── FEATURES.md              # Feature documentation
│   ├── SECURITY.md              # Security policy
│   ├── STRUCTURE.md             # This file
│   ├── STYLES.md                # Styling guide
│   ├── TECHNOLOGIES.md          # Tech stack
│   └── USE_CASES.md             # Use cases
├── .env.local                     # Environment variables (gitignored)
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── .vercelignore                 # Vercel ignore rules
├── components.json               # shadcn/ui config
├── next-env.d.ts                 # Next.js TypeScript declarations
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Dependency lock file
├── pnpm-lock.yaml                # pnpm lock file
├── postcss.config.mjs            # PostCSS configuration
├── README.md                     # Project documentation
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Directory Explanations

### `/app` - Application Pages
Next.js 15 App Router directory containing all pages and layouts.

#### Key Subdirectories:
- **`/account`** - User account management (profile, orders, wishlist, settings)
- **`/api`** - Backend API routes (Stripe checkout)
- **`/checkout`** - Checkout flow and success page
- **`/product/[id]`** - Dynamic product detail pages
- **`/sports`** - Sports category pages (basketball, football, etc.)
- **`/support`** - Customer support pages (FAQ, contact, returns)

### `/components` - React Components
Reusable UI components and layouts.

#### Key Components:
- **`/ui`** - shadcn/ui component library (57 components)
- **`header.tsx`** - Navigation header with cart/wishlist
- **`footer.tsx`** - Site footer with links
- **`cart-sidebar.tsx`** - Shopping cart slide-out
- **`wishlist-sidebar.tsx`** - Wishlist slide-out
- **`theme-provider.tsx`** - Dark/light theme context

### `/hooks` - Custom Hooks
React hooks for shared functionality.

- **`use-toast.ts`** - Toast notification system
- **`use-mobile.ts`** - Mobile device detection

### `/lib` - Utilities
Helper functions and utilities.

- **`utils.ts`** - Class name merging, formatting, etc.

### `/public` - Static Assets
Publicly accessible files served at root.

#### Key Assets:
- **`/ARMOUR`** - Product images (24 images)
- **`icon.png/svg`** - Favicon
- **`robots.txt`** - SEO crawler instructions
- **`sitemap.xml`** - Site structure for SEO

### `/docs` - Documentation
Project documentation files.

- **`CHANGELOG.md`** - Version history
- **`CONTRIBUTING.md`** - How to contribute
- **`FEATURES.md`** - Feature list
- **`SECURITY.md`** - Security policy
- **`STRUCTURE.md`** - This file
- **`STYLES.md`** - Styling guide
- **`TECHNOLOGIES.md`** - Tech stack
- **`USE_CASES.md`** - Use cases

### `/styles` - Global Styles
Additional CSS files.

- **`globals.css`** - Global CSS styles

## Configuration Files

### Next.js
- **`next.config.mjs`** - Next.js configuration
- **`next-env.d.ts`** - TypeScript declarations

### TypeScript
- **`tsconfig.json`** - TypeScript compiler options

### Tailwind CSS
- **`tailwind.config.ts`** - Tailwind configuration
- **`postcss.config.mjs`** - PostCSS plugins

### Package Management
- **`package.json`** - Dependencies and scripts
- **`package-lock.json`** - npm lock file
- **`pnpm-lock.yaml`** - pnpm lock file

### UI Components
- **`components.json`** - shadcn/ui configuration

### Linting
- **`.eslintrc.json`** - ESLint rules

### Git
- **`.gitignore`** - Files to ignore in Git
- **`.vercelignore`** - Files to ignore in Vercel

### Environment
- **`.env.local`** - Environment variables (not in Git)

## File Naming Conventions

### Pages
- `page.tsx` - Route page component
- `layout.tsx` - Route layout component
- `loading.tsx` - Loading UI
- `error.tsx` - Error UI
- `not-found.tsx` - 404 UI

### Components
- `kebab-case.tsx` - Component files
- `PascalCase` - Component names

### API Routes
- `route.ts` - API route handler

### Utilities
- `kebab-case.ts` - Utility files
- `camelCase` - Function names

## Import Aliases

```typescript
@/components/* → components/*
@/lib/* → lib/*
@/hooks/* → hooks/*
@/app/* → app/*
```

## Code Organization

### Component Structure
```typescript
// 1. Imports
import { ... } from "..."

// 2. Types/Interfaces
interface Props { ... }

// 3. Component
export default function Component({ ... }: Props) {
  // 4. State
  const [state, setState] = useState()
  
  // 5. Effects
  useEffect(() => { ... }, [])
  
  // 6. Handlers
  const handleClick = () => { ... }
  
  // 7. Render
  return (...)
}
```

### Page Structure
```typescript
// 1. Metadata (if server component)
export const metadata: Metadata = { ... }

// 2. Page Component
export default function Page() {
  return (
    <>
      <Header />
      <main>...</main>
      <Footer />
    </>
  )
}
```
