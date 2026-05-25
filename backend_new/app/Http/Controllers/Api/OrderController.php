<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService
    ) {}

    /**
     * Get user's orders.
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $orders = $this->orderService->getUserOrders($request->user()->id, $perPage);

        return OrderResource::collection($orders);
    }

    /**
     * Get order details.
     */
    public function show(Request $request, int $orderId)
    {
        $order = $this->orderService->getOrderDetails($orderId, $request->user()->id);
        return new OrderResource($order);
    }

    /**
     * Track order by order number.
     */
    public function track(Request $request)
    {
        $request->validate([
            'order_number' => 'required|string',
        ]);

        $order = $this->orderService->trackOrder($request->input('order_number'));
        return new OrderResource($order);
    }
}
