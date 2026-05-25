<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    /**
     * Get all products with filters.
     */
    public function index(Request $request)
    {
        $filters = [
            'category_id' => $request->query('category_id'),
            'gender' => $request->query('gender'),
            'min_price' => $request->query('min_price'),
            'max_price' => $request->query('max_price'),
            'search' => $request->query('search'),
            'sort' => $request->query('sort', 'newest'),
        ];

        $perPage = $request->query('per_page', 15);
        $products = $this->productService->getAllProducts($perPage, array_filter($filters));

        return ProductResource::collection($products);
    }

    /**
     * Get product details.
     */
    public function show(int $id)
    {
        $product = $this->productService->getProductDetails($id);
        return response()->json($product);
    }

    /**
     * Get products by category.
     */
    public function byCategory(int $categoryId, Request $request)
    {
        $perPage = $request->query('per_page', 15);
        $products = $this->productService->getProductsByCategory($categoryId, $perPage);

        return ProductResource::collection($products);
    }

    /**
     * Search products.
     */
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2',
        ]);

        $perPage = $request->query('per_page', 15);
        $products = $this->productService->searchProducts($request->query('q'), $perPage);

        return ProductResource::collection($products);
    }

    /**
     * Get new products.
     */
    public function newArrivals(Request $request)
    {
        $limit = $request->query('limit', 10);
        $products = $this->productService->getNewProducts($limit);

        return ProductResource::collection($products);
    }

    /**
     * Get sale products.
     */
    public function sale(Request $request)
    {
        $limit = $request->query('limit', 10);
        $products = $this->productService->getSaleProducts($limit);

        return ProductResource::collection($products);
    }

    /**
     * Get available sizes for a product.
     */
    public function sizes(int $productId)
    {
        $sizes = $this->productService->getAvailableSizes($productId);
        return response()->json(['sizes' => $sizes]);
    }

    /**
     * Get available colors for a product.
     */
    public function colors(int $productId)
    {
        $colors = $this->productService->getAvailableColors($productId);
        return response()->json(['colors' => $colors]);
    }
}
