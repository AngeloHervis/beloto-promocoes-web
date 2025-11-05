export default function BuscaLoading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-64 bg-slate-200 animate-pulse rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-square bg-slate-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-slate-200 animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-slate-200 animate-pulse rounded" />
              <div className="h-6 w-1/2 bg-slate-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
