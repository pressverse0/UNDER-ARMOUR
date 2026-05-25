<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartItemResource;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function __construct(
        private CartService $cartService
    ) {}

    /**
     * Get user's cart.
     */
    public function index(Request $request)
    {
        $cart = $this->cartService->getCart($request->user()->id);
        $totals = $this->cartService->getCartTotals($request->user()->id);

        return response()->json([
            'items' => CartItemResource::collection($cart->items),
            'totals' => $totals,
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'size' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $cartItem = $this->cartService->addItem(
            $request->user()->id,
            $request->input('product_id'),
            $request->input('quantity'),
            $request->input('size'),
            $request->input('color')
        );

        return response()->json(new CartItemResource($cartItem), 201);
    }

    /**
     * Update cart item.
     */
    public function update(Request $request, int $cartItemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);

        $cartItem = $this->cartService->updateItem(
            $request->user()->id,
            $cartItemId,
            $request->input('quantity')
        );

        if (!$cartItem) {
            return response()->json(['message' => 'Item removed from cart'], 200);
        }

        return response()->json(new CartItemResource($cartItem));
    }

    /**
     * Remove item from cart.
     */
    public function destroy(Request $request, int $cartItemId)
    {
        $this->cartService->removeItem($request->user()->id, $cartItemId);
        return response()->json(['message' => 'Item removed from cart'], 200);
    }

    /**
     * Clear cart.
     */
    public function clear(Request $request)
    {
        $this->cartService->clearCart($request->user()->id);
        return response()->json(['message' => 'Cart cleared'], 200);
    }
}
