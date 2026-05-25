import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


import Header from "@/components/header"
import Footer from "@/components/footer"


export default function AccessoriesPage() {
  const products = [
    { name: "Project Rock Gym Bag", price: "$75", category: "Bags" },
    { name: "UA Blitzing Cap", price: "$25", category: "Headwear" },
    { name: "Training Gloves", price: "$30", category: "Gloves" },
    { name: "Sport Backpack", price: "$65", category: "Bags" },
    { name: "Performance Socks 3-Pack", price: "$20", category: "Socks" },
    { name: "Water Bottle 32oz", price: "$18", category: "Hydration" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />

      <section className="relative bg-black text-white py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
              Athletic <span className="text-red-600">Accessories</span>
            </h1>
            <p className="text-xl text-gray-300 font-bold mb-8">
              Complete your setup. Elevate your game. Every detail counts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black uppercase text-black mb-4 tracking-tight">
              Featured <span className="text-red-600">Accessories</span>
            </h2>
            <div className="sketchy-underline mx-auto" aria-hidden="true"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <Card key={index} className="sketchy-card bg-white border-4 border-black transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="sketchy-frame bg-gray-900 p-4 mb-6">
                    <img src="/athletic-gear-display.png" alt={item.name} width={300} height={250} className="w-full h-auto filter grayscale" />
                  </div>
                  <div className="space-y-3">
                    <div className="sketchy-border bg-red-600 inline-block px-3 py-1">
                      <span className="text-white font-bold text-xs uppercase">{item.category}</span>
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
