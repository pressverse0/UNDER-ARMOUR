<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use App\Services\EmailService;
use App\Services\ReviewService;
use Illuminate\Http\Request;

class AdminReviewController extends Controller
{
    public function __construct(
        private ReviewService $reviewService,
        private EmailService $emailService
    ) {}

    /**
     * Get pending reviews for approval.
     */
    public function pending(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $reviews = $this->reviewService->getPendingReviews($perPage);

        return ReviewResource::collection($reviews);
    }

    /**
     * Approve a review.
     */
    public function approve(int $reviewId)
    {
        $review = $this->reviewService->approveReview($reviewId);

        // Send approval email
        $this->emailService->sendReviewApproved(
            $review->user_id,
            $review->product->name
        );

        return response()->json([
            'message' => 'Review approved successfully',
            'review' => new ReviewResource($review),
        ]);
    }

    /**
     * Reject a review.
     */
    public function reject(Request $request, int $reviewId)
    {
        $request->validate([
            'reason' => 'nullable|string|max:255',
        ]);

        $review = Review::findOrFail($reviewId);
        $userId = $review->user_id;
        $productName = $review->product->name;
        $reason = $request->input('reason', '');

        $this->reviewService->rejectReview($reviewId);

        // Send rejection email
        $this->emailService->sendReviewRejected($userId, $productName, $reason);

        return response()->json([
            'message' => 'Review rejected successfully',
        ]);
    }

    /**
     * Get all reviews (including pending).
     */
    public function all(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $status = $request->query('status'); // 'approved', 'pending', 'all'

        $query = Review::with('user', 'product');

        if ($status === 'approved') {
            $query->where('is_approved', true);
        } elseif ($status === 'pending') {
            $query->where('is_approved', false);
        }

        $reviews = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return ReviewResource::collection($reviews);
    }

    /**
     * Delete a review.
     */
    public function destroy(int $reviewId)
    {
        $review = Review::findOrFail($reviewId);
        $productId = $review->product_id;

        $this->reviewService->deleteReview($reviewId);

        return response()->json([
            'message' => 'Review deleted successfully',
        ]);
    }

    /**
     * Get review statistics.
     */
    public function statistics(Request $request)
    {
        $productId = $request->query('product_id');

        $query = Review::query();

        if ($productId) {
            $query->where('product_id', $productId);
        }

        $stats = [
            'total_reviews' => $query->count(),
            'approved_reviews' => (clone $query)->where('is_approved', true)->count(),
            'pending_reviews' => (clone $query)->where('is_approved', false)->count(),
            'average_rating' => (clone $query)->where('is_approved', true)->avg('rating'),
            'rating_distribution' => [
                '5_stars' => (clone $query)->where('is_approved', true)->where('rating', 5)->count(),
                '4_stars' => (clone $query)->where('is_approved', true)->where('rating', 4)->count(),
                '3_stars' => (clone $query)->where('is_approved', true)->where('rating', 3)->count(),
                '2_stars' => (clone $query)->where('is_approved', true)->where('rating', 2)->count(),
                '1_star' => (clone $query)->where('is_approved', true)->where('rating', 1)->count(),
            ],
        ];

        return response()->json($stats);
    }
}
