export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="h-4 w-32 bg-[#E8E2CC] rounded animate-pulse mb-8" />
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-[#E8E2CC] rounded-3xl animate-pulse" />
        <div className="space-y-4">
          <div className="h-3 w-24 bg-[#E8E2CC] rounded animate-pulse" />
          <div className="h-8 bg-[#E8E2CC] rounded animate-pulse" />
          <div className="h-8 w-3/4 bg-[#E8E2CC] rounded animate-pulse" />
          <div className="h-4 bg-[#E8E2CC] rounded animate-pulse" />
          <div className="h-4 bg-[#E8E2CC] rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-[#E8E2CC] rounded animate-pulse" />
          <div className="h-12 bg-[#E8E2CC] rounded-xl animate-pulse mt-6" />
        </div>
      </div>
    </div>
  );
}