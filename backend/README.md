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

## Services

- **ProductService** - Product operations
- **CartService** - Cart management
- **OrderService** - Order processing
- **WishlistService** - Wishlist operations

## Common Commands

```bash
# Start development server
php artisan serve

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Run tests
php artisan test
```

## API Endpoints

See [API.md](../docs/API.md) for complete endpoint reference.

**Quick Examples**:
- `GET /api/products` - List products
- `GET /api/products/{id}` - Product details
- `GET /api/products/search?q=term` - Search
- `POST /api/cart/items` - Add to cart (protected)
- `POST /api/checkout/process` - Checkout (protected)

## Database

11 tables with optimized indexes and relationships.

See [ARCHITECTURE.md](../docs/ARCHITECTURE.md) for schema details.

## Deployment

```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
composer install --optimize-autoloader --no-dev
```

See [SETUP.md](../docs/SETUP.md) for detailed instructions.
