import { Link, useParams } from "react-router-dom";
import L from "../data/landing.json";
import { CATS, CSLUG, DSLUG, DISC, DISHES, P } from "../data/data.js";
import { minPrice, rs, unitKg, wa } from "../lib.js";
import { useSeo, crumbLD } from "../seo.js";
import { ProductCard, Dish } from "../components/Bits.jsx";
import NotFound from "./NotFound.jsx";

const catBySlug = Object.fromEntries(Object.entries(CSLUG).map(([k, v]) => [v, k]));
const dishBySlug = Object.fromEntries(Object.entries(DSLUG).map(([k, v]) => [v, k]));
const pct = (s) => Math.round(DISC[s] * 100);

export default function Landing() {
  const { slug } = useParams(), page = L[slug];
  const cat = catBySlug[slug], dish = dishBySlug[slug] && DISHES.find((d) => d.id === dishBySlug[slug]);
  useSeo({ title: page ? page.title.replace(/&amp;/g, "&") : "Page not found | Sunehri Dana", desc: page ? page.desc : "Page not found.", path: slug, ld: page ? [crumbLD([["Home", ""], ["Shop", "shop"], [page.crumb.replace(/&amp;/g, "&"), slug]])] : [] });
  if (!page) return <NotFound />;

  let seo = page.seo;
  if (cat) seo = seo.replace(/Rs [\d,]+ per kg/, rs(minPrice(cat)) + " per kg");
  if (dish) seo = seo.replace(/Rs [\d,]+ per kg on a 25 kg pack/, rs(unitKg(P[dish.picks[0]], 25)) + " per kg on a 25 kg pack");
  const list = P.filter((p) => (cat ? p.c === cat : p.best.includes(dish.id)));
  const more = cat
    ? [...CATS.filter((c) => c.k !== cat).map((c) => [CSLUG[c.k], c.t]), ...["biryani", "pulao", "zarda", "kheer", "khichri"].map((d) => [DSLUG[d], "Best rice for " + d]), ["tools", "Rice calculator"]]
    : [...DISHES.filter((d) => d.id !== dish.id).map((d) => [DSLUG[d.id], "Best rice for " + d.n.toLowerCase().replace("healthy rice bowl", "healthy rice bowl")]), ["shop", "All rice"], ["tools", "Rice calculator"]];
  return (
    <section className="page show">
      <nav className="crumbs" aria-label="Breadcrumb"><Link to="/store">Home</Link> / <Link to="/shop">Shop</Link> / <span dangerouslySetInnerHTML={{ __html: page.crumb }} /></nav>
      <div className="sec-h"><div><h1 dangerouslySetInnerHTML={{ __html: page.h1 }} /><p>{list.length} product{list.length === 1 ? "" : "s"}{dish ? " · best for " + dish.id : ""}. Bigger packs, lower price per kg.</p></div></div>
      <div className="two">
        <div className="glass pad seo" dangerouslySetInnerHTML={{ __html: seo }} />
        {cat ? (
          <div className="neu pad"><h3>Why buy bigger packs?</h3>
            <ul><li>5 kg: standard price</li>{[10, 25, 50].map((s) => <li key={s}>{s} kg: save {pct(s)}%{s === 50 ? " per kg" : ""}</li>)}</ul>
            <p style={{ marginTop: 12 }}>Starts from <b style={{ color: "var(--o)" }}>{rs(minPrice(cat))} per kg</b>. Rates follow the market and are confirmed on WhatsApp.</p></div>
        ) : (
          <div className="neu pad"><div className="dart"><Dish d={dish} /></div><p style={{ marginTop: 12 }}><b>Quick tip:</b> {dish.tip}</p></div>
        )}
      </div>
      <div className="sec"><div className="sec-h"><div><h2 dangerouslySetInnerHTML={{ __html: page.h2 }} /><p>Pick a pack size to see your saving. Order on WhatsApp.</p></div><Link className="link" to="/shop">See all rice</Link></div>
        <div className="grid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div></div>
      <div className="sec"><div className="sec-h"><h2>Explore more</h2></div><div className="rel">{more.map((m) => <Link key={m[0]} to={"/" + m[0]}>{m[1]}</Link>)}</div></div>
      <div className="sec"><div className="clay o cta"><div><h2>Need help choosing?</h2><p>Message us and we will recommend the right rice and pack size for you.</p></div>
        <a className="btn clay g" target="_blank" rel="noopener" href={wa("Assalam o Alaikum, I would like to place a rice order. Please share today's rates.")}>Order on WhatsApp</a></div></div>
    </section>
  );
}
