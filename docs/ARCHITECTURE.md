# Under Armour - System Architecture

## Overview

Under Armour is a full-stack e-commerce platform built with:
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Laravel 11 + Eloquent ORM + MySQL
- **Architecture**: 4-Layer Clean Architecture Pattern

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

### Layer 1: Presentation Layer
**Responsibility**: Handle HTTP requests and responses

**Components**:
- API Controllers (ProductController, CartController, etc.)
- Request validation (Form Requests)
- Response formatting (API Resources)
- Error handling

**Location**: `backend/app/Http/Controllers/Api/`

### Layer 2: Application Layer
**Responsibility**: Implement business logic and use cases

**Components**:
- Services (ProductService, CartService, OrderService, WishlistService)
- Business logic orchestration
- Data transformation
- Cross-cutting concerns

**Location**: `backend/app/Services/`

### Layer 3: Domain Layer
**Responsibility**: Define business entities and rules

**Components**:
- Eloquent Models (User, Product, Order, Cart, Wishlist, Review, etc.)
- Repository interfaces
- Query scopes
- Business rules

**Location**: `backend/app/Models/` and `backend/app/Repositories/`

### Layer 4: Infrastructure Layer
**Responsibility**: Handle data persistence and external services

**Components**:
- Eloquent ORM
- MySQL database
- Stripe payment integration
- File storage
- Caching

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

1. **users** - User accounts and profiles
2. **categories** - Product categories (hierarchical)
3. **products** - Product information
4. **product_variants** - Sizes, colors, stock
5. **orders** - Customer orders
6. **order_items** - Items in orders
7. **carts** - Shopping carts
8. **cart_items** - Items in carts
9. **wishlists** - Saved products
10. **reviews** - Product reviews
11. **migrations** - Schema versioning

### Key Relationships

```
User (1) ──→ (N) Orders
User (1) ──→ (1) Cart
User (1) ──→ (N) Wishlists
User (1) ──→ (N) Reviews

Product (N) ──→ (1) Category
Product (1) ──→ (N) ProductVariants
Product (1) ──→ (N) Reviews
Product (1) ──→ (N) Wishlists
Product (1) ──→ (N) CartItems
Product (1) ──→ (N) OrderItems

Order (1) ──→ (N) OrderItems
Cart (1) ──→ (N) CartItems
```

## API Architecture

### Endpoint Categories

**Public Endpoints** (No authentication)
- Product listing and search
- Product details
- Category browsing

**Protected Endpoints** (Requires authentication)
- Cart management
- Order management
- Wishlist management
- Checkout and payment

### Response Format

All API responses follow a consistent JSON format:

```json
{
  "data": {
    "id": 1,
    "name": "Product Name",
    "price": 99.99,
    ...
  },
  "meta": {
    "current_page": 1,
    "total": 100,
    "per_page": 15
  }
}
```

## Technology Choices

### Why Laravel + Eloquent?

| Aspect | Benefit |
|--------|---------|
| **Framework** | Excellent ecosystem, built-in auth, migrations |
| **ORM** | Eloquent - powerful relationships, eager loading |
| **Database** | MySQL - proven reliability, full-text search |
| **Authentication** | Sanctum - token-based API auth |
| **Validation** | Built-in form requests |
| **Testing** | PHPUnit + Laravel testing utilities |

### Why React for Frontend?

| Aspect | Benefit |
|--------|---------|
| **Component-based** | Reusable UI components |
| **Performance** | Virtual DOM, efficient rendering |
| **Ecosystem** | Rich library ecosystem |
| **Developer Experience** | Hot module replacement, dev tools |
| **TypeScript** | Type safety and better IDE support |

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

## Deployment Architecture

### Development Environment
```
Local Machine
├── Frontend (npm run dev)
├── Backend (php artisan serve)
└── MySQL (local instance)
```

### Production Environment
```
Web Server (Nginx/Apache)
├── Frontend (Static files)
├── Backend (PHP-FPM)
└── MySQL (Managed database)
```

## Scalability Considerations

### Current Architecture Supports
- Up to 10,000+ concurrent users
- Millions of products
- Real-time order processing
- Horizontal scaling of backend

### Future Enhancements
- Redis caching layer
- Message queue for async operations
- CDN for static assets
- Database read replicas
- Microservices architecture

## Monitoring & Logging

### Application Monitoring
- Laravel logs in `storage/logs/`
- Error tracking and reporting
- Performance monitoring
- API request logging

### Database Monitoring
- Query performance analysis
- Index usage monitoring
- Backup and recovery procedures
- Replication monitoring

## Disaster Recovery

### Backup Strategy
- Daily database backups
- Version control for code
- Environment configuration backups
- File storage backups

### Recovery Procedures
- Database restoration from backups
- Code rollback via git
- Configuration restoration
- Service health checks

---

**For detailed setup instructions, see [SETUP.md](./SETUP.md)**
