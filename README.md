# সবুজ মাটি — Organic Bangladesh E-commerce

A full-featured Next.js + TypeScript e-commerce website for selling organic products in Bangladesh, designed to connect with WooCommerce as a headless CMS.

## Features

- 🌿 Bengali + English bilingual content
- 🛒 Full cart functionality with localStorage persistence
- 📦 Product listing, filtering by category & sale status
- 🔍 Product detail pages
- 💳 Checkout with Bangladesh-specific fields (districts, bKash/Nagad/Rocket payment)
- 📱 Fully responsive mobile design
- 🔌 WooCommerce headless-ready API layer

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── products/           # Products listing + detail
│   ├── categories/         # Category browser
│   ├── cart/               # Shopping cart
│   └── checkout/           # Checkout form
├── components/             # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── HeroSection.tsx
│   ├── FeaturedProducts.tsx
│   ├── CategoryGrid.tsx
│   ├── WhyUs.tsx
│   ├── Testimonials.tsx
│   └── CTABanner.tsx
├── context/
│   └── CartContext.tsx     # Global cart state
├── lib/
│   ├── woocommerce.ts      # WooCommerce API client
│   └── mock-data.ts        # Development mock data
└── .env.example            # Environment variable template
```

## Connecting to WooCommerce

1. Copy `.env.example` to `.env.local`
2. Fill in your WooCommerce store URL and API keys
3. In each page, replace `mockProducts` / `mockCategories` with the WooCommerce API calls:

```typescript
// Before (mock):
const products = mockProducts;

// After (WooCommerce):
const products = await getProducts({ per_page: 8, featured: true });
```

### Getting WooCommerce API Keys
1. Go to **WooCommerce > Settings > Advanced > REST API**
2. Click **Add Key**
3. Set permissions to **Read/Write**
4. Copy Consumer Key and Consumer Secret

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
