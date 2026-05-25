<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class AdminProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    /**
     * Create a new product.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'category_id' => 'required|integer|exists:categories,id',
            'image' => 'required|string',
            'images' => 'nullable|json',
            'rating' => 'nullable|numeric|min:0|max:5',
            'reviews_count' => 'nullable|integer|min:0',
            'gender' => 'required|string|in:Men,Women,Kids,Unisex',
            'technology' => 'nullable|string|max:255',
            'is_new' => 'boolean',
            'is_sale' => 'boolean',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        $product = Product::create($request->validated());

        return response()->json(new ProductResource($product), 201);
    }

    /**
     * Update a product.
     */
    public function update(Request $request, int $productId)
    {
        $product = Product::findOrFail($productId);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:255|unique:products,slug,' . $productId,
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'category_id' => 'sometimes|integer|exists:categories,id',
            'image' => 'sometimes|string',
            'images' => 'nullable|json',
            'rating' => 'nullable|numeric|min:0|max:5',
            'reviews_count' => 'nullable|integer|min:0',
            'gender' => 'sometimes|string|in:Men,Women,Kids,Unisex',
            'technology' => 'nullable|string|max:255',
            'is_new' => 'boolean',
            'is_sale' => 'boolean',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        $product->update($request->validated());

        return new ProductResource($product->fresh());
    }

    /**
     * Delete a product.
     */
    public function destroy(int $productId)
    {
        $product = Product::findOrFail($productId);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    /**
     * Bulk update products.
     */
    public function bulkUpdate(Request $request)
    {
        $request->validate([
            'product_ids' => 'required|array',
            'product_ids.*' => 'integer|exists:products,id',
            'updates' => 'required|array',
        ]);

        $productIds = $request->input('product_ids');
        $updates = $request->input('updates');

        Product::whereIn('id', $productIds)->update($updates);

        $products = Product::whereIn('id', $productIds)->get();

        return response()->json([
            'message' => 'Products updated successfully',
            'data' => ProductResource::collection($products),
        ]);
    }

    /**
     * Restore a soft-deleted product.
     */
    public function restore(int $productId)
    {
        $product = Product::withTrashed()->findOrFail($productId);
        $product->restore();

        return new ProductResource($product);
    }

    /**
     * Get all products including soft-deleted.
     */
    public function allProducts(Request $request)
    {
        $perPage = $request->query('per_page', 15);
        $includeTrashed = $request->query('include_trashed', false);

        $query = Product::query();

        if ($includeTrashed) {
            $query->withTrashed();
        }

        $products = $query->paginate($perPage);

        return ProductResource::collection($products);
    }
}
