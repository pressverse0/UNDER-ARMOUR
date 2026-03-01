'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Target, Zap, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import CartSidebar from "@/components/cart-sidebar"

export default function UnderArmourLanding() {
  const [cartOpen, setCartOpen] = useState(false)

  const openCart = () => {
    setCartOpen(true)
  }

  const closeCart = () => {
    setCartOpen(false)
  }

  return (
    <>
      <Header activePage="home" />
      <main className="flex-1">

      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="sketchy-border bg-red-600 inline-block px-4 py-2 transform -rotate-1">
                <span className="text-white font-black text-sm uppercase tracking-widest">No Excuses</span>
              </div>
              <h1 id="hero-heading" className="text-5xl lg:text-7xl font-black uppercase leading-none tracking-tight">
                THE ONLY WAY
                <br />
                <span className="text-red-600">IS THROUGH</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 font-bold max-w-lg leading-relaxed">
                Push beyond limits. Break through barriers. Dominate every rep, every mile, every moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sports">
                  <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 uppercase tracking-wide transform hover:scale-105 transition-all w-full" aria-label="Start training now">
                    Train Now
                  </Button>
                </Link>
                <Link href="/men">
                  <Button
                    variant="outline"
                    className="sketchy-btn-outline border-2 border-white text-white hover:bg-white hover:text-black font-black text-lg px-8 py-4 uppercase tracking-wide bg-transparent w-full"
                    aria-label="Shop athletic gear"
                  >
                    Shop Gear
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="sketchy-frame bg-gray-900 p-4 transform rotate-1">
                <Image
                  src="/intense-athlete-training-sketch.png"
                  alt="Focused athlete training intensely with Under Armour gear - pushing beyond limits"
                  width={500}
                  height={600}
                  className="w-full h-auto filter grayscale contrast-125"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 sketchy-border bg-red-600 px-6 py-3 transform rotate-2">
                <span className="text-white font-black text-lg uppercase">Protect This House</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sketchy divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-600 sketchy-divider" aria-hidden="true"></div>
      </section>

      {/* Featured Gear Section */}
      <section className="py-20 bg-gray-100" aria-labelledby="featured-gear-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="featured-gear-heading" className="text-4xl lg:text-5xl font-black uppercase text-black mb-4 tracking-tight">
              Battle-Tested <span className="text-red-600">Gear</span>
            </h2>
            <div className="sketchy-underline mx-auto" aria-hidden="true"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "HeatGear Training Shirt", price: "$35", category: "Apparel", description: "Moisture-wicking performance training shirt" },
              { name: "HOVR Phantom 3", price: "$140", category: "Footwear", description: "Premium running shoes with HOVR cushioning technology" },
              { name: "Project Rock Gym Bag", price: "$75", category: "Accessories", description: "Durable gym bag designed for champions" },
            ].map((item, index) => (
              <article
                key={index}
                itemScope
                itemType="https://schema.org/Product"
              >
                <Card
                  className="sketchy-card bg-white border-4 border-black transform hover:scale-105 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="sketchy-frame bg-gray-900 p-4 mb-6">
                      <Image
                        src={`/athletic-gear-display.png?height=250&width=300&query=under armour ${item.category.toLowerCase()} sketch style`}
                        alt={`${item.name} - ${item.description}`}
                        width={300}
                        height={250}
                        className="w-full h-auto filter grayscale"
                        itemProp="image"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="sketchy-border bg-red-600 inline-block px-3 py-1">
                        <span className="text-white font-bold text-xs uppercase" itemProp="category">{item.category}</span>
                      </div>
                      <h3 className="font-black text-xl text-black uppercase" itemProp="name">{item.name}</h3>
                      <p className="text-2xl font-black text-red-600" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <span itemProp="price">{item.price}</span>
                        <meta itemProp="priceCurrency" content="USD" />
                      </p>
                      <Button 
                        onClick={openCart}
                        className="sketchy-btn-outline w-full border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase" 
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
              Our <span className="text-red-600">Mission</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: "Precision", desc: "Every detail engineered for peak performance" },
                { icon: Zap, title: "Power", desc: "Unleash your potential with cutting-edge technology" },
                { icon: Award, title: "Excellence", desc: "Champions choose Under Armour for a reason" },
              ].map((item, index) => (
                <div key={index} className="sketchy-card bg-gray-900 p-8 border-2 border-red-600">
                  <item.icon className="h-16 w-16 text-red-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-black uppercase mb-4">{item.title}</h3>
                  <p className="text-gray-300 font-bold">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="sketchy-divider-horizontal bg-red-600 h-1 max-w-md mx-auto"></div>

            <blockquote className="text-2xl lg:text-3xl font-black uppercase italic text-center">
              "It's what you do in the dark that puts you in the light."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black uppercase text-black mb-4 tracking-tight">
              Warrior <span className="text-red-600">Voices</span>
            </h2>
            <div className="sketchy-underline mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Under Armour doesn't just make gear. They make warriors.",
                author: "Sarah M.",
                sport: "CrossFit Athlete",
              },
              {
                quote: "When the game is on the line, I trust Under Armour.",
                author: "Marcus J.",
                sport: "Basketball Player",
              },
              {
                quote: "Every mile, every rep, every drop of sweat - UA is with me.",
                author: "Elena R.",
                sport: "Marathon Runner",
              },
            ].map((testimonial, index) => (
              <div key={index} className="sketchy-card bg-white p-8 border-4 border-black relative">
                <div className="absolute -top-4 -left-4 sketchy-border bg-red-600 w-8 h-8 flex items-center justify-center">
                  <span className="text-white font-black text-xl">"</span>
                </div>
                <blockquote className="text-lg font-bold text-black mb-6 italic">{testimonial.quote}</blockquote>
                <div className="sketchy-divider-horizontal bg-gray-300 h-0.5 mb-4"></div>
                <div>
                  <p className="font-black text-black uppercase">{testimonial.author}</p>
                  <p className="text-red-600 font-bold text-sm uppercase">{testimonial.sport}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tight">
              Ready to <span className="text-red-600">Dominate?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 font-bold">
              Join the ranks of elite athletes who choose Under Armour. Your journey to greatness starts now.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-xl px-12 py-6 uppercase tracking-wide">
                Shop Now
              </Button>
              <Button
                variant="outline"
                className="sketchy-btn-outline border-2 border-white text-white hover:bg-white hover:text-black font-black text-xl px-12 py-6 uppercase tracking-wide bg-transparent"
              >
                Find a Store
              </Button>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={closeCart} />
    </>
  )
}
