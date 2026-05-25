<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Services\CartService;
use App\Services\OrderService;
use Illuminate\Http\Request;
class CheckoutController extends Controller
{
    public function __construct(
        private CartService $cartService,
        private OrderService $orderService
    ) {}

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

    public function process(Request $request)
    {
        $request->validate([
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'country' => 'required|string',
        ]);

        try {
            $cart = $this->cartService->getCart($request->user()->id);

            if ($cart->items->isEmpty()) {
                return response()->json(['message' => 'Cart is empty'], 400);
            }

            $stripePaymentId = null;
            $stripeKey = config('services.stripe.secret');

            if ($stripeKey && $request->filled('payment_method_id')) {
                \Stripe\Stripe::setApiKey($stripeKey);
                $totals = $this->cartService->getCartTotals($request->user()->id);

                $paymentIntent = \Stripe\PaymentIntent::create([
                    'amount' => (int)($totals['total'] * 100),
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

                $stripePaymentId = $paymentIntent->id;
            }

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
                    'method' => $stripePaymentId ? 'stripe' : 'demo',
                    'stripe_payment_id' => $stripePaymentId,
                ]
            );

            $this->orderService->updatePaymentStatus($order->id, 'completed');

            return response()->json(new OrderResource($order->load('items.product')), 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Checkout failed',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
