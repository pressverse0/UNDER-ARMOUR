import { Target, Zap, Award, LucideIcon } from "lucide-react"

export interface Category {
  label: string
  href: string
  image: string
  desc: string
}

export interface MissionItem {
  icon: LucideIcon
  title: string
  desc: string
}

export interface Testimonial {
  quote: string
  author: string
  sport: string
  rating: number
}

export interface HeroStat {
  value: string
  label: string
}

export const categories: Category[] = [
  { label: "Men",        href: "/men",         image: "/intense-athlete-training-sketch.png", desc: "Training & Footwear" },
  { label: "Women",      href: "/women",        image: "/athletic-gear-display.png",           desc: "Performance Gear" },
  { label: "Kids",       href: "/kids",         image: "/intense-athlete-training-sketch.png", desc: "Ages 3–16" },
  { label: "Shoes",      href: "/shoes",        image: "/athletic-gear-display.png",           desc: "HOVR & Charged" },
  { label: "Sports",     href: "/sports",       image: "/intense-athlete-training-sketch.png", desc: "Shop by Sport" },
  { label: "Accessories",href: "/accessories",  image: "/athletic-gear-display.png",           desc: "Complete Your Kit" },
]

export const missionItems: MissionItem[] = [
  { icon: Target, title: "Precision",  desc: "Every detail engineered for peak performance" },
  { icon: Zap,    title: "Power",      desc: "Unleash your potential with cutting-edge technology" },
  { icon: Award,  title: "Excellence", desc: "Champions choose Under Armour for a reason" },
]

export const testimonials: Testimonial[] = [
  { quote: "Under Armour doesn't just make gear. They make warriors.", author: "Sarah M.",  sport: "CrossFit Athlete",   rating: 5 },
  { quote: "When the game is on the line, I trust Under Armour.",      author: "Marcus J.", sport: "Basketball Player",   rating: 5 },
  { quote: "Every mile, every rep, every drop of sweat — UA is with me.", author: "Elena R.", sport: "Marathon Runner",  rating: 5 },
]

export const heroStats: HeroStat[] = [
  { value: "500+", label: "Products" },
  { value: "4.7★", label: "Avg Rating" },
  { value: "Free", label: "Ship over $50" },
]
