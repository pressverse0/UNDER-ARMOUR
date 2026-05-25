
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Lock, CheckCircle, ArrowRight, User, Mail, MapPin, Phone } from "lucide-react"
import { Link } from "wouter"

import PageLayout from "@/components/layout/page-layout"
import { useCart } from "@/context/cart-context"
import type { CustomerInfo } from "@/types/checkout"

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cartItems.length === 0) return
    setIsLoading(true)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({ id: item.id, quantity: item.quantity })),
          customerInfo,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Checkout error:", data.error)
        setIsLoading(false)
        return
      }

      if (data.url) {
        clearCart()
        window.location.href = data.url
      } else {
        console.error("No checkout URL received")
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      setIsLoading(false)
    }
  }

  const shipping = 5.99
  const orderTotal = cartTotal + shipping

  if (cartItems.length === 0) {
    return (
      <PageLayout seoTitle="Checkout | Under Armour®">
        <main className="flex-1 ua-bg-light ua-section-lg">
          <div className="ua-page-container text-center max-w-md mx-auto">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-black uppercase mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 font-bold mb-8">Add some gear before checking out.</p>
            <Link href="/men">
              <Button className="ua-btn-primary text-lg px-10 py-4">Shop Now</Button>
            </Link>
          </div>
        </main>
      </PageLayout>
    )
  }

  return (
    <PageLayout seoTitle="Checkout | Under Armour®">
      <main className="flex-1 ua-bg-light">
        <section className="ua-section-md">
          <div className="ua-page-container max-w-7xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-5xl font-black uppercase mb-2">
                Secure <span className="text-red-600">Checkout</span>
              </h1>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Lock className="h-5 w-5" />
                <p className="font-bold text-sm md:text-base">Your payment is secure and encrypted</p>
              </div>
            </div>

            <form onSubmit={handleCheckout}>
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Left — Customer info */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="sketchy-card bg-white border-4 border-black">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-black uppercase mb-6 flex items-center">
                        <User className="h-6 w-6 text-red-600 mr-2" />Contact Information
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName" className="font-black uppercase text-sm mb-2 block">Full Name *</Label>
                          <Input id="fullName" name="fullName" type="text" required value={customerInfo.fullName} onChange={handleInputChange} className="sketchy-border border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="John Doe" />
                        </div>
                        <div>
                          <Label htmlFor="email" className="font-black uppercase text-sm mb-2 block"><Mail className="h-4 w-4 inline mr-1" />Email *</Label>
                          <Input id="email" name="email" type="email" required value={customerInfo.email} onChange={handleInputChange} className="sketchy-border border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="john@example.com" />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="font-black uppercase text-sm mb-2 block"><Phone className="h-4 w-4 inline mr-1" />Phone *</Label>
                          <Input id="phone" name="phone" type="tel" required value={customerInfo.phone} onChange={handleInputChange} className="sketchy-border border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="+1 (555) 123-4567" />
                        </div>
                        <div>
                          <Label htmlFor="country" className="font-black uppercase text-sm mb-2 block">Country *</Label>
                          <select id="country" name="country" required value={customerInfo.country} onChange={handleInputChange} className="w-full sketchy-border border-2 border-gray-300 focus:border-red-600 font-bold px-3 py-2 rounded">
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="sketchy-card bg-white border-4 border-black">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-black uppercase mb-6 flex items-center">
                        <MapPin className="h-6 w-6 text-red-600 mr-2" />Shipping Address
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="address" className="font-black uppercase text-sm mb-2 block">Street Address *</Label>
                          <Input id="address" name="address" type="text" required value={customerInfo.address} onChange={handleInputChange} className="sketchy-border border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="123 Main Street" />
                        </div>
                        <div>
                          <Label htmlFor="city" className="font-black uppercase text-sm mb-2 block">City *</Label>
                          <Input id="city" name="city" type="text" required value={customerInfo.city} onChange={handleInputChange} className="sketchy-border border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="New York" />
                        </div>
                        <div>
                          <Label htmlFor="state" className="font-black uppercase text-sm mb-2 block">State / Province *</Label>
                          <Input id="state" name="state" type="text" required value={customerInfo.state} onChange={handleInputChange} className="sketchy-border border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="NY" />
                        </div>
                        <div>
                          <Label htmlFor="zipCode" className="font-black uppercase text-sm mb-2 block">ZIP / Postal Code *</Label>
                          <Input id="zipCode" name="zipCode" type="text" required value={customerInfo.zipCode} onChange={handleInputChange} className="sketchy-border border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="10001" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right — Order summary */}
                <div className="lg:col-span-1">
                  <Card className="sketchy-card bg-white border-4 border-black sticky top-4">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-black uppercase mb-6 flex items-center">
                        <ShoppingCart className="h-6 w-6 text-red-600 mr-2" />Order Summary
                      </h2>
                      <div className="space-y-4 mb-6">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3 pb-4 border-b-2 border-gray-200">
                            <div className="w-16 h-16 bg-gray-900 rounded sketchy-border overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} width={64} height={64} loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale" />
                            </div>
                            <div className="flex-1">
                              <p className="font-black text-sm uppercase leading-tight">{item.name}</p>
                              <p className="text-xs text-gray-600 font-bold mb-1">{item.category}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-600">Qty: {item.quantity}</span>
                                <span className="font-black text-red-600">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3 border-t-2 border-gray-300 pt-4 mb-6">
                        <div className="flex justify-between font-bold">
                          <span>Subtotal:</span><span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Shipping:</span><span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-black text-xl border-t-2 border-gray-300 pt-3">
                          <span>Total:</span>
                          <span className="text-red-600">${orderTotal.toFixed(2)}</span>
                        </div>
                      </div>
                      <Button type="submit" disabled={isLoading} className="ua-btn-primary w-full text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? (
                          <><div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />Processing...</>
                        ) : (
                          <>Proceed to Payment<ArrowRight className="ml-2 h-5 w-5" /></>
                        )}
                      </Button>
                      <div className="mt-4 p-3 bg-gray-50 rounded sketchy-border">
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <p className="font-bold text-gray-700">Secure SSL Encryption</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
