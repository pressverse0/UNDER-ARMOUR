<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Review;

class ReviewService
{
    /**
     * Get reviews for a product.
     */
    public function getProductReviews(int $productId, int $perPage = 10)
    {
        return Review::where('product_id', $productId)
            ->where('is_approved', true)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get user's reviews.
     */
    public function getUserReviews(int $userId, int $perPage = 10)
    {
        return Review::where('user_id', $userId)
            ->with('product')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Create a review.
     */
    public function createReview(int $userId, int $productId, int $rating, string $title, string $comment): Review
    {
        $review = Review::create([
            'user_id' => $userId,
            'product_id' => $productId,
            'rating' => $rating,
            'title' => $title,
            'comment' => $comment,
            'is_approved' => false, // Require admin approval
        ]);

        // Update product rating
        $this->updateProductRating($productId);

        return $review;
    }

    /**
     * Update a review.
     */
    public function updateReview(int $reviewId, array $data): Review
    {
        $review = Review::findOrFail($reviewId);
        $review->update($data);

        // Update product rating if rating changed
        if (isset($data['rating'])) {
            $this->updateProductRating($review->product_id);
        }

        return $review;
    }

    /**
     * Delete a review.
     */
    public function deleteReview(int $reviewId): void
    {
        $review = Review::findOrFail($reviewId);
        $productId = $review->product_id;
        
        $review->delete();

        // Update product rating
        $this->updateProductRating($productId);
    }

    /**
     * Approve a review.
     */
    public function approveReview(int $reviewId): Review
    {
        $review = Review::findOrFail($reviewId);
        $review->update(['is_approved' => true]);

        $this->updateProductRating($review->product_id);

        return $review;
    }

    /**
     * Reject a review.
     */
    public function rejectReview(int $reviewId): void
    {
        $review = Review::findOrFail($reviewId);
        $review->delete();

        $this->updateProductRating($review->product_id);
    }

    /**
     * Update product rating based on reviews.
     */
    private function updateProductRating(int $productId): void
    {
        $product = Product::findOrFail($productId);

        $reviews = Review::where('product_id', $productId)
            ->where('is_approved', true)
            ->get();

        if ($reviews->isEmpty()) {
            $product->update([
                'rating' => 0,
                'reviews_count' => 0,
            ]);
            return;
        }

        $averageRating = $reviews->avg('rating');
        $reviewCount = $reviews->count();

        $product->update([
            'rating' => round($averageRating, 2),
            'reviews_count' => $reviewCount,
        ]);
    }

    /**
     * Get pending reviews for admin.
     */
    public function getPendingReviews(int $perPage = 10)
    {
        return Review::where('is_approved', false)
            ->with('user', 'product')
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);
    }

    /**
     * Get reviews by rating.
     */
    public function getReviewsByRating(int $productId, int $rating)
    {
        return Review::where('product_id', $productId)
            ->where('rating', $rating)
            ->where('is_approved', true)
            ->with('user')
            ->get();
    }
}
