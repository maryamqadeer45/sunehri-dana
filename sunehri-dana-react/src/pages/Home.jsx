import { Link } from "react-router-dom";
import { CATS, CSLUG, DISHES, P, DISC } from "../data/data.js";
import { minPrice, rs, wa } from "../lib.js";
import { useSeo, faqLD, businessLD } from "../seo.js";
import { Countdown, ProductCard, Faq, Reviews, Svg, SVG } from "../components/Bits.jsx";
import { UseCard } from "../components/Cards.jsx";
import { icon } from "../data/art.js";

const TRUST = [["truck", "Nationwide delivery", "Sent to your city"], ["shield", "Quality graded", "Cleaned and sorted grain"], ["scale", "Full weight", "5, 10, 25 and 50 kg packs"], ["chat", "Order on WhatsApp", "Quick replies, 9 am – 9 pm"]];
const pc = (s) => Math.round(DISC[s] * 100) + "%";

export default function Home() {
  useSeo({ title: "Sunehri Dana Rice Traders | Buy Premium Basmati, Sella & Irri Rice in Pakistan", desc: "Buy Basmati, Sella and Irri rice online in Pakistan. 5 to 50 kg packs, bulk savings and delivery across Pakistan. Order on WhatsApp.", path: "store", ld: [businessLD(), faqLD()] });
  return (
    <section className="page show">
      <div className="glass hero">
        <div>
          <span className="badge">Direct from the mill &nbsp;|&nbsp; Rate valid for <Countdown /></span>
          <h1>Rice your family will ask for <em>again and again</em></h1>
          <p>Long grain Basmati, golden Sella and everyday Irri. Cleaned, graded and weight-checked, then delivered to your door anywhere in Pakistan. Bigger packs cost less per kg.</p>
          <div className="row"><Link className="btn clay o" to="/shop">Shop rice now</Link><Link className="btn soft" to="/tools">Find my perfect rice</Link></div>
          <div className="ticks"><span>Sealed packs</span><span>Full weight</span><span>Order on WhatsApp</span></div>
        </div>
        <div className="neu hero-art" aria-hidden="true"><img className="heroimg" src="/images/baba-bag.webp" alt="BABA Supreme premium rice bag" width="300" /><span className="float clay f1">Save up to {pc(50)} on 50 kg</span><span className="float clay g f2">WhatsApp 9 am – 9 pm</span></div>
      </div>
      <div className="trust">{TRUST.map((t) => <div className="neu tr" key={t[0]}><div className="ic neu-in"><Svg html={icon(t[0])} /></div><div><b>{t[1]}</b><span>{t[2]}</span></div></div>)}</div>

      <div className="sec"><div className="sec-h"><div><h2>What are you cooking?</h2><p>Pick a category, or let us choose for you with the free Rice Finder.</p></div><Link className="link" to="/tools">Try Rice Finder</Link></div>
        <div className="bento">{CATS.map((c) => <Link key={c.k} className={"clay " + c.cl + " bt"} to={"/" + CSLUG[c.k]}><h3>{c.t}</h3><p>{c.d}</p><span className="from">From {rs(minPrice(c.k))}/kg →</span></Link>)}</div></div>

      <div className="sec"><div className="sec-h"><div><h2>Best sellers</h2><p>The rice our customers reorder most. Pick a pack size to see your saving.</p></div><Link className="link" to="/shop">See all rice</Link></div>
        <div className="grid">{[0, 1, 3, 5].map((i) => <ProductCard key={i} p={P[i]} />)}</div></div>

      <div className="sec"><div className="sec-h"><div><h2>Where rice makes the meal</h2><p>From wedding biryani to a simple bowl of kheer. Tap any dish to see the right rice for it.</p></div><Link className="link" to="/cook">All dishes</Link></div>
        <div className="use-strip">{DISHES.map((d) => <UseCard key={d.id} d={d} />)}</div></div>

      <div className="sec"><div className="sec-h"><div><h2>The bigger the bag, the lower the price</h2><p>We pass our packing and handling savings on to you. Same rice, better value per kg.</p></div></div>
        <div className="tiers">
          <div className="clay tier"><b>{pc(5)}</b><span>5 kg pack<br />Try us out</span></div>
          <div className="clay tier"><b>{pc(10)}</b><span>10 kg pack<br />Small family</span></div>
          <div className="clay o tier"><b>{pc(25)}</b><span>25 kg pack<br />Most popular</span></div>
          <div className="clay n tier"><b>{pc(50)}</b><span>50 kg bag<br />Best value</span></div>
        </div></div>

      <div className="sec"><div className="sec-h"><div><h2>Why buy from Sunehri Dana</h2><p>See how we compare with buying loose rice from a random shop.</p></div></div>
        <div className="glass tw"><table className="cmp"><thead><tr><th>What you get</th><th>Sunehri Dana</th><th>Loose / unbranded</th></tr></thead><tbody>
          {[["Cleaned and graded grain", "Not guaranteed"], ["Sealed, labelled packs", "✕"], ["Weight checked before dispatch", "Varies"], ["Clear price per kg, by pack size", "Changes shop to shop"], ["Delivery to your door", "You carry it"], ["Direct WhatsApp support", "✕"]].map((r) => <tr key={r[0]}><td>{r[0]}</td><td className="yes">✓</td><td className="no">{r[1]}</td></tr>)}
        </tbody></table></div></div>

      <div className="sec"><div className="sec-h"><div><h2>How ordering works</h2></div></div>
        <div className="steps">{[["Choose your rice", "Pick a variety and pack size. Add to cart."], ["Send on WhatsApp", "Your full order message is written for you."], ["Confirm the rate", "We confirm today's price and delivery time."], ["Receive at your door", "Pay as agreed and enjoy fresh rice."]].map((s, i) => <div className="neu step" key={s[0]}><div className="n">{i + 1}</div><h3>{s[0]}</h3><p>{s[1]}</p></div>)}</div></div>

      <div className="sec"><div className="sec-h"><div><h2>What customers say</h2></div></div><Reviews /></div>

      <div className="sec"><div className="clay n guar"><Svg html={SVG.guar} /><div><h2>Our satisfaction promise</h2><p>If your rice is not as described, message us on WhatsApp with a photo within 24 hours of delivery and we will make it right.</p></div></div></div>

      <div className="sec"><div className="sec-h"><div><h2>Questions, answered</h2></div></div><Faq /></div>

      <div className="sec"><div className="clay o cta"><div><h2>Ready to taste the difference?</h2><p>Order today. Today's rate is held for your order once we confirm it on WhatsApp.</p></div>
        <div className="row"><Link className="btn clay" style={{ color: "var(--ink)" }} to="/shop">Shop rice</Link><a className="btn clay g" target="_blank" rel="noopener" href={wa("Assalam o Alaikum, I would like to place a rice order. Please share today's rates.")}>Order on WhatsApp</a></div></div></div>
    </section>
  );
}
