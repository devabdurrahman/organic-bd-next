import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import { mockProducts, mockCategories } from "@/lib/mock-data";
import { getProducts, getCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "জৈব পণ্যের অনলাইন দোকান",
  description:
    "বাংলাদেশের সেরা জৈব ও প্রাকৃতিক খাদ্যপণ্যের অনলাইন শপ।",
  keywords: ["organic food", "organic ecommerce", "জৈব", "organic", "bangladesh", "natural food", "কৃষি"],
  openGraph: {
    title: "জৈব পণ্যের অনলাইন দোকান",
    description:
    "বাংলাদেশের সেরা জৈব ও প্রাকৃতিক খাদ্যপণ্যের অনলাইন শপ।",
    siteName: "Organic Ecommerce Store",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "জৈব পণ্যের অনলাইন দোকান",
    description:
    "বাংলাদেশের সেরা জৈব ও প্রাকৃতিক খাদ্যপণ্যের অনলাইন শপ।",
    creator: "@devabdurrahman",
  },
  robots:{
    index: true,
    follow: true,
    nocache: false,
    googlBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// When connecting to WooCommerce, replace mock data with:
// import { getProducts, getCategories } from "@/lib/woocommerce";

export default async function HomePage() {
  const {products} = await getProducts();
  const categories = await getCategories();
  // const products = mockProducts;
  //const categories = mockCategories;

  return (
    <>
      <HeroSection />
      <CategoryGrid categories={categories} />
      <FeaturedProducts
        products={products.slice(0, 17)}
        title="জনপ্রিয় পণ্যসমূহ"
        subtitle="আমাদের গ্রাহকদের সবচেয়ে পছন্দের পণ্য"
      />
      <WhyUs />
      <FeaturedProducts
        // products={products.filter((p) => p.on_sale).slice(0, 4)}
        products={products.slice(0, 7)}
        title="বিশেষ ছাড়ের পণ্য"
        subtitle="সীমিত সময়ের জন্য বিশেষ মূল্য হ্রাস"
        viewAllHref="/products?on_sale=true"
      />
      <Testimonials />
      <CTABanner />
    </>
  );
}
