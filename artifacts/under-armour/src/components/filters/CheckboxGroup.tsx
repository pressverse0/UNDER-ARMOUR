import { Check } from "lucide-react"

interface CheckboxGroupProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (values: string[]) => void
  columns?: 1 | 2
}

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
}

export default function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  columns = 1,
}: CheckboxGroupProps) {
  return (
    <div>
      <p className="ua-filter-label">{label}</p>
      <div className={columns === 2 ? "grid grid-cols-2 gap-1" : "space-y-1"}>
        {options.map((opt) => {
          const checked = selected.includes(opt)
          return (
            <label key={opt} className="ua-checkbox-label">
              <span className={`ua-checkbox-box ${checked ? "ua-checkbox-checked" : "ua-checkbox-unchecked"}`}>
                {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => onChange(toggle(selected, opt))}
              />
              <span className={`font-bold text-sm ${checked ? "text-black" : "text-gray-700"}`}>{opt}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
