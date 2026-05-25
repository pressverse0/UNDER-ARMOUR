<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float)$this->price,
            'original_price' => $this->original_price ? (float)$this->original_price : null,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'image' => $this->image,
            'images' => $this->images,
            'rating' => (float)$this->rating,
            'reviews_count' => $this->reviews_count,
            'gender' => $this->gender,
            'technology' => $this->technology,
            'is_new' => (bool)$this->is_new,
            'is_sale' => (bool)$this->is_sale,
            'discount_percentage' => $this->discount_percentage,
            'variants' => ProductVariantResource::collection($this->whenLoaded('variants')),
            'in_stock' => $this->whenLoaded('variants', function () {
                return $this->variants->where('stock_quantity', '>', 0)->count() > 0;
            }),
        ];
    }
}
