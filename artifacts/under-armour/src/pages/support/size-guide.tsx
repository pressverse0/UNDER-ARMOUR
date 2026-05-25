import { useState } from "react"
import { Ruler, Info } from "lucide-react"
import { Link } from "wouter"
import PageLayout from "@/components/layout/page-layout"

type Tab = 'mens' | 'womens' | 'kids' | 'footwear'

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<Tab>('mens')
  const [unit, setUnit] = useState<'in' | 'cm'>('in')

  const convert = (val: string) => {
    if (unit === 'in') return val
    return val.split('-').map(v => Math.round(parseFloat(v) * 2.54)).join('-')
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'mens', label: "Men's" },
    { key: 'womens', label: "Women's" },
    { key: 'kids', label: "Kids'" },
    { key: 'footwear', label: "Footwear" },
  ]

  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-black uppercase mb-4">
            Size <span className="text-red-600">Guide</span>
          </h1>
          <p className="text-xl text-gray-300 font-bold max-w-2xl mx-auto">
            Find your perfect fit with our comprehensive size charts.
          </p>
        </div>
      </section>

      {/* How to Measure Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 flex items-center gap-3 justify-center">
          <Ruler className="h-5 w-5 flex-shrink-0" />
          <p className="font-bold text-sm uppercase">
            Pro tip: Measure yourself in just your underwear, standing straight, for the most accurate results.
          </p>
        </div>
      </div>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Tabs + Unit Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex gap-2 bg-white border-4 border-black p-1">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`font-black uppercase text-sm px-5 py-2 transition-colors ${activeTab === tab.key ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 bg-white border-4 border-black p-1">
              <button
                onClick={() => setUnit('in')}
                className={`font-black uppercase text-sm px-4 py-2 transition-colors ${unit === 'in' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`font-black uppercase text-sm px-4 py-2 transition-colors ${unit === 'cm' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Men's Tables */}
          {activeTab === 'mens' && (
            <div className="space-y-8">
              <div className="bg-white sketchy-card border-4 border-black p-6">
                <h2 className="text-2xl font-black uppercase mb-4">Men's Apparel</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-black bg-gray-50">
                        <th className="p-3 font-black uppercase">Size</th>
                        <th className="p-3 font-black uppercase">Chest ({unit})</th>
                        <th className="p-3 font-black uppercase">Waist ({unit})</th>
                        <th className="p-3 font-black uppercase">Hip ({unit})</th>
                        <th className="p-3 font-black uppercase">Neck ({unit})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: "XS", chest: "32-34", waist: "26-28", hip: "33-35", neck: "14-14.5" },
                        { size: "S", chest: "35-37", waist: "29-31", hip: "36-38", neck: "14.5-15" },
                        { size: "M", chest: "38-40", waist: "32-34", hip: "39-41", neck: "15-15.5" },
                        { size: "L", chest: "42-44", waist: "36-38", hip: "43-45", neck: "16-16.5" },
                        { size: "XL", chest: "46-48", waist: "40-42", hip: "47-49", neck: "17-17.5" },
                        { size: "2XL", chest: "50-52", waist: "44-46", hip: "51-53", neck: "18-18.5" },
                        { size: "3XL", chest: "54-56", waist: "48-50", hip: "55-57", neck: "19-19.5" },
                      ].map(row => (
                        <tr key={row.size} className="border-b border-gray-200 hover:bg-red-50 transition-colors">
                          <td className="p-3 font-black">{row.size}</td>
                          <td className="p-3">{convert(row.chest)}</td>
                          <td className="p-3">{convert(row.waist)}</td>
                          <td className="p-3">{convert(row.hip)}</td>
                          <td className="p-3">{convert(row.neck)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white sketchy-card border-4 border-black p-6">
                <h2 className="text-2xl font-black uppercase mb-4">Men's Bottoms (Inseam)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-black bg-gray-50">
                        <th className="p-3 font-black uppercase">Waist Size</th>
                        <th className="p-3 font-black uppercase">Inseam S ({unit})</th>
                        <th className="p-3 font-black uppercase">Inseam R ({unit})</th>
                        <th className="p-3 font-black uppercase">Inseam L ({unit})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { waist: "28-29", s: "28", r: "30", l: "32" },
                        { waist: "30-31", s: "28", r: "30", l: "32" },
                        { waist: "32-33", s: "28", r: "30", l: "32" },
                        { waist: "34-35", s: "28", r: "30", l: "32" },
                        { waist: "36-38", s: "28", r: "30", l: "32" },
                      ].map(row => (
                        <tr key={row.waist} className="border-b border-gray-200 hover:bg-red-50 transition-colors">
                          <td className="p-3 font-black">{row.waist}"</td>
                          <td className="p-3">{convert(row.s)}"</td>
                          <td className="p-3">{convert(row.r)}"</td>
                          <td className="p-3">{convert(row.l)}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Women's Tables */}
          {activeTab === 'womens' && (
            <div className="space-y-8">
              <div className="bg-white sketchy-card border-4 border-black p-6">
                <h2 className="text-2xl font-black uppercase mb-4">Women's Apparel</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-black bg-gray-50">
                        <th className="p-3 font-black uppercase">Size</th>
                        <th className="p-3 font-black uppercase">US Size</th>
                        <th className="p-3 font-black uppercase">Bust ({unit})</th>
                        <th className="p-3 font-black uppercase">Waist ({unit})</th>
                        <th className="p-3 font-black uppercase">Hip ({unit})</th>
                        <th className="p-3 font-black uppercase">Inseam ({unit})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: "XS", us: "0-2", bust: "31-32", waist: "24-25", hip: "33-34", inseam: "28-30" },
                        { size: "S", us: "4-6", bust: "33-34", waist: "26-27", hip: "35-36", inseam: "28-30" },
                        { size: "M", us: "8-10", bust: "35-36", waist: "28-29", hip: "37-39", inseam: "28-30" },
                        { size: "L", us: "12-14", bust: "37-39", waist: "30-32", hip: "40-42", inseam: "28-30" },
                        { size: "XL", us: "16-18", bust: "40-42", waist: "33-35", hip: "43-45", inseam: "28-30" },
                        { size: "1X", us: "14W-16W", bust: "42-44", waist: "36-38", hip: "46-48", inseam: "28-30" },
                        { size: "2X", us: "18W-20W", bust: "46-48", waist: "40-42", hip: "50-52", inseam: "28-30" },
                      ].map(row => (
                        <tr key={row.size} className="border-b border-gray-200 hover:bg-red-50 transition-colors">
                          <td className="p-3 font-black">{row.size}</td>
                          <td className="p-3">{row.us}</td>
                          <td className="p-3">{convert(row.bust)}</td>
                          <td className="p-3">{convert(row.waist)}</td>
                          <td className="p-3">{convert(row.hip)}</td>
                          <td className="p-3">{convert(row.inseam)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white sketchy-card border-4 border-black p-6">
                <h2 className="text-2xl font-black uppercase mb-4">Sports Bra Sizing</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-black bg-gray-50">
                        <th className="p-3 font-black uppercase">Size</th>
                        <th className="p-3 font-black uppercase">Band ({unit})</th>
                        <th className="p-3 font-black uppercase">Cup Range</th>
                        <th className="p-3 font-black uppercase">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: "XS", band: "26-28", cup: "A/B", best: "Low–Medium Impact" },
                        { size: "S", band: "29-31", cup: "A/B/C", best: "Low–Medium Impact" },
                        { size: "M", band: "32-34", cup: "B/C/D", best: "Medium–High Impact" },
                        { size: "L", band: "35-37", cup: "C/D/DD", best: "High Impact" },
                        { size: "XL", band: "38-40", cup: "D/DD/DDD", best: "High Impact" },
                      ].map(row => (
                        <tr key={row.size} className="border-b border-gray-200 hover:bg-red-50 transition-colors">
                          <td className="p-3 font-black">{row.size}</td>
                          <td className="p-3">{convert(row.band)}</td>
                          <td className="p-3">{row.cup}</td>
                          <td className="p-3">{row.best}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Kids' Tables */}
          {activeTab === 'kids' && (
            <div className="space-y-8">
              <div className="bg-white sketchy-card border-4 border-black p-6">
                <h2 className="text-2xl font-black uppercase mb-4">Boys' Sizing</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-black bg-gray-50">
                        <th className="p-3 font-black uppercase">Size</th>
                        <th className="p-3 font-black uppercase">Age</th>
                        <th className="p-3 font-black uppercase">Height ({unit === 'in' ? 'in' : 'cm'})</th>
                        <th className="p-3 font-black uppercase">Chest ({unit})</th>
                        <th className="p-3 font-black uppercase">Waist ({unit})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: "4", age: "3-4 yrs", height: "39-42", chest: "21-22", waist: "20-21" },
                        { size: "5", age: "4-5 yrs", height: "42-45", chest: "22-23", waist: "21-22" },
                        { size: "6", age: "5-6 yrs", height: "45-48", chest: "23-24", waist: "22-23" },
                        { size: "8", age: "7-8 yrs", height: "50-52", chest: "26-27", waist: "23-24" },
                        { size: "10", age: "9-10 yrs", height: "54-56", chest: "28-29", waist: "25-26" },
                        { size: "12", age: "11-12 yrs", height: "58-60", chest: "30-32", waist: "27-28" },
                        { size: "14/16", age: "13-14 yrs", height: "62-65", chest: "33-35", waist: "29-30" },
                      ].map(row => (
                        <tr key={row.size} className="border-b border-gray-200 hover:bg-red-50 transition-colors">
                          <td className="p-3 font-black">{row.size}</td>
                          <td className="p-3">{row.age}</td>
                          <td className="p-3">{convert(row.height)}</td>
                          <td className="p-3">{convert(row.chest)}</td>
                          <td className="p-3">{convert(row.waist)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white sketchy-card border-4 border-black p-6">
                <h2 className="text-2xl font-black uppercase mb-4">Girls' Sizing</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-black bg-gray-50">
                        <th className="p-3 font-black uppercase">Size</th>
                        <th className="p-3 font-black uppercase">Age</th>
                        <th className="p-3 font-black uppercase">Height ({unit === 'in' ? 'in' : 'cm'})</th>
                        <th className="p-3 font-black uppercase">Chest ({unit})</th>
                        <th className="p-3 font-black uppercase">Waist ({unit})</th>
                        <th className="p-3 font-black uppercase">Hip ({unit})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: "4", age: "3-4 yrs", height: "38-41", chest: "21-22", waist: "20-21", hip: "22-23" },
                        { size: "5", age: "4-5 yrs", height: "41-44", chest: "22-23", waist: "21-22", hip: "23-24" },
                        { size: "6", age: "5-6 yrs", height: "44-47", chest: "23-24", waist: "22-23", hip: "24-25" },
                        { size: "8", age: "7-8 yrs", height: "49-52", chest: "25-26", waist: "23-24", hip: "27-28" },
                        { size: "10", age: "9-10 yrs", height: "53-55", chest: "27-28", waist: "24-25", hip: "29-30" },
                        { size: "12", age: "11-12 yrs", height: "57-59", chest: "29-31", waist: "25-26", hip: "32-33" },
                        { size: "14/16", age: "13-14 yrs", height: "61-63", chest: "32-34", waist: "27-28", hip: "35-37" },
                      ].map(row => (
                        <tr key={row.size} className="border-b border-gray-200 hover:bg-red-50 transition-colors">
                          <td className="p-3 font-black">{row.size}</td>
                          <td className="p-3">{row.age}</td>
                          <td className="p-3">{convert(row.height)}</td>
                          <td className="p-3">{convert(row.chest)}</td>
                          <td className="p-3">{convert(row.waist)}</td>
                          <td className="p-3">{convert(row.hip)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Footwear */}
          {activeTab === 'footwear' && (
            <div className="space-y-8">
              <div className="bg-white sketchy-card border-4 border-black p-6">
                <h2 className="text-2xl font-black uppercase mb-4">Men's Footwear</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-black bg-gray-50">
                        <th className="p-3 font-black uppercase">US Men</th>
                        <th className="p-3 font-black uppercase">US Women</th>
                        <th className="p-3 font-black uppercase">UK</th>
                        <th className="p-3 font-black uppercase">EU</th>
                        <th className="p-3 font-black uppercase">Foot Length ({unit})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { us: "7", usW: "8.5", uk: "6", eu: "40", length: "9.6" },
                        { us: "8", usW: "9.5", uk: "7", eu: "41", length: "9.9" },
                        { us: "9", usW: "10.5", uk: "8", eu: "42", length: "10.2" },
                        { us: "10", usW: "11.5", uk: "9", eu: "43", length: "10.6" },
                        { us: "11", usW: "12.5", uk: "10", eu: "44", length: "10.9" },
                        { us: "12", usW: "13.5", uk: "11", eu: "45", length: "11.2" },
                        { us: "13", usW: "14.5", uk: "12", eu: "46", length: "11.6" },
                      ].map(row => (
                        <tr key={row.us} className="border-b border-gray-200 hover:bg-red-50 transition-colors">
                          <td className="p-3 font-black">{row.us}</td>
                          <td className="p-3">{row.usW}</td>
                          <td className="p-3">{row.uk}</td>
                          <td className="p-3">{row.eu}</td>
                          <td className="p-3">{unit === 'cm' ? (parseFloat(row.length) * 2.54).toFixed(1) : row.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white sketchy-card border-4 border-black p-6">
                <h2 className="text-2xl font-black uppercase mb-4">Kids' Footwear</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-black bg-gray-50">
                        <th className="p-3 font-black uppercase">US</th>
                        <th className="p-3 font-black uppercase">EU</th>
                        <th className="p-3 font-black uppercase">Age</th>
                        <th className="p-3 font-black uppercase">Foot Length ({unit})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { us: "3.5Y", eu: "35.5", age: "5-6 yrs", length: "8.5" },
                        { us: "4Y", eu: "36", age: "6-7 yrs", length: "8.75" },
                        { us: "4.5Y", eu: "36.5", age: "7 yrs", length: "9.0" },
                        { us: "5Y", eu: "37.5", age: "7-8 yrs", length: "9.25" },
                        { us: "5.5Y", eu: "38", age: "8 yrs", length: "9.5" },
                        { us: "6Y", eu: "38.5", age: "8-9 yrs", length: "9.75" },
                        { us: "7Y", eu: "40", age: "10-11 yrs", length: "10.0" },
                      ].map(row => (
                        <tr key={row.us} className="border-b border-gray-200 hover:bg-red-50 transition-colors">
                          <td className="p-3 font-black">{row.us}</td>
                          <td className="p-3">{row.eu}</td>
                          <td className="p-3">{row.age}</td>
                          <td className="p-3">{unit === 'cm' ? (parseFloat(row.length) * 2.54).toFixed(1) : row.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tip box */}
          <div className="mt-8 bg-white border-4 border-black p-6 flex gap-4">
            <Info className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-black uppercase mb-2">Fit Tip</h3>
              <p className="font-bold text-gray-700 text-sm">
                UA compression products (HeatGear, ColdGear) are designed to fit snug. If you prefer a looser feel, size up one. For outerwear and shorts, stick to your regular measurements.
                Still unsure? Our <Link href="/support/contact" className="text-red-600 hover:underline">support team</Link> can help you find the right fit.
              </p>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}
