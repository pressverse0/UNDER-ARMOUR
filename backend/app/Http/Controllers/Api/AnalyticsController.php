<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    /**
     * Get sales analytics.
     */
    public function sales(Request $request)
    {
        $period = $request->query('period', '30'); // days
        $startDate = now()->subDays((int)$period);

        $orders = Order::where('created_at', '>=', $startDate)
            ->where('payment_status', 'completed')
            ->get();

        $analytics = [
            'period_days' => (int)$period,
            'total_orders' => $orders->count(),
            'total_revenue' => $orders->sum('total'),
            'average_order_value' => $orders->avg('total'),
            'total_items_sold' => $orders->sum(function ($order) {
                return $order->items->sum('quantity');
            }),
            'by_status' => $orders->groupBy('status')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'revenue' => $group->sum('total'),
                ];
            }),
            'by_date' => $orders->groupBy(function ($order) {
                return $order->created_at->format('Y-m-d');
            })->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'revenue' => $group->sum('total'),
                ];
            }),
        ];

        return response()->json($analytics);
    }

    /**
     * Get product analytics.
     */
    public function products(Request $request)
    {
        $limit = $request->query('limit', 10);

        $products = Product::where('is_active', true)
            ->withCount('reviews')
            ->with('category')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'category' => $product->category->name,
                    'price' => $product->price,
                    'rating' => $product->rating,
                    'reviews_count' => $product->reviews_count,
                    'is_new' => $product->is_new,
                    'is_sale' => $product->is_sale,
                ];
            });

        $analytics = [
            'total_products' => $products->count(),
            'active_products' => $products->where('is_active', true)->count(),
            'new_products' => $products->where('is_new', true)->count(),
            'sale_products' => $products->where('is_sale', true)->count(),
            'top_rated' => $products->sortByDesc('rating')->take($limit)->values(),
            'most_reviewed' => $products->sortByDesc('reviews_count')->take($limit)->values(),
            'by_category' => $products->groupBy('category')->map(function ($group) {
                return $group->count();
            }),
        ];

        return response()->json($analytics);
    }

    /**
     * Get user analytics.
     */
    public function users(Request $request)
    {
        $period = $request->query('period', '30');
        $startDate = now()->subDays((int)$period);

        $users = User::all();
        $newUsers = User::where('created_at', '>=', $startDate)->get();

        $analytics = [
            'total_users' => $users->count(),
            'new_users' => $newUsers->count(),
            'active_users' => User::whereHas('orders')->count(),
            'users_with_reviews' => User::whereHas('reviews')->count(),
            'users_with_wishlist' => User::whereHas('wishlists')->count(),
            'average_orders_per_user' => Order::count() / max($users->count(), 1),
        ];

        return response()->json($analytics);
    }

    /**
     * Get review analytics.
     */
    public function reviews(Request $request)
    {
        $reviews = Review::where('is_approved', true)->get();

        $analytics = [
            'total_reviews' => $reviews->count(),
            'average_rating' => $reviews->avg('rating'),
            'rating_distribution' => [
                '5_stars' => $reviews->where('rating', 5)->count(),
                '4_stars' => $reviews->where('rating', 4)->count(),
                '3_stars' => $reviews->where('rating', 3)->count(),
                '2_stars' => $reviews->where('rating', 2)->count(),
                '1_star' => $reviews->where('rating', 1)->count(),
            ],
            'verified_purchases' => $reviews->where('is_verified_purchase', true)->count(),
        ];

        return response()->json($analytics);
    }

    /**
     * Get inventory analytics.
     */
    public function inventory(Request $request)
    {
        $variants = \App\Models\ProductVariant::with('product')->get();

        $analytics = [
            'total_variants' => $variants->count(),
            'total_stock' => $variants->sum('stock_quantity'),
            'in_stock' => $variants->where('in_stock', true)->count(),
            'out_of_stock' => $variants->where('in_stock', false)->count(),
            'low_stock' => $variants->where('stock_quantity', '<=', 10)->count(),
            'average_stock_per_variant' => $variants->avg('stock_quantity'),
            'stock_value' => $variants->sum(function ($variant) {
                return $variant->stock_quantity * $variant->product->price;
            }),
        ];

        return response()->json($analytics);
    }

    /**
     * Get dashboard overview.
     */
    public function dashboard(Request $request)
    {
        $period = $request->query('period', '30');
        $startDate = now()->subDays((int)$period);

        $orders = Order::where('created_at', '>=', $startDate)
            ->where('payment_status', 'completed')
            ->get();

        $dashboard = [
            'sales' => [
                'total_revenue' => $orders->sum('total'),
                'total_orders' => $orders->count(),
                'average_order_value' => $orders->avg('total'),
            ],
            'users' => [
                'total_users' => User::count(),
                'new_users' => User::where('created_at', '>=', $startDate)->count(),
                'active_users' => User::whereHas('orders')->count(),
            ],
            'products' => [
                'total_products' => Product::where('is_active', true)->count(),
                'new_products' => Product::where('is_new', true)->count(),
                'sale_products' => Product::where('is_sale', true)->count(),
            ],
            'inventory' => [
                'total_stock' => \App\Models\ProductVariant::sum('stock_quantity'),
                'out_of_stock' => \App\Models\ProductVariant::where('in_stock', false)->count(),
                'low_stock' => \App\Models\ProductVariant::where('stock_quantity', '<=', 10)->count(),
            ],
            'reviews' => [
                'total_reviews' => Review::where('is_approved', true)->count(),
                'average_rating' => Review::where('is_approved', true)->avg('rating'),
                'pending_reviews' => Review::where('is_approved', false)->count(),
            ],
        ];

        return response()->json($dashboard);
    }
}
