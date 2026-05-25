<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\CheckoutController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public routes
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/search', [ProductController::class, 'search']);
    Route::get('/new-arrivals', [ProductController::class, 'newArrivals']);
    Route::get('/sale', [ProductController::class, 'sale']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::get('/{id}/sizes', [ProductController::class, 'sizes']);
    Route::get('/{id}/colors', [ProductController::class, 'colors']);
    Route::get('/category/{categoryId}', [ProductController::class, 'byCategory']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
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
