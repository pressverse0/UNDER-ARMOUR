import Link from "next/link"
import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'Size Guide | Under Armour',
  description: 'Find your perfect fit with our comprehensive size guide for apparel and footwear.',
}

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl lg:text-6xl font-black uppercase text-black mb-8 text-center">
            Size <span className="text-red-600">Guide</span>
          </h1>
          
          <div className="bg-white sketchy-card border-4 border-black p-8 mb-8">
            <h2 className="text-3xl font-black uppercase mb-4">Men's Apparel</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="p-3 font-black uppercase">Size</th>
                    <th className="p-3 font-black uppercase">Chest (in)</th>
                    <th className="p-3 font-black uppercase">Waist (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">S</td><td className="p-3">34-36</td><td className="p-3">28-30</td></tr>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">M</td><td className="p-3">38-40</td><td className="p-3">32-34</td></tr>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">L</td><td className="p-3">42-44</td><td className="p-3">36-38</td></tr>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">XL</td><td className="p-3">46-48</td><td className="p-3">40-42</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white sketchy-card border-4 border-black p-8 mb-8">
            <h2 className="text-3xl font-black uppercase mb-4">Women's Apparel</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="p-3 font-black uppercase">Size</th>
                    <th className="p-3 font-black uppercase">Bust (in)</th>
                    <th className="p-3 font-black uppercase">Waist (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">XS</td><td className="p-3">31-32</td><td className="p-3">24-25</td></tr>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">S</td><td className="p-3">33-34</td><td className="p-3">26-27</td></tr>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">M</td><td className="p-3">35-36</td><td className="p-3">28-29</td></tr>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">L</td><td className="p-3">37-39</td><td className="p-3">30-32</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white sketchy-card border-4 border-black p-8">
            <h2 className="text-3xl font-black uppercase mb-4">Footwear</h2>
            <p className="text-lg font-bold mb-4">Measurements in US sizes. For best fit, measure your foot length and refer to the chart below.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="p-3 font-black uppercase">US Size</th>
                    <th className="p-3 font-black uppercase">EU Size</th>
                    <th className="p-3 font-black uppercase">Foot Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">8</td><td className="p-3">41</td><td className="p-3">9.8</td></tr>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">9</td><td className="p-3">42</td><td className="p-3">10.2</td></tr>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">10</td><td className="p-3">43</td><td className="p-3">10.5</td></tr>
                  <tr className="border-b border-gray-300"><td className="p-3 font-bold">11</td><td className="p-3">44</td><td className="p-3">10.9</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
