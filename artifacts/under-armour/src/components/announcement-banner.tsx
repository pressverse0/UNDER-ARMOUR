import { useState } from "react"
import { X, Zap } from "lucide-react"
import { Link } from "wouter"

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="bg-red-600 text-white py-2 px-4 text-center relative z-50">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Zap className="h-4 w-4 fill-white animate-pulse flex-shrink-0" />
        <p className="font-black text-sm uppercase tracking-wide">
          Summer Sale — Up to{" "}
          <span className="underline underline-offset-2">40% off</span> selected gear.{" "}
          <Link href="/sale" className="underline font-black hover:text-black transition-colors">
            Shop Sale &rarr;
          </Link>
        </p>
        <Zap className="h-4 w-4 fill-white animate-pulse flex-shrink-0" />
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-black transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
