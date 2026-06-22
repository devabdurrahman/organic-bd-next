"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { WCProduct } from "@/lib/woocommerce";
import { formatBDT } from "@/lib/woocommerce";


interface Props {
  product: WCProduct;
}

export default function ProductCard({ product }: Props) {
  // console.log(product);
  const { addItem } = useCart();

  const img = product.images?.[0]?.src;
  const rating = parseFloat(product.average_rating); 
  // console.log(product.images?.[0]?.src);

  if(img){
    return (
      <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2CC] hover:border-[#A8D86A] hover:shadow-lg transition-all duration-300">
        {/* Image */}
        <Link href={`/products/${product.slug}`} className="block relative overflow-hidden aspect-square">
          <Image
            src={product.images?.[0]?.src || '/placeholder.jpg'}
            alt={product.images[0]?.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized  // ← add this temporarily to rule out optimizer issues
          />
          {product.on_sale && (
            <span className="absolute top-3 left-3 bg-[#E8641A] text-white text-xs font-bold px-2 py-1 rounded-md">
              অফার
            </span>
          )}
          {product.stock_status === "outofstock" && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-[#3D3D2E] text-sm font-semibold px-3 py-1 rounded-full">
                স্টক শেষ
              </span>
            </div>
          )}
        </Link>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-[#7A8C5E] mb-1 font-medium uppercase tracking-wide">
            {product.categories[0]?.name}
          </p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-[#2D3A1E] text-base leading-snug mb-2 hover:text-[#2D5016] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < Math.round(rating) ? "fill-[#F5A623] text-[#F5A623]" : "text-[#D4C9A8]"}
                />
              ))}
              <span className="text-xs text-[#7A8C5E] ml-1">({product.rating_count})</span>
            </div>
          )}

          {/* Price + Cart */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[#2D5016] font-bold text-lg">{formatBDT(product.price)}</span>
              {product.on_sale && product.regular_price && (
                <span className="text-[#9A9A82] line-through text-sm ml-2">
                  {formatBDT(product.regular_price)}
                </span>
              )}
            </div>
            <button
              onClick={() => addItem(product)}
              disabled={product.stock_status === "outofstock"}
              className="flex items-center gap-1.5 bg-[#2D5016] text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-[#3D6B1E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCart size={15} />
              <span className="hidden sm:inline">যোগ করুন</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
