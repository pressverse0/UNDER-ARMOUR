import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton({ imageHeight = 200 }: { imageHeight?: number }) {
  return (
    <div
      className="bg-white border-4 border-gray-200 rounded-lg overflow-hidden flex flex-col"
      style={{ transform: "rotate(-0.3deg)" }}
      aria-hidden="true"
    >
      <Skeleton className="w-full rounded-none" style={{ height: imageHeight }} />
      <div className="p-4 flex flex-col gap-3 flex-1">
        <Skeleton className="h-4 w-14 rounded" />
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-3 w-3 rounded-full" />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-auto pt-2">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <Skeleton className="h-9 w-full rounded mt-1" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8, imageHeight = 200 }: { count?: number; imageHeight?: number }) {
  return (
    <div className="ua-product-grid">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} imageHeight={imageHeight} />
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100" aria-busy="true" aria-label="Loading page">
      <div className="bg-black h-16 w-full" />
      <div className="bg-black h-64 w-full flex items-end pb-0">
        <div className="container mx-auto px-4 pb-10 space-y-3">
          <Skeleton className="h-4 w-24 bg-gray-700" />
          <Skeleton className="h-10 w-64 bg-gray-700" />
          <Skeleton className="h-4 w-48 bg-gray-700" />
        </div>
      </div>
      <div className="bg-white h-14 border-b-4 border-gray-200" />
      <div className="container mx-auto px-4 py-12">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="bg-black w-full py-16 px-4">
      <div className="container mx-auto space-y-4">
        <Skeleton className="h-4 w-24 bg-gray-700" />
        <Skeleton className="h-12 w-80 bg-gray-700" />
        <Skeleton className="h-5 w-60 bg-gray-700" />
      </div>
    </div>
  )
}
