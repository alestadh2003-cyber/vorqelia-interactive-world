# VORQELIA — Hydrogen Interactive Commerce

This is the new storefront direction: React + Shopify Hydrogen + Storefront API + Three.js / React Three Fiber.

## Important
- This replaces the previous Shopify Theme-first experience. It is **not a Liquid theme**.
- The old 123 image is intentionally NOT included.
- Put the approved new character asset at `public/assets/character-123/character.png` when ready.
- Product data is designed to come from Shopify Storefront API.
- Shopify remains the commerce backend; this project is the custom frontend.

## Setup
1. Install Node.js 20+.
2. Install dependencies: `npm install`.
3. Copy `.env.example` to `.env` and add the Storefront API public credentials.
4. Run `npm run dev`.

The next implementation phase should connect the current Shopify catalog, then add real 123 pose/state assets and the product-hand attachment system.
