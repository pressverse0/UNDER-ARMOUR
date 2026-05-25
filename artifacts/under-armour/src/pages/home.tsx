import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Target, Zap, Award, ArrowRight, Star, Sparkles, Tag, Mail, CheckCircle } from "lucide-react"
import { Link } from "wouter"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import PageLayout from "@/components/layout/page-layout"

const featuredProducts = [
  { id: 11, name: "HeatGear Training Shirt", price: 35, originalPrice: null, category: "Apparel", description: "Moisture-wicking performance training shirt", image: "/ARMOUR/HeatGear Training Shirt.jpg", rating: 4.4, reviews: 267 },
  { id: 2, name: "HOVR Phantom 3", price: 140, originalPrice: null, category: "Footwear", description: "Premium running shoes with HOVR cushioning", image: "/ARMOUR/HOVRPhantom3.jpg", rating: 4.8, reviews: 256 },
  { id: 201, name: "Project Rock Gym Bag", price: 75, originalPrice: null, category: "Accessories", description: "Built for champions. 42L capacity.", image: "/ARMOUR/ProjectRockGymBag.jpg", rating: 4.8, reviews: 234 },
]

const newArrivals = [
  { id: 10, name: "Curry Flow 11", price: 160, image: "/ARMOUR/Curry Flow 11.jpg", category: "Basketball" },
  { id: 6, name: "Sportstyle Jacket", price: 90, image: "/ARMOUR/Sportstyle Jacket.jpg", category: "Outerwear" },
  { id: 401, name: "Unstoppable Bomber", price: 110, image: "/ARMOUR/Unstoppable Bomber Jacket.jpg", category: "Outerwear" },
  { id: 403, name: "Flow Velociti Wind 2", price: 140, image: "/ARMOUR/Flow Velociti Wind 2.jpg", category: "Running" },
]

const categories = [
  { label: "Men", href: "/men", image: "/intense-athlete-training-sketch.png", desc: "Training & Footwear" },
  { label: "Women", href: "/women", image: "/athletic-gear-display.png", desc: "Performance Gear" },
  { label: "Kids", href: "/kids", image: "/intense-athlete-training-sketch.png", desc: "Ages 3–16" },
  { label: "Shoes", href: "/shoes", image: "/athletic-gear-display.png", desc: "HOVR & Charged" },
  { label: "Sports", href: "/sports", image: "/intense-athlete-training-sketch.png", desc: "Shop by Sport" },
  { label: "Accessories", href: "/accessories", image: "/athletic-gear-display.png", desc: "Complete Your Kit" },
]

export default function UnderArmourLanding() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [email, setEmail] = useState("")
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleAddToCart = (e: React.MouseEvent, product: typeof featuredProducts[0]) => {
    e.preventDefault()
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })
    toast({ title: "Added to Cart!", description: product.name })
  }

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address", variant: "destructive" })
      return
    }
    setNewsletterSubmitted(true)
    toast({ title: "You're in!", description: "Welcome to the UA community. Check your inbox." })
  }

  return (
    <PageLayout seoTitle="Under Armour® | Performance Athletic Apparel, Shoes &amp; Gear" seoDescription="Shop men's &amp; women's performance athletic wear, running shoes, and training gear. HeatGear® &amp; HOVR™ technology engineered for athletes. Free shipping on orders $35+.">
      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />
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
                    <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 uppercase tracking-wide transform hover:scale-105 transition-all w-full">
                      Train Now
                    </Button>
                  </Link>
                  <Link href="/new-arrivals">
                    <Button variant="outline" className="sketchy-btn-outline border-2 border-white text-white hover:bg-white hover:text-black font-black text-lg px-8 py-4 uppercase tracking-wide bg-transparent w-full flex items-center gap-2">
                      <Sparkles className="h-5 w-5" /> New Arrivals
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-2xl font-black text-red-600">500+</p>
                    <p className="text-xs font-black uppercase text-gray-400">Products</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-red-600">4.7★</p>
                    <p className="text-xs font-black uppercase text-gray-400">Avg Rating</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-red-600">Free</p>
                    <p className="text-xs font-black uppercase text-gray-400">Ship over $50</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="sketchy-frame bg-gray-900 p-4 transform rotate-1">
                  <img src="/intense-athlete-training-sketch.png" alt="Focused athlete training with Under Armour gear" className="w-full h-auto filter grayscale contrast-125" />
                </div>
                <div className="absolute -bottom-4 -right-4 sketchy-border bg-red-600 px-6 py-3 transform rotate-2">
                  <span className="text-white font-black text-lg uppercase">Protect This House</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-600 sketchy-divider" />
        </section>

        {/* Sale Banner */}
        <section className="py-8 bg-red-600 text-white">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Tag className="h-8 w-8 fill-white" />
              <div>
                <p className="font-black text-xl uppercase">Summer Sale — Up to 40% Off</p>
                <p className="font-bold text-red-200 text-sm">Limited time offer on select gear</p>
              </div>
            </div>
            <Link href="/sale">
              <Button className="sketchy-btn bg-white text-red-600 hover:bg-gray-100 font-black uppercase px-8 py-3 flex items-center gap-2">
                Shop Sale <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-black uppercase text-black mb-4 tracking-tight">
                Shop by <span className="text-red-600">Category</span>
              </h2>
              <div className="sketchy-underline mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(cat => (
                <Link key={cat.label} href={cat.href} className="group relative overflow-hidden rounded-lg bg-white border-4 border-black hover:border-red-600 transition-all duration-300 hover:scale-105 text-center p-6">
                  <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundImage: `url('${cat.image}')` }} />
                  <div className="relative z-10">
                    <h3 className="font-black text-lg uppercase group-hover:text-red-600 transition-colors">{cat.label}</h3>
                    <p className="text-xs font-bold text-gray-500 mt-1">{cat.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Gear */}
        <section className="py-20 bg-white" aria-labelledby="featured-gear-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="featured-gear-heading" className="text-4xl lg:text-5xl font-black uppercase text-black mb-4 tracking-tight">
                Battle-Tested <span className="text-red-600">Gear</span>
              </h2>
              <div className="sketchy-underline mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((item) => (
                <article key={item.id} itemScope itemType="https://schema.org/Product">
                  <Link href={`/product/${item.id}`}>
                    <Card className="sketchy-card bg-gray-100 border-4 border-black transform hover:scale-105 transition-all duration-300 h-full flex flex-col cursor-pointer group">
                      <CardContent className="p-6 flex flex-col flex-1">
                        <div className="sketchy-frame bg-gray-900 mb-6" style={{ height: 240 }}>
                          <img src={item.image} alt={`${item.name} - ${item.description}`} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" itemProp="image" />
                        </div>
                        <div className="space-y-2 flex-1 flex flex-col">
                          <div className="sketchy-border bg-red-600 inline-block px-3 py-1 self-start">
                            <span className="text-white font-bold text-xs uppercase" itemProp="category">{item.category}</span>
                          </div>
                          <h3 className="font-black text-xl text-black uppercase" itemProp="name">{item.name}</h3>
                          <p className="text-gray-600 font-bold text-sm">{item.description}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-red-600 text-red-600' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-xs text-gray-500 font-bold ml-1">({item.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-2">
                            <p className="text-2xl font-black text-red-600" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                              <span itemProp="price">${item.price}</span>
                            </p>
                            <Button
                              onClick={(e) => handleAddToCart(e, item)}
                              className="sketchy-btn bg-black text-white hover:bg-red-600 font-black uppercase text-xs px-4 py-2"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </article>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/men">
                <Button className="sketchy-btn bg-black hover:bg-gray-900 text-white font-black text-lg px-10 py-4 uppercase flex items-center gap-2 mx-auto">
                  Shop All Products <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black uppercase text-black tracking-tight">
                  New <span className="text-red-600">Arrivals</span>
                </h2>
                <p className="text-gray-500 font-bold mt-2">Fresh drops, just landed.</p>
              </div>
              <Link href="/new-arrivals" className="flex items-center gap-2 font-black uppercase text-sm text-red-600 hover:text-red-700 transition-colors">
                See All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map(item => (
                <Link key={item.id} href={`/product/${item.id}`} className="group">
                  <div className="rounded-lg bg-white border-4 border-black hover:border-red-600 transition-all duration-300 group-hover:scale-105 overflow-hidden">
                    <div className="relative bg-gray-900 overflow-hidden rounded-t-lg" style={{ height: 200 }}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute top-2 left-2">
                        <span className="bg-black text-white text-xs font-black uppercase px-2 py-1 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> New
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-black uppercase text-red-600 mb-1">{item.category}</p>
                      <h3 className="font-black uppercase text-sm leading-snug">{item.name}</h3>
                      <p className="text-lg font-black mt-2">${item.price}</p>
                    </div>
                  </div>
                </Link>
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
                ].map((item) => (
                  <div key={item.title} className="sketchy-card bg-gray-900 p-8 border-2 border-red-600">
                    <item.icon className="h-16 w-16 text-red-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-black uppercase mb-4">{item.title}</h3>
                    <p className="text-gray-300 font-bold">{item.desc}</p>
                  </div>
                ))}
              </div>
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
              <div className="sketchy-underline mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: "Under Armour doesn't just make gear. They make warriors.", author: "Sarah M.", sport: "CrossFit Athlete", rating: 5 },
                { quote: "When the game is on the line, I trust Under Armour.", author: "Marcus J.", sport: "Basketball Player", rating: 5 },
                { quote: "Every mile, every rep, every drop of sweat — UA is with me.", author: "Elena R.", sport: "Marathon Runner", rating: 5 },
              ].map((testimonial, index) => (
                <div key={index} className="sketchy-card bg-white p-8 border-4 border-black relative">
                  <div className="absolute -top-4 -left-4 sketchy-border bg-red-600 w-8 h-8 flex items-center justify-center">
                    <span className="text-white font-black text-xl">"</span>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-red-600 text-red-600" />
                    ))}
                  </div>
                  <blockquote className="text-lg font-bold text-black mb-6 italic">{testimonial.quote}</blockquote>
                  <div className="sketchy-divider-horizontal bg-gray-300 h-0.5 mb-4" />
                  <div>
                    <p className="font-black text-black uppercase">{testimonial.author}</p>
                    <p className="text-red-600 font-bold text-sm uppercase">{testimonial.sport}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-black text-white">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <div className="sketchy-border bg-red-600 inline-block px-4 py-2 mb-6 transform -rotate-1">
              <span className="font-black text-sm uppercase tracking-widest">UA Community</span>
            </div>
            <h2 className="text-4xl font-black uppercase mb-4">Stay in the <span className="text-red-600">Game</span></h2>
            <p className="text-gray-300 font-bold mb-8">
              Get exclusive access to new drops, training tips, and member-only discounts.
            </p>
            {newsletterSubmitted ? (
              <div className="flex items-center justify-center gap-3 bg-gray-900 border-2 border-green-600 p-5 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <p className="font-black uppercase text-green-400">You're in! Welcome to the UA family.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex items-center gap-2 flex-1 bg-gray-900 border-2 border-gray-700 focus-within:border-red-600 transition-colors px-4 rounded-lg sm:rounded-r-none sm:rounded-l-lg">
                  <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent py-4 text-white font-bold focus:outline-none"
                  />
                </div>
                <Button type="submit" className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black uppercase px-8 py-4 flex-shrink-0">
                  Subscribe
                </Button>
              </form>
            )}
            <p className="text-xs text-gray-600 font-bold mt-4">No spam. Unsubscribe any time. Protect This House.</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-black">
                Ready to <span className="text-red-600">Dominate?</span>
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 font-bold">
                Join the ranks of elite athletes who choose Under Armour. Your journey to greatness starts now.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/men">
                  <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-xl px-12 py-6 uppercase tracking-wide">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/support/contact">
                  <Button variant="outline" className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black text-xl px-12 py-6 uppercase tracking-wide bg-transparent">
                    Find a Store
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

    </PageLayout>
  )
}
