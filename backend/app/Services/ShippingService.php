<?php

namespace App\Services;

class ShippingService
{
    /**
     * Shipping methods with rates
     */
    private const SHIPPING_METHODS = [
        'standard' => [
            'name' => 'Standard Shipping',
            'base_rate' => 5.99,
            'per_item' => 0.50,
            'days' => 5,
        ],
        'express' => [
            'name' => 'Express Shipping',
            'base_rate' => 12.99,
            'per_item' => 1.00,
            'days' => 2,
        ],
        'overnight' => [
            'name' => 'Overnight Shipping',
            'base_rate' => 24.99,
            'per_item' => 2.00,
            'days' => 1,
        ],
        'free' => [
            'name' => 'Free Shipping',
            'base_rate' => 0.00,
            'per_item' => 0.00,
            'days' => 7,
            'min_amount' => 100.00,
        ],
    ];

    /**
     * Calculate shipping cost.
     */
    public static function calculateShipping(string $method, int $itemCount, float $subtotal = 0): array
    {
        if (!isset(self::SHIPPING_METHODS[$method])) {
            return ['error' => 'Invalid shipping method'];
        }

        $shipping = self::SHIPPING_METHODS[$method];

        // Check if free shipping qualifies
        if ($method === 'free' && $subtotal < $shipping['min_amount']) {
            return ['error' => 'Minimum purchase amount not met for free shipping'];
        }

        $cost = $shipping['base_rate'] + ($itemCount * $shipping['per_item']);

        return [
            'method' => $method,
            'name' => $shipping['name'],
            'cost' => round($cost, 2),
            'estimated_days' => $shipping['days'],
            'estimated_delivery' => now()->addDays($shipping['days'])->format('Y-m-d'),
        ];
    }

    /**
     * Get all shipping methods.
     */
    public static function getShippingMethods(): array
    {
        $methods = [];

        foreach (self::SHIPPING_METHODS as $key => $method) {
            $methods[] = [
                'id' => $key,
                'name' => $method['name'],
                'base_rate' => $method['base_rate'],
                'per_item' => $method['per_item'],
                'days' => $method['days'],
            ];
        }

        return $methods;
    }

    /**
     * Get shipping method details.
     */
    public static function getShippingMethod(string $method): array
    {
        if (!isset(self::SHIPPING_METHODS[$method])) {
            return ['error' => 'Shipping method not found'];
        }

        return self::SHIPPING_METHODS[$method];
    }

    /**
     * Calculate shipping for cart items.
     */
    public static function calculateShippingForCart(string $method, array $cartItems): array
    {
        $itemCount = array_reduce($cartItems, function ($carry, $item) {
            return $carry + $item['quantity'];
        }, 0);

        $subtotal = array_reduce($cartItems, function ($carry, $item) {
            return $carry + ($item['price'] * $item['quantity']);
        }, 0);

        return self::calculateShipping($method, $itemCount, $subtotal);
    }

    /**
     * Get free shipping threshold.
     */
    public static function getFreeShippingThreshold(): float
    {
        return self::SHIPPING_METHODS['free']['min_amount'] ?? 100.00;
    }

    /**
     * Check if order qualifies for free shipping.
     */
    public static function qualifiesForFreeShipping(float $subtotal): bool
    {
        return $subtotal >= self::getFreeShippingThreshold();
    }
}
