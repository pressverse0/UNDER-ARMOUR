# Advanced Features Documentation

This document covers advanced features including analytics, coupons, tax calculation, and shipping.

---

## Analytics API

### Sales Analytics

```
GET /analytics/sales?period=30
Authorization: Bearer {token}
```

Query Parameters:
- `period` (int) - Number of days to analyze (default: 30)

Response:
```json
{
  "period_days": 30,
  "total_orders": 45,
  "total_revenue": 5234.50,
  "average_order_value": 116.32,
  "total_items_sold": 89,
  "by_status": {
    "pending": {
      "count": 2,
      "revenue": 234.50
    },
    "processing": {
      "count": 5,
      "revenue": 580.00
    },
    "shipped": {
      "count": 20,
      "revenue": 2340.00
    },
    "delivered": {
      "count": 18,
      "revenue": 2080.00
    }
  },
  "by_date": {
    "2026-05-26": {
      "count": 3,
      "revenue": 350.00
    }
  }
}
```

### Product Analytics

```
GET /analytics/products?limit=10
Authorization: Bearer {token}
```

Query Parameters:
- `limit` (int) - Number of products to return (default: 10)

Response:
```json
{
  "total_products": 150,
  "active_products": 145,
  "new_products": 12,
  "sale_products": 25,
  "top_rated": [
    {
      "id": 1,
      "name": "UA Curry 11",
      "category": "Basketball",
      "price": 160.00,
      "rating": 4.8,
      "reviews_count": 204
    }
  ],
  "most_reviewed": [...],
  "by_category": {
    "Running": 25,
    "Training": 30,
    "Basketball": 20
  }
}
```

### User Analytics

```
GET /analytics/users?period=30
Authorization: Bearer {token}
```

Response:
```json
{
  "total_users": 1250,
  "new_users": 45,
  "active_users": 320,
  "users_with_reviews": 180,
  "users_with_wishlist": 450,
  "average_orders_per_user": 2.5
}
```

### Review Analytics

```
GET /analytics/reviews
Authorization: Bearer {token}
```

Response:
```json
{
  "total_reviews": 450,
  "average_rating": 4.3,
  "rating_distribution": {
    "5_stars": 200,
    "4_stars": 150,
    "3_stars": 80,
    "2_stars": 15,
    "1_star": 5
  },
  "verified_purchases": 380
}
```

### Inventory Analytics

```
GET /analytics/inventory
Authorization: Bearer {token}
```

Response:
```json
{
  "total_variants": 450,
  "total_stock": 15000,
  "in_stock": 440,
  "out_of_stock": 10,
  "low_stock": 25,
  "average_stock_per_variant": 33.33,
  "stock_value": 1950000.00
}
```

### Dashboard Overview

```
GET /analytics/dashboard?period=30
Authorization: Bearer {token}
```

Response:
```json
{
  "sales": {
    "total_revenue": 5234.50,
    "total_orders": 45,
    "average_order_value": 116.32
  },
  "users": {
    "total_users": 1250,
    "new_users": 45,
    "active_users": 320
  },
  "products": {
    "total_products": 145,
    "new_products": 12,
    "sale_products": 25
  },
  "inventory": {
    "total_stock": 15000,
    "out_of_stock": 10,
    "low_stock": 25
  },
  "reviews": {
    "total_reviews": 450,
    "average_rating": 4.3,
    "pending_reviews": 12
  }
}
```

---

## Coupon System

### Validate Coupon

```
POST /coupons/validate
Content-Type: application/json

{
  "code": "SUMMER20",
  "amount": 100.00
}
```

Response:
```json
{
  "valid": true,
  "coupon": {
    "id": 1,
    "code": "SUMMER20",
    "description": "20% off summer collection",
    "discount_type": "percentage",
    "discount_value": 20
  },
  "discount_amount": 20.00,
  "final_amount": 80.00
}
```

### Get Available Coupons

```
GET /coupons/available
```

Response:
```json
{
  "count": 5,
  "coupons": [
    {
      "id": 1,
      "code": "SUMMER20",
      "description": "20% off summer collection",
      "discount_type": "percentage",
      "discount_value": 20,
      "min_purchase_amount": 50.00
    }
  ]
}
```

### Coupon Types

**Percentage Discount**
- Applies a percentage off the order total
- Example: 20% off = $100 → $80

**Fixed Discount**
- Applies a fixed amount off
- Example: $10 off = $100 → $90

### Coupon Validation Rules

- Code must be active
- Must not exceed max uses
- Must be within valid date range
- Order must meet minimum purchase amount
- Discount cannot exceed order total

---

## Tax Calculation

### Calculate Tax

Tax is automatically calculated based on shipping state using US state tax rates.

**Supported States**: All 50 US states

**Tax Rates Range**: 0% (MT, NH, OR) to 9.25% (TN)

### Tax Calculation Example

```php
use App\Services\TaxService;

// Calculate tax for $100 order in California
$tax = TaxService::calculateTax(100, 'CA');
// Result: $7.25

// Get total with tax
$total = TaxService::calculateTotal(100, 'CA');
// Result: ['subtotal' => 100, 'tax' => 7.25, 'total' => 107.25]
```

### Tax Rates by State

| State | Rate | State | Rate |
|-------|------|-------|------|
| AL | 4.0% | MT | 0.0% |
| AK | 0.0% | NE | 5.5% |
| AZ | 5.6% | NV | 6.85% |
| AR | 6.5% | NH | 0.0% |
| CA | 7.25% | NJ | 6.25% |
| CO | 2.9% | NM | 7.75% |
| CT | 6.35% | NY | 4.0% |
| DE | 0.0% | NC | 4.5% |
| FL | 6.0% | ND | 5.0% |
| GA | 4.0% | OH | 5.75% |
| HI | 4.0% | OK | 4.5% |
| ID | 6.0% | OR | 0.0% |
| IL | 6.25% | PA | 6.0% |
| IN | 7.0% | RI | 7.0% |
| IA | 6.0% | SC | 6.0% |
| KS | 6.5% | SD | 4.5% |
| KY | 6.0% | TN | 9.25% |
| LA | 4.5% | TX | 6.25% |
| ME | 5.5% | UT | 5.95% |
| MD | 6.0% | VT | 6.0% |
| MA | 6.25% | VA | 5.75% |
| MI | 6.0% | WA | 6.5% |
| MN | 6.875% | WV | 6.0% |
| MS | 7.0% | WI | 5.0% |
| MO | 7.25% | WY | 4.0% |

---

## Shipping Service

### Shipping Methods

**Standard Shipping**
- Base Rate: $5.99
- Per Item: $0.50
- Delivery: 5 days
- Example: 3 items = $5.99 + (3 × $0.50) = $7.49

**Express Shipping**
- Base Rate: $12.99
- Per Item: $1.00
- Delivery: 2 days
- Example: 3 items = $12.99 + (3 × $1.00) = $15.99

**Overnight Shipping**
- Base Rate: $24.99
- Per Item: $2.00
- Delivery: 1 day
- Example: 3 items = $24.99 + (3 × $2.00) = $30.99

**Free Shipping**
- Base Rate: $0.00
- Per Item: $0.00
- Delivery: 7 days
- Minimum Order: $100.00

### Calculate Shipping

```php
use App\Services\ShippingService;

// Calculate shipping for 3 items
$shipping = ShippingService::calculateShipping('standard', 3);
// Result: [
//   'method' => 'standard',
//   'name' => 'Standard Shipping',
//   'cost' => 7.49,
//   'estimated_days' => 5,
//   'estimated_delivery' => '2026-05-31'
// ]
```

### Get Shipping Methods

```php
$methods = ShippingService::getShippingMethods();
// Returns array of all available shipping methods
```

### Check Free Shipping Eligibility

```php
$qualifies = ShippingService::qualifiesForFreeShipping(150.00);
// Result: true (order is >= $100)
```

---

## Logging System

### Log Types

**API Requests**
```php
LogService::logApiRequest('GET', '/products', $userId, $data);
```

**API Responses**
```php
LogService::logApiResponse('GET', '/products', 200, $userId, $duration);
```

**API Errors**
```php
LogService::logApiError('POST', '/checkout', 400, $error, $userId);
```

**Database Queries**
```php
LogService::logDatabaseQuery($query, $bindings, $duration);
```

**Audit Events**
```php
LogService::logAuditEvent($userId, 'create', 'Product', $productId, $changes);
```

**Authentication Events**
```php
LogService::logAuthEvent('login', $userId, $email, true);
```

**Payment Events**
```php
LogService::logPaymentEvent('charge', $orderId, $amount, 'completed', $paymentId);
```

**Inventory Changes**
```php
LogService::logInventoryChange($variantId, $oldQty, $newQty, 'Damaged');
```

**Order Events**
```php
LogService::logOrderEvent('created', $orderId, $userId, 'pending', $details);
```

**Cache Operations**
```php
LogService::logCacheOperation('set', 'products:all', true);
```

**Performance Metrics**
```php
LogService::logPerformance('GET /products', 250, ['slow_request' => false]);
```

**Security Events**
```php
LogService::logSecurityEvent('failed_login', $userId, 'Too many attempts', true);
```

---

## Caching System

### Cache Keys

| Key | Duration | Purpose |
|-----|----------|---------|
| `products:all` | 60 min | All products list |
| `product:{id}` | 120 min | Single product |
| `categories:all` | 24 hours | All categories |
| `category:{id}` | 24 hours | Single category |
| `reviews:product:{id}` | 30 min | Product reviews |
| `inventory:product:{id}` | 15 min | Product inventory |
| `cart:user:{id}` | 5 min | User cart |
| `wishlist:user:{id}` | 10 min | User wishlist |
| `orders:user:{id}` | 20 min | User orders |

### Cache Operations

```php
use App\Services\CacheService;

$cache = new CacheService();

// Remember value in cache
$products = $cache->remember('products:all', function () {
    return Product::all();
});

// Get cached value
$value = $cache->get('products:all');

// Put value in cache
$cache->put('products:all', $products, 60);

// Forget cache key
$cache->forget('products:all');

// Invalidate product cache
$cache->invalidateProduct($productId);

// Get cache statistics
$stats = $cache->getStatistics();
```

---

## Performance Optimization

### Database Indexes

All tables have indexes on frequently queried columns:
- `products.slug`, `products.category_id`, `products.is_active`
- `orders.user_id`, `orders.status`, `orders.payment_status`
- `coupons.code`, `coupons.is_active`
- `reviews.product_id`, `reviews.is_approved`

### Query Optimization

- Eager loading with relationships
- Pagination on list endpoints
- Selective column selection
- Query caching

### API Response Optimization

- Resource classes for efficient serialization
- Pagination metadata
- Filtering to reduce data transfer
- Compression support

---

## Monitoring & Alerts

### Performance Monitoring

- API request duration tracking
- Slow query detection (> 1 second)
- Database query logging
- Cache hit/miss tracking

### Error Monitoring

- API error logging
- Exception tracking
- Failed payment logging
- Security event logging

### Business Monitoring

- Sales analytics
- Inventory alerts
- Review moderation queue
- User activity tracking

---

## Best Practices

### For Developers

1. **Use CacheService** for frequently accessed data
2. **Use LogService** for all important events
3. **Use TaxService** for tax calculations
4. **Use ShippingService** for shipping costs
5. **Validate coupons** before applying discounts

### For Admins

1. **Monitor analytics** regularly
2. **Review pending reviews** for moderation
3. **Check inventory** for low stock alerts
4. **Monitor performance** metrics
5. **Review security** logs for suspicious activity

### For Users

1. **Check available coupons** before checkout
2. **Select appropriate shipping** method
3. **Verify tax calculation** in checkout
4. **Leave reviews** for purchased items
5. **Track orders** using order number

---

## Integration Examples

### Complete Checkout Flow

```php
// 1. Validate coupon
$coupon = CouponController::validate($code, $amount);

// 2. Calculate tax
$tax = TaxService::calculateTax($subtotal, $state);

// 3. Calculate shipping
$shipping = ShippingService::calculateShipping('standard', $itemCount);

// 4. Calculate total
$total = $subtotal + $tax + $shipping['cost'] - $coupon['discount'];

// 5. Create order
$order = OrderService::createOrder($userId, $items, $total);

// 6. Log event
LogService::logOrderEvent('created', $order->id, $userId, 'pending');

// 7. Send email
EmailService::sendOrderConfirmation($order);
```

---

For more information, see:
- [API Reference](./COMPLETE_API_REFERENCE.md)
- [API Enhancements](./API_ENHANCEMENTS.md)
- [Architecture](./ARCHITECTURE.md)
