<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use Illuminate\Support\Str;

class OrderService
{
    public function __construct(
        private CartService $cartService
    ) {}

    /**
     * Create order from cart.
     */
    public function createOrderFromCart($userId, array $shippingData, array $paymentData)
    {
        $cart = $this->cartService->getCart($userId);
        $cartTotals = $this->cartService->getCartTotals($userId);

        // Create order
        $order = Order::create([
            'user_id' => $userId,
            'order_number' => $this->generateOrderNumber(),
            'status' => 'pending',
            'subtotal' => $cartTotals['subtotal'],
            'tax' => $cartTotals['tax'],
            'shipping_cost' => $cartTotals['shipping_cost'],
            'total' => $cartTotals['total'],
            'payment_method' => $paymentData['method'] ?? 'stripe',
            'payment_status' => 'pending',
            'stripe_payment_id' => $paymentData['stripe_payment_id'] ?? null,
            'shipping_address' => $shippingData['address'],
            'shipping_city' => $shippingData['city'],
            'shipping_state' => $shippingData['state'],
            'shipping_zip' => $shippingData['zip_code'],
            'shipping_country' => $shippingData['country'],
        ]);

        // Create order items from cart
        foreach ($cart->items as $cartItem) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $cartItem->product_id,
                'product_name' => $cartItem->product->name,
                'price' => $cartItem->product->price,
                'quantity' => $cartItem->quantity,
                'size' => $cartItem->size,
                'color' => $cartItem->color,
                'subtotal' => $cartItem->product->price * $cartItem->quantity,
            ]);
        }

        // Clear cart
        $this->cartService->clearCart($userId);

        return $order;
    }

    /**
     * Get user's orders.
     */
    public function getUserOrders($userId, int $perPage = 10)
    {
        return Order::where('user_id', $userId)
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get order details.
     */
    public function getOrderDetails(int $orderId, $userId)
    {
        return Order::where('id', $orderId)
            ->where('user_id', $userId)
            ->with('items.product')
            ->firstOrFail();
    }

    /**
     * Update order status.
     */
    public function updateOrderStatus(int $orderId, string $status, ?string $trackingNumber = null)
    {
        $order = Order::findOrFail($orderId);

        match ($status) {
            'shipped' => $order->markAsShipped($trackingNumber),
            'delivered' => $order->markAsDelivered(),
            'cancelled' => $order->cancel(),
            default => $order->update(['status' => $status]),
        };

        return $order;
    }

    /**
     * Update payment status.
     */
    public function updatePaymentStatus(int $orderId, string $status)
    {
        $order = Order::findOrFail($orderId);
        $order->update(['payment_status' => $status]);

        if ($status === 'completed') {
            $order->update(['status' => 'processing']);
        }

        return $order;
    }

    /**
     * Generate unique order number.
     */
    private function generateOrderNumber(): string
    {
        do {
            $orderNumber = 'ORD-' . date('Ymd') . '-' . strtoupper(Str::random(6));
        } while (Order::where('order_number', $orderNumber)->exists());

        return $orderNumber;
    }

    /**
     * Track order.
     */
    public function trackOrder(string $orderNumber)
    {
        return Order::where('order_number', $orderNumber)
            ->with('items.product')
            ->firstOrFail();
    }
}
