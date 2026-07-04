export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="h-8 w-48 bg-[#E8E2CC] rounded-lg animate-pulse mb-8" />
      <div className="flex gap-8">
        <div className="w-56 shrink-0">
          <div className="bg-[#E8E2CC] rounded-2xl h-64 animate-pulse" />
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E8E2CC] overflow-hidden">
              <div className="aspect-square bg-[#E8E2CC] animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-[#E8E2CC] rounded animate-pulse w-1/2" />
                <div className="h-4 bg-[#E8E2CC] rounded animate-pulse" />
                <div className="h-4 bg-[#E8E2CC] rounded animate-pulse w-3/4" />
                <div className="h-8 bg-[#E8E2CC] rounded-lg animate-pulse mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}