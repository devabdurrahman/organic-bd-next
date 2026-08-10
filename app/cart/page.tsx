"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBDT } from "@/lib/woocommerce";

export default function CartPage() {
  const { state, removeItem, updateQty, totalPrice, totalItems } = useCart();
  const items = state.items;
  const shippingFee = totalPrice >= 999 ? 0 : 80;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-[#D4C9A8] mb-5" />
        <h2 className="text-2xl font-bold text-[#2D3A1E] mb-2">Your cart is empty</h2>
        <p className="text-[#6B7C52] mb-8">No products added yet</p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-[#2D5016] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#3D6B1E] transition-colors">
          View the product <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#2D3A1E] mb-8">
        Your cart ({totalItems} products)
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white rounded-2xl border border-[#E8E2CC] p-4 flex gap-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={product.images[0]?.src ?? "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  // unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`} className="font-semibold text-[#2D3A1E] hover:text-[#2D5016] line-clamp-2">
                  {product.name}
                </Link>
                <p className="text-sm text-[#7A8C5E] mt-0.5">{product.categories[0]?.name}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-[#D4C9A8] rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(product.id, quantity - 1)} className="px-2.5 py-1.5 hover:bg-[#F5F0E0] transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <button onClick={() => updateQty(product.id, quantity + 1)} className="px-2.5 py-1.5 hover:bg-[#F5F0E0] transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#2D5016]">
                      {formatBDT(parseFloat(product.price) * quantity)}
                    </span>
                    <button onClick={() => removeItem(product.id)} className="text-[#C04020] hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[#E8E2CC] p-6 sticky top-24">
            <h2 className="font-bold text-[#2D3A1E] text-lg mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm text-[#4A5E30]">
                <span>Subtotal</span>
                <span>{formatBDT(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#4A5E30]">
                <span>Delivery charge</span>
                <span className={shippingFee === 0 ? "text-green-600 font-medium" : ""}>
                  {shippingFee === 0 ? "for free" : formatBDT(shippingFee)}
                </span>
              </div>
              {shippingFee > 0 && (
                <p className="text-xs text-[#7A8C5E] bg-[#F5F0E0] rounded-lg p-2">
                  Get free delivery on purchases of ৳999 or more
                </p>
              )}
              <div className="border-t border-[#E8E2CC] pt-3 flex justify-between font-bold text-[#2D3A1E]">
                <span>Total</span>
                <span className="text-[#2D5016] text-lg">{formatBDT(totalPrice + shippingFee)}</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="flex gap-2 mb-5">
              <input
                type="text"
                placeholder="কুপন কোড"
                className="flex-1 border border-[#D4C9A8] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2D5016]"
              />
              <button className="bg-[#F5F0E0] text-[#2D5016] font-semibold text-sm px-3 py-2 rounded-lg hover:bg-[#EBE5CC] transition-colors">
                Apply
              </button>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-[#2D5016] text-white font-bold py-3.5 rounded-xl hover:bg-[#3D6B1E] transition-colors"
            >
              Checkout <ArrowRight size={18} />
            </Link>
            <Link href="/products" className="block text-center text-sm text-[#6B7C52] mt-3 hover:text-[#2D5016] transition-colors">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
