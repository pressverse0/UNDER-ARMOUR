<?php

namespace App\Services;

use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class EmailService
{
    /**
     * Send order confirmation email.
     */
    public function sendOrderConfirmation(Order $order): void
    {
        $user = $order->user;

        $emailData = [
            'user_name' => $user->name,
            'order_number' => $order->order_number,
            'order_total' => $order->total,
            'order_items' => $order->items,
            'shipping_address' => [
                'address' => $order->shipping_address,
                'city' => $order->shipping_city,
                'state' => $order->shipping_state,
                'zip' => $order->shipping_zip,
                'country' => $order->shipping_country,
            ],
        ];

        // In production, use Mail::send() with a mailable class
        // For now, log the email
        \Log::info('Order Confirmation Email', $emailData);
    }

    /**
     * Send order shipped notification.
     */
    public function sendOrderShipped(Order $order): void
    {
        $user = $order->user;

        $emailData = [
            'user_name' => $user->name,
            'order_number' => $order->order_number,
            'tracking_number' => $order->tracking_number,
            'estimated_delivery' => $order->shipped_at?->addDays(5)->format('Y-m-d'),
        ];

        \Log::info('Order Shipped Email', $emailData);
    }

    /**
     * Send order delivered notification.
     */
    public function sendOrderDelivered(Order $order): void
    {
        $user = $order->user;

        $emailData = [
            'user_name' => $user->name,
            'order_number' => $order->order_number,
            'delivered_at' => $order->delivered_at,
        ];

        \Log::info('Order Delivered Email', $emailData);
    }

    /**
     * Send order cancelled notification.
     */
    public function sendOrderCancelled(Order $order): void
    {
        $user = $order->user;

        $emailData = [
            'user_name' => $user->name,
            'order_number' => $order->order_number,
            'reason' => 'Order has been cancelled',
        ];

        \Log::info('Order Cancelled Email', $emailData);
    }

    /**
     * Send review approval notification.
     */
    public function sendReviewApproved(int $userId, string $productName): void
    {
        $user = User::findOrFail($userId);

        $emailData = [
            'user_name' => $user->name,
            'product_name' => $productName,
        ];

        \Log::info('Review Approved Email', $emailData);
    }

    /**
     * Send review rejection notification.
     */
    public function sendReviewRejected(int $userId, string $productName, string $reason = ''): void
    {
        $user = User::findOrFail($userId);

        $emailData = [
            'user_name' => $user->name,
            'product_name' => $productName,
            'reason' => $reason,
        ];

        \Log::info('Review Rejected Email', $emailData);
    }

    /**
     * Send low stock alert to admin.
     */
    public function sendLowStockAlert(string $productName, int $currentStock, int $threshold): void
    {
        $emailData = [
            'product_name' => $productName,
            'current_stock' => $currentStock,
            'threshold' => $threshold,
        ];

        \Log::info('Low Stock Alert Email', $emailData);
    }

    /**
     * Send out of stock alert to admin.
     */
    public function sendOutOfStockAlert(string $productName): void
    {
        $emailData = [
            'product_name' => $productName,
        ];

        \Log::info('Out of Stock Alert Email', $emailData);
    }

    /**
     * Send password reset email.
     */
    public function sendPasswordReset(User $user, string $resetToken): void
    {
        $emailData = [
            'user_name' => $user->name,
            'reset_url' => config('app.frontend_url') . '/reset-password?token=' . $resetToken,
        ];

        \Log::info('Password Reset Email', $emailData);
    }

    /**
     * Send welcome email to new user.
     */
    public function sendWelcome(User $user): void
    {
        $emailData = [
            'user_name' => $user->name,
            'email' => $user->email,
        ];

        \Log::info('Welcome Email', $emailData);
    }
}
