import { Link } from "wouter"

import Header from "@/components/header"
import Footer from "@/components/footer"


export default function FAQPage() {
  const faqs = [
    {
      question: "What is HeatGear technology?",
      answer: "HeatGear is our original performance baselayer that wicks sweat and regulates body temperature to keep you cool, dry, and light in hot conditions."
    },
    {
      question: "How do I find my size?",
      answer: "Visit our Size Guide page for detailed measurements. We recommend measuring yourself and comparing to our size charts for the best fit."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 60-day return window on all products. Items must be unworn, in original condition with tags attached. Returns are free with no restocking fees."
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes! We offer free standard shipping on all orders over $50. Express and overnight shipping options are also available."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. Express shipping is 2-3 days, and overnight delivery is available for next-day service."
    },
    {
      question: "Are Under Armour products machine washable?",
      answer: "Yes, most Under Armour products are machine washable. Always check the care label for specific instructions. We recommend cold water and tumble dry low."
    },
    {
      question: "What is HOVR technology?",
      answer: "HOVR is our cushioning technology that provides a 'zero gravity feel' to maintain energy return and eliminate impact. It's featured in our premium footwear."
    },
    {
      question: "Do you have a warranty on products?",
      answer: "Yes, we stand behind our products. If you experience any manufacturing defects, contact our customer service team for assistance."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl lg:text-6xl font-black uppercase text-black mb-8 text-center">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h1>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white sketchy-card border-4 border-black p-6">
                <h3 className="text-2xl font-black uppercase mb-4 text-red-600">{faq.question}</h3>
                <p className="text-lg font-bold text-gray-800">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-black sketchy-card border-4 border-red-600 p-8 text-center text-white">
            <h2 className="text-3xl font-black uppercase mb-4">Still Have Questions?</h2>
            <p className="text-xl font-bold mb-6">Our customer support team is here to help.</p>
            <Link href="/support/contact" className="inline-block sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 uppercase tracking-wide">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
