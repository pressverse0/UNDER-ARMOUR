<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\AdminProductController;
use App\Http\Controllers\Api\AdminReviewController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Models\Category;

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
    Route::put('/profile', [AuthController::class, 'updateProfile'])->middleware('auth:sanctum');
});

// Public categories route
Route::get('/categories', function () {
    return response()->json(
        Category::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'description', 'image'])
    );
});

// Public product routes
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/search', [ProductController::class, 'search']);
    Route::get('/new-arrivals', [ProductController::class, 'newArrivals']);
    Route::get('/sale', [ProductController::class, 'sale']);
    Route::get('/category/{categoryId}', [ProductController::class, 'byCategory']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::get('/{id}/sizes', [ProductController::class, 'sizes']);
    Route::get('/{id}/colors', [ProductController::class, 'colors']);
});

// Public review routes
Route::prefix('products/{productId}/reviews')->group(function () {
    Route::get('/', [ReviewController::class, 'index']);
    Route::get('/{reviewId}', [ReviewController::class, 'show']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Cart routes
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index']);
        Route::post('/items', [CartController::class, 'store']);
        Route::put('/items/{cartItemId}', [CartController::class, 'update']);
        Route::delete('/items/{cartItemId}', [CartController::class, 'destroy']);
        Route::delete('/', [CartController::class, 'clear']);
    });

    // Order routes
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/{orderId}', [OrderController::class, 'show']);
        Route::post('/track', [OrderController::class, 'track']);
    });

    // Wishlist routes
    Route::prefix('wishlist')->group(function () {
        Route::get('/', [WishlistController::class, 'index']);
        Route::post('/', [WishlistController::class, 'store']);
        Route::delete('/{productId}', [WishlistController::class, 'destroy']);
        Route::get('/{productId}/check', [WishlistController::class, 'check']);
    });

    // Checkout routes
    Route::prefix('checkout')->group(function () {
        Route::post('/validate', [CheckoutController::class, 'validate']);
        Route::post('/process', [CheckoutController::class, 'process']);
    });

    // Review routes (protected)
    Route::prefix('products/{productId}/reviews')->group(function () {
        Route::post('/', [ReviewController::class, 'store']);
        Route::put('/{reviewId}', [ReviewController::class, 'update']);
        Route::delete('/{reviewId}', [ReviewController::class, 'destroy']);
    });

    // User reviews
    Route::get('/reviews/user', [ReviewController::class, 'userReviews']);

    // Coupon routes
    Route::prefix('coupons')->group(function () {
        Route::post('/validate', [CouponController::class, 'validate']);
        Route::get('/available', [CouponController::class, 'available']);
    });

    // Analytics routes (protected - admin)
    Route::prefix('analytics')->group(function () {
        Route::get('/sales', [AnalyticsController::class, 'sales']);
        Route::get('/products', [AnalyticsController::class, 'products']);
        Route::get('/users', [AnalyticsController::class, 'users']);
        Route::get('/reviews', [AnalyticsController::class, 'reviews']);
        Route::get('/inventory', [AnalyticsController::class, 'inventory']);
        Route::get('/dashboard', [AnalyticsController::class, 'dashboard']);
    });

    // Admin routes (protected - add middleware for admin role in production)
    Route::prefix('admin')->group(function () {
        // Product management
        Route::prefix('products')->group(function () {
            Route::post('/', [AdminProductController::class, 'store']);
            Route::put('/{productId}', [AdminProductController::class, 'update']);
            Route::delete('/{productId}', [AdminProductController::class, 'destroy']);
            Route::post('/bulk-update', [AdminProductController::class, 'bulkUpdate']);
            Route::post('/{productId}/restore', [AdminProductController::class, 'restore']);
            Route::get('/all', [AdminProductController::class, 'allProducts']);
        });

        // Inventory management
        Route::prefix('inventory')->group(function () {
            Route::get('/products/{productId}', [AdminInventoryController::class, 'index']);
            Route::put('/variants/{variantId}', [AdminInventoryController::class, 'update']);
            Route::post('/variants/{variantId}/adjust', [AdminInventoryController::class, 'adjust']);
            Route::get('/low-stock', [AdminInventoryController::class, 'lowStock']);
            Route::get('/out-of-stock', [AdminInventoryController::class, 'outOfStock']);
            Route::post('/bulk-update', [AdminInventoryController::class, 'bulkUpdate']);
            Route::get('/report', [AdminInventoryController::class, 'report']);
        });

        // Review management
        Route::prefix('reviews')->group(function () {
            Route::get('/pending', [AdminReviewController::class, 'pending']);
            Route::post('/{reviewId}/approve', [AdminReviewController::class, 'approve']);
            Route::post('/{reviewId}/reject', [AdminReviewController::class, 'reject']);
            Route::get('/all', [AdminReviewController::class, 'all']);
            Route::delete('/{reviewId}', [AdminReviewController::class, 'destroy']);
            Route::get('/statistics', [AdminReviewController::class, 'statistics']);
        });
    });
});
