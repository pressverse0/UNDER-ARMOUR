<?php

namespace App\Repositories\Contracts;

interface ProductRepositoryContract
{
    /**
     * Get all products with pagination.
     */
    public function getAllPaginated(int $perPage = 15, array $filters = []);

    /**
     * Get product by ID.
     */
    public function getById(int $id);

    /**
     * Get products by category.
     */
    public function getByCategory(int $categoryId, int $perPage = 15);

    /**
     * Search products.
     */
    public function search(string $term, int $perPage = 15);

    /**
     * Get new products.
     */
    public function getNew(int $limit = 10);

    /**
     * Get sale products.
     */
    public function getSale(int $limit = 10);

    /**
     * Create a product.
     */
    public function create(array $data);

    /**
     * Update a product.
     */
    public function update(int $id, array $data);

    /**
     * Delete a product.
     */
    public function delete(int $id);
}
