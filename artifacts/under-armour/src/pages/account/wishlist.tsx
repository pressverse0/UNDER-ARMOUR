
import { User, Package, Heart, Settings, LogOut, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

import { Link } from "wouter"
import PageLayout from "@/components/layout/page-layout"

export default function WishlistPage() {
  const { toast } = useToast()
  const wishlistItems = [
    { id: 1, name: "HeatGear Armour Sports Bra", price: 30, category: "Training", image: "/ARMOUR/HeatGear Armour Sports Bra.jpg", inStock: true },
    { id: 2, name: "HOVR Sonic 5", price: 120, category: "Footwear", image: "/ARMOUR/HOVR Sonic 5.jpg", inStock: true },
    { id: 3, name: "Fly Fast 2.0 Tights", price: 50, originalPrice: 70, category: "Bottoms", image: "/ARMOUR/Fly Fast 2.0 Tights.jpg", inStock: true },
    { id: 4, name: "Storm Windstrike Jacket", price: 100, category: "Outerwear", image: "/ARMOUR/Storm Windstrike Jacket.jpg", inStock: true },
    { id: 5, name: "Infinity High Sports Bra", price: 45, category: "Training", image: "/ARMOUR/Infinity High Sports Bra.jpg", inStock: true },
    { id: 6, name: "Rival Fleece Hoodie", price: 55, originalPrice: 75, category: "Outerwear", image: "/ARMOUR/Rival Fleece Hoodie.jpg", inStock: true },
    { id: 7, name: "Flow Velociti Wind 2", price: 150, category: "Footwear", image: "/ARMOUR/Flow Velociti Wind 2.jpg", inStock: true },
    { id: 8, name: "Unstoppable Bomber Jacket", price: 110, category: "Outerwear", image: "/ARMOUR/Unstoppable Bomber Jacket.jpg", inStock: false },
  ]

  return (
    <PageLayout>
      <main className="flex-1 bg-gray-100">

      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
              My <span className="text-red-600">Wishlist</span>
            </h1>
            <p className="text-xl text-gray-300 font-bold">
              Your favorite Under Armour gear, saved for later.
            </p>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Sidebar - Sticky within container */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 self-start">
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-6">
                  {/* Profile Picture */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center sketchy-border mx-auto">
                        <User className="h-12 w-12 text-red-600" />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-red-600 text-white rounded-full p-2 sketchy-border hover:bg-red-700 transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                    <h2 className="text-2xl font-black uppercase mt-4">M.Said</h2>
                    <p className="text-gray-600 font-bold">Champion Athlete</p>
                  </div>

                  {/* Navigation Menu */}
                  <nav className="space-y-2">
                    <Link href="/account" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link href="/account/orders" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <Package className="h-5 w-5" />
                      <span>Orders</span>
                    </Link>
                    <Link href="/account/wishlist" className="flex items-center space-x-3 p-3 bg-red-600 text-white rounded sketchy-border font-bold uppercase">
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link href="/account/settings" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                    <button 
                      onClick={() => {
                        toast({
                          title: "Logged Out Successfully",
                          description: "You have been logged out of your account",
                          variant: "success" as any,
                        })
                      }}
                      className="flex items-center space-x-3 p-3 hover:bg-red-50 rounded transition-colors font-bold uppercase text-red-600 w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex justify-between items-center">
                <p className="font-bold text-gray-700">
                  {wishlistItems.length} items in your wishlist
                </p>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Wishlist Cleared",
                      description: "All items have been removed from your wishlist",
                      variant: "success" as any,
                    })
                  }}
                  className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase"
                >
                  Clear All
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="sketchy-card bg-white border-4 border-black group">
                    <CardContent className="p-6">
                      <div className="relative">
                        {/* Remove Button */}
                        <button 
                          onClick={() => {
                            toast({
                              title: "Removed from Wishlist",
                              description: `${item.name} has been removed from your wishlist`,
                              variant: "success" as any,
                            })
                          }}
                          className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full sketchy-border hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        {/* Product Image */}
                        <Link href={`/product/${item.id}`}>
                          <div className="sketchy-frame bg-gray-900 p-4 mb-4 h-64 flex items-center justify-center overflow-hidden cursor-pointer">
                            {!item.inStock && (
                              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
                                <span className="text-white font-black text-lg uppercase">Out of Stock</span>
                              </div>
                            )}
                            <img
                              src={item.image}
                              alt={item.name}
                              width={300}
                              height={250}
                              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          </div>
                        </Link>

                        {/* Product Info */}
                        <div className="space-y-3">
                          <Badge className="bg-red-600 font-black uppercase">
                            {item.category}
                          </Badge>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-black text-lg text-black uppercase leading-tight hover:text-red-600 transition-colors cursor-pointer">
                              {item.name}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center gap-2">
                            <p className="text-2xl font-black text-red-600">${item.price}</p>
                            {item.originalPrice && (
                              <p className="text-lg font-bold text-gray-400 line-through">${item.originalPrice}</p>
                            )}
                          </div>

                          <Button 
                            onClick={() => {
                              if (item.inStock) {
                                toast({
                                  title: "Added to Cart",
                                  description: `${item.name} has been added to your cart`,
                                  variant: "success" as any,
                                })
                              }
                            }}
                            disabled={!item.inStock}
                            className="sketchy-btn bg-black text-white hover:bg-red-600 hover:text-white font-black uppercase disabled:opacity-50 w-full"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

    </PageLayout>
  )
}
