# Complete API Reference

## Overview

This document provides a complete reference of all 50+ API endpoints available in the Under Armour e-commerce platform.

---

## Authentication Endpoints (5)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login and get token |
| POST | `/auth/logout` | Yes | Logout and revoke token |
| GET | `/auth/me` | Yes | Get current user profile |
| PUT | `/auth/profile` | Yes | Update user profile |

---

## Product Endpoints (8)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/products` | No | List all products with filters |
| GET | `/products/{id}` | No | Get product details |
| GET | `/products/search` | No | Search products |
| GET | `/products/new-arrivals` | No | Get new products |
| GET | `/products/sale` | No | Get sale products |
| GET | `/products/category/{categoryId}` | No | Get products by category |
| GET | `/products/{id}/sizes` | No | Get available sizes |
| GET | `/products/{id}/colors` | No | Get available colors |

---

## Category Endpoints (1)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/categories` | No | List all categories |

---

## Review Endpoints (7)

### Public Reviews
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/products/{productId}/reviews` | No | List product reviews |
| GET | `/products/{productId}/reviews/{reviewId}` | No | Get specific review |

### User Reviews (Protected)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/products/{productId}/reviews` | Yes | Create review |
| PUT | `/products/{productId}/reviews/{reviewId}` | Yes | Update review |
| DELETE | `/products/{productId}/reviews/{reviewId}` | Yes | Delete review |
| GET | `/reviews/user` | Yes | Get user's reviews |

---

## Cart Endpoints (5)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/cart` | Yes | Get user's cart |
| POST | `/cart/items` | Yes | Add item to cart |
| PUT | `/cart/items/{cartItemId}` | Yes | Update cart item quantity |
| DELETE | `/cart/items/{cartItemId}` | Yes | Remove item from cart |
| DELETE | `/cart` | Yes | Clear entire cart |

---

## Order Endpoints (3)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/orders` | Yes | Get user's orders |
| GET | `/orders/{orderId}` | Yes | Get order details |
| POST | `/orders/track` | Yes | Track order by number |

---

## Wishlist Endpoints (4)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/wishlist` | Yes | Get user's wishlist |
| POST | `/wishlist` | Yes | Add product to wishlist |
| DELETE | `/wishlist/{productId}` | Yes | Remove from wishlist |
| GET | `/wishlist/{productId}/check` | Yes | Check if in wishlist |

---

## Checkout Endpoints (2)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/checkout/validate` | Yes | Validate checkout |
| POST | `/checkout/process` | Yes | Process payment & create order |

---

## Admin Product Management (6)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/admin/products` | Yes | Create product |
| PUT | `/admin/products/{productId}` | Yes | Update product |
| DELETE | `/admin/products/{productId}` | Yes | Delete product |
| POST | `/admin/products/bulk-update` | Yes | Bulk update products |
| POST | `/admin/products/{productId}/restore` | Yes | Restore deleted product |
| GET | `/admin/products/all` | Yes | List all products (with deleted) |

---

## Admin Inventory Management (7)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/inventory/products/{productId}` | Yes | Get product inventory |
| PUT | `/admin/inventory/variants/{variantId}` | Yes | Update stock quantity |
| POST | `/admin/inventory/variants/{variantId}/adjust` | Yes | Adjust stock with reason |
| GET | `/admin/inventory/low-stock` | Yes | Get low stock items |
| GET | `/admin/inventory/out-of-stock` | Yes | Get out of stock items |
| POST | `/admin/inventory/bulk-update` | Yes | Bulk update inventory |
| GET | `/admin/inventory/report` | Yes | Get inventory report |

---

## Admin Review Management (6)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/reviews/pending` | Yes | Get pending reviews |
| POST | `/admin/reviews/{reviewId}/approve` | Yes | Approve review |
| POST | `/admin/reviews/{reviewId}/reject` | Yes | Reject review |
| GET | `/admin/reviews/all` | Yes | List all reviews |
| DELETE | `/admin/reviews/{reviewId}` | Yes | Delete review |
| GET | `/admin/reviews/statistics` | Yes | Get review statistics |

---

## Endpoint Summary

| Category | Count |
|----------|-------|
| Authentication | 5 |
| Products | 8 |
| Categories | 1 |
| Reviews | 7 |
| Cart | 5 |
| Orders | 3 |
| Wishlist | 4 |
| Checkout | 2 |
| Admin Products | 6 |
| Admin Inventory | 7 |
| Admin Reviews | 6 |
| **TOTAL** | **54** |

---

## Query Parameters Reference

### Product Listing
```
GET /products?per_page=15&page=1&category_id=1&gender=Men&min_price=50&max_price=200&sort=newest
```

Parameters:
- `per_page` (int) - Items per page (default: 15)
- `page` (int) - Page number (default: 1)
- `category_id` (int) - Filter by category
- `gender` (string) - Filter by gender (Men, Women, Kids, Unisex)
- `min_price` (float) - Minimum price
- `max_price` (float) - Maximum price
- `sort` (string) - Sort by: newest, price_asc, price_desc, rating

### Product Search
```
GET /products/search?q=shoes&per_page=20
```

Parameters:
- `q` (string) - Search query (required)
- `per_page` (int) - Items per page (default: 15)

### Pagination
```
GET /products?page=2&per_page=20
```

Parameters:
- `page` (int) - Page number
- `per_page` (int) - Items per page

### Inventory Filters
```
GET /admin/inventory/low-stock?threshold=10
```

Parameters:
- `threshold` (int) - Stock threshold (default: 10)

### Review Filters
```
GET /admin/reviews/all?status=pending&per_page=10
```

Parameters:
- `status` (string) - Filter: approved, pending, all
- `per_page` (int) - Items per page

---

## Request/Response Examples

### Create Review
**Request:**
```bash
POST /products/1/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 5,
  "title": "Excellent product!",
  "comment": "Very satisfied with this purchase."
}
```

**Response (201):**
```json
{
  "id": 1,
  "product_id": 1,
  "user_id": 1,
  "rating": 5,
  "title": "Excellent product!",
  "comment": "Very satisfied with this purchase.",
  "is_approved": false,
  "user": {
    "id": 1,
    "name": "John Doe"
  },
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T10:00:00Z"
}
```

### Create Product (Admin)
**Request:**
```bash
POST /admin/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Running Shoe",
  "slug": "running-shoe",
  "description": "High-performance running shoe",
  "price": 129.99,
  "original_price": 149.99,
  "category_id": 1,
  "image": "https://example.com/image.jpg",
  "gender": "Men",
  "is_active": true
}
```

**Response (201):**
```json
{
  "id": 1,
  "name": "Running Shoe",
  "slug": "running-shoe",
  "price": 129.99,
  "original_price": 149.99,
  "category_id": 1,
  "is_active": true,
  "created_at": "2024-01-01T10:00:00Z"
}
```

### Update Inventory
**Request:**
```bash
PUT /admin/inventory/variants/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "stock_quantity": 100
}
```

**Response (200):**
```json
{
  "message": "Inventory updated successfully",
  "variant": {
    "id": 1,
    "product_id": 1,
    "size": "8",
    "color": "Black",
    "sku": "UA-SHOE-001",
    "stock_quantity": 100,
    "in_stock": true
  }
}
```

### Get Inventory Report
**Request:**
```bash
GET /admin/inventory/report
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "total_variants": 150,
  "total_stock": 5000,
  "in_stock_count": 145,
  "out_of_stock_count": 5,
  "low_stock_count": 12,
  "average_stock": 33.33,
  "by_product": [
    {
      "product_id": 1,
      "product_name": "Running Shoe",
      "total_variants": 18,
      "total_stock": 450
    }
  ]
}
```

---

## HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 422 | Unprocessable Entity | Validation failed |
| 500 | Server Error | Internal error |

---

## Error Response Format

```json
{
  "message": "Error description",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

---

## Authentication

All protected endpoints require:
```
Authorization: Bearer {token}
```

Get token from:
```bash
POST /auth/login
{
  "email": "user@example.com",
  "password": "password"
}
```

---

## Rate Limiting

- **Unauthenticated**: 60 requests/minute per IP
- **Authenticated**: 120 requests/minute per user

Headers:
```
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 119
X-RateLimit-Reset: 1609459200
```

---

## Pagination Format

All list endpoints return:
```json
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

---

## Testing Tools

### cURL
```bash
curl -X GET "http://localhost:8000/api/products" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Postman
1. Import API collection
2. Set base URL: `http://localhost:8000/api`
3. Add token to Authorization header
4. Test endpoints

### Thunder Client (VS Code)
1. Install extension
2. Create requests
3. Set Authorization header
4. Test endpoints

---

## Documentation Links

- [API Enhancements](./API_ENHANCEMENTS.md) - Detailed endpoint documentation
- [Original API](./API.md) - Original API documentation
- [Architecture](./ARCHITECTURE.md) - System design
- [Setup](./SETUP.md) - Installation guide

---

## Quick Reference

### Most Used Endpoints

**Browse Products**
```
GET /products?category_id=1&sort=newest
```

**Get Product Details**
```
GET /products/1
```

**Add to Cart**
```
POST /cart/items
{
  "product_id": 1,
  "quantity": 2,
  "size": "M",
  "color": "Black"
}
```

**Checkout**
```
POST /checkout/process
{
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001",
  "country": "USA"
}
```

**Create Review**
```
POST /products/1/reviews
{
  "rating": 5,
  "title": "Great!",
  "comment": "Very satisfied"
}
```

---

**Last Updated**: May 26, 2026
**API Version**: 1.0.0
**Status**: Production Ready
