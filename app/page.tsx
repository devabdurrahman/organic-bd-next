import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import { mockProducts, mockCategories } from "@/lib/mock-data";

// When connecting to WooCommerce, replace mock data with:
// import { getProducts, getCategories } from "@/lib/woocommerce";

export default async function HomePage() {
  // const products = await getProducts({ per_page: 8, featured: true });
  // const categories = await getCategories({ hide_empty: true, per_page: 6 });
  const products = mockProducts;
  const categories = mockCategories;

  return (
    <>
      <HeroSection />
      <CategoryGrid categories={categories} />
      <FeaturedProducts
        products={products.slice(0, 8)}
        title="জনপ্রিয় পণ্যসমূহ"
        subtitle="আমাদের গ্রাহকদের সবচেয়ে পছন্দের পণ্য"
      />
      <WhyUs />
      <FeaturedProducts
        products={products.filter((p) => p.on_sale).slice(0, 4)}
        title="বিশেষ ছাড়ের পণ্য"
        subtitle="সীমিত সময়ের জন্য বিশেষ মূল্য হ্রাস"
        viewAllHref="/products?on_sale=true"
      />
      <Testimonials />
      <CTABanner />
    </>
  );
}
