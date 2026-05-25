<?php

namespace App\Services;

use App\Models\Wishlist;
use App\Models\Product;

class WishlistService
{
    /**
     * Get user's wishlist.
     */
    public function getWishlist($userId, int $perPage = 10)
    {
        return Wishlist::where('user_id', $userId)
            ->with('product')
            ->paginate($perPage);
    }

    /**
     * Add product to wishlist.
     */
    public function addToWishlist($userId, int $productId)
    {
        Product::findOrFail($productId);

        return Wishlist::firstOrCreate([
            'user_id' => $userId,
            'product_id' => $productId,
        ]);
    }

    /**
     * Remove product from wishlist.
     */
    public function removeFromWishlist($userId, int $productId)
    {
        return Wishlist::where('user_id', $userId)
            ->where('product_id', $productId)
            ->delete();
    }

    /**
     * Check if product is in wishlist.
     */
    public function isInWishlist($userId, int $productId): bool
    {
        return Wishlist::where('user_id', $userId)
            ->where('product_id', $productId)
            ->exists();
    }

    /**
     * Get wishlist count.
     */
    public function getWishlistCount($userId): int
    {
        return Wishlist::where('user_id', $userId)->count();
    }
}
