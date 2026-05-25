import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const changePage = (n: number) => {
    onPageChange(n)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2 py-10">
      <button
        onClick={() => changePage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2.5 border-2 border-gray-300 rounded-xl disabled:opacity-40 hover:border-red-500 hover:text-red-600 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {pages.map((n) => (
        <button
          key={n}
          onClick={() => changePage(n)}
          aria-current={currentPage === n ? "page" : undefined}
          className={`w-10 h-10 font-black rounded-xl border-2 transition-colors text-sm ${
            currentPage === n
              ? "bg-red-600 text-white border-red-600 shadow-md"
              : "border-gray-300 hover:border-red-500 hover:text-red-600 text-black"
          }`}
        >
          {n}
        </button>
      ))}

      <button
        onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2.5 border-2 border-gray-300 rounded-xl disabled:opacity-40 hover:border-red-500 hover:text-red-600 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
