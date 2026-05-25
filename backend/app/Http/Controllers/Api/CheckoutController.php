<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Services\CartService;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class CheckoutController extends Controller
{
    public function __construct(
        private CartService $cartService,
        private OrderService $orderService
    ) {}

    /**
     * Validate checkout.
     */
    public function validate(Request $request)
    {
        $request->validate([
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'country' => 'required|string',
        ]);

        $cart = $this->cartService->getCart($request->user()->id);

        if ($cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $totals = $this->cartService->getCartTotals($request->user()->id);

        return response()->json([
            'valid' => true,
            'totals' => $totals,
        ]);
    }

    /**
     * Process payment and create order.
     */
    public function process(Request $request)
    {
        $request->validate([
            'payment_method_id' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'country' => 'required|string',
        ]);

        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $totals = $this->cartService->getCartTotals($request->user()->id);

            // Create payment intent
            $paymentIntent = PaymentIntent::create([
                'amount' => (int)($totals['total'] * 100), // Convert to cents
                'currency' => 'usd',
                'payment_method' => $request->input('payment_method_id'),
                'confirm' => true,
                'automatic_payment_methods' => [
                    'enabled' => true,
                    'allow_redirects' => 'never',
                ],
            ]);

            if ($paymentIntent->status !== 'succeeded') {
                return response()->json([
                    'message' => 'Payment failed',
                    'status' => $paymentIntent->status,
                ], 400);
            }

            // Create order
            $order = $this->orderService->createOrderFromCart(
                $request->user()->id,
                [
                    'address' => $request->input('address'),
                    'city' => $request->input('city'),
                    'state' => $request->input('state'),
                    'zip_code' => $request->input('zip_code'),
                    'country' => $request->input('country'),
                ],
                [
                    'method' => 'stripe',
                    'stripe_payment_id' => $paymentIntent->id,
                ]
            );

            // Update payment status
            $this->orderService->updatePaymentStatus($order->id, 'completed');

            return response()->json(new OrderResource($order), 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Checkout failed',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
