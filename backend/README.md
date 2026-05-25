# Backend API

Laravel 11 backend with clean 4-layer architecture.

**See main documentation**: [README.md](../../README.md) | [Architecture](../docs/ARCHITECTURE.md) | [Setup](../docs/SETUP.md) | [API](../docs/API.md)

## Quick Start

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## Project Structure

```
app/
├── Http/Controllers/Api/     # 5 API Controllers
├── Http/Resources/           # 7 API Resources
├── Services/                 # 4 Service Classes
├── Models/                   # 10 Eloquent Models
└── Repositories/             # Repository Pattern

database/
├── migrations/               # 10 Migrations
├── seeders/                  # Sample Data
└── factories/                # Model Factories

routes/api.php                # 30+ API Routes
```

## API Endpoints

**Products** (Public):
- `GET /api/products` - List products
- `GET /api/products/{id}` - Product details
- `GET /api/products/search?q=term` - Search
- `GET /api/products/new-arrivals` - New products
- `GET /api/products/sale` - Sale products

**Cart** (Protected):
- `GET /api/cart` - Get cart
- `POST /api/cart/items` - Add item
- `PUT /api/cart/items/{id}` - Update item
- `DELETE /api/cart/items/{id}` - Remove item

**Orders** (Protected):
- `GET /api/orders` - List orders
- `GET /api/orders/{id}` - Order details
- `POST /api/orders/track` - Track order

**Wishlist** (Protected):
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist` - Add product
- `DELETE /api/wishlist/{id}` - Remove product

**Checkout** (Protected):
- `POST /api/checkout/validate` - Validate
- `POST /api/checkout/process` - Process payment

See [API.md](../docs/API.md) for complete reference.

## Services

- **ProductService** - Product operations
- **CartService** - Cart management
- **OrderService** - Order processing
- **WishlistService** - Wishlist operations

## Database

11 tables with optimized indexes and relationships.

See [ARCHITECTURE.md](../docs/ARCHITECTURE.md) for schema details.

## Security

- Token-based authentication (Sanctum)
- Input validation & error handling
- SQL injection prevention (Eloquent)
- CSRF protection
- PCI compliance (Stripe)

## Testing

```bash
php artisan test
```

## Deployment

```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
composer install --optimize-autoloader --no-dev
```

See [SETUP.md](../docs/SETUP.md) for detailed instructions.
