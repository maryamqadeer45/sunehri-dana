import { Link } from "react-router-dom";
import { useState } from "react";
import { DISHES, GUIDE, MEALS, P, SIZES } from "../data/data.js";
import { CATS } from "../data/data.js";
import { plan, rs, unitKg, packPrice, wa } from "../lib.js";
import { useStore } from "../store.jsx";
import { useSeo, crumbLD, businessLD } from "../seo.js";
import { Countdown, Details } from "../components/Bits.jsx";
import { UseCard } from "../components/Cards.jsx";

export function Cook() {
  useSeo({ title: "Rice Dishes: Biryani, Pulao, Zarda, Kheer & More | Sunehri Dana", desc: "See which rice suits biryani, pulao, zarda, kheer, khichri, daal chawal, fried rice and healthy bowls.", path: "cook", ld: [crumbLD([["Home", ""], ["Cook", "cook"]])] });
  return (
    <section className="page show">
      <div className="sec-h"><div><h1>Where rice is used: dishes everyone loves</h1><p>Rice is the heart of Pakistani cooking and loved worldwide. Here is what to cook, and which rice to choose for it.</p></div></div>
      <div className="use-grid">{DISHES.map((d) => <UseCard key={d.id} d={d} full />)}</div>
      <div className="sec"><div className="sec-h"><h2>Rice for every occasion</h2></div><div className="three">
        <div className="clay pad"><h3>Weddings &amp; dawats</h3><p>Large degs of biryani and zarda need extra-long, non-breaking grain. 1121 Golden Sella and Steam are made for this. Use our calculator to plan quantity.</p></div>
        <div className="clay pad"><h3>Restaurants &amp; hotels</h3><p>Consistent grain, same result every day. Sella holds its shape in the pot. Ask for 50 kg bags with bulk rates.</p></div>
        <div className="clay pad"><h3>Everyday home meals</h3><p>Irri-6 and Irri-9 keep the monthly budget light. Super Kernel Basmati makes Friday pulao special.</p></div></div></div>
    </section>
  );
}

function Finder() {
  const { addToCart, openQuick } = useStore();
  const [dish, setDish] = useState(null), [bud, setBud] = useState(null);
  let res = null;
  if (dish && bud) {
    const list = P.filter((p) => p.best.includes(dish)).sort((a, b) => a.kg - b.kg);
    const pick = bud === "value" ? list[0] : bud === "premium" ? list[list.length - 1] : list[Math.floor((list.length - 1) / 2)];
    const alt = list.find((p) => p !== pick);
    const row = (p, l) => <div className="rrow" key={l}><div><span className="mini">{l}</span><br /><b>{p.n}</b><br /><span className="mini">{rs(unitKg(p, 25))}/kg on a 25 kg pack · soak {p.soak}</span></div>
      <div className="row"><button className="btn clay o sm" onClick={() => addToCart(p.id, 25, 1)}>Add 25 kg</button><button className="btn soft sm" onClick={() => openQuick(p.id)}>Details</button></div></div>;
    res = <>{row(pick, "Your best match")}{alt && row(alt, "Also good")}</>;
  }
  return (
    <div className="glass pad" id="finder"><h3>Rice Finder</h3><p>Answer two quick questions and get a recommendation.</p>
      <label style={{ marginTop: 14 }}>What are you cooking?</label>
      <div className="opts">{DISHES.map((d) => <button key={d.id} className="chip" aria-selected={dish === d.id} onClick={() => setDish(d.id)}>{d.n}</button>)}</div>
      <label style={{ marginTop: 14 }}>Your budget</label>
      <div className="opts">{[["value", "Save money"], ["balanced", "Balanced"], ["premium", "Best quality"]].map((b) => <button key={b[0]} className="chip" aria-selected={bud === b[0]} onClick={() => setBud(b[0])}>{b[1]}</button>)}</div>
      <div className="result">{res || <p className="mini">Choose a dish and a budget to see your match.</p>}</div>
    </div>
  );
}
function Calc() {
  const { addToCart } = useStore();
  const [ppl, setPpl] = useState(50), [meal, setMeal] = useState(0), [rice, setRice] = useState(1);
  const n = Math.max(1, Math.min(2000, +ppl || 1)), g = MEALS[meal].g, p = P[rice];
  const kg = Math.max(5, Math.ceil((n * g * 1.05) / 1000)), pl = plan(kg);
  let tot = 0, total = 0; pl.forEach((x) => { tot += x.s * x.n; total += packPrice(p, x.s) * x.n; });
  return (
    <div className="glass pad"><h3>Rice Quantity Calculator</h3><p>Hosting guests? Find out how much rice you need.</p>
      <form style={{ marginTop: 14 }} onSubmit={(e) => e.preventDefault()}>
        <label>Number of people<input className="f" type="number" min="1" max="2000" value={ppl} onChange={(e) => setPpl(e.target.value)} /></label>
        <label>Meal<select className="f" value={meal} onChange={(e) => setMeal(+e.target.value)}>{MEALS.map((m, i) => <option key={m.k} value={i}>{m.k}</option>)}</select></label>
        <label>Rice variety<select className="f" value={rice} onChange={(e) => setRice(+e.target.value)}>{P.map((x, i) => <option key={x.id} value={i}>{x.n}</option>)}</select></label>
      </form>
      <div className="result">
        <div className="rrow"><div><span className="mini">You need about</span><div className="big">{kg} kg</div><span className="mini">{g} g per person plus 5% extra</span></div></div>
        <div className="rrow"><div><span className="mini">Suggested packs</span><br /><b>{pl.map((x) => x.n + " × " + x.s + " kg").join(" + ")}</b><br /><span className="mini">{tot} kg · {rs(total)} with {p.n}</span></div>
          <button className="btn clay o sm" onClick={() => pl.forEach((x) => addToCart(p.id, x.s, x.n))}>Add to cart</button></div>
      </div>
    </div>
  );
}
export function Tools() {
  useSeo({ title: "Rice Calculator, Rice Finder & Cooking Chart | Sunehri Dana", desc: "Free rice tools: find the right rice for your dish, calculate how much rice you need and follow our cooking chart.", path: "tools", ld: [crumbLD([["Home", ""], ["Tools", "tools"]])] });
  return (
    <section className="page show">
      <div className="sec-h"><div><h1>Free rice tools</h1><p>Choose the right rice, plan the right quantity and cook it perfectly.</p></div></div>
      <div className="two"><Finder /><Calc /></div>
      <div className="sec"><div className="sec-h"><div><h2>Cooking chart</h2><p>Soaking, water and time for each rice. Quantities are a guide; adjust to your pot.</p></div></div>
        <div className="glass tw"><table><thead><tr><th>Rice</th><th>Grain</th><th>Soak</th><th>Rice : water</th><th>Cooking time</th></tr></thead><tbody>{P.map((p) => <tr key={p.id}><td><b>{p.n}</b></td><td>{p.grain}</td><td>{p.soak}</td><td>{p.water}</td><td>{p.time}</td></tr>)}</tbody></table></div></div>
      <div className="sec"><div className="sec-h"><div><h2>Rice guide</h2></div></div><div id="guide">{GUIDE.map((g) => <Details key={g[0]} title={g[0]}><span dangerouslySetInnerHTML={{ __html: g[1] }} /></Details>)}</div></div>
    </section>
  );
}
export function Prices() {
  useSeo({ title: "Rice Price List Pakistan Today | Basmati, Sella, Irri per kg", desc: "Today's rice prices in Pakistan: Basmati, Sella, Irri, brown and Kainat rice for 5, 10, 25 and 50 kg packs.", path: "prices", ld: [crumbLD([["Home", ""], ["Price List", "prices"]])] });
  return (
    <section className="page show">
      <div className="sec-h"><div><h1>Rice price list in Pakistan</h1><p>Today's indicative prices in PKR. Rate valid for <Countdown /></p></div><a className="btn clay g" target="_blank" rel="noopener" href={wa("Assalam o Alaikum, please share today's confirmed rice rates.")}>Confirm today's rate</a></div>
      <div className="glass tw"><table><thead><tr><th>Rice</th>{SIZES.map((s) => <th key={s}>{s} kg</th>)}<th>Per kg (50 kg)</th></tr></thead><tbody>
        {CATS.map((c) => [<tr className="cr" key={c.k}><td colSpan="6">{c.t}</td></tr>, ...P.filter((p) => p.c === c.k).map((p) => <tr key={p.id}><td><b>{p.n}</b></td>{SIZES.map((s) => <td key={s}>{rs(packPrice(p, s))}</td>)}<td><b>{rs(unitKg(p, 50))}</b></td></tr>)])}
      </tbody></table></div>
      <p className="note">Pack prices already include the bulk saving. Rates follow the wholesale market and can change daily; the final price is confirmed on WhatsApp.</p>
    </section>
  );
}
export function About() {
  useSeo({ title: "About Sunehri Dana Rice Traders | Faisalabad", desc: "Sunehri Dana is a rice business in Faisalabad that cleans, grades and delivers rice across Pakistan.", path: "about", ld: [crumbLD([["Home", ""], ["About", "about"]])] });
  return (
    <section className="page show">
      <div className="sec-h"><div><h1>About Sunehri Dana Rice Traders</h1><p>A rice business based in Faisalabad, serving Pakistan.</p></div></div>
      <div className="two">
        <div className="glass pad"><h3>Who we are</h3><p>We source rice directly from Punjab's rice-growing belt, then clean, grade and pack it for homes, caterers and retailers across Pakistan.</p><br /><p>Our promise is simple: what we show is what we ship, at an honest market rate.</p></div>
        <div className="neu pad"><h3>Our process</h3><ul><li>Select quality grain</li><li>Clean, grade and sort</li><li>Pack in sealed bags</li><li>Check weight before dispatch</li><li>Deliver nationwide</li></ul></div>
      </div>
      <div className="sec"><div className="sec-h"><h2>Who we serve</h2></div><div className="three">
        <div className="clay pad"><h3>Households</h3><p>Monthly rice in 5, 10 and 25 kg packs.</p></div>
        <div className="clay pad"><h3>Restaurants &amp; caterers</h3><p>1121 and Steam Basmati for biryani and pulao at bulk rates.</p></div>
        <div className="clay pad"><h3>Retailers</h3><p>Wholesale 50 kg bags with regular supply.</p></div></div></div>
    </section>
  );
}
export function Contact() {
  const { openOrder } = useStore();
  useSeo({ title: "Contact & Order Rice on WhatsApp | Sunehri Dana", desc: "Order rice on WhatsApp: 0302 6333536. Faisalabad, delivery across Pakistan, open daily 9 am to 9 pm.", path: "contact", ld: [businessLD(), crumbLD([["Home", ""], ["Contact", "contact"]])] });
  const [f, setF] = useState({ n: "", p: `${P[0].n} - Rs ${P[0].kg}/kg`, q: 25, a: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); openOrder("Assalam o Alaikum, my name is " + f.n + ".\nRice: " + f.p + "\nQuantity: " + f.q + " kg\nAddress: " + (f.a || "-") + "\nPlease confirm the price and delivery."); };
  return (
    <section className="page show">
      <div className="sec-h"><div><h1>Contact &amp; quick order</h1><p>Fill in the form and your order opens in WhatsApp, ready to send.</p></div></div>
      <div className="two">
        <div className="glass pad"><form onSubmit={submit}>
          <label>Full name<input className="f" required placeholder="Your name" value={f.n} onChange={set("n")} /></label>
          <label>Rice variety<select className="f" value={f.p} onChange={set("p")}>{P.map((p) => <option key={p.id} value={`${p.n} - ${rs(p.kg)}/kg`}>{p.n} ({rs(p.kg)}/kg)</option>)}</select></label>
          <label>Quantity (kg)<input className="f" type="number" min="5" value={f.q} onChange={set("q")} /></label>
          <label>City and delivery address<textarea placeholder="House no, street, city" value={f.a} onChange={set("a")} /></label>
          <button className="btn clay g block" type="submit">Send order on WhatsApp</button></form></div>
        <div className="neu pad"><h3>Talk to us on WhatsApp</h3><p style={{ margin: "8px 0 14px" }}>Available every day, 9 am to 9 pm.</p><p className="big">0302 6333536</p><p style={{ margin: "6px 0 20px" }}>Faisalabad, Punjab, Pakistan</p>
          <a className="btn clay g" target="_blank" rel="noopener" href={wa("Assalam o Alaikum, I would like to know about your rice rates and ordering.")}>Chat on WhatsApp</a></div>
      </div>
    </section>
  );
}
