<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Product;
use App\Models\Review;
use App\Services\ReviewService;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function __construct(
        private ReviewService $reviewService
    ) {}

    /**
     * Get reviews for a product.
     */
    public function index(int $productId, Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $product = Product::findOrFail($productId);
        
        $reviews = $this->reviewService->getProductReviews($productId, $perPage);
        
        return ReviewResource::collection($reviews);
    }

    /**
     * Create a review for a product.
     */
    public function store(Request $request, int $productId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|max:255',
            'comment' => 'required|string|max:1000',
        ]);

        $product = Product::findOrFail($productId);

        $review = $this->reviewService->createReview(
            $request->user()->id,
            $productId,
            $request->input('rating'),
            $request->input('title'),
            $request->input('comment')
        );

        return response()->json(new ReviewResource($review), 201);
    }

    /**
     * Get a specific review.
     */
    public function show(int $productId, int $reviewId)
    {
        $review = Review::where('product_id', $productId)
            ->where('id', $reviewId)
            ->firstOrFail();

        return new ReviewResource($review);
    }

    /**
     * Update a review.
     */
    public function update(Request $request, int $productId, int $reviewId)
    {
        $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'title' => 'sometimes|string|max:255',
            'comment' => 'sometimes|string|max:1000',
        ]);

        $review = Review::where('product_id', $productId)
            ->where('id', $reviewId)
            ->firstOrFail();

        // Ensure user owns the review
        if ($review->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review = $this->reviewService->updateReview(
            $reviewId,
            $request->only(['rating', 'title', 'comment'])
        );

        return new ReviewResource($review);
    }

    /**
     * Delete a review.
     */
    public function destroy(Request $request, int $productId, int $reviewId)
    {
        $review = Review::where('product_id', $productId)
            ->where('id', $reviewId)
            ->firstOrFail();

        // Ensure user owns the review
        if ($review->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $this->reviewService->deleteReview($reviewId);

        return response()->json(['message' => 'Review deleted successfully'], 200);
    }

    /**
     * Get user's reviews.
     */
    public function userReviews(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $reviews = $this->reviewService->getUserReviews($request->user()->id, $perPage);

        return ReviewResource::collection($reviews);
    }
}
