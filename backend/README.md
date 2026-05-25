# Under Armour E-Commerce Backend API

A clean architecture Laravel backend for the Under Armour e-commerce platform with 4-layer architecture pattern.

## Architecture Overview

### 4-Layer Clean Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 1: Presentation Layer (API Routes & Controllers)      │
│ - HTTP endpoints                                             │
│ - Request validation                                         │
│ - Response formatting                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Layer 2: Application Layer (Services)                        │
│ - Business logic orchestration                               │
│ - Use case implementation                                    │
│ - Data transformation                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Layer 3: Domain Layer (Models & Repositories)                │
│ - Business rules                                             │
│ - Entity definitions                                         │
│ - Repository interfaces                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Layer 4: Infrastructure Layer (Database & External Services) │
│ - Eloquent ORM                                               │
│ - Database operations                                        │
│ - Stripe integration                                         │
│ - File storage                                               │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

- **Framework**: Laravel 11
- **ORM**: Eloquent (Laravel's built-in ORM)
- **Database**: MySQL 8.0+
- **Authentication**: Laravel Sanctum
- **Payment**: Stripe
- **PHP**: 8.2+

## Why Eloquent ORM?

✅ **Excellent Relationship Handling** - Supports all relationship types (One-to-Many, Many-to-Many, Polymorphic)
✅ **Query Builder** - Fluent interface for complex queries
✅ **Built-in Migrations** - Version control for database schema
✅ **Soft Deletes** - Logical deletion support
✅ **Eager Loading** - Prevents N+1 query problems
✅ **Scopes** - Reusable query logic
✅ **Factories & Seeders** - Easy testing and data population

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/          # API Controllers (Layer 1)
│   │   ├── Requests/                 # Form request validation
│   │   └── Resources/                # API response resources
│   ├── Services/                     # Business logic (Layer 2)
│   ├── Models/                       # Eloquent models (Layer 3)
│   ├── Repositories/                 # Data access layer (Layer 3)
│   │   ├── Contracts/                # Repository interfaces
│   │   └── Eloquent/                 # Eloquent implementations
│   └── Exceptions/                   # Custom exceptions
├── database/
│   ├── migrations/                   # Database schema
│   ├── seeders/                      # Data seeders
│   └── factories/                    # Model factories
├── routes/
│   └── api.php                       # API routes
├── config/                           # Configuration files
└── tests/                            # Test suite
```

## Installation & Setup

### Prerequisites
- PHP 8.2+
- Composer
- MySQL 8.0+
- Node.js (optional, for frontend integration)

### Step 1: Clone and Install Dependencies

```bash
cd backend
composer install
```

### Step 2: Environment Configuration

```bash
cp .env.example .env
php artisan key:generate
```

Update `.env` with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=under_armour
DB_USERNAME=root
DB_PASSWORD=your_password

STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
```

### Step 3: Database Setup

```bash
php artisan migrate
php artisan db:seed
```

### Step 4: Start Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products (Public)
- `GET /api/products` - List all products with filters
- `GET /api/products/{id}` - Get product details
- `GET /api/products/search?q=term` - Search products
- `GET /api/products/new-arrivals` - Get new products
- `GET /api/products/sale` - Get sale products
- `GET /api/products/{id}/sizes` - Get available sizes
- `GET /api/products/{id}/colors` - Get available colors
- `GET /api/products/category/{categoryId}` - Get products by category

### Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/{cartItemId}` - Update cart item quantity
- `DELETE /api/cart/items/{cartItemId}` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders (Protected)
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{orderId}` - Get order details
- `POST /api/orders/track` - Track order by order number

### Wishlist (Protected)
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add product to wishlist
- `DELETE /api/wishlist/{productId}` - Remove from wishlist
- `GET /api/wishlist/{productId}/check` - Check if product is in wishlist

### Checkout (Protected)
- `POST /api/checkout/validate` - Validate checkout
- `POST /api/checkout/process` - Process payment and create order

## Database Schema

### Key Tables

**users** - User accounts and profiles
**categories** - Product categories (hierarchical)
**products** - Product information
**product_variants** - Product sizes, colors, and stock
**orders** - Customer orders
**order_items** - Items in each order
**carts** - Shopping carts
**cart_items** - Items in shopping carts
**wishlists** - Saved products
**reviews** - Product reviews and ratings

### Relationships

```
User
  ├── Orders (1:N)
  ├── Cart (1:1)
  ├── Wishlists (1:N)
  └── Reviews (1:N)

Product
  ├── Category (N:1)
  ├── Variants (1:N)
  ├── Reviews (1:N)
  ├── Wishlists (1:N)
  ├── CartItems (1:N)
  └── OrderItems (1:N)

Order
  ├── User (N:1)
  └── OrderItems (1:N)

Cart
  ├── User (1:1)
  └── CartItems (1:N)
```

## Service Layer

### ProductService
- `getAllProducts()` - Get paginated products with filters
- `getProductDetails()` - Get full product information
- `getProductsByCategory()` - Filter by category
- `searchProducts()` - Full-text search
- `getNewProducts()` - Get new arrivals
- `getSaleProducts()` - Get sale items
- `getAvailableSizes()` - Get in-stock sizes
- `getAvailableColors()` - Get in-stock colors

### CartService
- `getOrCreateCart()` - Get or create user's cart
- `getCart()` - Get cart with items
- `addItem()` - Add product to cart
- `updateItem()` - Update item quantity
- `removeItem()` - Remove item from cart
- `clearCart()` - Clear entire cart
- `getCartTotals()` - Calculate totals with tax and shipping

### OrderService
- `createOrderFromCart()` - Create order from cart
- `getUserOrders()` - Get user's order history
- `getOrderDetails()` - Get specific order
- `updateOrderStatus()` - Update order status
- `updatePaymentStatus()` - Update payment status
- `trackOrder()` - Track order by number

### WishlistService
- `getWishlist()` - Get user's wishlist
- `addToWishlist()` - Add product to wishlist
- `removeFromWishlist()` - Remove from wishlist
- `isInWishlist()` - Check if product is in wishlist
- `getWishlistCount()` - Get wishlist count

## Query Optimization

### Eager Loading
```php
// Prevent N+1 queries
Product::with('category', 'variants', 'reviews')->get();
```

### Scopes
```php
// Reusable query logic
Product::active()->sale()->byPriceRange(50, 200)->get();
```

### Indexing Strategy
- `products.category_id` - For category filtering
- `orders.user_id` - For user orders
- `orders.status` - For order status queries
- `products.created_at` - For new arrivals
- `products.price` - For price filtering
- Full-text index on `products.name` and `description`

## Security Features

✅ **Authentication** - Laravel Sanctum for API tokens
✅ **Authorization** - Policies for resource access
✅ **Validation** - Form requests for all inputs
✅ **CORS** - Configured for frontend domain
✅ **Rate Limiting** - Prevent API abuse
✅ **SQL Injection Prevention** - Eloquent ORM parameterized queries
✅ **CSRF Protection** - Token-based protection
✅ **PCI Compliance** - Stripe handles payment security

## Testing

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test tests/Feature/ProductTest.php

# Run with coverage
php artisan test --coverage
```

## Deployment

### Production Checklist
- [ ] Set `APP_ENV=production` in `.env`
- [ ] Set `APP_DEBUG=false` in `.env`
- [ ] Generate application key: `php artisan key:generate`
- [ ] Run migrations: `php artisan migrate --force`
- [ ] Cache configuration: `php artisan config:cache`
- [ ] Cache routes: `php artisan route:cache`
- [ ] Optimize autoloader: `composer install --optimize-autoloader --no-dev`
- [ ] Set up SSL certificate
- [ ] Configure CORS for frontend domain
- [ ] Set up environment variables securely

## Frontend Integration

The backend API is designed to work seamlessly with the React frontend. 

### CORS Configuration
Update `config/cors.php` to allow requests from your frontend:

```php
'allowed_origins' => ['http://localhost:5173', 'https://yourdomain.com'],
```

### API Base URL
Frontend should use: `http://localhost:8000/api`

## Performance Optimization

1. **Database Indexing** - Strategic indexes on frequently queried columns
2. **Query Optimization** - Eager loading and selective column selection
3. **Caching** - Cache categories and popular products
4. **Pagination** - Limit results per page
5. **API Response** - Use resources for consistent formatting

## Monitoring & Logging

- Logs are stored in `storage/logs/`
- Configure logging in `config/logging.php`
- Monitor Stripe webhooks for payment events
- Track order status changes

## Support & Documentation

- [Laravel Documentation](https://laravel.com/docs)
- [Eloquent ORM](https://laravel.com/docs/eloquent)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [Stripe API](https://stripe.com/docs/api)

## License

MIT License - See LICENSE file for details

## Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Submit a pull request

---

**Built with ❤️ for Under Armour E-Commerce Platform**
