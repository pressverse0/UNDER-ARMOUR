<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    /**
     * Validate coupon code.
     */
    public function validate(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'amount' => 'required|numeric|min:0',
        ]);

        $coupon = Coupon::where('code', strtoupper($request->input('code')))->first();

        if (!$coupon) {
            return response()->json(['message' => 'Coupon not found'], 404);
        }

        if (!$coupon->isValid()) {
            return response()->json(['message' => 'Coupon is not valid'], 400);
        }

        $discount = $coupon->calculateDiscount($request->input('amount'));

        return response()->json([
            'valid' => true,
            'coupon' => [
                'id' => $coupon->id,
                'code' => $coupon->code,
                'description' => $coupon->description,
                'discount_type' => $coupon->discount_type,
                'discount_value' => $coupon->discount_value,
            ],
            'discount_amount' => $discount,
            'final_amount' => $request->input('amount') - $discount,
        ]);
    }

    /**
     * Get available coupons.
     */
    public function available(Request $request)
    {
        $coupons = Coupon::available()
            ->select('id', 'code', 'description', 'discount_type', 'discount_value', 'min_purchase_amount')
            ->get();

        return response()->json([
            'count' => $coupons->count(),
            'coupons' => $coupons,
        ]);
    }
}
