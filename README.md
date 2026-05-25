# Under Armour E-Commerce Platform

A full-stack e-commerce platform built with **React 18**, **Laravel 11**, and **MySQL**, featuring a clean 4-layer architecture pattern.

## 🎯 Overview

Under Armour is a modern e-commerce platform that provides:

- ✅ **Product Browsing** - Browse products by category, gender, and sports type
- ✅ **Advanced Filtering** - Filter by price, size, color, and search
- ✅ **Shopping Cart** - Add/remove items with real-time calculations
- ✅ **Wishlist** - Save favorite products for later
- ✅ **Secure Checkout** - Stripe payment integration
- ✅ **Order Tracking** - Track orders in real-time
- ✅ **User Accounts** - Manage profile and order history
- ✅ **Product Reviews** - Rate and review products

## 🏗️ Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript + Vite | User interface |
| **Backend** | Laravel 11 + Eloquent ORM | API & business logic |
| **Database** | MySQL 8.0+ | Data persistence |
| **Authentication** | Laravel Sanctum | API token auth |
| **Payments** | Stripe | Payment processing |

### 4-Layer Clean Architecture

```
┌─────────────────────────────────────────┐
│ Layer 1: Presentation (Controllers)     │
├─────────────────────────────────────────┤
│ Layer 2: Application (Services)         │
├─────────────────────────────────────────┤
│ Layer 3: Domain (Models & Repositories) │
├─────────────────────────────────────────┤
│ Layer 4: Infrastructure (Database)      │
└─────────────────────────────────────────┘
```

## 📁 Project Structure

```
UNDER-ARMOUR/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/              # Controllers & Resources
│   │   ├── Services/          # Business logic
│   │   ├── Models/            # Eloquent models
│   │   └── Repositories/      # Data access layer
│   ├── database/
│   │   ├── migrations/        # Database schema
│   │   ├── seeders/           # Sample data
│   │   └── factories/         # Model factories
│   ├── routes/
│   │   └── api.php            # API routes
│   └── README.md              # Backend documentation
│
├── under-armour/              # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom hooks
│   │   ├── context/           # Global state
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Helper functions
│   ├── public/                # Static assets
│   └── package.json           # Dependencies
│
├── docs/                      # Documentation
│   ├── SETUP.md              # Setup instructions
│   ├── API.md                # API documentation
│   ├── ARCHITECTURE.md       # Architecture details
│   └── CONTRIBUTING.md       # Contributing guide
│
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- **PHP 8.2+**
- **Node.js 18+**
- **MySQL 8.0+**
- **Composer**
- **Git**

### Backend Setup (5 minutes)

```bash
cd backend

# Install dependencies
composer install

# Generate key
php artisan key:generate

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Create database
mysql -u root -p
CREATE DATABASE under_armour;

# Run migrations
php artisan migrate

# Start server
php artisan serve
```

Backend available at: `http://localhost:8000`

### Frontend Setup (5 minutes)

```bash
cd under-armour

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend available at: `http://localhost:5173`

## 📚 Documentation

- **[Setup Guide](./docs/SETUP.md)** - Detailed installation instructions
- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and patterns
- **[Contributing](./docs/CONTRIBUTING.md)** - How to contribute

## 🔑 Key Features

### Frontend Features

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

### Backend Features

- 🔐 Token-based authentication (Sanctum)
- 📊 30+ API endpoints
- 🗄️ 11 database tables with relationships
- 💰 Stripe payment integration
- 📈 Advanced filtering and search
- 🔄 Order management system
- 📝 Product reviews system
- 🎯 Clean architecture pattern
- ✅ Input validation
- 🛡️ Security best practices

## 📊 Database Schema

### Core Tables

1. **users** - User accounts
2. **categories** - Product categories
3. **products** - Product information
4. **product_variants** - Sizes, colors, stock
5. **orders** - Customer orders
6. **order_items** - Items in orders
7. **carts** - Shopping carts
8. **cart_items** - Items in carts
9. **wishlists** - Saved products
10. **reviews** - Product reviews

## 🔌 API Endpoints

### Public Endpoints

```
GET    /api/products                    # List products
GET    /api/products/{id}               # Get product details
GET    /api/products/search?q=term      # Search products
GET    /api/products/new-arrivals       # New products
GET    /api/products/sale               # Sale products
```

### Protected Endpoints

```
GET    /api/cart                        # Get cart
POST   /api/cart/items                  # Add to cart
PUT    /api/cart/items/{id}             # Update cart item
DELETE /api/cart/items/{id}             # Remove from cart

GET    /api/orders                      # Get orders
GET    /api/orders/{id}                 # Get order details

GET    /api/wishlist                    # Get wishlist
POST   /api/wishlist                    # Add to wishlist
DELETE /api/wishlist/{id}               # Remove from wishlist

POST   /api/checkout/validate           # Validate checkout
POST   /api/checkout/process            # Process payment
```

See [API Documentation](./docs/API.md) for complete reference.

## 🔐 Security

- ✅ SQL injection prevention (Eloquent ORM)
- ✅ CSRF protection
- ✅ Password hashing (bcrypt)
- ✅ API token authentication
- ✅ Input validation
- ✅ Output sanitization
- ✅ PCI compliance (Stripe)
- ✅ CORS configuration

## 📈 Performance

- ⚡ Database query optimization
- 🔄 Eager loading (prevents N+1 queries)
- 📑 Pagination for large datasets
- 🔍 Full-text search support
- 💾 Strategic database indexing
- 🎯 API response caching
- 📦 Code splitting (frontend)

## 🧪 Testing

### Backend

```bash
cd backend
php artisan test
```

### Frontend

```bash
cd under-armour
npm test
```

## 🚢 Deployment

### Backend Deployment

```bash
cd backend
php artisan migrate --force
php artisan config:cache
php artisan route:cache
composer install --optimize-autoloader --no-dev
```

### Frontend Deployment

```bash
cd under-armour
npm run build
# Deploy dist/ folder to web server
```

See [Setup Guide](./docs/SETUP.md) for detailed deployment instructions.

## 🛠️ Development

### Start Development Servers

Terminal 1 (Backend):
```bash
cd backend
php artisan serve
```

Terminal 2 (Frontend):
```bash
cd under-armour
npm run dev
```

### Common Commands

**Backend**
```bash
php artisan migrate              # Run migrations
php artisan db:seed              # Seed database
php artisan test                 # Run tests
php artisan cache:clear          # Clear cache
```

**Frontend**
```bash
npm run dev                       # Start dev server
npm run build                     # Build for production
npm run typecheck                 # Type checking
npm test                          # Run tests
```

## 🤝 Contributing

We welcome contributions! Please see [Contributing Guide](./docs/CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "feat: your feature"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

## 📝 License

MIT License - See LICENSE file for details

## 🆘 Support

- 📖 Check [Documentation](./docs/)
- 🐛 Report issues on GitHub
- 💬 Discuss in GitHub Discussions
- 📧 Contact maintainers

## 🎓 Learning Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Eloquent ORM Guide](https://laravel.com/docs/eloquent)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Stripe API Reference](https://stripe.com/docs/api)

## 📊 Project Stats

- **Backend**: 10+ models, 30+ API endpoints, 4-layer architecture
- **Frontend**: 20+ components, TypeScript, responsive design
- **Database**: 11 tables, optimized indexes, relationships
- **Tests**: Unit and integration tests
- **Documentation**: Comprehensive guides and API docs

## 🎉 Acknowledgments

Built with modern technologies and best practices for e-commerce platforms.

---

**Ready to get started?** See [Setup Guide](./docs/SETUP.md)

**Questions?** Check [Documentation](./docs/) or [Contributing Guide](./docs/CONTRIBUTING.md)

**Want to contribute?** See [Contributing Guide](./docs/CONTRIBUTING.md)

---

**Last Updated**: January 2024
**Version**: 1.0.0
