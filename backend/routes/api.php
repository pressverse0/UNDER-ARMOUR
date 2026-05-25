<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\CheckoutController;
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
});
