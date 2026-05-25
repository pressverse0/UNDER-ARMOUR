# System Design & Architecture

## 4-Layer Clean Architecture

The backend follows a clean 4-layer architecture pattern for separation of concerns and maintainability.

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

---

## Data Flow Examples

### Product Browsing
```
Frontend Request → ProductController → ProductService 
→ ProductRepository → Product Model → MySQL 
→ ProductResource → Frontend Response
```

### Checkout Process
```
Frontend (Cart) → CheckoutController → OrderService 
→ Stripe Payment → Order Creation → OrderItem Creation 
→ CartService::clearCart() → OrderResource → Frontend
```

---

## Database Schema

### Core Tables (11 total)

| Table | Purpose |
|-------|---------|
| users | User accounts and profiles |
| categories | Product categories |
| products | Product information |
| product_variants | Sizes, colors, stock |
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

---

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

See [API.md](./API.md) for complete endpoint documentation.

---

## Technology Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| Backend | Laravel 11 | Excellent ecosystem, built-in auth, migrations |
| ORM | Eloquent | Powerful relationships, eager loading, scopes |
| Database | MySQL 8.0+ | Proven reliability, full-text search |
| Auth | Sanctum | Token-based API authentication |
| Frontend | React 18 | Component-based, virtual DOM, rich ecosystem |
| Language | TypeScript | Type safety, IDE support |

---

For setup instructions, see [SETUP.md](./SETUP.md)
For API reference, see [API.md](./API.md)
