import { useState } from "react"
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import PageLayout from "@/components/layout/page-layout"

interface FormState {
  name: string
  email: string
  orderNumber: string
  subject: string
  category: string
  message: string
}

const categories = [
  "Order Issue", "Return / Exchange", "Shipping Question",
  "Product Question", "Size & Fit", "Account Help", "Other"
]

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", orderNumber: "", subject: "", category: "", message: ""
  })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {}
    if (!form.name.trim()) newErrors.name = "Name is required"
    if (!form.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email"
    if (!form.category) newErrors.category = "Please select a category"
    if (!form.subject.trim()) newErrors.subject = "Subject is required"
    if (!form.message.trim()) newErrors.message = "Message is required"
    else if (form.message.trim().length < 20) newErrors.message = "Please provide more detail (20+ characters)"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1200)
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  if (submitted) {
    return (
      <PageLayout>
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="bg-white sketchy-card border-4 border-black p-12">
              <div className="w-20 h-20 bg-green-100 border-4 border-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-black uppercase mb-4">Message Sent!</h1>
              <p className="text-xl font-bold text-gray-700 mb-2">
                Thanks, <span className="text-red-600">{form.name}</span>!
              </p>
              <p className="text-gray-600 font-bold mb-8">
                We've received your message and will respond to <strong>{form.email}</strong> within 24–48 hours.
              </p>
              <div className="bg-gray-100 border-2 border-gray-300 p-4 rounded mb-8 text-left">
                <p className="text-sm font-black uppercase text-gray-500 mb-1">Reference #</p>
                <p className="font-black text-lg">UA-{Math.random().toString(36).substring(2, 9).toUpperCase()}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", orderNumber: "", subject: "", category: "", message: "" }) }} className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 uppercase tracking-wide">
                  Send Another
                </button>
                <Link href="/" className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black px-8 py-3 uppercase tracking-wide inline-block">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    )
  }

  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-black uppercase mb-4">
            Contact <span className="text-red-600">Us</span>
          </h1>
          <p className="text-xl text-gray-300 font-bold">
            We're here to help. Reach out any time.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Phone, title: "Phone", detail: "1-888-ARMOUR-1", sub: "Mon–Fri 9AM–9PM EST" },
              { icon: Mail, title: "Email", detail: "support@underarmour.com", sub: "24–48 hour response" },
              { icon: MapPin, title: "HQ", detail: "Baltimore, MD", sub: "USA Headquarters" },
              { icon: Clock, title: "Chat Hours", detail: "9AM – 9PM", sub: "Monday to Friday" },
            ].map(({ icon: Icon, title, detail, sub }) => (
              <div key={title} className="bg-white sketchy-card border-4 border-black p-5 text-center">
                <Icon className="h-10 w-10 text-red-600 mx-auto mb-3" />
                <h3 className="font-black text-base uppercase mb-1">{title}</h3>
                <p className="font-bold text-sm">{detail}</p>
                <p className="text-xs text-gray-500 font-bold mt-1">{sub}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black uppercase">Quick Help</h2>
              {[
                { label: "Track Your Order", href: "/track-order", desc: "Real-time tracking" },
                { label: "Start a Return", href: "/support/returns", desc: "60-day free returns" },
                { label: "Size Guide", href: "/support/size-guide", desc: "Find your perfect fit" },
                { label: "View FAQ", href: "/support/faq", desc: "Common questions answered" },
              ].map(({ label, href, desc }) => (
                <Link key={href} href={href} className="block bg-white border-4 border-black hover:border-red-600 p-4 transition-all group">
                  <p className="font-black uppercase text-sm group-hover:text-red-600 transition-colors">{label}</p>
                  <p className="text-xs text-gray-500 font-bold mt-0.5">{desc}</p>
                </Link>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white sketchy-card border-4 border-black p-8">
              <h2 className="text-3xl font-black uppercase mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-black uppercase text-sm mb-1.5">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => handleChange("name", e.target.value)}
                      className={`w-full p-3 border-2 font-bold focus:outline-none focus:border-red-600 transition-colors ${errors.name ? 'border-red-600 bg-red-50' : 'border-black'}`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-600 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block font-black uppercase text-sm mb-1.5">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => handleChange("email", e.target.value)}
                      className={`w-full p-3 border-2 font-bold focus:outline-none focus:border-red-600 transition-colors ${errors.email ? 'border-red-600 bg-red-50' : 'border-black'}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-600 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-black uppercase text-sm mb-1.5">Order # (optional)</label>
                    <input
                      type="text"
                      value={form.orderNumber}
                      onChange={e => handleChange("orderNumber", e.target.value)}
                      className="w-full p-3 border-2 border-black font-bold focus:outline-none focus:border-red-600 transition-colors"
                      placeholder="UA-XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block font-black uppercase text-sm mb-1.5">Category *</label>
                    <select
                      value={form.category}
                      onChange={e => handleChange("category", e.target.value)}
                      className={`w-full p-3 border-2 font-bold focus:outline-none focus:border-red-600 transition-colors bg-white ${errors.category ? 'border-red-600 bg-red-50' : 'border-black'}`}
                    >
                      <option value="">Select a topic...</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.category && <p className="text-red-600 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.category}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-black uppercase text-sm mb-1.5">Subject *</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => handleChange("subject", e.target.value)}
                    className={`w-full p-3 border-2 font-bold focus:outline-none focus:border-red-600 transition-colors ${errors.subject ? 'border-red-600 bg-red-50' : 'border-black'}`}
                    placeholder="Brief description of your issue"
                  />
                  {errors.subject && <p className="text-red-600 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.subject}</p>}
                </div>

                <div>
                  <label className="block font-black uppercase text-sm mb-1.5">Message * <span className="text-gray-400 normal-case font-bold">(min 20 characters)</span></label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={e => handleChange("message", e.target.value)}
                    className={`w-full p-3 border-2 font-bold focus:outline-none focus:border-red-600 transition-colors resize-none ${errors.message ? 'border-red-600 bg-red-50' : 'border-black'}`}
                    placeholder="Please describe your issue in detail..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message
                      ? <p className="text-red-600 text-xs font-bold flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.message}</p>
                      : <span />
                    }
                    <span className={`text-xs font-bold ${form.message.length < 20 ? 'text-gray-400' : 'text-green-600'}`}>
                      {form.message.length} / 20+ chars
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 uppercase tracking-wide w-full disabled:opacity-70"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2 justify-center">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 justify-center">
                      <Send className="h-5 w-5" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}
