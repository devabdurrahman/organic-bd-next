"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Leaf, Search, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchModal from "@/components/SearchModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinks = [
    { href: "/", label: "হোম" },
    { href: "/products", label: "পণ্যসমূহ" },
    { href: "/categories", label: "বিভাগ" },
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/contact", label: "যোগাযোগ" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FAFAF7] border-b border-[#D4C9A8]">
        {/* Top bar */}
        <div className="bg-[#2D5016] text-[#E8F5D0] text-sm py-2">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Phone size={13} />
              ০১৭০০-০০০০০০ | সারাদেশে ডেলিভারি
            </span>
            <span className="hidden sm:block">🌿 ১০০% প্রাকৃতিক ও জৈব পণ্য</span>
          </div>
        </div>

        {/* Main nav */}
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#2D5016] rounded-full flex items-center justify-center group-hover:bg-[#3D6B1E] transition-colors">
              <Leaf size={18} className="text-[#A8D86A]" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[#2D5016] text-lg tracking-tight">সবুজ মাটি</div>
              <div className="text-[#7A8C5E] text-xs">Organic Bangladesh</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[#3D3D2E] hover:text-[#2D5016] font-medium transition-colors text-sm"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search button — desktop */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 text-[#6B7C52] hover:text-[#2D5016] transition-colors group"
              aria-label="পণ্য খুঁজুন"
            >
              <Search size={18} />
            </button>

            {/* Search button — mobile (also visible) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="sm:hidden flex items-center text-[#6B7C52] hover:text-[#2D5016] transition-colors"
              aria-label="পণ্য খুঁজুন"
            >
              <Search size={18} />
            </button>

            <Link
              href="/cart"
              className="relative flex items-center gap-1 bg-[#2D5016] text-white px-3 py-2 rounded-lg hover:bg-[#3D6B1E] transition-colors"
            >
              <ShoppingCart size={17} />
              <span className="text-sm font-medium hidden sm:block">কার্ট</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E8641A] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-[#2D5016]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#FAFAF7] border-t border-[#D4C9A8] px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[#3D3D2E] hover:text-[#2D5016] font-medium py-1 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Search Modal — rendered outside header to escape stacking context */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
