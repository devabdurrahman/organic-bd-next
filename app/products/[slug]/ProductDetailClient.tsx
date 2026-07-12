"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Star, Minus, Plus, ArrowLeft, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBDT } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import type { WCProduct, WCVariation } from "@/lib/woocommerce";

interface Props {
  product: WCProduct;
  variations: WCVariation[];
  related: WCProduct[];
}

export default function ProductDetailClient({ product, variations, related }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [selectedVariation, setSelectedVariation] = useState<WCVariation | null>(null);

  //const img = product.images[0]?.src ?? "/placeholder.svg";
  const [activeImg, setActiveImg] = useState(product.images[0]?.src ?? "/placeholder.svg");
  const rating = parseFloat(product.average_rating);

  useEffect(() => {
    if (variations.length === 0) return;

    const matched = variations.find((v) =>
      v.attributes?.every(
        (attr) => selectedAttributes[attr.name ?? ""] === attr.option
      )
    );
    setSelectedVariation(matched ?? null);
  }, [selectedAttributes, variations]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link href="/products" className="inline-flex items-center gap-2 text-[#6B7C52] hover:text-[#2D5016] mb-8 transition-colors">
        <ArrowLeft size={16} /> সব পণ্যে ফিরুন
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="flex flex-col gap-4">
          {/* Main image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#F5F0E0]">
            <Image
              src={activeImg}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              // unoptimized
            />
            {product.on_sale && (
              <span className="absolute top-4 left-4 bg-[#E8641A] text-white text-sm font-bold px-3 py-1 rounded-lg">
                বিশেষ ছাড়
              </span>
            )}
          </div>

          {/* Thumbnails — only show if more than 1 image */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(img.src ?? "/placeholder.svg")}
                  className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === (img.src ?? "/placeholder.svg")
                      ? "border-[#2D5016] shadow-md"
                      : "border-[#E8E2CC] hover:border-[#A8D86A]"
                  }`}
                >
                  <Image
                    src={img.src ?? "/placeholder.svg"}
                    alt={img.alt || product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                    // unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-[#7A8C5E] text-sm font-medium uppercase tracking-wide mb-2">
            {product.categories[0]?.name}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D3A1E] mb-4">{product.name}</h1>

          {rating > 0 && (
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className={i < Math.round(rating) ? "fill-[#F5A623] text-[#F5A623]" : "text-[#D4C9A8]"} />
                ))}
              </div>
              <span className="text-sm text-[#6B7C52]">{product.average_rating} ({product.rating_count} টি রিভিউ)</span>
            </div>
          )}
          
          {/*<p className="text-[#4A5E30] leading-relaxed mb-6">{product.description}</p>*/}
          <div 
            className="product-description text-[#4A5E30] leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: product.description }} 
          />

          {/* Variation selectors — only for variable products */}
          {product.type === "variable" && product.attributes && (
            <div className="space-y-4 mb-6">
              {product.attributes
                .filter((attr) => attr.variation)
                .map((attr) => (
                  <div key={attr.id}>
                    <label className="block text-sm font-medium text-[#4A5E30] mb-2">
                      {attr.name}
                      {selectedAttributes[attr.name ?? ""] && (
                        <span className="ml-2 text-[#2D5016] font-semibold">
                          : {selectedAttributes[attr.name ?? ""]}
                        </span>
                      )}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {attr.options?.map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            setSelectedAttributes((prev) => ({
                              ...prev,
                              [attr.name ?? ""]: option,
                            }))
                          }
                          className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-colors ${
                            selectedAttributes[attr.name ?? ""] === option
                              ? "border-[#2D5016] bg-[#E8F5D0] text-[#2D5016]"
                              : "border-[#D4C9A8] text-[#4A5E30] hover:border-[#2D5016]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

              {/* Show matched variation price and stock */}
              {selectedVariation && (
                <div className="bg-[#F5F0E0] rounded-xl p-3 text-sm">
                  <p className="text-[#2D5016] font-semibold">
                    মূল্য: {formatBDT(selectedVariation.price ?? "0")}
                  </p>
                  <p className={selectedVariation.stock_status === "instock" ? "text-green-600" : "text-red-500"}>
                    {selectedVariation.stock_status === "instock" ? "✓ স্টকে আছে" : "✗ স্টক নেই"}
                  </p>
                </div>
              )}

              {/* Warning if not all attributes selected */}
              {product.type === "variable" && !selectedVariation && Object.keys(selectedAttributes).length > 0 && (
                <p className="text-sm text-orange-500">এই কম্বিনেশন পাওয়া যাচ্ছে না</p>
              )}
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-4xl font-bold text-[#2D5016]">{formatBDT(product.price)}</span>
            {product.on_sale && product.regular_price && (
              <>
                <span className="text-xl text-[#9A9A82] line-through">{formatBDT(product.regular_price)}</span>
                <span className="bg-[#FFF0E8] text-[#E8641A] text-sm font-bold px-2 py-0.5 rounded">
                  {Math.round((1 - parseFloat(product.price) / parseFloat(product.regular_price)) * 100)}% ছাড়
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border-2 border-[#D4C9A8] rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-[#F5F0E0] transition-colors">
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-[#F5F0E0] transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => {
                if (product.type === "variable") {
                  if (!selectedVariation) return;
                  addItem(product, qty, selectedVariation);
                } else {
                  addItem(product, qty);
                }
              }}
              disabled={
                product.stock_status === "outofstock" ||
                (product.type === "variable" && !selectedVariation)
              }
              className="flex-1 flex items-center justify-center gap-2 bg-[#2D5016] text-white font-semibold py-3.5 rounded-xl hover:bg-[#3D6B1E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCart size={18} />
              {product.type === "variable" && !selectedVariation
                ? "ভ্যারিয়েশন বেছে নিন"
                : "কার্টে যোগ করুন"}
            </button>
          </div>

          <p className={`text-sm mb-6 ${product.stock_status === "instock" ? "text-green-600" : "text-red-500"}`}>
            {product.stock_status === "instock" ? `✓ স্টকে আছে (${product.stock_quantity ?? "প্রচুর"} টি বাকি)` : "✗ স্টক নেই"}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-[#F5F0E0] rounded-xl p-3">
              <Truck size={18} className="text-[#2D5016]" />
              <span className="text-sm text-[#4A5E30]">সারাদেশে ডেলিভারি</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F5F0E0] rounded-xl p-3">
              <ShieldCheck size={18} className="text-[#2D5016]" />
              <span className="text-sm text-[#4A5E30]">খাঁটি পণ্যের গ্যারান্টি</span>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-[#2D3A1E] mb-6">সম্পর্কিত পণ্য</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}