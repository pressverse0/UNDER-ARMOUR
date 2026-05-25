import { useState } from "react"
import { Package, RefreshCw, Clock, CheckCircle, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import Header from "@/components/header"
import Footer from "@/components/footer"

const returnReasons = [
  "Wrong size", "Defective / damaged", "Not as described",
  "Changed my mind", "Ordered wrong item", "Missing parts", "Other"
]

export default function ReturnsPage() {
  const [step, setStep] = useState<'info' | 'form' | 'confirmation'>('info')
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [refId, setRefId] = useState("")

  const validateStep2 = () => {
    const e: Record<string, string> = {}
    if (!orderNumber.trim()) e.orderNumber = "Order number required"
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email required"
    if (!reason) e.reason = "Please select a reason"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return
    setSubmitting(true)
    setTimeout(() => {
      setRefId("RET-" + Math.random().toString(36).substring(2, 9).toUpperCase())
      setSubmitting(false)
      setStep('confirmation')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />

      {/* Hero */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-black uppercase mb-4">
            Returns & <span className="text-red-600">Exchanges</span>
          </h1>
          <p className="text-xl text-gray-300 font-bold">60-day hassle-free returns. No questions asked.</p>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Policy Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">60 Days</h3>
              <p className="font-bold">Return window from purchase date</p>
            </div>
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <RefreshCw className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Free Returns</h3>
              <p className="font-bold">No restocking fees. Ever.</p>
            </div>
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Package className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Easy Process</h3>
              <p className="font-bold">Print label online in minutes</p>
            </div>
          </div>

          {step === 'info' && (
            <div className="space-y-8">
              {/* Policy */}
              <div className="bg-white sketchy-card border-4 border-black p-8">
                <h2 className="text-3xl font-black uppercase mb-6">Return Policy</h2>
                <div className="space-y-3 text-gray-700">
                  <p className="font-bold">We stand behind everything we make. If you're not satisfied, we'll make it right.</p>
                  <ul className="space-y-2 ml-4">
                    {[
                      "60-day return window from original purchase date",
                      "Items must be unworn, unwashed, and in original condition",
                      "Original tags must still be attached",
                      "Proof of purchase (order number or receipt) required",
                      "Free prepaid return shipping on all orders",
                      "Refunds processed within 5–7 business days of receipt",
                      "Exchange for a different size or color at no extra cost",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2 font-bold">
                        <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* How to Return */}
              <div className="bg-white sketchy-card border-4 border-black p-8">
                <h2 className="text-3xl font-black uppercase mb-6">How to Start a Return</h2>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Submit Return Request", desc: "Fill out the form below with your order number and reason for return." },
                    { step: "2", title: "Print Your Label", desc: "We'll email you a prepaid return label within minutes." },
                    { step: "3", title: "Pack & Ship", desc: "Pack items securely in original packaging and drop off at any authorized carrier location." },
                    { step: "4", title: "Get Refunded", desc: "Refunds are processed within 5–7 business days of us receiving the item." },
                  ].map(item => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-10 h-10 bg-red-600 text-white font-black text-xl flex items-center justify-center flex-shrink-0 rounded">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-black uppercase">{item.title}</h3>
                        <p className="font-bold text-gray-700 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => setStep('form')}
                  className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-xl px-12 py-5 uppercase tracking-wide flex items-center gap-3 mx-auto"
                >
                  Start a Return <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {step === 'form' && (
            <div className="bg-white sketchy-card border-4 border-black p-8">
              <button onClick={() => setStep('info')} className="text-sm font-black uppercase text-gray-500 hover:text-red-600 transition-colors mb-6 flex items-center gap-1">
                ← Back to Policy
              </button>
              <h2 className="text-3xl font-black uppercase mb-6">Return Request Form</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-black uppercase text-sm mb-2">Order Number *</label>
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={e => { setOrderNumber(e.target.value); setErrors(p => ({ ...p, orderNumber: "" })) }}
                      placeholder="UA-XXXXXXXX"
                      className={`w-full p-3 border-2 font-bold focus:outline-none focus:border-red-600 transition-colors ${errors.orderNumber ? 'border-red-600 bg-red-50' : 'border-black'}`}
                    />
                    {errors.orderNumber && <p className="text-red-600 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.orderNumber}</p>}
                  </div>
                  <div>
                    <label className="block font-black uppercase text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })) }}
                      placeholder="your@email.com"
                      className={`w-full p-3 border-2 font-bold focus:outline-none focus:border-red-600 transition-colors ${errors.email ? 'border-red-600 bg-red-50' : 'border-black'}`}
                    />
                    {errors.email && <p className="text-red-600 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-black uppercase text-sm mb-2">Reason for Return *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {returnReasons.map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => { setReason(r); setErrors(p => ({ ...p, reason: "" })) }}
                        className={`p-3 border-2 text-sm font-black uppercase text-left transition-all ${reason === r ? 'bg-red-600 text-white border-red-600' : 'border-gray-300 hover:border-red-600'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  {errors.reason && <p className="text-red-600 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.reason}</p>}
                </div>

                <div>
                  <label className="block font-black uppercase text-sm mb-2">Additional Notes (optional)</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Any other details about the return..."
                    className="w-full p-3 border-2 border-black font-bold focus:outline-none focus:border-red-600 transition-colors resize-none"
                  />
                </div>

                <div className="bg-gray-50 border-2 border-gray-200 p-4 rounded">
                  <p className="text-sm font-bold text-gray-600">
                    By submitting this form, a prepaid return label will be emailed to you within 10 minutes. Items must meet our return eligibility requirements.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 uppercase tracking-wide w-full disabled:opacity-70"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2 justify-center">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Processing...
                    </span>
                  ) : "Submit Return Request"}
                </Button>
              </form>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="bg-white sketchy-card border-4 border-black p-8 text-center">
              <div className="w-20 h-20 bg-green-100 border-4 border-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-4xl font-black uppercase mb-4">Return Initiated!</h2>
              <p className="font-bold text-gray-700 mb-2">
                Reference #: <span className="font-black text-red-600">{refId}</span>
              </p>
              <p className="font-bold text-gray-700 mb-8">
                A prepaid return label has been sent to <strong>{email}</strong>. Check your inbox (and spam folder) within 10 minutes.
              </p>
              <div className="space-y-3 text-left bg-gray-50 border-2 border-gray-200 p-5 rounded mb-8">
                <h3 className="font-black uppercase text-sm">Next Steps</h3>
                {["Print the prepaid label from your email", "Pack items securely in original or similar packaging", "Drop off at any UPS or FedEx location", "Refund processed within 5–7 days of receipt"].map(s => (
                  <div key={s} className="flex items-start gap-2 font-bold text-sm">
                    <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                    {s}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => { setStep('info'); setOrderNumber(''); setEmail(''); setReason(''); setNotes('') }} className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 uppercase tracking-wide">
                  Return Another Item
                </button>
                <Link href="/" className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black px-8 py-3 uppercase tracking-wide inline-block text-center">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
