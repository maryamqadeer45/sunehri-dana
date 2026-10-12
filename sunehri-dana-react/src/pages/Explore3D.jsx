import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import css from "../explore3d.css?inline";
import MARKUP from "./exploreMarkup.js";
import initExplore from "./exploreEngine.js";
import { P, IMAGES } from "../data/data.js";
import { rs, packPrice } from "../lib.js";
import { useSeo } from "../seo.js";
import { useStore } from "../store.jsx";

/* Old plain-site links become React routes: shop.html -> /shop. index.html (the store) -> /store */
const OVERRIDES = { "index.html": "/store" };
function toRoute(href) {
  const [path, query] = href.split("?");
  const key = path.replace(/^\.?\//, "");
  const base = OVERRIDES[key] ?? "/" + key.replace(/\.html$/, "");
  return query ? base + "?" + query : base;
}

export default function Explore3D() {
  const box = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const add = useRef(addToCart);
  add.current = addToCart;

  useSeo({
    title: "Sunehri Dana Rice Traders | Explore Our Rice in 3D",
    desc: "Spin the Sunehri Dana rice gallery in 3D. Explore Basmati, Sella and Irri rice, the dishes they make and our pack sizes, then order on WhatsApp.",
    path: "",
  });

  useEffect(() => {
    const el = box.current;
    el.innerHTML = MARKUP; // fresh DOM each mount (StrictMode safe)
    document.body.className = "locked";

    const onClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target === "_blank") return;
      const href = a.getAttribute("href");
      if (!href || href === "#" || /^(https?:|mailto:|tel:)/.test(href)) return;
      e.preventDefault();
      navigate(toRoute(href));
    };
    el.addEventListener("click", onClick);

    const cleanup = initExplore({
      // prices always come from data.js
      data: (d) => {
        d.items.forEach((it) => {
          if (it.k === "prod") {
            const p = P[it.pid];
            it.place = p.c + " rice · " + rs(p.kg) + "/kg · 25 kg pack " + rs(packPrice(p, 25));
            it.img = "/images/gal-prod-" + it.pid + ".webp"; // BABA Supreme bag
          } else if (it.k === "bori") it.img = "/images/gal-bori.webp";
          else if (it.k === "field") it.img = "/images/gal-field.webp";
          else if (it.k === "macro") it.img = "/images/gal-macro.webp";
          else if (it.k === "dish" && IMAGES.dishes[it.key]) it.img = IMAGES.dishes[it.key];
        });
        // extra photo cards, spread evenly around the sphere
        const extra = [
          { k: "extra", title: "Vegetable Biryani", place: "Dish · best with 1121 Kernel Basmati", note: "Peas, carrots and beans layered with fried onion and whole spices. Long grain keeps every dane separate.", href: "best-rice-for-biryani.html", cta: "Shop rice for biryani", img: "/images/veg-biryani.webp" },
          { k: "extra", title: "Idli & Dosa", place: "Dish · best with Irri-9 Sella", note: "Soft idli and crisp dosa are made from a fermented rice batter. Parboiled rice is the usual choice; ask us on WhatsApp if unsure.", href: "shop.html", cta: "Shop rice", img: "/images/idli-dosa.webp" },
          { k: "extra", title: "Rice Congee", place: "Dish · best with Broken Rice (Tota)", note: "Slow-cooked rice porridge with ginger, spring onion and shredded chicken. Broken rice cooks down soft and creamy.", href: "shop.html", cta: "Shop rice", img: "/images/congee.webp" },
          { k: "extra", title: "Rice Snacks", place: "Dish · best with Irri-6 White", note: "Crispy rice pancakes, rice balls and stir-fried noodle-style plates. Leftover cooked rice makes the best snacks.", href: "cook.html", cta: "Cook with rice", img: "/images/rice-snacks.webp" },
          { k: "extra", title: "Our Packaging", place: "Brand · BABA Supreme", note: "Sealed, graded packs in 5, 10, 25 and 50 kg. Clean grain, full weight, ready to deliver to your door.", href: "shop.html", cta: "Shop rice", img: "/images/packaging.webp" },
        ];
        const out = [];
        d.items.forEach((it, i) => { out.push(it); if ((i + 1) % 4 === 0 && extra.length) out.push(extra.shift()); });
        d.items = out.concat(extra);
      },
      // "Add 25 kg to cart" uses the real store cart
      addCart: (pid) => add.current(pid, 25, 1),
    });
    return () => { el.removeEventListener("click", onClick); cleanup(); el.innerHTML = ""; };
  }, [navigate]);

  return (<><style dangerouslySetInnerHTML={{ __html: css }} /><div ref={box} /></>);
}
