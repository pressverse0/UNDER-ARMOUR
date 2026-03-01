# Under Armour E-Commerce Platform

![Under Armour](https://img.shields.io/badge/Under%20Armour-E--Commerce-red?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.2.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

A modern, high-performance e-commerce platform built with Next.js 15, featuring Under Armour's bold branding and athletic aesthetic. This full-stack application includes product browsing, shopping cart, checkout with Stripe integration, user accounts, and order tracking.

## 🚀 Live Demo

**Production:** [https://under-armour73.vercel.app](https://under-armour73.vercel.app)

## ✨ Features

- 🛍️ **Product Catalog** - Browse men's, women's, shoes, and sports categories
- 🛒 **Shopping Cart** - Add, remove, and manage cart items with real-time updates
- ❤️ **Wishlist** - Save favorite products for later
- 💳 **Stripe Checkout** - Secure payment processing
- 👤 **User Accounts** - Profile management, order history, and settings
- 📦 **Order Tracking** - Real-time order status and tracking information
- 🔍 **Product Details** - Image galleries, reviews, size selection, and sharing
- 📱 **Responsive Design** - Optimized for all devices
- 🎨 **Bold UI/UX** - Under Armour's signature sketchy borders and athletic styling
- 🔔 **Toast Notifications** - Custom styled notifications for all actions
- 🌙 **Theme Support** - Dark/light mode with next-themes

[View all features →](./docs/FEATURES.md)

## 🛠️ Technologies

- **Framework:** Next.js 15.2.6 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **UI Components:** Radix UI, shadcn/ui
- **Payment:** Stripe
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel

[View full tech stack →](./docs/TECHNOLOGIES.md)

## 📋 Prerequisites

- Node.js 18+ or higher
- npm, pnpm, or yarn
- Stripe account (for payment processing)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mostafa-SAID7/UNDER-ARMOUR.git
cd UNDER-ARMOUR
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
under-armour/
├── app/                    # Next.js app directory
│   ├── account/           # User account pages
│   ├── api/               # API routes
│   ├── checkout/          # Checkout flow
│   ├── product/           # Product details
│   └── sports/            # Sports categories
├── components/            # React components
│   └── ui/               # UI components (shadcn)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   └── ARMOUR/          # Product images
├── styles/               # Global styles
└── docs/                 # Documentation
```

[View detailed structure →](./docs/STRUCTURE.md)

## 🎨 Styling Guide

This project uses a custom design system inspired by Under Armour's bold, athletic aesthetic:

- **Sketchy Borders:** Hand-drawn style borders for cards and buttons
- **Bold Typography:** Black font weights and uppercase text
- **Red Accent:** #C9001F primary color
- **Custom Shadows:** 8px offset shadows for depth

[View styling guide →](./docs/STYLES.md)

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mostafa-SAID7/UNDER-ARMOUR)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./docs/CONTRIBUTING.md) and [Code of Conduct](./docs/CODE_OF_CONDUCT.md).

## 📝 Changelog

See [CHANGELOG.md](./docs/CHANGELOG.md) for a list of changes.

## 🔒 Security

For security concerns, please review our [Security Policy](./docs/SECURITY.md).

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**M.Said**
- Portfolio: [https://m-said-portfolio.netlify.app](https://m-said-portfolio.netlify.app)
- GitHub: [@Mostafa-SAID7](https://github.com/Mostafa-SAID7)

## 🙏 Acknowledgments

- Under Armour for brand inspiration
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Vercel](https://vercel.com) for hosting
- [Stripe](https://stripe.com) for payment processing

## 📞 Support

For support, email or open an issue on GitHub.

---

**© 2021 - 2024 Under Armour, Inc By M.Said**
