<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class AdminInventoryController extends Controller
{
    /**
     * Get inventory for a product.
     */
    public function index(int $productId, Request $request)
    {
        $variants = ProductVariant::where('product_id', $productId)
            ->get(['id', 'product_id', 'size', 'color', 'sku', 'stock_quantity', 'in_stock']);

        return response()->json([
            'product_id' => $productId,
            'variants' => $variants,
            'total_stock' => $variants->sum('stock_quantity'),
        ]);
    }

    /**
     * Update inventory for a variant.
     */
    public function update(Request $request, int $variantId)
    {
        $request->validate([
            'stock_quantity' => 'required|integer|min:0',
        ]);

        $variant = ProductVariant::findOrFail($variantId);
        $oldStock = $variant->stock_quantity;
        
        $variant->update([
            'stock_quantity' => $request->input('stock_quantity'),
            'in_stock' => $request->input('stock_quantity') > 0,
        ]);

        return response()->json([
            'message' => 'Inventory updated successfully',
            'variant' => $variant,
            'change' => $request->input('stock_quantity') - $oldStock,
        ]);
    }

    /**
     * Adjust inventory (add or subtract).
     */
    public function adjust(Request $request, int $variantId)
    {
        $request->validate([
            'adjustment' => 'required|integer',
            'reason' => 'nullable|string|max:255',
        ]);

        $variant = ProductVariant::findOrFail($variantId);
        $newStock = max(0, $variant->stock_quantity + $request->input('adjustment'));

        $variant->update([
            'stock_quantity' => $newStock,
            'in_stock' => $newStock > 0,
        ]);

        return response()->json([
            'message' => 'Inventory adjusted successfully',
            'variant' => $variant,
            'adjustment' => $request->input('adjustment'),
            'reason' => $request->input('reason'),
        ]);
    }

    /**
     * Get low stock items.
     */
    public function lowStock(Request $request)
    {
        $threshold = $request->query('threshold', 10);

        $variants = ProductVariant::where('stock_quantity', '<=', $threshold)
            ->with('product')
            ->get();

        return response()->json([
            'threshold' => $threshold,
            'count' => $variants->count(),
            'variants' => $variants,
        ]);
    }

    /**
     * Get out of stock items.
     */
    public function outOfStock(Request $request)
    {
        $variants = ProductVariant::where('stock_quantity', 0)
            ->with('product')
            ->get();

        return response()->json([
            'count' => $variants->count(),
            'variants' => $variants,
        ]);
    }

    /**
     * Bulk update inventory.
     */
    public function bulkUpdate(Request $request)
    {
        $request->validate([
            'updates' => 'required|array',
            'updates.*.variant_id' => 'required|integer|exists:product_variants,id',
            'updates.*.stock_quantity' => 'required|integer|min:0',
        ]);

        $updates = $request->input('updates');
        $results = [];

        foreach ($updates as $update) {
            $variant = ProductVariant::findOrFail($update['variant_id']);
            $variant->update([
                'stock_quantity' => $update['stock_quantity'],
                'in_stock' => $update['stock_quantity'] > 0,
            ]);
            $results[] = $variant;
        }

        return response()->json([
            'message' => 'Inventory updated successfully',
            'updated_count' => count($results),
            'variants' => $results,
        ]);
    }

    /**
     * Get inventory report.
     */
    public function report(Request $request)
    {
        $variants = ProductVariant::with('product')
            ->get();

        $report = [
            'total_variants' => $variants->count(),
            'total_stock' => $variants->sum('stock_quantity'),
            'in_stock_count' => $variants->where('in_stock', true)->count(),
            'out_of_stock_count' => $variants->where('in_stock', false)->count(),
            'low_stock_count' => $variants->where('stock_quantity', '<=', 10)->count(),
            'average_stock' => $variants->avg('stock_quantity'),
            'by_product' => $variants->groupBy('product_id')->map(function ($group) {
                return [
                    'product_id' => $group->first()->product_id,
                    'product_name' => $group->first()->product->name,
                    'total_variants' => $group->count(),
                    'total_stock' => $group->sum('stock_quantity'),
                ];
            }),
        ];

        return response()->json($report);
    }
}
