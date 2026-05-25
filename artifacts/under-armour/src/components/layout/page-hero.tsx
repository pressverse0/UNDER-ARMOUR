interface PageHeroProps {
  title: string
  titleAccent?: string
  subtitle?: string
  badge?: React.ReactNode
  align?: "left" | "center"
  variant?: "full" | "simple"
  children?: React.ReactNode
}

export default function PageHero({
  title,
  titleAccent,
  subtitle,
  badge,
  align = "left",
  variant = "full",
  children,
}: PageHeroProps) {
  const isCenter = align === "center"

  if (variant === "simple") {
    return (
      <section className="relative bg-black text-white py-12 lg:py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""}`}>
            {badge && <div className="mb-4">{badge}</div>}
            <h1 className="text-4xl lg:text-5xl font-black uppercase leading-none tracking-tight mb-4">
              {title}
              {titleAccent && (
                <>
                  {" "}
                  <span className="text-red-600">{titleAccent}</span>
                </>
              )}
            </h1>
            {subtitle && (
              <p className="text-lg text-gray-300 font-bold">{subtitle}</p>
            )}
            {children && <div className="mt-6">{children}</div>}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="ua-hero py-16 lg:py-24">
      <div className="ua-hero-gradient" />
      <div className={`ua-page-container relative z-10 ${isCenter ? "text-center" : ""}`}>
        <div className={`${isCenter ? "mx-auto" : "max-w-3xl"}`}>
          {badge && (
            <div className={`mb-6 ${isCenter ? "flex justify-center" : ""}`}>
              {badge}
            </div>
          )}
          <h1 className="text-5xl lg:text-7xl font-black uppercase leading-none tracking-tight mb-4">
            {title}
            {titleAccent && (
              <>
                {" "}
                <span className="text-red-600">{titleAccent}</span>
              </>
            )}
          </h1>
          {subtitle && (
            <p className={`text-xl text-gray-300 font-bold mb-6 ${isCenter ? "max-w-2xl mx-auto" : ""}`}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
      <div className="ua-hero-divider" />
    </section>
  )
}
