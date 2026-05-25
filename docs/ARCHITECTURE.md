# System Design & Architecture

## Overview

4-layer clean architecture with React frontend, Laravel backend, and MySQL database.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│  - Product Browsing & Filtering                              │
│  - Shopping Cart Management                                  │
│  - Checkout & Payment (Stripe)                               │
│  - User Account & Wishlist                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓ (HTTP/REST API)
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Laravel 11)                        │
│                                                               │
│  Layer 1: Presentation (Controllers & Routes)                │
│  ├── ProductController                                       │
│  ├── CartController                                          │
│  ├── OrderController                                         │
│  ├── WishlistController                                      │
│  └── CheckoutController                                      │
│                            ↓                                  │
│  Layer 2: Application (Services)                             │
│  ├── ProductService                                          │
│  ├── CartService                                             │
│  ├── OrderService                                            │
│  └── WishlistService                                         │
│                            ↓                                  │
│  Layer 3: Domain (Models & Repositories)                     │
│  ├── Models (User, Product, Order, Cart, etc.)               │
│  ├── Repository Contracts                                    │
│  └── Business Logic & Scopes                                 │
│                            ↓                                  │
│  Layer 4: Infrastructure (Database & Services)               │
│  ├── Eloquent ORM                                            │
│  ├── MySQL Database                                          │
│  ├── Stripe Payment Integration                              │
│  └── File Storage                                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    MySQL Database                            │
│  - 11 Core Tables                                            │
│  - Optimized Indexes                                         │
│  - Relationships & Constraints                               │
└─────────────────────────────────────────────────────────────┘
```

## 4-Layer Clean Architecture

Each layer has a specific responsibility and communicates through well-defined interfaces.

### Layer 1: Presentation (Controllers & Routes)
- HTTP request/response handling
- Input validation via Form Requests
- Response formatting via API Resources
- Error handling and status codes

**Location**: `backend/app/Http/Controllers/Api/`

### Layer 2: Application (Services)
- Business logic orchestration
- Use case implementation
- Data transformation
- Cross-cutting concerns

**Location**: `backend/app/Services/`

### Layer 3: Domain (Models & Repositories)
- Business entity definitions
- Repository interfaces
- Query scopes and business rules
- Data access abstraction

**Location**: `backend/app/Models/` and `backend/app/Repositories/`

### Layer 4: Infrastructure (Database & Services)
- Eloquent ORM implementation
- MySQL database operations
- Stripe payment integration
- File storage and caching

**Location**: `backend/database/` and service integrations

## Data Flow

### Product Browsing Flow
```
Frontend Request
    ↓
ProductController::index()
    ↓
ProductService::getAllProducts()
    ↓
ProductRepository::getAllPaginated()
    ↓
Product Model (with eager loading)
    ↓
MySQL Query (with indexes)
    ↓
ProductResource (format response)
    ↓
Frontend Response
```

### Checkout Flow
```
Frontend (Cart Data)
    ↓
CheckoutController::process()
    ↓
OrderService::createOrderFromCart()
    ↓
Stripe Payment Processing
    ↓
Order Model Creation
    ↓
OrderItem Creation (from cart items)
    ↓
CartService::clearCart()
    ↓
OrderResource (return order details)
    ↓
Frontend (Success/Error)
```

## Database Schema

### Core Tables (11 total)

| Table | Purpose |
|-------|---------|
| users | User accounts and profiles |
| categories | Product categories (hierarchical) |
| products | Product information |
| product_variants | Sizes, colors, stock levels |
| orders | Customer orders |
| order_items | Items in orders |
| carts | Shopping carts |
| cart_items | Items in carts |
| wishlists | Saved products |
| reviews | Product reviews |
| migrations | Schema versioning |

### Key Relationships

```
User (1) ──→ (N) Orders, Wishlists, Reviews
Product (N) ──→ (1) Category
Product (1) ──→ (N) Variants, Reviews, CartItems, OrderItems
Order (1) ──→ (N) OrderItems
Cart (1) ──→ (N) CartItems
```

### Indexing Strategy

- `products.category_id` - Category filtering
- `orders.user_id` - User orders
- `orders.status` - Order status queries
- `products.created_at` - New arrivals
- `products.price` - Price filtering
- Full-text index on `products.name` and `description`

## API Architecture

### Endpoint Categories

**Public** (No authentication):
- Product listing, search, details
- Category browsing

**Protected** (Requires authentication):
- Cart management
- Order management
- Wishlist management
- Checkout and payment

### Response Format

All responses follow consistent JSON structure:

```json
{
  "data": { /* resource data */ },
  "meta": { /* pagination info */ }
}
```

## Technology Choices

### Why Laravel + Eloquent?

| Aspect | Benefit |
|--------|---------|
| Framework | Excellent ecosystem, built-in auth, migrations |
| ORM | Powerful relationships, eager loading, scopes |
| Database | MySQL - proven reliability, full-text search |
| Authentication | Sanctum - token-based API auth |
| Validation | Built-in form requests |
| Testing | PHPUnit + Laravel utilities |

### Why React for Frontend?

| Aspect | Benefit |
|--------|---------|
| Component-based | Reusable UI components |
| Performance | Virtual DOM, efficient rendering |
| Ecosystem | Rich library ecosystem |
| Developer Experience | Hot reload, dev tools |
| TypeScript | Type safety, IDE support |

## Performance Optimization

### Database Level
- Strategic indexing on frequently queried columns
- Full-text search on product names/descriptions
- Eager loading to prevent N+1 queries
- Query scopes for reusable logic

### Application Level
- API response pagination
- Resource-based response formatting
- Caching for categories and popular products
- Lazy loading of relationships

### Frontend Level
- Code splitting with React.lazy()
- Image optimization
- Caching strategies
- Efficient state management

## Security Architecture

### Authentication & Authorization
- Laravel Sanctum for API tokens
- Password hashing with bcrypt
- CORS configuration for frontend domain
- Rate limiting on API endpoints

### Data Protection
- SQL injection prevention (Eloquent ORM)
- CSRF token protection
- Input validation on all endpoints
- Output sanitization via API Resources

### Payment Security
- PCI compliance via Stripe
- No sensitive payment data stored locally
- Webhook verification for payment events
- Secure environment variables
