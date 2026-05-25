import { Check } from "lucide-react"
import type { ReactNode } from "react"

interface PillToggleProps {
  label: ReactNode
  isActive: boolean
  onClick: () => void
  variant?: "red" | "black"
  size?: "sm" | "md"
  icon?: ReactNode
  disabled?: boolean
  className?: string
}

export default function PillToggle({
  label,
  isActive,
  onClick,
  variant = "red",
  size = "sm",
  icon,
  disabled = false,
  className = "",
}: PillToggleProps) {
  const sizeClass    = size === "sm" ? "ua-pill-sm" : "ua-pill-md"
  const activeClass  = variant === "black" ? "ua-pill-active-black" : "ua-pill-active"
  const stateClass   = isActive ? activeClass : "ua-pill-inactive"

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`ua-pill ${sizeClass} ${stateClass} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
      {isActive && <Check className="h-3 w-3 shrink-0" />}
    </button>
  )
}
