import { Button } from "@/components/ui/button"
import { Tag, Mail, CheckCircle, ArrowRight, Star, Sparkles } from "lucide-react"
import { Link } from "wouter"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import PageLayout from "@/components/layout/page-layout"
import ProductCard from "@/components/product-card"
import SectionHeading from "@/components/section-heading"
import { categories, missionItems, testimonials, heroStats } from "@/data/home"
import { featuredProducts, homeNewArrivals } from "@/data/products/featured"

export default function UnderArmourLanding() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [email, setEmail] = useState("")
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleAddToCart = (
    e: React.MouseEvent,
    product: { id: number; name: string; price: number; image: string; category: string },
  ) => {
    e.preventDefault()
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })
    toast({ title: "Added to Cart!", description: product.name })
  }

  const handleToggleWishlist = (
    e: React.MouseEvent,
    product: { id: number; name: string; price: number; image: string; category: string },
  ) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, inStock: true })
    }
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
    <PageLayout
      seoTitle="Under Armour® | Performance Athletic Apparel, Shoes &amp; Gear"
      seoDescription="Shop men's &amp; women's performance athletic wear, running shoes, and training gear. HeatGear® &amp; HOVR™ technology engineered for athletes. Free shipping on orders $35+."
    >
      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="ua-hero ua-section-xl" aria-labelledby="hero-heading">
          <div className="ua-hero-gradient" />
          <div className="ua-page-container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="sketchy-border bg-red-600 inline-block px-4 py-2 transform -rotate-1">
                  <span className="text-white font-black text-sm uppercase tracking-widest">No Excuses</span>
                </div>
                <h1 id="hero-heading" className="text-5xl lg:text-7xl font-black uppercase leading-none tracking-tight">
                  THE ONLY WAY<br />
                  <span className="text-red-600">IS THROUGH</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 font-bold max-w-lg leading-relaxed">
                  Push beyond limits. Break through barriers. Dominate every rep, every mile, every moment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/sports">
                    <Button className="ua-btn-primary text-lg px-8 py-4 w-full">Train Now</Button>
                  </Link>
                  <Link href="/new-arrivals">
                    <Button className="ua-btn-secondary border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 w-full flex items-center gap-2">
                      <Sparkles className="h-5 w-5" /> New Arrivals
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-6">
                  {heroStats.map(stat => (
                    <div key={stat.label}>
                      <p className="ua-stat-value">{stat.value}</p>
                      <p className="ua-stat-label">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="sketchy-frame bg-gray-900 p-4 transform rotate-1">
                  <img
                    src="/intense-athlete-training-sketch.png"
                    alt="Focused athlete training with Under Armour gear"
                    loading="eager"
                    className="w-full h-auto filter grayscale contrast-125"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 sketchy-border bg-red-600 px-6 py-3 transform rotate-2">
                  <span className="text-white font-black text-lg uppercase">Protect This House</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ua-hero-divider" />
        </section>

        {/* ── Sale Banner ───────────────────────────────────────── */}
        <section className="ua-section-sm ua-bg-accent">
          <div className="ua-page-container flex flex-col sm:flex-row items-center justify-between gap-4">
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

        {/* ── Shop by Category ──────────────────────────────────── */}
        <section className="ua-section-lg ua-bg-light">
          <div className="ua-page-container">
            <SectionHeading title="Shop by" accent="Category" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(cat => (
                <Link key={cat.label} href={cat.href} className="ua-cat-card">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  />
                  <div className="relative z-10">
                    <h3 className="ua-cat-card-heading">{cat.label}</h3>
                    <p className="ua-cat-card-desc">{cat.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Gear ─────────────────────────────────────── */}
        <section className="ua-section-lg ua-bg-white" aria-labelledby="featured-gear-heading">
          <div className="ua-page-container">
            <SectionHeading id="featured-gear-heading" title="Battle-Tested" accent="Gear" />
            <div className="ua-product-grid-3">
              {featuredProducts.map(item => (
                <ProductCard
                  key={item.id}
                  {...item}
                  imageHeight={240}
                  isWishlisted={isInWishlist(item.id)}
                  onAddToCart={(e) => handleAddToCart(e, item)}
                  onToggleWishlist={(e) => handleToggleWishlist(e, item)}
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/men">
                <Button className="ua-btn-secondary text-lg px-10 py-4 flex items-center gap-2 mx-auto">
                  Shop All Products <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── New Arrivals ──────────────────────────────────────── */}
        <section className="ua-section-lg ua-bg-light">
          <div className="ua-page-container">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="ua-section-heading text-black">
                  New <span className="text-red-600">Arrivals</span>
                </h2>
                <p className="ua-section-subtext mt-2">Fresh drops, just landed.</p>
              </div>
              <Link href="/new-arrivals" className="flex items-center gap-2 font-black uppercase text-sm text-red-600 hover:text-red-700 transition-colors">
                See All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="ua-product-grid">
              {homeNewArrivals.map(item => (
                <ProductCard
                  key={item.id}
                  {...item}
                  imageHeight={200}
                  isWishlisted={isInWishlist(item.id)}
                  onAddToCart={(e) => handleAddToCart(e, item)}
                  onToggleWishlist={(e) => handleToggleWishlist(e, item)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission ───────────────────────────────────────────── */}
        <section className="ua-section-lg ua-bg-dark">
          <div className="ua-page-container">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <SectionHeading title="Our" accent="Mission" dark />
              <div className="grid md:grid-cols-3 gap-8">
                {missionItems.map(item => (
                  <div key={item.title} className="ua-feature-card">
                    <item.icon className="h-16 w-16 text-red-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-black uppercase mb-4">{item.title}</h3>
                    <p className="text-gray-300 font-bold">{item.desc}</p>
                  </div>
                ))}
              </div>
              <blockquote className="text-2xl lg:text-3xl font-black uppercase italic">
                "It's what you do in the dark that puts you in the light."
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────── */}
        <section className="ua-section-lg ua-bg-light">
          <div className="ua-page-container">
            <SectionHeading title="Warrior" accent="Voices" />
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="ua-testimonial-card">
                  <div className="absolute -top-4 -left-4 sketchy-border bg-red-600 w-8 h-8 flex items-center justify-center">
                    <span className="text-white font-black text-xl">"</span>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-red-600 text-red-600" />
                    ))}
                  </div>
                  <blockquote className="text-lg font-bold text-black mb-6 italic">{t.quote}</blockquote>
                  <div className="sketchy-divider-horizontal bg-gray-300 h-0.5 mb-4" />
                  <p className="font-black text-black uppercase">{t.author}</p>
                  <p className="text-red-600 font-bold text-sm uppercase">{t.sport}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Newsletter ────────────────────────────────────────── */}
        <section className="ua-section-lg ua-bg-dark">
          <div className="ua-page-container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="sketchy-border bg-red-600 inline-block px-4 py-2 mb-6 transform -rotate-1">
                <span className="font-black text-sm uppercase tracking-widest">UA Community</span>
              </div>
              <h2 className="ua-section-heading mb-4">
                Stay in the <span className="text-red-600">Game</span>
              </h2>
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
                  <div className="flex items-center gap-2 flex-1 bg-gray-900 border-2 border-gray-700 focus-within:border-red-600 transition-colors px-4 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 bg-transparent py-4 text-white font-bold focus:outline-none"
                    />
                  </div>
                  <Button type="submit" className="ua-btn-primary px-8 py-4 flex-shrink-0">
                    Subscribe
                  </Button>
                </form>
              )}
              <p className="text-xs text-gray-600 font-bold mt-4">No spam. Unsubscribe any time. Protect This House.</p>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="ua-section-lg ua-bg-light">
          <div className="ua-page-container text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-black">
                Ready to <span className="text-red-600">Dominate?</span>
              </h2>
              <p className="ua-section-subtext text-xl lg:text-2xl">
                Join the ranks of elite athletes who choose Under Armour. Your journey to greatness starts now.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/men">
                  <Button className="ua-btn-primary text-xl px-12 py-6">Shop Now</Button>
                </Link>
                <Link href="/support/contact">
                  <Button className="ua-btn-secondary text-xl px-12 py-6">Find a Store</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </PageLayout>
  )
}
