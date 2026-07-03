"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Tag, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { formatBDT } from "@/lib/woocommerce";
import { getProducts, getCategories } from "@/lib/products";
import type { WCProduct, WCCategory } from "@/lib/woocommerce";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ["BMW", "MERCEDES BENZ", "TESLA", "TOYOTA", "BYD"];

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WCProduct[]>([]);
  const [categoryResults, setCategoryResults] = useState<WCCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const [allProducts, setAllProducts] = useState<WCProduct[]>([]);
  const [allCategories, setAllCategories] = useState<WCCategory[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && allProducts.length === 0) {
      getProducts().then(({ products }) => {
        setAllProducts(products);
      });
      getCategories().then(setAllCategories);
    }
  }, [open, allProducts.length]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
      setCategoryResults([]);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const search = useCallback((q: string) => {
    const trimmed = q.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      setCategoryResults([]);
      return;
    }

    if (allProducts.length === 0) return;

    setLoading(true);

    const matchedProducts = allProducts.filter(
      (p) =>
        p.name?.toLowerCase().includes(trimmed) ||
        p.short_description?.toLowerCase().includes(trimmed) ||
        p.categories?.some((c) => c.name?.toLowerCase().includes(trimmed))
    ).slice(0, 6);

    const matchedCats = allCategories.filter((c) =>
      c.name?.toLowerCase().includes(trimmed)
    );

    setResults(matchedProducts);
    setCategoryResults(matchedCats);
    setLoading(false);
  }, [allProducts, allCategories]);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 200);
    return () => clearTimeout(timer);
  }, [query, search]);

  const handlePopular = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    onClose();
  };

  if (!open) return null;

  const hasResults = results.length > 0 || categoryResults.length > 0;
  const noResults = query.trim() && !loading && !hasResults;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 z-[70] flex justify-center px-4 pt-16 sm:pt-24">
        <div
          className="w-full max-w-2xl bg-[#FAFAF7] rounded-2xl shadow-2xl border border-[#D4C9A8] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[#E8E2CC]">
            <Search size={20} className="text-[#7A8C5E] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="পণ্য খুঁজুন..."
              className="flex-1 bg-transparent text-[#2D3A1E] placeholder:text-[#A8B896] text-base outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-[#9A9A82] hover:text-[#2D3A1E] transition-colors"
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={onClose}
              className="ml-1 text-xs font-medium text-[#7A8C5E] bg-[#F0EBD8] hover:bg-[#E4DCBF] px-2.5 py-1 rounded-md transition-colors border border-[#D4C9A8]"
            >
              ESC
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {/* Default state: popular searches */}
            {!query && (
              <div className="p-5">
                <p className="text-xs font-semibold text-[#7A8C5E] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <TrendingUp size={13} /> জনপ্রিয় খোঁজ
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopular(term)}
                      className="text-sm bg-white border border-[#D4C9A8] text-[#4A5E30] px-3 py-1.5 rounded-full hover:border-[#2D5016] hover:text-[#2D5016] hover:bg-[#E8F5D0] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <p className="text-xs font-semibold text-[#7A8C5E] uppercase tracking-widest mt-6 mb-3 flex items-center gap-2">
                  <Tag size={13} /> সকল বিভাগ
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-2 text-sm text-[#4A5E30] bg-white border border-[#E8E2CC] px-3 py-2 rounded-xl hover:border-[#2D5016] hover:text-[#2D5016] transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-[#A8D86A] rounded-full shrink-0" />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-12 text-[#7A8C5E]">
                <div className="w-5 h-5 border-2 border-[#2D5016] border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 text-sm">খোঁজা হচ্ছে...</span>
              </div>
            )}

            {/* No results */}
            {noResults && (
              <div className="text-center py-12 px-6">
                <Search size={36} className="mx-auto text-[#D4C9A8] mb-3" />
                <p className="font-semibold text-[#2D3A1E] mb-1">
                  &ldquo;{query}&rdquo; এর জন্য কোনো পণ্য পাওয়া যায়নি
                </p>
                <p className="text-sm text-[#7A8C5E]">ভিন্ন শব্দ দিয়ে আবার চেষ্টা করুন</p>
              </div>
            )}

            {/* Results */}
            {!loading && hasResults && (
              <div className="p-3">
                {/* Category results */}
                {categoryResults.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-[#7A8C5E] uppercase tracking-widest px-2 mb-2 flex items-center gap-2">
                      <Tag size={12} /> বিভাগ
                    </p>
                    <div className="flex flex-wrap gap-2 px-2">
                      {categoryResults.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/products?category=${cat.id}`}
                          onClick={handleResultClick}
                          className="flex items-center gap-1.5 text-sm bg-[#E8F5D0] text-[#2D5016] font-medium px-3 py-1.5 rounded-full hover:bg-[#D0ECA8] transition-colors"
                        >
                          {cat.name}
                          <span className="text-xs text-[#5A8030]">({cat.count})</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product results */}
                {results.length > 0 && (
                  <>
                    <p className="text-xs font-semibold text-[#7A8C5E] uppercase tracking-widest px-2 mb-2 mt-3 flex items-center gap-2">
                      <Search size={12} /> পণ্য ({results.length} টি পাওয়া গেছে)
                    </p>
                    <div className="space-y-1">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={handleResultClick}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-[#E8E2CC] transition-all group"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#F0EBD8] shrink-0">
                            {product.images?.[0]?.src ? (
                              <Image
                                src={product.images[0].src}
                                alt={product.images[0].alt ?? product.name ?? "product"}
                                fill
                                className="object-cover"
                                sizes="56px"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#A8B896]">
                                <Search size={16} />
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#2D3A1E] text-sm line-clamp-1 group-hover:text-[#2D5016] transition-colors">
                              {product.name}
                            </p>
                            <p className="text-xs text-[#7A8C5E] mt-0.5 line-clamp-1">
                              {product.categories?.[0]?.name}
                            </p>
                          </div>

                          {/* Price */}
                          <div className="text-right shrink-0">
                            {product.price && (
                              <p className="font-bold text-[#2D5016] text-sm">{formatBDT(product.price)}</p>
                            )}
                            {product.on_sale && product.regular_price && (
                              <p className="text-xs text-[#9A9A82] line-through">{formatBDT(product.regular_price)}</p>
                            )}
                          </div>

                          <ArrowRight size={15} className="text-[#C8D8B0] group-hover:text-[#2D5016] shrink-0 transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {/* View all results link */}
                {results.length > 0 && (
                  <Link
                    href={`/products?search=${encodeURIComponent(query)}`}
                    onClick={handleResultClick}
                    className="flex items-center justify-center gap-2 mt-3 py-2.5 text-sm font-semibold text-[#2D5016] border border-[#A8D86A] rounded-xl hover:bg-[#E8F5D0] transition-colors"
                  >
                    &ldquo;{query}&rdquo; এর সব ফলাফল দেখুন
                    <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}