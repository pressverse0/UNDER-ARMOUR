<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Running', 'slug' => 'running', 'description' => 'Performance running gear'],
            ['name' => 'Training', 'slug' => 'training', 'description' => 'Training and gym apparel'],
            ['name' => 'Basketball', 'slug' => 'basketball', 'description' => 'Basketball footwear and apparel'],
            ['name' => 'Football', 'slug' => 'football', 'description' => 'Football gear and apparel'],
            ['name' => 'Outdoor', 'slug' => 'outdoor', 'description' => 'Outdoor and hiking gear'],
            ['name' => 'Lifestyle', 'slug' => 'lifestyle', 'description' => 'Everyday casual wear'],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(['slug' => $cat['slug']], array_merge($cat, ['is_active' => true]));
        }
    }
}
