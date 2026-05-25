import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'Kids Athletic Gear & Sportswear | Under Armour',
  description: 'Shop premium kids athletic wear, training gear, and performance apparel. Built for young champions.',
}

export default function KidsPage() {
  const products = [
    { name: "Boys' Tech T-Shirt", price: "$20", category: "Training", age: "Boys" },
    { name: "Girls' HeatGear Tank", price: "$22", category: "Training", age: "Girls" },
    { name: "Kids' Assert 9", price: "$50", category: "Footwear", age: "Unisex" },
    { name: "Boys' Prototype Shorts", price: "$25", category: "Bottoms", age: "Boys" },
    { name: "Girls' Play Up Shorts", price: "$25", category: "Bottoms", age: "Girls" },
    { name: "Kids' Backpack", price: "$40", category: "Accessories", age: "Unisex" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />

      <section className="relative bg-black text-white py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
              Kids <span className="text-red-600">Performance Gear</span>
            </h1>
            <p className="text-xl text-gray-300 font-bold mb-8">
              Built for young athletes. Designed to grow with champions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black uppercase text-black mb-4 tracking-tight">
              Featured <span className="text-red-600">Products</span>
            </h2>
            <div className="sketchy-underline mx-auto" aria-hidden="true"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <Card key={index} className="sketchy-card bg-white border-4 border-black transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="sketchy-frame bg-gray-900 p-4 mb-6">
                    <Image src="/athletic-gear-display.png" alt={item.name} width={300} height={250} className="w-full h-auto filter grayscale" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="sketchy-border bg-red-600 inline-block px-3 py-1">
                        <span className="text-white font-bold text-xs uppercase">{item.category}</span>
                      </div>
                      <div className="sketchy-border bg-black inline-block px-3 py-1">
                        <span className="text-white font-bold text-xs uppercase">{item.age}</span>
                      </div>
                    </div>
                    <h3 className="font-black text-xl text-black uppercase">{item.name}</h3>
                    <p className="text-2xl font-black text-red-600">{item.price}</p>
                    <Button className="sketchy-btn-outline w-full border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
