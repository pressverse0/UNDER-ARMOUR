<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class CacheService
{
    /**
     * Cache keys configuration
     */
    private const CACHE_KEYS = [
        'products' => 'products:all',
        'product' => 'product:%d',
        'categories' => 'categories:all',
        'category' => 'category:%d',
        'reviews' => 'reviews:product:%d',
        'inventory' => 'inventory:product:%d',
        'cart' => 'cart:user:%d',
        'wishlist' => 'wishlist:user:%d',
        'orders' => 'orders:user:%d',
        'order' => 'order:%d',
    ];

    /**
     * Cache durations (in minutes)
     */
    private const CACHE_DURATIONS = [
        'products' => 60,           // 1 hour
        'product' => 120,           // 2 hours
        'categories' => 1440,       // 24 hours
        'reviews' => 30,            // 30 minutes
        'inventory' => 15,          // 15 minutes
        'cart' => 5,                // 5 minutes
        'wishlist' => 10,           // 10 minutes
        'orders' => 20,             // 20 minutes
    ];

    /**
     * Generic cache remember method (DRY principle)
     */
    public function remember(string $key, callable $callback, int $minutes = null): mixed
    {
        $minutes = $minutes ?? $this->getDuration($key);
        
        return Cache::remember($key, $minutes * 60, $callback);
    }

    /**
     * Get cached value or null
     */
    public function get(string $key): mixed
    {
        return Cache::get($key);
    }

    /**
     * Put value in cache
     */
    public function put(string $key, mixed $value, int $minutes = null): void
    {
        $minutes = $minutes ?? $this->getDuration($key);
        Cache::put($key, $value, $minutes * 60);
    }

    /**
     * Forget cache key
     */
    public function forget(string $key): void
    {
        Cache::forget($key);
    }

    /**
     * Forget multiple cache keys
     */
    public function forgetMany(array $keys): void
    {
        Cache::forget($keys);
    }

    /**
     * Clear all cache
     */
    public function flush(): void
    {
        Cache::flush();
    }

    /**
     * Get cache duration for key
     */
    private function getDuration(string $key): int
    {
        foreach (self::CACHE_DURATIONS as $pattern => $duration) {
            if (strpos($key, $pattern) === 0) {
                return $duration;
            }
        }
        return 60; // Default 1 hour
    }

    /**
     * Get cache statistics
     */
    public function getStatistics(): array
    {
        return [
            'cache_keys' => self::CACHE_KEYS,
            'cache_durations' => self::CACHE_DURATIONS,
            'total_keys' => count(self::CACHE_KEYS),
        ];
    }

    /**
     * Invalidate product cache
     */
    public function invalidateProduct(int $productId): void
    {
        $this->forget("product:{$productId}");
        $this->forget('products:all');
        LogService::logCacheOperation('invalidate', "product:{$productId}");
    }

    /**
     * Invalidate category cache
     */
    public function invalidateCategory(int $categoryId): void
    {
        $this->forget("category:{$categoryId}");
        $this->forget('categories:all');
        LogService::logCacheOperation('invalidate', "category:{$categoryId}");
    }

    /**
     * Invalidate user cart cache
     */
    public function invalidateUserCart(int $userId): void
    {
        $this->forget("cart:user:{$userId}");
        LogService::logCacheOperation('invalidate', "cart:user:{$userId}");
    }

    /**
     * Invalidate user wishlist cache
     */
    public function invalidateUserWishlist(int $userId): void
    {
        $this->forget("wishlist:user:{$userId}");
        LogService::logCacheOperation('invalidate', "wishlist:user:{$userId}");
    }

    /**
     * Invalidate user orders cache
     */
    public function invalidateUserOrders(int $userId): void
    {
        $this->forget("orders:user:{$userId}");
        LogService::logCacheOperation('invalidate', "orders:user:{$userId}");
    }

    /**
     * Invalidate product reviews cache
     */
    public function invalidateProductReviews(int $productId): void
    {
        $this->forget("reviews:product:{$productId}");
        LogService::logCacheOperation('invalidate', "reviews:product:{$productId}");
    }

    /**
     * Invalidate product inventory cache
     */
    public function invalidateProductInventory(int $productId): void
    {
        $this->forget("inventory:product:{$productId}");
        LogService::logCacheOperation('invalidate', "inventory:product:{$productId}");
    }
}
