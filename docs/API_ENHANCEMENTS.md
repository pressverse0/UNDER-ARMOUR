# API Enhancements Documentation

This document covers the new endpoints added to the Under Armour API for reviews, admin product management, inventory management, and email notifications.

---

## Reviews API

### Get Product Reviews (Public)

```
GET /products/{productId}/reviews
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
      "product_id": 1,
      "user_id": 1,
      "rating": 5,
      "title": "Excellent product!",
      "comment": "Very comfortable and durable...",
      "is_approved": true,
      "user": {
        "id": 1,
        "name": "John Doe"
      },
      "created_at": "2024-01-01T10:00:00Z",
      "updated_at": "2024-01-01T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 25,
    "per_page": 10
  }
}
```

### Get Specific Review (Public)

```
GET /products/{productId}/reviews/{reviewId}
```

### Create Review (Protected)

```
POST /products/{productId}/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 5,
  "title": "Great shoes!",
  "comment": "Very comfortable and fits perfectly."
}
```

Response:
```json
{
  "id": 1,
  "product_id": 1,
  "user_id": 1,
  "rating": 5,
  "title": "Great shoes!",
  "comment": "Very comfortable and fits perfectly.",
  "is_approved": false,
  "user": {
    "id": 1,
    "name": "John Doe"
  },
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T10:00:00Z"
}
```

### Update Review (Protected)

```
PUT /products/{productId}/reviews/{reviewId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 4,
  "title": "Good shoes",
  "comment": "Updated comment..."
}
```

### Delete Review (Protected)

```
DELETE /products/{productId}/reviews/{reviewId}
Authorization: Bearer {token}
```

### Get User's Reviews (Protected)

```
GET /reviews/user
Authorization: Bearer {token}
```

Query Parameters:
- `per_page` (int) - Items per page (default: 10)
- `page` (int) - Page number

---

## Admin Product Management API

### Create Product (Protected - Admin)

```
POST /admin/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Running Shoe",
  "slug": "new-running-shoe",
  "description": "High-performance running shoe...",
  "price": 129.99,
  "original_price": 149.99,
  "category_id": 1,
  "image": "https://example.com/image.jpg",
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "rating": 0,
  "reviews_count": 0,
  "gender": "Men",
  "technology": "UA SpeedForm",
  "is_new": true,
  "is_sale": false,
  "discount_percentage": null,
  "is_active": true
}
```

Response:
```json
{
  "id": 1,
  "name": "New Running Shoe",
  "slug": "new-running-shoe",
  "price": 129.99,
  "original_price": 149.99,
  "category_id": 1,
  "is_active": true,
  "created_at": "2024-01-01T10:00:00Z"
}
```

### Update Product (Protected - Admin)

```
PUT /admin/products/{productId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "price": 119.99,
  "is_sale": true,
  "discount_percentage": 20
}
```

### Delete Product (Protected - Admin)

```
DELETE /admin/products/{productId}
Authorization: Bearer {token}
```

### Bulk Update Products (Protected - Admin)

```
POST /admin/products/bulk-update
Authorization: Bearer {token}
Content-Type: application/json

{
  "product_ids": [1, 2, 3],
  "updates": {
    "is_sale": true,
    "discount_percentage": 15
  }
}
```

### Restore Soft-Deleted Product (Protected - Admin)

```
POST /admin/products/{productId}/restore
Authorization: Bearer {token}
```

### Get All Products (Including Deleted) (Protected - Admin)

```
GET /admin/products/all
Authorization: Bearer {token}
```

Query Parameters:
- `per_page` (int) - Items per page (default: 15)
- `page` (int) - Page number
- `include_trashed` (boolean) - Include soft-deleted products (default: false)

---

## Inventory Management API

### Get Product Inventory (Protected - Admin)

```
GET /admin/inventory/products/{productId}
Authorization: Bearer {token}
```

Response:
```json
{
  "product_id": 1,
  "variants": [
    {
      "id": 1,
      "product_id": 1,
      "size": "8",
      "color": "Black",
      "sku": "UA-SHOE-001",
      "stock_quantity": 50,
      "in_stock": true
    }
  ],
  "total_stock": 150
}
```

### Update Inventory (Protected - Admin)

```
PUT /admin/inventory/variants/{variantId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "stock_quantity": 75
}
```

### Adjust Inventory (Protected - Admin)

```
POST /admin/inventory/variants/{variantId}/adjust
Authorization: Bearer {token}
Content-Type: application/json

{
  "adjustment": -5,
  "reason": "Damaged during shipping"
}
```

Response:
```json
{
  "message": "Inventory adjusted successfully",
  "variant": {...},
  "adjustment": -5,
  "reason": "Damaged during shipping"
}
```

### Get Low Stock Items (Protected - Admin)

```
GET /admin/inventory/low-stock
Authorization: Bearer {token}
```

Query Parameters:
- `threshold` (int) - Stock threshold (default: 10)

Response:
```json
{
  "threshold": 10,
  "count": 5,
  "variants": [...]
}
```

### Get Out of Stock Items (Protected - Admin)

```
GET /admin/inventory/out-of-stock
Authorization: Bearer {token}
```

### Bulk Update Inventory (Protected - Admin)

```
POST /admin/inventory/bulk-update
Authorization: Bearer {token}
Content-Type: application/json

{
  "updates": [
    {
      "variant_id": 1,
      "stock_quantity": 50
    },
    {
      "variant_id": 2,
      "stock_quantity": 30
    }
  ]
}
```

### Get Inventory Report (Protected - Admin)

```
GET /admin/inventory/report
Authorization: Bearer {token}
```

Response:
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

## Admin Review Management API

### Get Pending Reviews (Protected - Admin)

```
GET /admin/reviews/pending
Authorization: Bearer {token}
```

Query Parameters:
- `per_page` (int) - Items per page (default: 10)
- `page` (int) - Page number

### Approve Review (Protected - Admin)

```
POST /admin/reviews/{reviewId}/approve
Authorization: Bearer {token}
```

Response:
```json
{
  "message": "Review approved successfully",
  "review": {...}
}
```

### Reject Review (Protected - Admin)

```
POST /admin/reviews/{reviewId}/reject
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Inappropriate content"
}
```

### Get All Reviews (Protected - Admin)

```
GET /admin/reviews/all
Authorization: Bearer {token}
```

Query Parameters:
- `per_page` (int) - Items per page (default: 10)
- `page` (int) - Page number
- `status` (string) - Filter by status: 'approved', 'pending', 'all' (default: 'all')

### Delete Review (Protected - Admin)

```
DELETE /admin/reviews/{reviewId}
Authorization: Bearer {token}
```

### Get Review Statistics (Protected - Admin)

```
GET /admin/reviews/statistics
Authorization: Bearer {token}
```

Query Parameters:
- `product_id` (int) - Optional: Get stats for specific product

Response:
```json
{
  "total_reviews": 150,
  "approved_reviews": 145,
  "pending_reviews": 5,
  "average_rating": 4.3,
  "rating_distribution": {
    "5_stars": 80,
    "4_stars": 45,
    "3_stars": 15,
    "2_stars": 4,
    "1_star": 1
  }
}
```

---

## Email Notifications

The system automatically sends emails for the following events:

### Order Confirmation
- **Trigger**: Order created
- **Recipient**: Customer
- **Content**: Order number, items, total, shipping address

### Order Shipped
- **Trigger**: Order marked as shipped
- **Recipient**: Customer
- **Content**: Tracking number, estimated delivery date

### Order Delivered
- **Trigger**: Order marked as delivered
- **Recipient**: Customer
- **Content**: Delivery confirmation

### Order Cancelled
- **Trigger**: Order cancelled
- **Recipient**: Customer
- **Content**: Cancellation reason

### Review Approved
- **Trigger**: Admin approves a review
- **Recipient**: Review author
- **Content**: Product name, approval notification

### Review Rejected
- **Trigger**: Admin rejects a review
- **Recipient**: Review author
- **Content**: Product name, rejection reason

### Low Stock Alert
- **Trigger**: Product stock falls below threshold
- **Recipient**: Admin
- **Content**: Product name, current stock, threshold

### Out of Stock Alert
- **Trigger**: Product stock reaches zero
- **Recipient**: Admin
- **Content**: Product name, out of stock notification

### Password Reset
- **Trigger**: User requests password reset
- **Recipient**: User
- **Content**: Reset link with token

### Welcome Email
- **Trigger**: New user registration
- **Recipient**: New user
- **Content**: Welcome message, account confirmation

---

## Error Responses

All endpoints follow the same error response format:

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": {
    "rating": ["The rating must be between 1 and 5"]
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
  "message": "Unauthorized"
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

---

## Authentication

All protected endpoints require:
- Bearer token in Authorization header
- Token obtained from `/auth/login` or `/auth/register`

Example:
```bash
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz
```

---

## Rate Limiting

- **Default**: 60 requests per minute per IP
- **Authenticated**: 120 requests per minute per user

Rate limit headers:
```
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 119
X-RateLimit-Reset: 1609459200
```

---

## Testing with cURL

### Create a Review
```bash
curl -X POST "http://localhost:8000/api/products/1/reviews" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "title": "Great product!",
    "comment": "Very satisfied with this purchase."
  }'
```

### Create a Product (Admin)
```bash
curl -X POST "http://localhost:8000/api/admin/products" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "slug": "new-product",
    "description": "Product description...",
    "price": 99.99,
    "category_id": 1,
    "image": "https://example.com/image.jpg",
    "gender": "Men",
    "is_active": true
  }'
```

### Update Inventory
```bash
curl -X PUT "http://localhost:8000/api/admin/inventory/variants/1" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stock_quantity": 100
  }'
```

### Get Inventory Report
```bash
curl -X GET "http://localhost:8000/api/admin/inventory/report" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Implementation Notes

1. **Admin Authorization**: In production, add role-based middleware to admin routes
2. **Email Service**: Currently logs emails. Integrate with mail service (SendGrid, Mailgun, etc.)
3. **Review Approval**: Reviews require admin approval before appearing publicly
4. **Inventory Tracking**: Stock adjustments are tracked with reasons
5. **Soft Deletes**: Products can be restored after deletion

---

For more information, see [API.md](./API.md) and [ARCHITECTURE.md](./ARCHITECTURE.md)
