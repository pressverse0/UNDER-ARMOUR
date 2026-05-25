<?php

namespace App\Services;

use App\Repositories\Contracts\ProductRepositoryContract;

class ProductService
{
    public function __construct(
        private ProductRepositoryContract $productRepository,
        private CacheService $cacheService
    ) {}

    /**
     * Get all products with filters.
     */
    public function getAllProducts(int $perPage = 15, array $filters = [])
    {
        $cacheKey = 'products:all:' . md5(json_encode($filters)) . ':' . $perPage;
        
        return $this->cacheService->remember($cacheKey, function () use ($perPage, $filters) {
            LogService::logCacheOperation('get', $cacheKey);
            return $this->productRepository->getAllPaginated($perPage, $filters);
        });
    }

    /**
     * Get product details.
     */
    public function getProductDetails(int $productId)
    {
        $cacheKey = "product:{$productId}";
        
        return $this->cacheService->remember($cacheKey, function () use ($productId) {
            LogService::logCacheOperation('get', $cacheKey);
            $product = $this->productRepository->getById($productId);

            return [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->price,
                'original_price' => $product->original_price,
                'category' => $product->category,
                'image' => $product->image,
                'images' => $product->images,
                'rating' => $product->rating,
                'reviews_count' => $product->reviews_count,
                'gender' => $product->gender,
                'technology' => $product->technology,
                'is_new' => $product->is_new,
                'is_sale' => $product->is_sale,
                'discount_percentage' => $product->discount_percentage,
                'variants' => $product->variants,
                'reviews' => $product->reviews()->approved()->get(),
            ];
        });
    }

    /**
     * Get products by category.
     */
    public function getProductsByCategory(int $categoryId, int $perPage = 15)
    {
        return $this->productRepository->getByCategory($categoryId, $perPage);
    }

    /**
     * Search products.
     */
    public function searchProducts(string $term, int $perPage = 15)
    {
        return $this->productRepository->search($term, $perPage);
    }

    /**
     * Get new products.
     */
    public function getNewProducts(int $limit = 10)
    {
        return $this->productRepository->getNew($limit);
    }

    /**
     * Get sale products.
     */
    public function getSaleProducts(int $limit = 10)
    {
        return $this->productRepository->getSale($limit);
    }

    /**
     * Get available sizes for a product.
     */
    public function getAvailableSizes(int $productId)
    {
        $product = $this->productRepository->getById($productId);
        return $product->variants()
            ->inStock()
            ->distinct()
            ->pluck('size')
            ->filter()
            ->values();
    }

    /**
     * Get available colors for a product.
     */
    public function getAvailableColors(int $productId)
    {
        $product = $this->productRepository->getById($productId);
        return $product->variants()
            ->inStock()
            ->distinct()
            ->pluck('color')
            ->filter()
            ->values();
    }

    /**
     * Check if product variant is in stock.
     */
    public function isVariantInStock(int $productId, ?string $size = null, ?string $color = null): bool
    {
        $product = $this->productRepository->getById($productId);
        $query = $product->variants();

        if ($size) {
            $query->where('size', $size);
        }

        if ($color) {
            $query->where('color', $color);
        }

        return $query->inStock()->exists();
    }
}
