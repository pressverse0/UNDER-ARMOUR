import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"

import Header from "@/components/header"
import Footer from "@/components/footer"


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl lg:text-6xl font-black uppercase text-black mb-8 text-center">
            Contact <span className="text-red-600">Us</span>
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Phone</h3>
              <p className="font-bold">1-888-ARMOUR-1</p>
              <p className="text-sm">Mon-Fri 9AM-9PM EST</p>
            </div>
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Mail className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Email</h3>
              <p className="font-bold">support@underarmour.com</p>
              <p className="text-sm">24-48 hour response</p>
            </div>
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Location</h3>
              <p className="font-bold">Baltimore, MD</p>
              <p className="text-sm">USA Headquarters</p>
            </div>
          </div>

          <div className="bg-white sketchy-card border-4 border-black p-8">
            <h2 className="text-3xl font-black uppercase mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block font-black uppercase mb-2">Name</label>
                <input type="text" className="w-full p-3 border-2 border-black sketchy-border" placeholder="Your name" />
              </div>
              <div>
                <label className="block font-black uppercase mb-2">Email</label>
                <input type="email" className="w-full p-3 border-2 border-black sketchy-border" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block font-black uppercase mb-2">Subject</label>
                <input type="text" className="w-full p-3 border-2 border-black sketchy-border" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block font-black uppercase mb-2">Message</label>
                <textarea rows={6} className="w-full p-3 border-2 border-black sketchy-border" placeholder="Tell us more..."></textarea>
              </div>
              <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 uppercase tracking-wide w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
