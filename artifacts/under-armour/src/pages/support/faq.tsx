import { useState } from "react"
import { ChevronDown, MessageCircle, Phone, Mail } from "lucide-react"
import { Link } from "wouter"
import PageLayout from "@/components/layout/page-layout"

const faqCategories = [
  {
    category: "Products & Technology",
    items: [
      {
        question: "What is HeatGear technology?",
        answer: "HeatGear is our original performance baselayer fabric that wicks sweat away from your body to keep you cool, dry, and light in hot conditions. It's ultra-lightweight, smooth, and breathable — perfect for warm-weather training."
      },
      {
        question: "What is HOVR cushioning technology?",
        answer: "HOVR is UA's proprietary cushioning technology that provides a 'zero gravity feel,' maintaining energy return and eliminating impact step-after-step. It's connected to MapMyRun to track your run data. Featured in our premium running and training footwear."
      },
      {
        question: "What is ColdGear?",
        answer: "ColdGear keeps you warm without bulk. The dual-layer fabric has a smooth outer shell and a soft inner lining that traps warmth and wicks sweat away, making it ideal for cold-weather training, running, and outdoor activities."
      },
      {
        question: "Are Under Armour products machine washable?",
        answer: "Yes, most UA products are machine washable. We recommend using cold water on a gentle cycle and tumble dry on low. Always check the care label on your specific garment for the manufacturer's instructions. Avoid fabric softeners — they can reduce moisture-wicking performance."
      },
    ]
  },
  {
    category: "Orders & Shipping",
    items: [
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on all orders over $50. For orders under $50, standard shipping is $5.99. Express and overnight shipping options are also available at additional cost."
      },
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 5–7 business days. Express shipping delivers in 2–3 business days. Overnight delivery is available for orders placed before 1PM EST. International shipping typically takes 7–14 business days and rates vary by destination."
      },
      {
        question: "Can I track my order?",
        answer: "Absolutely. Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can also track your order directly from your account dashboard, or use our Track Order page and enter your order number and email address."
      },
      {
        question: "Can I change or cancel my order?",
        answer: "Orders can be modified or cancelled within 30 minutes of placement. After that window, the order enters processing and cannot be changed. Please contact our support team immediately if you need to make a change."
      },
    ]
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer: "We offer a 60-day return window on all products. Items must be unworn, unwashed, and in original condition with tags still attached. Returns are completely free — no restocking fees, no hassle. Proof of purchase is required."
      },
      {
        question: "How do I start a return?",
        answer: "Log into your account and navigate to Order History. Select the item(s) you want to return, choose a reason, and print your prepaid return label. Pack the items securely and drop off at any authorized shipping location. Refunds are processed within 5–7 business days of receipt."
      },
      {
        question: "Can I exchange an item for a different size?",
        answer: "Yes, exchanges are easy. Start a return for the original item and place a new order for the size or color you need. Your refund will be processed when we receive the original item. If the item sells out, we'll contact you with alternatives."
      },
    ]
  },
  {
    category: "Sizing & Fit",
    items: [
      {
        question: "How do I find my size?",
        answer: "Visit our Size Guide page for detailed measurement charts for Men's, Women's, Kids', and Footwear sizing. We recommend measuring your chest, waist, hips, and inseam and comparing to our charts. When between sizes, we generally recommend sizing up for outerwear and sizing down for compression gear."
      },
      {
        question: "Do UA products run true to size?",
        answer: "Generally yes, but it depends on the product type. Compression gear (HeatGear, ColdGear) tends to fit snug by design — if you prefer a looser fit, size up. Outerwear and lifestyle pieces typically run true to size. Product pages include fit notes to guide you."
      },
      {
        question: "Do you offer plus sizes?",
        answer: "Yes. Our men's range goes up to 4XL for many products, and women's range includes 1X–3X. Look for the 'Extended Sizes' filter on product listing pages. We are continuously expanding our size range across all categories."
      },
    ]
  },
  {
    category: "Account & Rewards",
    items: [
      {
        question: "Do you have a loyalty or rewards program?",
        answer: "Yes! UA Rewards lets you earn points on every purchase, which can be redeemed for discounts on future orders. You also get early access to new products, member-exclusive sales, and free shipping benefits. Sign up for free from your account page."
      },
      {
        question: "How do I reset my password?",
        answer: "On the sign-in page, click 'Forgot Password' and enter the email address associated with your account. You'll receive a reset link within a few minutes. Check your spam folder if you don't see it. Links expire after 24 hours."
      },
    ]
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const displayedFAQs = activeCategory
    ? faqCategories.filter(c => c.category === activeCategory)
    : faqCategories

  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-black uppercase mb-4">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h1>
          <p className="text-xl text-gray-300 font-bold max-w-2xl mx-auto">
            Everything you need to know about UA gear, orders, and policies.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-900 border-b-2 border-red-600 sticky top-[56px] z-30">
        <div className="container mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex-shrink-0 text-sm font-black uppercase px-4 py-2 rounded transition-colors ${!activeCategory ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
          >
            All Topics
          </button>
          {faqCategories.map(cat => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
              className={`flex-shrink-0 text-sm font-black uppercase px-4 py-2 rounded transition-colors ${activeCategory === cat.category ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">

          {displayedFAQs.map(catGroup => (
            <div key={catGroup.category} className="mb-10">
              <h2 className="text-2xl font-black uppercase mb-4 text-black flex items-center gap-3">
                <span className="w-1 h-7 bg-red-600 inline-block rounded-sm"></span>
                {catGroup.category}
              </h2>
              <div className="space-y-3">
                {catGroup.items.map((faq, idx) => {
                  const key = `${catGroup.category}-${idx}`
                  const isOpen = openItems[key]
                  return (
                    <div key={key} className={`bg-white border-4 transition-all duration-200 ${isOpen ? 'border-red-600' : 'border-black hover:border-red-600'} rounded`}>
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <h3 className={`font-black uppercase text-base leading-snug pr-4 ${isOpen ? 'text-red-600' : 'text-black'}`}>
                          {faq.question}
                        </h3>
                        <ChevronDown className={`h-5 w-5 flex-shrink-0 text-red-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 border-t-2 border-gray-100 pt-4 animate-fadeInUp">
                          <p className="text-gray-700 font-bold leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Still Need Help */}
          <div className="mt-12 bg-black sketchy-card border-4 border-red-600 p-8">
            <h2 className="text-3xl font-black uppercase mb-3 text-white text-center">Still Have Questions?</h2>
            <p className="text-gray-300 font-bold text-center mb-8">Our team is ready to help you.</p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/support/contact" className="flex flex-col items-center gap-2 bg-gray-900 border-2 border-gray-700 hover:border-red-600 p-5 rounded transition-colors text-center group">
                <MessageCircle className="h-8 w-8 text-red-600" />
                <span className="text-white font-black uppercase text-sm">Live Chat</span>
                <span className="text-gray-400 text-xs font-bold">Mon–Fri 9AM–9PM</span>
              </Link>
              <a href="tel:1-888-276-8678" className="flex flex-col items-center gap-2 bg-gray-900 border-2 border-gray-700 hover:border-red-600 p-5 rounded transition-colors text-center">
                <Phone className="h-8 w-8 text-red-600" />
                <span className="text-white font-black uppercase text-sm">Call Us</span>
                <span className="text-gray-400 text-xs font-bold">1-888-ARMOUR-1</span>
              </a>
              <Link href="/support/contact" className="flex flex-col items-center gap-2 bg-gray-900 border-2 border-gray-700 hover:border-red-600 p-5 rounded transition-colors text-center">
                <Mail className="h-8 w-8 text-red-600" />
                <span className="text-white font-black uppercase text-sm">Email Us</span>
                <span className="text-gray-400 text-xs font-bold">24–48hr response</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}
