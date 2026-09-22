# FLOALIVING Storefront

Phase 1 custom storefront foundation for FLOALIVING.

## Stack
- Next.js App Router
- TypeScript
- Responsive custom UI
- EN/NL localized routes
- Shopify-compatible Product → Option → Variant → SKU model
- Mock commerce adapter ready to replace with Shopify Storefront API / Storefront Web Components

## Local development
```bash
npm install
npm run dev
```
Then open `http://localhost:3000/en`.

## Public URL model
- `/en`, `/nl`
- `/en/robes`, `/nl/badjassen`
- `/en/towels`, `/nl/handdoeken`
- `/en/robes/[slug]`, `/nl/badjassen/[slug]`
- `/en/our-world`, `/nl/ons-verhaal`
- `/en/journal`, `/nl/journal`

The public frontend intentionally does not expose Shopify `/products`, `/collections`, or `/pages` paths.

## Shopify integration boundary
Replace `lib/commerce.ts` with a Shopify-backed implementation while keeping the UI component API stable.

Production rules:
- Add-to-cart uses variant IDs.
- Checkout must redirect to Shopify `checkoutUrl`.
- Do not process payment card data in this frontend.
- Do not store passwords or build custom auth; use Shopify Customer Accounts.
- Keep locale and country/market as separate concepts.

## GitHub / Claude Code
After uploading this project to GitHub:
```bash
git clone https://github.com/YOUR_USERNAME/floaliving-storefront.git
cd floaliving-storefront
npm install
claude
```
