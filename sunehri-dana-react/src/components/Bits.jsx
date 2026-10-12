import { useEffect, useState } from "react";
import { bag, dishSvg } from "../data/art.js";
import { SVG } from "../data/svgs.js";
import { IMAGES, REVIEWS, FAQ, SIZES, GOOGLE_REVIEWS_URL } from "../data/data.js";
import { countdownText, rs, packPrice, packOrig, unitKg, wa } from "../lib.js";
import { useStore } from "../store.jsx";

export const Svg = ({ html }) => <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
export const Countdown = () => { const [t, s] = useState(countdownText()); useEffect(() => { const i = setInterval(() => s(countdownText()), 1000); return () => clearInterval(i); }, []); return <b className="cd">{t}</b>; };
export const Bag = ({ p, w }) => IMAGES.products[p.id] ? <img className="bagimg" src={IMAGES.products[p.id]} alt={p.n + " rice bag"} width={w} style={w ? { width: w, height: "auto" } : undefined} loading="lazy" /> : <Svg html={bag(p.col, w)} />;
export const Dish = ({ d }) => IMAGES.dishes[d.id] ? <img className="dishimg" src={IMAGES.dishes[d.id]} alt={d.n + " made with Sunehri Dana rice"} loading="lazy" /> : <Svg html={dishSvg(d.id, d.bg)} />;

export function ProductCard({ p }) {
  const { wish, toggleWish, openQuick, addToCart } = useStore();
  const [sel, setSel] = useState(25);
  const sv = packOrig(p, sel) - packPrice(p, sel), w = wish.includes(p.id);
  return (
    <article className="clay card">
      <button className="heart" aria-pressed={w} aria-label={"Save " + p.n} onClick={() => toggleWish(p.id)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={w ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 20s-7-4.6-9-9.2C1.8 7.3 4 4.5 7 4.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3 0 5.200 2.800 4 6.300C19 15.400 12 20 12 20z" /></svg>
      </button>
      <button className="bag neu-in" aria-label={"View details of " + p.n} onClick={() => openQuick(p.id, sel)}>
        <span className="pill">{p.tag}</span><Bag p={p} />{sv > 0 && <span className="save">Save {rs(sv)}</span>}
      </button>
      <div className="cn">{p.c} rice · {p.grain} grain</div>
      <h3 onClick={() => openQuick(p.id, sel)}>{p.n}</h3>
      <p className="desc">{p.d}</p>
      <div className="price">{rs(packPrice(p, sel))}{sv > 0 && <s>{rs(packOrig(p, sel))}</s>}<small>{sel} kg pack · {rs(unitKg(p, sel))}/kg</small></div>
      <div className="packs" role="group" aria-label="Pack size">{SIZES.map((s) => <button key={s} className="pk" aria-pressed={s === sel} onClick={() => setSel(s)}>{s} kg</button>)}</div>
      <button className="btn clay o block" onClick={() => addToCart(p.id, sel, 1)}>Add to cart</button>
    </article>
  );
}

export const Details = ({ title, children }) => <details className="neu"><summary>{title}</summary><div className="ans">{children}</div></details>;
export const Faq = () => <div id="faq">{FAQ.map((f) => <Details key={f[0]} title={f[0]}>{f[1]}</Details>)}</div>;
export function Reviews() {
  const { openOrder } = useStore();
  const n = REVIEWS.length, avg = n ? REVIEWS.reduce((t, v) => t + (v.rating || 5), 0) / n : 0;
  const ask = wa("Assalam o Alaikum, I would like to share my review of Sunehri Dana rice.\n\nName:\nCity:\nRice I bought:\nRating (1 to 5):\nMy review:");
  const btns = <div className="row" style={{ marginTop: 16 }}>
    <a className="btn clay g" target="_blank" rel="noopener" href={ask}>Write a review on WhatsApp</a>
    {GOOGLE_REVIEWS_URL && <a className="btn soft" target="_blank" rel="noopener" href={GOOGLE_REVIEWS_URL}>Read reviews on Google</a>}
  </div>;
  if (!n) return <div className="glass pad rv-empty"><div className="stars" aria-hidden="true">★★★★★</div><h3>Be one of our first reviewers</h3><p>We are a growing rice business and every honest review helps other families choose well. Order today and tell us what you think.</p>{btns}</div>;
  return (
    <div className="rv-wrap">
      <div className="rv-sum"><b className="big">{avg.toFixed(1)}</b><div><div className="stars" aria-label={avg.toFixed(1) + " out of 5"}>{"★".repeat(Math.round(avg))}{"☆".repeat(5 - Math.round(avg))}</div><span className="mini">{n} customer review{n > 1 ? "s" : ""}</span></div></div>
      <div className="rv-grid">
        {REVIEWS.map((v, i) => (
          <figure className="clay rv" key={i}>
            <div className="stars" aria-label={(v.rating || 5) + " out of 5"}>{"★".repeat(v.rating || 5)}{"☆".repeat(5 - (v.rating || 5))}</div>
            <blockquote><p>{v.text}</p></blockquote>
            <figcaption className="who"><span className="av" aria-hidden="true">{(v.name || "?").trim().charAt(0).toUpperCase()}</span>
              <span><b>{v.name}</b><small>{[v.city, v.product].filter(Boolean).join(" · ")}</small></span>
              {v.verified && <span className="vf">✓ Verified order</span>}</figcaption>
          </figure>
        ))}
      </div>
      {btns}
    </div>
  );
}
export const WaLink = ({ text, className = "btn clay g", children }) => <a className={className} target="_blank" rel="noopener" href={wa(text)}>{children}</a>;
export { SVG };
