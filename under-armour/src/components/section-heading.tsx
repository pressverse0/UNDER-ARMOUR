interface SectionHeadingProps {
  title: string
  accent: string
  id?: string
  centered?: boolean
  dark?: boolean
  noUnderline?: boolean
  className?: string
}

export default function SectionHeading({
  title,
  accent,
  id,
  centered = true,
  dark = false,
  noUnderline = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""} mb-12 ${className}`}>
      <h2
        id={id}
        className={`ua-section-heading mb-4 ${dark ? "text-white" : "text-black"}`}
      >
        {title} <span className="text-red-600">{accent}</span>
      </h2>
      {!noUnderline && (
        <div className={`sketchy-underline ${centered ? "mx-auto" : ""}`} />
      )}
    </div>
  )
}
