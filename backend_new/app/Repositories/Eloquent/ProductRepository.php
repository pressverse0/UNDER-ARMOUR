<?php

namespace App\Repositories\Eloquent;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryContract;

class ProductRepository implements ProductRepositoryContract
{
    /**
     * Get all products with pagination.
     */
    public function getAllPaginated(int $perPage = 15, array $filters = [])
    {
        $query = Product::active()->with('category', 'variants');

        // Apply filters
        if (isset($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (isset($filters['gender'])) {
            $query->where('gender', $filters['gender']);
        }

        if (isset($filters['min_price']) && isset($filters['max_price'])) {
            $query->whereBetween('price', [$filters['min_price'], $filters['max_price']]);
        }

        if (isset($filters['search'])) {
            $query->search($filters['search']);
        }

        if (isset($filters['sort'])) {
            match ($filters['sort']) {
                'price_asc' => $query->orderBy('price', 'asc'),
                'price_desc' => $query->orderBy('price', 'desc'),
                'newest' => $query->orderBy('created_at', 'desc'),
                'rating' => $query->orderBy('rating', 'desc'),
                default => $query->orderBy('created_at', 'desc'),
            };
        }

        return $query->paginate($perPage);
    }

    /**
     * Get product by ID.
     */
    public function getById(int $id)
    {
        return Product::with('category', 'variants', 'reviews.user')->findOrFail($id);
    }

    /**
     * Get products by category.
     */
    public function getByCategory(int $categoryId, int $perPage = 15)
    {
        return Product::active()
            ->where('category_id', $categoryId)
            ->with('category', 'variants')
            ->paginate($perPage);
    }

    /**
     * Search products.
     */
    public function search(string $term, int $perPage = 15)
    {
        return Product::active()
            ->search($term)
            ->with('category', 'variants')
            ->paginate($perPage);
    }

    /**
     * Get new products.
     */
    public function getNew(int $limit = 10)
    {
        return Product::active()
            ->new()
            ->with('category', 'variants')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get sale products.
     */
    public function getSale(int $limit = 10)
    {
        return Product::active()
            ->sale()
            ->with('category', 'variants')
            ->orderBy('discount_percentage', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Create a product.
     */
    public function create(array $data)
    {
        return Product::create($data);
    }

    /**
     * Update a product.
     */
    public function update(int $id, array $data)
    {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $product;
    }

    /**
     * Delete a product.
     */
    public function delete(int $id)
    {
        return Product::destroy($id);
    }
}
