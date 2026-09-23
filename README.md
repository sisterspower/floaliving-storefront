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


Kurulan altyapı

Kod tarafı tamamen hazır ve test edildi (build/lint temiz, gerçek credentials olmadan da doğru/kontrollü hata veriyor):

Dosya	Görev
lib/appleAuth.ts	Apple authorize URL'i, ES256 client secret JWT üretimi, code→token exchange, id_token doğrulama (Apple'ın public JWKS'i ile)
lib/session.ts	İmzalı, httpOnly session cookie (gerçek veritabanı olmadığı için geçici çözüm)
app/api/auth/apple/route.ts	Girişi başlatır, CSRF state cookie'si koyar, Apple'a yönlendirir
app/api/auth/apple/callback/route.ts	Apple'dan gelen POST'u karşılar, code'u exchange eder, session oluşturur
app/api/auth/signout/route.ts	Çıkış
components/AccountPage.tsx	Giriş yapılmışsa "Giriş yapıldı: {email}" + çıkış butonu gösterir
.env.local.example	Gereken tüm değişkenlerin nereden alınacağı adım adım yazılı
Senin yapman gerekenler (Apple Developer Portal — ben yapamam)
App ID oluştur, "Sign in with Apple" özelliğini aç
Services ID oluştur (bu senin APPLE_CLIENT_ID'n olacak, örn. com.floaliving.web) — buraya gerçek bir domain (localhost olmaz) ve Return URL olarak https://<domain>/api/auth/apple/callback gireceksin
Key oluştur ("Sign in with Apple" işaretli), .p8 dosyasını indir (sadece 1 kere indirilebiliyor) → APPLE_PRIVATE_KEY, yanındaki Key ID → APPLE_KEY_ID
Sayfanın üstünde duran Team ID → APPLE_TEAM_ID

Bunları .env.local dosyasına (.env.local.example'daki formatta) koyduğunda hazır olur — kod tarafında hiçbir değişiklik gerekmez.

⚠️ Önemli: Apple, localhost'u callback domaini olarak kabul etmiyor — test etmek için gerçek bir domain'e deploy etmen ya da HTTPS tüneli (ngrok gibi) kullanman gerekecek.

Bilgileri hazırladığında paylaş, birlikte .env.local'a işleyip uçtan uca test ederiz.