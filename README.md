# Under Armour E-Commerce Platform

A full-stack e-commerce platform built with **React 18**, **Laravel 11**, and **MySQL**, featuring a clean 4-layer architecture pattern.

## 📚 Documentation

- **[Setup & Installation](./docs/SETUP.md)** - Quick start guide
- **[API Reference](./docs/API.md)** - Complete endpoint documentation
- **[System Design](./docs/ARCHITECTURE.md)** - Architecture & database design
- **[Security & Best Practices](./docs/SECURITY.md)** - Security guidelines
- **[Performance Optimization](./docs/PERFORMANCE.md)** - Performance strategies
- **[Contributing](./docs/CONTRIBUTING.md)** - Development guidelines

---

## ✨ Features

### Frontend
- 🛍️ Product browsing with advanced filters
- 🔍 Full-text search functionality
- 🛒 Shopping cart with real-time updates
- ❤️ Wishlist management
- 💳 Secure checkout with Stripe
- 📦 Order tracking
- 👤 User account management
- ⭐ Product reviews and ratings
- 📱 Responsive design
- 🌙 Dark mode support

### Backend
- 🔐 Token-based authentication (Sanctum)
- 📊 30+ RESTful API endpoints
- 🗄️ 11 database tables with relationships
- 💰 Stripe payment integration
- 📈 Advanced filtering and search
- 🔄 Order management system
- 📝 Product reviews system
- 🎯 Clean 4-layer architecture
- ✅ Input validation & error handling
- 🛡️ Security best practices

---

## 🏗️ System Design

### Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Backend | Laravel 11 + Eloquent ORM |
| Database | MySQL 8.0+ |
| Authentication | Laravel Sanctum |
| Payments | Stripe |

### 4-Layer Clean Architecture

```
┌─────────────────────────────────────────┐
│ Layer 1: Presentation (Controllers)     │
│ - HTTP endpoints & request handling     │
├─────────────────────────────────────────┤
│ Layer 2: Application (Services)         │
│ - Business logic & use cases            │
├─────────────────────────────────────────┤
│ Layer 3: Domain (Models & Repositories) │
│ - Business entities & data access       │
├─────────────────────────────────────────┤
│ Layer 4: Infrastructure (Database)      │
│ - Data persistence & external services  │
└─────────────────────────────────────────┘
```

### Data Flow

**Product Browsing**:
Frontend → Controller → Service → Repository → Model → Database → Resource → Frontend

**Checkout**:
Frontend → Controller → Service → Stripe → Order Creation → Database → Response

### Database Schema

**Core Tables** (11 total):
- users, categories, products, product_variants
- orders, order_items, carts, cart_items
- wishlists, reviews, migrations

**Key Relationships**:
- User (1) → (N) Orders, Wishlists, Reviews
- Product (N) → (1) Category
- Product (1) → (N) Variants, Reviews, CartItems, OrderItems
- Order (1) → (N) OrderItems
- Cart (1) → (N) CartItems

---

## 📁 Project Structure

```
UNDER-ARMOUR/
│
├── backend/                          # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/     # 5 API Controllers
│   │   ├── Http/Resources/           # 7 API Resources
│   │   ├── Services/                 # 4 Service Classes
│   │   ├── Models/                   # 10 Eloquent Models
│   │   └── Repositories/             # Repository Pattern
│   ├── database/
│   │   ├── migrations/               # 10 Migrations
│   │   ├── seeders/                  # Sample Data
│   │   └── factories/                # Model Factories
│   ├── routes/api.php                # 30+ API Routes
│   ├── .env.example                  # Environment Template
│   └── composer.json                 # PHP Dependencies
│
├── under-armour/                     # React Frontend
│   ├── src/
│   │   ├── components/               # Reusable Components
│   │   ├── pages/                    # Page Components
│   │   ├── hooks/                    # Custom Hooks
│   │   ├── context/                  # Global State
│   │   ├── types/                    # TypeScript Types
│   │   └── utils/                    # Helper Functions
│   ├── public/                       # Static Assets
│   └── package.json                  # Dependencies
│
├── docs/                             # Documentation
│   ├── SETUP.md                      # Installation Guide
│   ├── API.md                        # API Reference
│   ├── ARCHITECTURE.md               # System Design
│   └── CONTRIBUTING.md               # Developer Guide
│
└── README.md                         # This File
```

### Backend Structure Details

**Controllers** (Layer 1):
- ProductController - Product endpoints
- CartController - Cart management
- OrderController - Order operations
- WishlistController - Wishlist endpoints
- CheckoutController - Payment processing

**Services** (Layer 2):
- ProductService - Product operations
- CartService - Cart calculations
- OrderService - Order processing
- WishlistService - Wishlist operations

**Models** (Layer 3):
- User, Product, ProductVariant, Category
- Order, OrderItem, Cart, CartItem
- Wishlist, Review

**Repositories** (Layer 3):
- ProductRepositoryContract (interface)
- ProductRepository (Eloquent implementation)

---

## 🚀 Quick Start

### Prerequisites
- PHP 8.2+, Node.js 18+, MySQL 8.0+, Composer, Git

### Backend (5 min)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend (5 min)
```bash
cd under-armour
npm install
npm run dev
```

---

**Ready to start?** → [Setup Guide](./docs/SETUP.md)

**Need help?** → [Documentation](./docs/) | [Contributing](./docs/CONTRIBUTING.md)

---

**Version**: 1.0.0 | **License**: MIT
