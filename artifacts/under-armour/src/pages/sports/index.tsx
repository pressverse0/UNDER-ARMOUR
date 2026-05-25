import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dumbbell, Trophy, Target, Zap, Flag } from "lucide-react"

import { Link } from "wouter"

import PageLayout from "@/components/layout/page-layout"


export default function SportsPage() {
  const sports = [
    { name: "Basketball", slug: "basketball", icon: Trophy, description: "Court-ready gear for champions" },
    { name: "Football", slug: "football", icon: Target, description: "Dominate the field with pro-level equipment" },
    { name: "Running", slug: "running", icon: Zap, description: "Go the distance with performance gear" },
    { name: "Training", slug: "training", icon: Dumbbell, description: "Gym essentials for serious athletes" },
    { name: "Golf", slug: "golf", icon: Flag, description: "Precision apparel for the course" },
  ]

  return (
    <PageLayout activePage="sports">
      <main className="flex-1 bg-gray-100">

      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
              Sport-Specific <span className="text-red-600">Performance</span>
            </h1>
            <p className="text-xl text-gray-300 font-bold mb-8">
              Engineered for your sport. Designed for your victory. Every detail matters.
            </p>
          </div>
        </div>
      </section>

      {/* Sports Categories Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black uppercase text-black mb-4 tracking-tight">
              Choose Your <span className="text-red-600">Sport</span>
            </h2>
            <div className="sketchy-underline mx-auto" aria-hidden="true"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sports.map((sport, index) => (
              <Link key={index} href={`/sports/${sport.slug}`}>
                <Card className="sketchy-card bg-white border-4 border-black transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <sport.icon className="h-16 w-16 text-red-600 mx-auto" />
                    </div>
                    <h3 className="font-black text-2xl text-black uppercase mb-4">{sport.name}</h3>
                    <p className="text-gray-700 font-bold mb-6">{sport.description}</p>
                    <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black uppercase w-full">
                      Shop {sport.name}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
              Find Your <span className="text-red-600">Perfect Gear</span>
            </h2>
            <p className="text-xl text-gray-300 font-bold">
              Every sport demands different performance. We deliver exactly what you need.
            </p>
            <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-xl px-12 py-6 uppercase tracking-wide">
              Shop All Sports
            </Button>
          </div>
        </div>
      </section>
      </main>
    </PageLayout>
  )
}
