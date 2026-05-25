<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CartService
{
    /**
     * Get or create user's cart.
     */
    public function getOrCreateCart($userId)
    {
        return Cart::firstOrCreate(['user_id' => $userId]);
    }

    /**
     * Get cart with items.
     */
    public function getCart($userId)
    {
        $cart = $this->getOrCreateCart($userId);
        return $cart->load('items.product');
    }

    /**
     * Add item to cart.
     */
    public function addItem($userId, int $productId, int $quantity, ?string $size = null, ?string $color = null)
    {
        $cart = $this->getOrCreateCart($userId);
        $product = Product::findOrFail($productId);

        // Check if item already exists
        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $productId)
            ->where('size', $size)
            ->where('color', $color)
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $quantity);
            return $cartItem;
        }

        return CartItem::create([
            'cart_id' => $cart->id,
            'product_id' => $productId,
            'quantity' => $quantity,
            'size' => $size,
            'color' => $color,
        ]);
    }

    /**
     * Update cart item quantity.
     */
    public function updateItem($userId, int $cartItemId, int $quantity)
    {
        $cartItem = CartItem::findOrFail($cartItemId);
        $cart = $this->getOrCreateCart($userId);

        if ($cartItem->cart_id !== $cart->id) {
            throw new \Exception('Cart item does not belong to this cart');
        }

        if ($quantity <= 0) {
            $cartItem->delete();
            return null;
        }

        $cartItem->update(['quantity' => $quantity]);
        return $cartItem;
    }

    /**
     * Remove item from cart.
     */
    public function removeItem($userId, int $cartItemId)
    {
        $cartItem = CartItem::findOrFail($cartItemId);
        $cart = $this->getOrCreateCart($userId);

        if ($cartItem->cart_id !== $cart->id) {
            throw new \Exception('Cart item does not belong to this cart');
        }

        return $cartItem->delete();
    }

    /**
     * Clear cart.
     */
    public function clearCart($userId)
    {
        $cart = $this->getOrCreateCart($userId);
        $cart->clear();
    }

    /**
     * Get cart totals.
     */
    public function getCartTotals($userId)
    {
        $cart = $this->getCart($userId);
        $items = $cart->items;

        $subtotal = $items->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        $tax = $subtotal * 0.1; // 10% tax
        $shippingCost = $subtotal > 100 ? 0 : 10; // Free shipping over $100

        return [
            'subtotal' => round($subtotal, 2),
            'tax' => round($tax, 2),
            'shipping_cost' => $shippingCost,
            'total' => round($subtotal + $tax + $shippingCost, 2),
            'item_count' => $items->sum('quantity'),
        ];
    }
}
