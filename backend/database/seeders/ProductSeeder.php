<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = $this->getProducts();

        foreach ($products as $productData) {
            $sizes = $productData['sizes'];
            $colors = $productData['colors'];
            $categorySlug = $productData['category_slug'];
            unset($productData['sizes'], $productData['colors'], $productData['category_slug']);

            $category = Category::where('slug', $categorySlug)->first();
            if (!$category) continue;

            $product = Product::firstOrCreate(
                ['slug' => $productData['slug']],
                array_merge($productData, [
                    'category_id' => $category->id,
                    'is_active' => true,
                ])
            );

            $this->createProductVariants($product, $sizes, $colors);
        }
    }

    private function createProductVariants(Product $product, array $sizes, array $colors): void
    {
        $skuBase = strtoupper(str_replace('-', '', $product->slug));
        
        foreach ($sizes as $size) {
            foreach ($colors as $color) {
                ProductVariant::firstOrCreate(
                    [
                        'product_id' => $product->id,
                        'size' => $size,
                        'color' => $color,
                    ],
                    [
                        'sku' => substr($skuBase, 0, 10) . '-' . strtoupper(Str::slug($size)) . '-' . strtoupper(substr(Str::slug($color), 0, 3)) . '-' . rand(100, 999),
                        'stock_quantity' => rand(5, 50),
                    ]
                );
            }
        }
    }

    private function getProducts(): array
    {
        return [
            [
                'name' => 'UA HOVR Phantom 3',
                'slug' => 'ua-hovr-phantom-3',
                'description' => 'Zero gravity feel maintains energy return helping to eliminate impact. The connected version tracks your runs automatically with MapMyRun.',
                'price' => 140.00,
                'original_price' => 160.00,
                'category_slug' => 'running',
                'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600']),
                'rating' => 4.5,
                'reviews_count' => 128,
                'gender' => 'Men',
                'technology' => 'HOVR',
                'is_new' => true,
                'is_sale' => true,
                'discount_percentage' => 13,
                'sizes' => ['7', '8', '9', '10', '11', '12'],
                'colors' => ['Black', 'White', 'Blue'],
            ],
            [
                'name' => 'UA Project Rock BSR 4',
                'slug' => 'ua-project-rock-bsr-4',
                'description' => 'Built for the work, designed with Dwayne Johnson. Superior cushioning and support for the toughest training sessions.',
                'price' => 120.00,
                'original_price' => null,
                'category_slug' => 'training',
                'image' => 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600']),
                'rating' => 4.7,
                'reviews_count' => 89,
                'gender' => 'Men',
                'technology' => 'Charged Cushioning',
                'is_new' => true,
                'is_sale' => false,
                'discount_percentage' => null,
                'sizes' => ['8', '9', '10', '11', '12', '13'],
                'colors' => ['Black', 'Red', 'Grey'],
            ],
            [
                'name' => 'UA Curry 11',
                'slug' => 'ua-curry-11',
                'description' => "Stephen Curry's signature shoe. Designed for the fastest player on the court with incredible responsiveness.",
                'price' => 160.00,
                'original_price' => null,
                'category_slug' => 'basketball',
                'image' => 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600']),
                'rating' => 4.8,
                'reviews_count' => 204,
                'gender' => 'Unisex',
                'technology' => 'UA Flow',
                'is_new' => true,
                'is_sale' => false,
                'discount_percentage' => null,
                'sizes' => ['7', '8', '9', '10', '11', '12', '13'],
                'colors' => ['Blue', 'White', 'Yellow'],
            ],
            [
                'name' => 'UA Tech 2.0 T-Shirt',
                'slug' => 'ua-tech-2-t-shirt',
                'description' => 'Ultra-soft, natural feel fabric with a more textured look and feel. Moisture transport system wicks sweat to keep you dry.',
                'price' => 25.00,
                'original_price' => 35.00,
                'category_slug' => 'training',
                'image' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600']),
                'rating' => 4.3,
                'reviews_count' => 312,
                'gender' => 'Men',
                'technology' => 'HeatGear',
                'is_new' => false,
                'is_sale' => true,
                'discount_percentage' => 29,
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'colors' => ['Black', 'White', 'Navy', 'Red'],
            ],
            [
                'name' => 'UA HeatGear Armour Leggings',
                'slug' => 'ua-heatgear-armour-leggings',
                'description' => 'Incredibly smooth, four-way stretch HeatGear fabric. Compression fit makes muscle feel supported and more powerful.',
                'price' => 45.00,
                'original_price' => null,
                'category_slug' => 'training',
                'image' => 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600']),
                'rating' => 4.6,
                'reviews_count' => 178,
                'gender' => 'Women',
                'technology' => 'HeatGear',
                'is_new' => false,
                'is_sale' => false,
                'discount_percentage' => null,
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'colors' => ['Black', 'Navy', 'Purple'],
            ],
            [
                'name' => 'UA HOVR Infinite 5',
                'slug' => 'ua-hovr-infinite-5',
                'description' => 'Zero gravity feel to maintain energy return and help eliminate impact. Soft, smooth ride for everyday runs.',
                'price' => 130.00,
                'original_price' => 150.00,
                'category_slug' => 'running',
                'image' => 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600']),
                'rating' => 4.4,
                'reviews_count' => 95,
                'gender' => 'Women',
                'technology' => 'HOVR',
                'is_new' => false,
                'is_sale' => true,
                'discount_percentage' => 13,
                'sizes' => ['6', '7', '8', '9', '10', '11'],
                'colors' => ['Pink', 'White', 'Grey'],
            ],
            [
                'name' => 'UA ColdGear Reactor Vest',
                'slug' => 'ua-coldgear-reactor-vest',
                'description' => "Smart fabric adapts to keep you warm when it's cold. Thermal regulation technology keeps you comfortable in any conditions.",
                'price' => 90.00,
                'original_price' => null,
                'category_slug' => 'outdoor',
                'image' => 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600']),
                'rating' => 4.5,
                'reviews_count' => 67,
                'gender' => 'Men',
                'technology' => 'ColdGear',
                'is_new' => true,
                'is_sale' => false,
                'discount_percentage' => null,
                'sizes' => ['S', 'M', 'L', 'XL', 'XXL'],
                'colors' => ['Black', 'Navy', 'Olive'],
            ],
            [
                'name' => 'UA Rival Fleece Hoodie',
                'slug' => 'ua-rival-fleece-hoodie',
                'description' => 'Soft, mid-weight cotton-blend fleece with brushed interior for extra warmth. Front pocket for easy storage.',
                'price' => 55.00,
                'original_price' => 75.00,
                'category_slug' => 'lifestyle',
                'image' => 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600']),
                'rating' => 4.2,
                'reviews_count' => 245,
                'gender' => 'Unisex',
                'technology' => null,
                'is_new' => false,
                'is_sale' => true,
                'discount_percentage' => 27,
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'colors' => ['Grey', 'Black', 'Maroon', 'Navy'],
            ],
            [
                'name' => 'UA HOVR Machina 3',
                'slug' => 'ua-hovr-machina-3',
                'description' => "UA HOVR technology provides a 'zero gravity feel' for long-distance runs. Built-in UA Run chip tracks your cadence.",
                'price' => 150.00,
                'original_price' => null,
                'category_slug' => 'running',
                'image' => 'https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=600']),
                'rating' => 4.6,
                'reviews_count' => 73,
                'gender' => 'Men',
                'technology' => 'HOVR',
                'is_new' => true,
                'is_sale' => false,
                'discount_percentage' => null,
                'sizes' => ['7', '8', '9', '10', '11', '12', '13'],
                'colors' => ['Black', 'White'],
            ],
            [
                'name' => 'UA Kids Challenger Training Shorts',
                'slug' => 'ua-kids-challenger-training-shorts',
                'description' => 'Lightweight woven fabric for an ultra-soft feel. Elastic waistband with internal drawcord for a secure fit.',
                'price' => 20.00,
                'original_price' => null,
                'category_slug' => 'training',
                'image' => 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600']),
                'rating' => 4.4,
                'reviews_count' => 88,
                'gender' => 'Kids',
                'technology' => null,
                'is_new' => false,
                'is_sale' => false,
                'discount_percentage' => null,
                'sizes' => ['YXS', 'YSM', 'YMD', 'YLG', 'YXL'],
                'colors' => ['Black', 'Navy', 'Red'],
            ],
            [
                'name' => 'UA Rival Fleece Joggers',
                'slug' => 'ua-rival-fleece-joggers',
                'description' => 'Soft, mid-weight cotton-blend fleece with brushed interior. Tapered fit with open hand pockets and side pockets.',
                'price' => 50.00,
                'original_price' => null,
                'category_slug' => 'lifestyle',
                'image' => 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600']),
                'rating' => 4.1,
                'reviews_count' => 134,
                'gender' => 'Women',
                'technology' => null,
                'is_new' => false,
                'is_sale' => false,
                'discount_percentage' => null,
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'colors' => ['Black', 'Grey', 'Pink'],
            ],
            [
                'name' => 'UA Launch Run Hat',
                'slug' => 'ua-launch-run-hat',
                'description' => 'Lightweight, packable construction. UA Storm technology repels water without sacrificing breathability.',
                'price' => 28.00,
                'original_price' => 35.00,
                'category_slug' => 'running',
                'image' => 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600',
                'images' => json_encode(['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600']),
                'rating' => 4.3,
                'reviews_count' => 201,
                'gender' => 'Unisex',
                'technology' => 'UA Storm',
                'is_new' => false,
                'is_sale' => true,
                'discount_percentage' => 20,
                'sizes' => ['One Size'],
                'colors' => ['Black', 'White', 'Blue', 'Red'],
            ],
        ];
    }
}
