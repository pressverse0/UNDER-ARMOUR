'use client'

import { Suspense } from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [orderNumber] = useState(`UA-${Date.now().toString().slice(-8)}`)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <Card className="sketchy-card bg-white border-4 border-black text-center">
            <CardContent className="p-12">
              {/* Success Icon */}
              <div className="mb-8 relative inline-block">
                <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto animate-scaleIn">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-green-600 rounded-full animate-ping opacity-20 mx-auto"></div>
              </div>

              {/* Success Message */}
              <h1 className="text-4xl lg:text-5xl font-black uppercase mb-4">
                Order <span className="text-red-600">Confirmed!</span>
              </h1>
              <p className="text-xl text-gray-700 font-bold mb-8">
                Thank you for your purchase. Your order has been successfully placed.
              </p>

              {/* Order Details */}
              <div className="bg-gray-50 p-6 rounded sketchy-border mb-8">
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm font-black uppercase text-gray-600 mb-1">Order Number</p>
                    <p className="text-lg font-black text-red-600">{orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase text-gray-600 mb-1">Session ID</p>
                    <p className="text-sm font-bold text-gray-800 break-all">{sessionId?.slice(0, 20)}...</p>
                  </div>
                </div>
              </div>

              {/* What's Next */}
              <div className="text-left mb-8">
                <h2 className="text-2xl font-black uppercase mb-4 flex items-center">
                  <Package className="h-6 w-6 text-red-600 mr-2" />
                  What's Next?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="font-bold">You'll receive an order confirmation email shortly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="font-bold">We'll send you shipping updates as your order is processed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="font-bold">Expected delivery: 5-7 business days</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/account/orders" className="flex-1">
                  <Button className="w-full sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg uppercase">
                    View Orders
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button className="w-full sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black text-lg uppercase">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-bold">
              Need help? <Link href="/support/contact" className="text-red-600 hover:text-red-700 underline">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-100">
        <Suspense fallback={
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <div className="animate-pulse">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
          </section>
        }>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
