<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class LogService
{
    /**
     * Log levels
     */
    private const LEVELS = [
        'emergency' => 'emergency',
        'alert' => 'alert',
        'critical' => 'critical',
        'error' => 'error',
        'warning' => 'warning',
        'notice' => 'notice',
        'info' => 'info',
        'debug' => 'debug',
    ];

    /**
     * Generic log method (DRY principle)
     */
    public static function log(string $channel, string $level, string $message, array $context = []): void
    {
        Log::channel($channel)->log($level, $message, $context);
    }

    /**
     * Log API request
     */
    public static function logApiRequest(string $method, string $path, int $userId = null, array $data = []): void
    {
        self::log('api', 'info', 'API Request', [
            'method' => $method,
            'path' => $path,
            'user_id' => $userId,
            'timestamp' => now(),
            'data' => $data,
        ]);
    }

    /**
     * Log API response
     */
    public static function logApiResponse(string $method, string $path, int $statusCode, int $userId = null, float $duration = 0): void
    {
        self::log('api', 'info', 'API Response', [
            'method' => $method,
            'path' => $path,
            'status_code' => $statusCode,
            'user_id' => $userId,
            'duration_ms' => $duration,
            'timestamp' => now(),
        ]);
    }

    /**
     * Log API error
     */
    public static function logApiError(string $method, string $path, int $statusCode, string $error, int $userId = null): void
    {
        self::log('api', 'error', 'API Error', [
            'method' => $method,
            'path' => $path,
            'status_code' => $statusCode,
            'error' => $error,
            'user_id' => $userId,
            'timestamp' => now(),
        ]);
    }

    /**
     * Log database query
     */
    public static function logDatabaseQuery(string $query, array $bindings = [], float $duration = 0): void
    {
        self::log('database', 'debug', 'Database Query', [
            'query' => $query,
            'bindings' => $bindings,
            'duration_ms' => $duration,
            'timestamp' => now(),
        ]);
    }

    /**
     * Log audit event (user actions)
     */
    public static function logAuditEvent(int $userId, string $action, string $resource, int $resourceId, array $changes = []): void
    {
        self::log('audit', 'info', 'Audit Event', [
            'user_id' => $userId,
            'action' => $action,
            'resource' => $resource,
            'resource_id' => $resourceId,
            'changes' => $changes,
            'timestamp' => now(),
        ]);
    }

    /**
     * Log authentication event
     */
    public static function logAuthEvent(string $event, int $userId = null, string $email = null, bool $success = true): void
    {
        self::log('auth', $success ? 'info' : 'warning', "Auth Event: {$event}", [
            'event' => $event,
            'user_id' => $userId,
            'email' => $email,
            'success' => $success,
            'timestamp' => now(),
        ]);
    }

    /**
     * Log payment event
     */
    public static function logPaymentEvent(string $event, int $orderId, float $amount, string $status, string $paymentId = null): void
    {
        self::log('payment', 'info', "Payment Event: {$event}", [
            'event' => $event,
            'order_id' => $orderId,
            'amount' => $amount,
            'status' => $status,
            'payment_id' => $paymentId,
            'timestamp' => now(),
        ]);
    }

    /**
     * Log inventory change
     */
    public static function logInventoryChange(int $variantId, int $oldQuantity, int $newQuantity, string $reason = ''): void
    {
        self::log('inventory', 'info', 'Inventory Change', [
            'variant_id' => $variantId,
            'old_quantity' => $oldQuantity,
            'new_quantity' => $newQuantity,
            'change' => $newQuantity - $oldQuantity,
            'reason' => $reason,
            'timestamp' => now(),
        ]);
    }

    /**
     * Log order event
     */
    public static function logOrderEvent(string $event, int $orderId, int $userId, string $status = '', array $details = []): void
    {
        self::log('orders', 'info', "Order Event: {$event}", [
            'event' => $event,
            'order_id' => $orderId,
            'user_id' => $userId,
            'status' => $status,
            'details' => $details,
            'timestamp' => now(),
        ]);
    }

    /**
     * Log cache operation
     */
    public static function logCacheOperation(string $operation, string $key, bool $success = true): void
    {
        self::log('cache', $success ? 'debug' : 'warning', "Cache Operation: {$operation}", [
            'operation' => $operation,
            'key' => $key,
            'success' => $success,
            'timestamp' => now(),
        ]);
    }

    /**
     * Log error
     */
    public static function logError(string $message, array $context = [], string $channel = 'errors'): void
    {
        self::log($channel, 'error', $message, array_merge($context, [
            'timestamp' => now(),
        ]));
    }

    /**
     * Log performance metric
     */
    public static function logPerformance(string $operation, float $duration, array $context = []): void
    {
        self::log('performance', 'info', "Performance: {$operation}", array_merge($context, [
            'operation' => $operation,
            'duration_ms' => $duration,
            'timestamp' => now(),
        ]));
    }

    /**
     * Log security event
     */
    public static function logSecurityEvent(string $event, int $userId = null, string $details = '', bool $suspicious = false): void
    {
        self::log('security', $suspicious ? 'warning' : 'info', "Security Event: {$event}", [
            'event' => $event,
            'user_id' => $userId,
            'details' => $details,
            'suspicious' => $suspicious,
            'timestamp' => now(),
        ]);
    }

    /**
     * Log review event
     */
    public static function logReviewEvent(string $event, int $reviewId, int $userId, int $productId, string $status = ''): void
    {
        self::log('audit', 'info', "Review Event: {$event}", [
            'event' => $event,
            'review_id' => $reviewId,
            'user_id' => $userId,
            'product_id' => $productId,
            'status' => $status,
            'timestamp' => now(),
        ]);
    }
}
