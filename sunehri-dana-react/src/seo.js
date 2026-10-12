import { useEffect } from "react";
import { SITE_URL, FAQ } from "./data/data.js";
function setMeta(sel, attr, val) { let e = document.head.querySelector(sel); if (!e) { e = document.createElement(sel.startsWith("link") ? "link" : "meta"); document.head.appendChild(e); } return e; }
export const faqLD = () => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f[0], acceptedAnswer: { "@type": "Answer", text: f[1] } })) });
export const businessLD = () => ({ "@context": "https://schema.org", "@type": "LocalBusiness", name: "Sunehri Dana Rice Traders", telephone: "+923026333536", address: { "@type": "PostalAddress", addressLocality: "Faisalabad", addressRegion: "Punjab", addressCountry: "PK" }, areaServed: "PK", priceRange: "Rs 145 - Rs 480 per kg", openingHours: "Mo-Su 09:00-21:00", url: SITE_URL });
export const crumbLD = (items) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c[0], item: SITE_URL + c[1] })) });
/* Sets title, description, canonical and JSON-LD for the current page. */
export function useSeo({ title, desc, path = "", ld = [] }) {
  useEffect(() => {
    document.title = title;
    const d = document.head.querySelector('meta[name="description"]') || setMeta('meta[name="description"]'); d.setAttribute("name", "description"); d.setAttribute("content", desc);
    let c = document.head.querySelector('link[rel="canonical"]'); if (!c) { c = document.createElement("link"); c.rel = "canonical"; document.head.appendChild(c); } c.href = SITE_URL + path;
    const nodes = ld.map((o) => { const s = document.createElement("script"); s.type = "application/ld+json"; s.text = JSON.stringify(o); document.head.appendChild(s); return s; });
    return () => nodes.forEach((n) => n.remove());
  }, [title, desc, path]); // eslint-disable-line
}
