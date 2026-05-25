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
  const sizeClass = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"

  const activeClass =
    variant === "black"
      ? "bg-black text-white border-black shadow-sm"
      : "bg-red-600 text-white border-red-600 shadow-sm"

  const inactiveClass =
    "bg-white text-gray-700 border-gray-300 hover:border-red-400 hover:text-red-600"

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-1.5 font-black uppercase border-2 rounded-full
        transition-all duration-150 cursor-pointer select-none
        disabled:opacity-40 disabled:cursor-not-allowed
        ${sizeClass}
        ${isActive ? activeClass : inactiveClass}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
      {isActive && <Check className="h-3 w-3 shrink-0" />}
    </button>
  )
}
