export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#D4C9A8] border-t-[#2D5016] rounded-full animate-spin" />
        <p className="text-[#7A8C5E] text-sm font-medium">লোড হচ্ছে...</p>
      </div>
    </div>
  );
}