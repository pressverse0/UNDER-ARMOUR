import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  reviews?: number
  size?: "sm" | "md"
  showCount?: boolean
}

export default function StarRating({ rating, reviews, size = "sm", showCount = true }: StarRatingProps) {
  const starClass = size === "sm" ? "h-3 w-3" : "h-4 w-4"
  return (
    <div className="flex items-center gap-1 mb-3">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${starClass} ${i < Math.floor(rating) ? "fill-red-600 text-red-600" : "text-gray-300"}`}
          />
        ))}
      </div>
      {showCount && reviews !== undefined && (
        <span className="ua-rating-count">({reviews})</span>
      )}
    </div>
  )
}
