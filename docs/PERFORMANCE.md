# Performance Optimization

## Database Optimization

### Query Optimization

#### Eager Loading
Prevent N+1 queries by loading relationships upfront:

```php
// Good - Single query with joins
Product::with('category', 'variants', 'reviews')->get();

// Bad - N+1 queries
Product::all();
foreach ($products as $product) {
    echo $product->category->name; // Additional query per product
}
```

#### Query Scopes
Use scopes for reusable query logic:

```php
// Define scope in model
public function scopeActive($query) {
    return $query->where('is_active', true);
}

// Use scope
Product::active()->get();
```

#### Selective Columns
Only select needed columns:

```php
// Good - Select specific columns
Product::select('id', 'name', 'price')->get();

// Bad - Select all columns
Product::all();
```

### Indexing Strategy

#### Primary Indexes
- `products.id` - Primary key
- `orders.id` - Primary key
- `users.id` - Primary key

#### Foreign Key Indexes
- `products.category_id` - Category filtering
- `orders.user_id` - User orders
- `cart_items.product_id` - Cart operations
- `order_items.product_id` - Order operations

#### Search Indexes
- `products.created_at` - New arrivals sorting
- `products.price` - Price filtering
- `orders.status` - Order status queries
- Full-text index on `products.name` and `description`

#### Unique Indexes
- `users.email` - User lookup
- `products.slug` - Product lookup
- `orders.order_number` - Order tracking

### Query Analysis

```bash
# Enable query logging in development
DB_QUERY_LOG=true

# Check slow queries
SLOW_QUERY_LOG=true
LONG_QUERY_TIME=2
```

## Caching Strategy

### Application Caching

#### Cache Categories
```php
// Cache for 24 hours
Cache::remember('categories', 60 * 24, function () {
    return Category::all();
});
```

#### Cache Popular Products
```php
// Cache for 1 hour
Cache::remember('popular_products', 60, function () {
    return Product::orderBy('rating', 'desc')->limit(10)->get();
});
```

#### Cache Configuration
```php
// config/cache.php
'default' => env('CACHE_DRIVER', 'file'),
'stores' => [
    'file' => [
        'driver' => 'file',
        'path' => storage_path('framework/cache/data'),
    ],
    'redis' => [
        'driver' => 'redis',
        'connection' => 'cache',
    ],
],
```

### HTTP Caching

#### Cache Headers
```php
// Cache for 1 hour
return response($data)
    ->header('Cache-Control', 'public, max-age=3600');

// Don't cache
return response($data)
    ->header('Cache-Control', 'no-cache, no-store, must-revalidate');
```

## API Performance

### Pagination

#### Implement Pagination
```php
// Get 15 items per page
$products = Product::paginate(15);

// Response includes metadata
{
  "data": [...],
  "meta": {
    "current_page": 1,
    "total": 250,
    "per_page": 15,
    "last_page": 17
  }
}
```

#### Cursor Pagination
```php
// More efficient for large datasets
$products = Product::cursorPaginate(15);
```

### Response Compression

#### Enable Gzip
```nginx
# nginx.conf
gzip on;
gzip_types text/plain application/json;
gzip_min_length 1000;
```

### API Response Optimization

#### Use Resources
```php
// Format consistent responses
return ProductResource::collection($products);
```

#### Lazy Loading
```php
// Load relationships only when needed
$product->load('reviews');
```

## Frontend Performance

### Code Splitting

#### React Lazy Loading
```javascript
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

<Suspense fallback={<Loading />}>
  <ProductDetail />
</Suspense>
```

### Image Optimization

#### Image Formats
- Use WebP for modern browsers
- Fallback to JPEG/PNG
- Compress images before upload

#### Responsive Images
```html
<img 
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 480px, 800px"
  src="medium.jpg"
  alt="Product"
/>
```

### Bundle Size

#### Analyze Bundle
```bash
npm run build -- --analyze
```

#### Code Splitting
```javascript
// Split by route
const routes = [
  { path: '/', component: lazy(() => import('./Home')) },
  { path: '/products', component: lazy(() => import('./Products')) },
];
```

## Database Connection Pooling

### Connection Pool Configuration
```env
DB_POOL_MIN=5
DB_POOL_MAX=20
DB_POOL_TIMEOUT=30
```

### Connection Reuse
- Reuse connections across requests
- Close idle connections
- Monitor connection usage

## Monitoring & Profiling

### Laravel Debugbar
```php
// Development only
if (config('app.debug')) {
    Debugbar::measure('query', function () {
        Product::all();
    });
}
```

### Performance Metrics

#### Track Metrics
- Page load time
- API response time
- Database query time
- Cache hit rate

#### Tools
- New Relic
- Datadog
- Scout APM
- Blackfire

## Load Testing

### Apache Bench
```bash
# 1000 requests, 10 concurrent
ab -n 1000 -c 10 http://localhost:8000/api/products
```

### Wrk
```bash
# 4 threads, 100 connections, 30 seconds
wrk -t4 -c100 -d30s http://localhost:8000/api/products
```

## Production Optimization

### Configuration Caching
```bash
# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache
```

### Autoloader Optimization
```bash
# Optimize autoloader
composer install --optimize-autoloader --no-dev
```

### Asset Optimization

#### Minification
```bash
# Minify CSS and JavaScript
npm run build
```

#### Asset Versioning
```php
// Cache busting
<link rel="stylesheet" href="{{ asset('css/app.css?v=' . config('app.version')) }}">
```

## Scaling Strategies

### Horizontal Scaling
- Load balancer (Nginx, HAProxy)
- Multiple backend instances
- Shared database
- Shared cache (Redis)

### Vertical Scaling
- Increase server resources
- Upgrade CPU/RAM
- Optimize queries
- Implement caching

### Database Scaling
- Read replicas
- Sharding
- Partitioning
- Archive old data

## Performance Checklist

### Development
- [ ] Use eager loading
- [ ] Add database indexes
- [ ] Implement caching
- [ ] Optimize queries
- [ ] Compress images
- [ ] Split code
- [ ] Monitor performance
- [ ] Profile code

### Deployment
- [ ] Cache configuration
- [ ] Cache routes
- [ ] Optimize autoloader
- [ ] Enable compression
- [ ] Set up CDN
- [ ] Configure caching headers
- [ ] Enable monitoring
- [ ] Set up alerts

### Maintenance
- [ ] Monitor metrics
- [ ] Analyze slow queries
- [ ] Review cache hit rates
- [ ] Update indexes
- [ ] Archive old data
- [ ] Optimize database
- [ ] Review logs
- [ ] Load test

---

For setup instructions, see [SETUP.md](./SETUP.md)
