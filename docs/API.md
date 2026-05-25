# Under Armour - API Documentation

## Base URL

```
http://localhost:8000/api
```

## Authentication

The API uses **Laravel Sanctum** for token-based authentication.

### Get Authentication Token

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

Response:
```json
{
  "token": "1|abcdefghijklmnopqrstuvwxyz",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### Use Token in Requests

```bash
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

## API Endpoints

### Products (Public)

#### List Products
```
GET /products
```

Query Parameters:
- `per_page` (int) - Items per page (default: 15)
- `page` (int) - Page number
- `category_id` (int) - Filter by category
- `gender` (string) - Filter by gender (Men, Women, Kids, Unisex)
- `min_price` (float) - Minimum price
- `max_price` (float) - Maximum price
- `sort` (string) - Sort by: newest, price_asc, price_desc, rating

Example:
```bash
GET /products?category_id=1&min_price=50&max_price=200&sort=price_asc
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Running Shoes",
      "price": 129.99,
      "original_price": 149.99,
      "category": {
        "id": 1,
        "name": "Shoes"
      },
      "image": "url",
      "rating": 4.5,
      "reviews_count": 120,
      "is_new": true,
      "is_sale": true,
      "discount_percentage": 13,
      "in_stock": true
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 250,
    "per_page": 15
  }
}
```

#### Get Product Details
```
GET /products/{id}
```

Response:
```json
{
  "id": 1,
  "name": "Running Shoes",
  "slug": "running-shoes",
  "description": "High-performance running shoes...",
  "price": 129.99,
  "original_price": 149.99,
  "category": {...},
  "image": "url",
  "images": ["url1", "url2"],
  "rating": 4.5,
  "reviews_count": 120,
  "gender": "Men",
  "technology": "UA SpeedForm",
  "is_new": true,
  "is_sale": true,
  "discount_percentage": 13,
  "variants": [
    {
      "id": 1,
      "size": "8",
      "color": "Black",
      "stock_quantity": 50,
      "sku": "UA-SHOES-001",
      "in_stock": true
    }
  ],
  "reviews": [
    {
      "id": 1,
      "rating": 5,
      "title": "Great shoes!",
      "comment": "Very comfortable...",
      "user": {
        "id": 1,
        "name": "John Doe"
      }
    }
  ]
}
```

#### Search Products
```
GET /products/search?q=shoes
```

#### Get New Arrivals
```
GET /products/new-arrivals?limit=10
```

#### Get Sale Products
```
GET /products/sale?limit=10
```

#### Get Available Sizes
```
GET /products/{id}/sizes
```

Response:
```json
{
  "sizes": ["7", "8", "9", "10", "11", "12"]
}
```

#### Get Available Colors
```
GET /products/{id}/colors
```

Response:
```json
{
  "colors": ["Black", "White", "Red", "Blue"]
}
```

#### Get Products by Category
```
GET /products/category/{categoryId}
```

### Cart (Protected)

#### Get Cart
```
GET /cart
Authorization: Bearer {token}
```

Response:
```json
{
  "items": [
    {
      "id": 1,
      "product": {...},
      "quantity": 2,
      "size": "M",
      "color": "Black",
      "subtotal": 259.98
    }
  ],
  "totals": {
    "subtotal": 259.98,
    "tax": 26.00,
    "shipping_cost": 10.00,
    "total": 295.98,
    "item_count": 2
  }
}
```

#### Add to Cart
```
POST /cart/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 2,
  "size": "M",
  "color": "Black"
}
```

#### Update Cart Item
```
PUT /cart/items/{cartItemId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove from Cart
```
DELETE /cart/items/{cartItemId}
Authorization: Bearer {token}
```

#### Clear Cart
```
DELETE /cart
Authorization: Bearer {token}
```

### Orders (Protected)

#### Get User's Orders
```
GET /orders
Authorization: Bearer {token}
```

Query Parameters:
- `per_page` (int) - Items per page (default: 10)
- `page` (int) - Page number

Response:
```json
{
  "data": [
    {
      "id": 1,
      "order_number": "ORD-20240101-ABC123",
      "status": "shipped",
      "subtotal": 259.98,
      "tax": 26.00,
      "shipping_cost": 10.00,
      "total": 295.98,
      "payment_method": "stripe",
      "payment_status": "completed",
      "shipping_address": "123 Main St",
      "shipping_city": "New York",
      "shipping_state": "NY",
      "shipping_zip": "10001",
      "shipping_country": "USA",
      "tracking_number": "1Z999AA10123456784",
      "shipped_at": "2024-01-02T10:00:00Z",
      "items": [
        {
          "id": 1,
          "product_id": 1,
          "product_name": "Running Shoes",
          "price": 129.99,
          "quantity": 2,
          "size": "M",
          "color": "Black",
          "subtotal": 259.98
        }
      ],
      "created_at": "2024-01-01T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 5,
    "per_page": 10
  }
}
```

#### Get Order Details
```
GET /orders/{orderId}
Authorization: Bearer {token}
```

#### Track Order
```
POST /orders/track
Authorization: Bearer {token}
Content-Type: application/json

{
  "order_number": "ORD-20240101-ABC123"
}
```

### Wishlist (Protected)

#### Get Wishlist
```
GET /wishlist
Authorization: Bearer {token}
```

Query Parameters:
- `per_page` (int) - Items per page (default: 10)

Response:
```json
{
  "data": [
    {
      "id": 1,
      "product": {...},
      "created_at": "2024-01-01T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 3,
    "per_page": 10
  }
}
```

#### Add to Wishlist
```
POST /wishlist
Authorization: Bearer {token}
Content-Type: application/json

{
  "product_id": 1
}
```

#### Remove from Wishlist
```
DELETE /wishlist/{productId}
Authorization: Bearer {token}
```

#### Check if in Wishlist
```
GET /wishlist/{productId}/check
Authorization: Bearer {token}
```

Response:
```json
{
  "is_in_wishlist": true
}
```

### Checkout (Protected)

#### Validate Checkout
```
POST /checkout/validate
Authorization: Bearer {token}
Content-Type: application/json

{
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001",
  "country": "USA"
}
```

Response:
```json
{
  "valid": true,
  "totals": {
    "subtotal": 259.98,
    "tax": 26.00,
    "shipping_cost": 10.00,
    "total": 295.98,
    "item_count": 2
  }
}
```

#### Process Payment
```
POST /checkout/process
Authorization: Bearer {token}
Content-Type: application/json

{
  "payment_method_id": "pm_1234567890",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001",
  "country": "USA"
}
```

Response:
```json
{
  "id": 1,
  "order_number": "ORD-20240101-ABC123",
  "status": "pending",
  "total": 295.98,
  "payment_status": "completed",
  "items": [...],
  "created_at": "2024-01-01T10:00:00Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required"]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthenticated"
}
```

### 403 Forbidden
```json
{
  "message": "This action is unauthorized"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details..."
}
```

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- **Default**: 60 requests per minute per IP
- **Authenticated**: 120 requests per minute per user

Rate limit headers:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1609459200
```

## Pagination

List endpoints support pagination:

```bash
GET /products?page=2&per_page=20
```

Response includes metadata:
```json
{
  "data": [...],
  "meta": {
    "current_page": 2,
    "total": 250,
    "per_page": 20,
    "last_page": 13
  }
}
```

## Filtering & Sorting

### Product Filters

```bash
# By category
GET /products?category_id=1

# By gender
GET /products?gender=Men

# By price range
GET /products?min_price=50&max_price=200

# By search term
GET /products/search?q=shoes

# Combined filters
GET /products?category_id=1&gender=Men&min_price=50&max_price=200&sort=price_asc
```

### Sort Options

- `newest` - Newest products first
- `price_asc` - Price low to high
- `price_desc` - Price high to low
- `rating` - Highest rated first

## Testing with cURL

### Get Products
```bash
curl -X GET "http://localhost:8000/api/products"
```

### Add to Cart
```bash
curl -X POST "http://localhost:8000/api/cart/items" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "quantity": 2,
    "size": "M",
    "color": "Black"
  }'
```

### Create Order
```bash
curl -X POST "http://localhost:8000/api/checkout/process" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "payment_method_id": "pm_1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip_code": "10001",
    "country": "USA"
  }'
```

## Testing with Postman

1. Import the API collection
2. Set base URL: `http://localhost:8000/api`
3. Add authentication token to headers
4. Test endpoints

---

For setup instructions, see [SETUP.md](./SETUP.md)
For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md)
