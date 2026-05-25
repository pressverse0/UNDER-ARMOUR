<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\WishlistResource;
use App\Services\WishlistService;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function __construct(
        private WishlistService $wishlistService
    ) {}

    /**
     * Get user's wishlist.
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $wishlist = $this->wishlistService->getWishlist($request->user()->id, $perPage);

        return WishlistResource::collection($wishlist);
    }

    /**
     * Add product to wishlist.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
        ]);

        $wishlistItem = $this->wishlistService->addToWishlist(
            $request->user()->id,
            $request->input('product_id')
        );

        return response()->json(new WishlistResource($wishlistItem), 201);
    }

    /**
     * Remove product from wishlist.
     */
    public function destroy(Request $request, int $productId)
    {
        $this->wishlistService->removeFromWishlist($request->user()->id, $productId);
        return response()->json(['message' => 'Product removed from wishlist'], 200);
    }

    /**
     * Check if product is in wishlist.
     */
    public function check(Request $request, int $productId)
    {
        $isInWishlist = $this->wishlistService->isInWishlist($request->user()->id, $productId);
        return response()->json(['is_in_wishlist' => $isInWishlist]);
    }
}
