SUNEHRI DANA RICE TRADERS - REACT WEBSITE (Vite + React + React Router)

CHALANE KA TAREEQA (computer par Node.js 18+ chahiye)
1. Is folder mein terminal kholein.
2. npm install
3. npm run dev        -> browser mein http://localhost:5173 khulega
4. npm run build      -> "dist" folder banta hai (yehi live karna hai)

LIVE (Netlify): npm run build ke baad "dist" folder Netlify mein drag and drop karein.
public/_redirects file har page ko React app par bhejti hai, is liye /shop, /cook waghera refresh par bhi chalte hain.

PAGES
/ (3D gallery, site ka pehla page)   /store (Store home)   /shop   /cook   /tools   /prices   /about   /contact
12 landing pages: /basmati-rice-price-pakistan, /sella-rice-price-pakistan, /irri-rice-price-pakistan, /brown-and-kainat-rice
                  /best-rice-for-biryani, -pulao, -zarda, -kheer, -khichri, -daal-chawal, -fried-rice, -healthy-bowl
/explore         ab "/" par redirect hota hai

SIRF WHATSAPP
Order ka sirf ek raasta hai: WhatsApp 0302 6333536 (WhatsApp, WhatsApp Web, WhatsApp app, Copy message).
Call, SMS aur website form hata diye gaye hain. Netlify Forms ki ab zaroorat nahi.

RATES / SETTINGS BADALNA: src/data/data.js
- NUM (WhatsApp number), P (har chawal ka kg rate), DISC, FREE_DELIVERY_AT, CLOSE_HOUR (countdown hamesha 9 pm tak, src/lib.js countdownText mein bhi 21 hai), REVIEWS (sirf asli reviews)
- Ek jagah rate badalne se shop, price list, cart, calculator, 3D gallery sab update ho jate hain.
- SITE_URL: asli domain yahan likhein (canonical tags isi se bante hain). public/sitemap.xml aur robots.txt mein bhi YOUR-DOMAIN.com badlein.

TASVEEREIN BADALNA: src/data/data.js ke aakhir mein IMAGES.
Real photo ko public/images/ mein rakhein aur path likhein, jaise IMAGES.products[0] = "/images/super-kernel-basmati.webp". Khali chhorein to built-in illustration chalti hai.
(3D gallery ki illustrations abhi src/data/explore_script.txt ke andar hain.)

SEO NOTE
Yeh single-page React app hai. Title, description, canonical aur JSON-LD har page par JavaScript se set hote hain. Google JavaScript chala leta hai, magar sab se behtar SEO ke liye baad mein prerendering (jaise vite-plugin-ssr ya react-snap) lagwana behtar hai.

FILES
src/data/data.js         rates, dishes, FAQ, number
src/data/landing.json    12 landing pages ka SEO text
src/style.css            store ka design: black base (#0a0a0a), Playfair Display + Inter, sunehri (gold) accent, orange #f85606 sirf Add to cart / Order ke liye
src/explore3d.css        3D page ka design
src/pages/*              har page ek React component
src/components/*         header, footer, cart, quick view, order modal, product card

TASVEEREIN (public/images/)
baba-bag.webp   BABA Supreme neela bag. Jahan bhi rice bag dikhta hai (shop cards, cart, quick view, home) yehi hai. data.js ke IMAGES.products se juda hai.
biryani, pulao, kheer, khichri, daal, fried .webp   dishes ki photos (IMAGES.dishes). Zarda aur Healthy Bowl ki photo abhi nahi, wahan illustration chalti hai.
  Photo aane par data.js mein IMAGES.dishes.zarda = "/images/zarda.webp" likh dein.
veg-biryani, idli-dosa, congee, rice-snacks, packaging .webp   sirf 3D gallery ke extra cards
gal-prod-0..9.webp, gal-bori.webp, gal-field.webp, gal-macro.webp   3D gallery ke cards (kaale background par). Bag ki photo badlein to inhein dobara banana hoga.
dish-zarda.webp, dish-bowl.webp   Zarda aur Healthy Bowl ke kaale cards. Asli dish photo aaye to data.js mein IMAGES.dishes.zarda / bowl ka path badal dein.
logo-header.webp   3D gallery ke upar wala logo (logo-dark.webp ka cropped version). emblem-dark.webp store header mein.
emblem.webp, logo.webp, favicon.png, apple-touch-icon.png   Sunehri Dana logo (header, favicon)
extra/   bachi hui photos (biryani-2, sushi, congee-2), abhi kahin use nahi hui

REVIEWS
src/data/data.js mein REVIEWS array mein sirf ASLI reviews likhein:
  {name:"Ali", city:"Lahore", rating:5, text:"...", product:"1121 Kernel Basmati", verified:true}
Kam az kam ek review aate hi home par cards, average rating aur count khud ban jate hain. Khali ho to "Be one of our first reviewers" card dikhta hai.
Customer "Write a review on WhatsApp" dabata hai to ek tayyar message khulta hai. Review aane par customer ki ijazat se data.js mein paste kar dein.
Google Business link ho to GOOGLE_REVIEWS_URL mein daal dein, "Read reviews on Google" button aa jayega.
