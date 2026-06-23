import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // e.g. "/products?category=bumpers"
}

export default function Pagination({ currentPage, totalPages, baseUrl }: Props) {
  if (totalPages <= 1) return null;

  const getUrl = (page: number) => `${baseUrl}&page=${page}`;

  // Generate page numbers to show — always show first, last, current and neighbours
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={getUrl(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#D4C9A8] text-[#4A5E30] hover:border-[#2D5016] hover:text-[#2D5016] transition-colors text-sm"
        >
          <ChevronLeft size={16} /> আগের
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#E8E2CC] text-[#C0C0A8] text-sm cursor-not-allowed">
          <ChevronLeft size={16} /> আগের
        </span>
      )}

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-[#9A9A82]">...</span>
        ) : (
          <Link
            key={p}
            href={getUrl(p)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors border ${
              p === currentPage
                ? "bg-[#2D5016] text-white border-[#2D5016]"
                : "border-[#D4C9A8] text-[#4A5E30] hover:border-[#2D5016] hover:text-[#2D5016]"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={getUrl(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#D4C9A8] text-[#4A5E30] hover:border-[#2D5016] hover:text-[#2D5016] transition-colors text-sm"
        >
          পরের <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#E8E2CC] text-[#C0C0A8] text-sm cursor-not-allowed">
          পরের <ChevronRight size={16} />
        </span>
      )}
    </div>
  );
}