import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATS, DISHES, P } from "../data/data.js";
import { useStore } from "../store.jsx";
import { useSeo, crumbLD } from "../seo.js";
import { ProductCard } from "../components/Bits.jsx";

export default function Shop() {
  useSeo({ title: "Buy Rice Online in Pakistan | Basmati, Sella, Irri | Sunehri Dana", desc: "Shop Basmati, Sella, Irri, brown and Kainat rice online. 5 to 50 kg packs with bulk savings and delivery across Pakistan. Order on WhatsApp.", path: "shop", ld: [crumbLD([["Home", ""], ["Shop", "shop"]])] });
  const [sp] = useSearchParams(), { wish } = useStore();
  const [cat, setCat] = useState("All"), [dish, setDish] = useState("all"), [sort, setSort] = useState("pop"), [saved, setSaved] = useState(sp.get("saved") === "1"), [q, setQ] = useState(sp.get("q") || "");
  // keep in sync when the header search navigates here with a new ?q=
  const urlQ = sp.get("q") || "", urlSaved = sp.get("saved") === "1";
  const [last, setLast] = useState(urlQ + "|" + urlSaved);
  if (last !== urlQ + "|" + urlSaved) { setLast(urlQ + "|" + urlSaved); setQ(urlQ); setSaved(urlSaved); setCat("All"); setDish("all"); }
  const ql = q.toLowerCase();
  let list = P.filter((p) => (!saved || wish.includes(p.id)) && (cat === "All" || p.c === cat) && (dish === "all" || p.best.includes(dish)) && (!ql || (p.n + " " + p.c + " " + p.d + " " + p.best.join(" ")).toLowerCase().includes(ql)));
  if (sort === "low") list = [...list].sort((a, b) => a.kg - b.kg);
  if (sort === "high") list = [...list].sort((a, b) => b.kg - a.kg);
  const reset = () => { setCat("All"); setDish("all"); setSort("pop"); setSaved(false); setQ(""); };
  const tabs = [{ k: "All", t: "All rice" }, ...CATS.map((c) => ({ k: c.k, t: c.t }))];
  return (
    <section className="page show">
      <div className="sec-h"><div><h1>Shop rice online</h1><p>{list.length} product{list.length === 1 ? "" : "s"}{q ? ' for "' + q + '"' : ""}{dish !== "all" ? " · best for " + dish : ""}. Bigger packs, lower price per kg.</p></div></div>
      <div className="toolbar">
        <div className="chips" role="tablist">
          {tabs.map((c) => <button key={c.k} className="chip" role="tab" aria-selected={cat === c.k && !saved} onClick={() => { setCat(c.k); setQ(""); setDish("all"); setSaved(false); }}>{c.t}</button>)}
          <button className="chip" role="tab" aria-selected={saved} onClick={() => setSaved(true)}>Saved ♥ ({wish.length})</button>
        </div>
        <select className="sel" aria-label="Filter by dish" value={dish} onChange={(e) => setDish(e.target.value)}><option value="all">Best for: any dish</option>{DISHES.map((d) => <option key={d.id} value={d.id}>Best for: {d.n}</option>)}</select>
        <select className="sel" aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}><option value="pop">Sort: Popular</option><option value="low">Price: Low to high</option><option value="high">Price: High to low</option></select>
      </div>
      <div className="grid">{list.length ? list.map((p) => <ProductCard key={p.id} p={p} />) : <div className="glass empty" style={{ gridColumn: "1/-1" }}>Nothing here yet. <button className="link" onClick={reset}>Show all rice</button></div>}</div>
    </section>
  );
}
