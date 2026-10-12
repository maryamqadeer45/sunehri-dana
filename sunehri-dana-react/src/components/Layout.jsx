import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import css from "../style.css?inline";
import { NUM, P, DISHES, SIZES, FREE_DELIVERY_AT, DSLUG, CSLUG, CATS } from "../data/data.js";
import { rs, wa, packPrice, packOrig, unitKg } from "../lib.js";
import { useStore } from "../store.jsx";
import { Svg, SVG, Bag } from "./Bits.jsx";

const MSGS = ["Delivery available across Pakistan", "Order on WhatsApp: <b>0302 6333536</b>", "Bigger packs, lower price per kg: save up to <b>6%</b>", "Free delivery on orders above <b>Rs 25,000</b>"];
const HELLO = "Assalam o Alaikum, I would like to know about your rice rates and ordering.";

function Ticker() {
  const [i, setI] = useState(0), [o, setO] = useState(1);
  useEffect(() => { const t = setInterval(() => { setO(0); setTimeout(() => { setI((x) => (x + 1) % MSGS.length); setO(1); }, 400); }, 4500); return () => clearInterval(t); }, []);
  return <div className="topbar"><div className="wrap"><span id="tmsg" style={{ opacity: o }} dangerouslySetInnerHTML={{ __html: MSGS[i] }} /></div></div>;
}

function Header() {
  const nav = useNavigate(), { totals, wish, openQuick } = useStore();
  const [q, setQ] = useState(""), [open, setOpen] = useState(false), box = useRef();
  const m = q.trim() ? P.filter((p) => (p.n + " " + p.c + " " + p.best.join(" ")).toLowerCase().includes(q.trim().toLowerCase())).slice(0, 5) : [];
  useEffect(() => { const f = (e) => !box.current?.contains(e.target) && setOpen(false); document.addEventListener("click", f); return () => document.removeEventListener("click", f); }, []);
  const { pathname } = useLocation();
  const submit = (e) => { e.preventDefault(); setOpen(false); nav("/shop" + (q.trim() ? "?q=" + encodeURIComponent(q.trim()) : "")); };
  const links = [["/store", "Home"], ["/shop", "Shop Rice"], ["/cook", "Cook With Rice"], ["/tools", "Rice Tools"], ["/prices", "Price List"], ["/about", "About Us"], ["/contact", "Contact"]];
  const landingNav = (p) => (pathname !== "/store" && !links.some((l) => l[0] === pathname) ? (Object.values(DSLUG).includes(p.slice(1)) ? "/cook" : "/shop") : null);
  const cur = landingNav(pathname) || pathname;
  return (
    <header><div className="wrap"><div className="glass">
      <div className="bar">
        <Link className="logo" to="/store" aria-label="Sunehri Dana Rice Traders home"><img className="logoimg" src="/images/emblem-dark.webp" alt="" width="52" height="52" /><span>Sunehri Dana<small>Rice Traders, Faisalabad</small></span></Link>
        <div className="searchbox" ref={box}>
          <form className="neu-in search" role="search" style={{ margin: 0, display: "flex" }} onSubmit={submit}>
            <Svg html={SVG.search} />
            <input type="search" autoComplete="off" placeholder="Search rice: Basmati, Sella, biryani…" aria-label="Search rice" value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} />
            <button type="submit">Search</button>
          </form>
          <div className={"sugg" + (open && q.trim() ? " open" : "")} role="listbox">
            {m.length ? m.map((p) => <button key={p.id} onClick={() => { setOpen(false); openQuick(p.id); }}><span>{p.n}</span><b>{rs(p.kg)}/kg</b></button>) : <button disabled>No match. Try "Basmati" or "biryani".</button>}
          </div>
        </div>
        <div className="acts">
          <Link className="ib" to="/shop?saved=1" aria-label="Saved rice"><Svg html={SVG.heart} /><span className={"cnt" + (wish.length ? " on" : "")}>{wish.length}</span></Link>
          <CartBtn />
          <a className="btn clay g wab" target="_blank" rel="noopener" href={wa(HELLO)}>WhatsApp</a>
        </div>
      </div>
      <nav className="menu" id="nav" aria-label="Main">
        {links.map((l) => <Link key={l[0]} to={l[0]} className={cur === l[0] ? "on" : ""}>{l[1]}</Link>)}
        <Link to="/">Explore in 3D</Link>
      </nav>
    </div></div></header>
  );
}
function CartBtn() { const { totals, openCart } = useStore(); return <button className="ib" aria-label="Open cart" onClick={openCart}><Svg html={SVG.cart} /><span className={"cnt" + (totals.n ? " on" : "")}>{totals.n}</span></button>; }

function Footer() {
  return (
    <footer><div className="wrap">
      <div><h4>Sunehri Dana Rice Traders</h4><p>Premium Basmati, Sella and Irri rice, delivered across Pakistan.</p></div>
      <div><h4>Explore</h4><Link to="/shop">Shop Rice</Link><Link to="/cook">Cook With Rice</Link><Link to="/tools">Rice Tools</Link><Link to="/prices">Price List</Link><Link to="/about">About Us</Link><Link to="/contact">Contact</Link><Link to="/">Explore in 3D</Link></div>
      <div><h4>Rice by type &amp; dish</h4>{CATS.map((c) => <Link key={c.k} to={"/" + CSLUG[c.k]}>{c.t}</Link>)}{["biryani", "pulao", "zarda", "kheer"].map((d) => <Link key={d} to={"/" + DSLUG[d]}>Best rice for {d}</Link>)}</div>
      <div><h4>Contact</h4><a target="_blank" rel="noopener" href={wa(HELLO)}>WhatsApp: 0302 6333536</a><p>Faisalabad, Punjab, Pakistan</p><p>Open daily 9 am – 9 pm</p></div>
      <div className="copy">© {new Date().getFullYear()} Sunehri Dana Rice Traders. Prices are indicative and change with the market.</div>
    </div></footer>
  );
}

function CartDrawer() {
  const { cart, cartOpen, closeAll, totals: t, changeQty, removeItem, openOrder } = useStore();
  const [name, setName] = useState(""), [city, setCity] = useState("");
  const left = FREE_DELIVERY_AT - t.sub, pct = Math.min(100, (t.sub / FREE_DELIVERY_AT) * 100);
  const checkout = () => {
    const lines = cart.map((it, i) => { const p = P[it.id]; return (i + 1) + ") " + p.n + " – " + it.size + " kg × " + it.qty + " = " + rs(packPrice(p, it.size) * it.qty); }).join("\n");
    openOrder("Assalam o Alaikum, I would like to place an order:\n\n" + lines + "\n\nTotal weight: " + t.kg + " kg\nIndicative total: " + rs(t.sub) + (t.save > 0 ? " (bulk saving " + rs(t.save) + ")" : "") + "\nName: " + (name || "-") + "\nCity/Address: " + (city || "-") + "\n\nPlease confirm today's rate, delivery charges and delivery time.", true);
  };
  return (
    <div className={"ov right" + (cartOpen ? " open" : "")} onClick={(e) => e.target === e.currentTarget && closeAll()}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your cart">
        <div className="dh"><h2 style={{ fontSize: "1.25rem" }}>Your cart</h2><button className="xbtn" aria-label="Close cart" onClick={closeAll}>✕</button></div>
        <div className="db">
          {!cart.length ? <div className="empty">Your cart is empty.<br /><br /><Link className="btn clay o" to="/shop" onClick={closeAll}>Browse rice</Link></div> :
            cart.map((it, i) => { const p = P[it.id]; return (
              <div className="item" key={it.id + "-" + it.size}>
                <div className="th"><Bag p={p} w={52} /></div>
                <div><b>{p.n}</b><br /><span className="mini">{it.size} kg pack · {rs(unitKg(p, it.size))}/kg</span>
                  <div className="qty"><button aria-label="Decrease" onClick={() => changeQty(i, -1)}>−</button><b>{it.qty}</b><button aria-label="Increase" onClick={() => changeQty(i, 1)}>+</button>
                    <button onClick={() => removeItem(i)} style={{ width: "auto", padding: "0 10px", fontWeight: 500, color: "var(--red)" }}>Remove</button></div></div>
                <b>{rs(packPrice(p, it.size) * it.qty)}</b>
              </div>); })}
        </div>
        {!!cart.length && <div className="df">
          <div className="mini" style={{ marginBottom: 2 }}>{left > 0 ? <>Add <b>{rs(left)}</b> more for <b>free delivery</b></> : <b style={{ color: "var(--wa)" }}>You have unlocked free delivery</b>}</div>
          <div className="prog neu-in"><i style={{ width: pct + "%" }} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}><span>Total weight</span><b>{t.kg} kg</b></div>
          {t.save > 0 && <div style={{ display: "flex", justifyContent: "space-between", color: "var(--wa)" }}><span>Bulk saving</span><b>− {rs(t.save)}</b></div>}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", margin: "6px 0 14px" }}><b>Total</b><b style={{ color: "var(--o)" }}>{rs(t.sub)}</b></div>
          <input className="f" placeholder="Your name" style={{ margin: "0 0 8px" }} value={name} onChange={(e) => setName(e.target.value)} />
          <input className="f" placeholder="City / delivery address" style={{ margin: "0 0 12px" }} value={city} onChange={(e) => setCity(e.target.value)} />
          <button className="btn clay g block" onClick={checkout}>Place order on WhatsApp</button>
          <p className="mini" style={{ marginTop: 8, textAlign: "center" }}>Final rate and delivery are confirmed on WhatsApp.</p>
        </div>}
      </aside>
    </div>
  );
}

function QuickView() {
  const { quick, setQuick, closeAll, addToCart } = useStore(), nav = useNavigate();
  if (!quick) return <div className="ov" />;
  const p = P[quick.id], { size, qty } = quick, sv = packOrig(p, size) - packPrice(p, size);
  const up = (o) => setQuick({ ...quick, ...o });
  return (
    <div className="ov open" onClick={(e) => e.target === e.currentTarget && closeAll()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={p.n}>
        <button className="xbtn" aria-label="Close" onClick={closeAll} style={{ position: "absolute", top: 16, right: 16 }}>✕</button>
        <div className="mgrid">
          <div><div className="neu-in" style={{ height: 260, display: "grid", placeItems: "center" }}><Bag p={p} w={230} /></div></div>
          <div>
            <span className="badge" style={{ marginBottom: 8 }}>{p.tag}</span>
            <h2 style={{ fontSize: "1.5rem" }}>{p.n}</h2>
            <p className="mini" style={{ margin: "6px 0" }}>{p.c} rice</p>
            <p style={{ color: "var(--muted)", fontSize: ".95rem" }}>{p.d}</p>
            <div className="specs">{[["Grain", p.grain], ["Aroma", p.aroma], ["Soak", p.soak], ["Rice : water", p.water], ["Cooking time", p.time]].map((s) => <div className="spec neu-in" key={s[0]}><b>{s[0]}</b>{s[1]}</div>)}</div>
            <div className="mini">Best for</div>
            <div className="bf">{p.best.map((b) => <button key={b} onClick={() => { closeAll(); nav("/" + DSLUG[b]); }}>{DISHES.find((x) => x.id === b).n}</button>)}</div>
            <div className="packs" style={{ marginBottom: 12 }}>{SIZES.map((s) => <button key={s} className="pk" aria-pressed={s === size} onClick={() => up({ size: s })}>{s} kg</button>)}</div>
            <div className="price">{rs(packPrice(p, size) * qty)}{sv > 0 && <s>{rs(packOrig(p, size) * qty)}</s>}<small>{rs(unitKg(p, size))}/kg{sv > 0 ? " · you save " + rs(sv * qty) : ""}</small></div>
            <div className="qty" style={{ margin: "10px 0 14px" }}><button aria-label="Decrease" onClick={() => up({ qty: Math.max(1, qty - 1) })}>−</button><b>{qty}</b><button aria-label="Increase" onClick={() => up({ qty: qty + 1 })}>+</button><span className="mini">&nbsp;bag(s)</span></div>
            <div className="row">
              <button className="btn clay o" onClick={() => { addToCart(p.id, size, qty); closeAll(); }}>Add to cart</button>
              <a className="btn clay g" target="_blank" rel="noopener" href={wa("Assalam o Alaikum, I would like to order:\n" + p.n + "\n" + size + " kg × " + qty + "\nIndicative price: " + rs(packPrice(p, size) * qty) + "\nPlease confirm today's rate and delivery.")}>Order now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Order modal: WhatsApp only (WhatsApp, WhatsApp Web, WhatsApp app, copy message) */
function OrderModal() {
  const { order, closeAll, showToast } = useStore();
  const [msg, setMsg] = useState("");
  useEffect(() => { if (order) setMsg(order.msg); }, [order]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(msg); showToast("Message copied. Paste it in a WhatsApp chat with 0302 6333536."); }
    catch (e) { const a = document.createElement("textarea"); a.value = msg; document.body.appendChild(a); a.select(); try { document.execCommand("copy"); showToast("Message copied. Paste it in a WhatsApp chat with 0302 6333536."); } catch (x) { showToast("Could not copy. Select the text and copy it by hand."); } a.remove(); }
  };
  const e = encodeURIComponent(msg);
  return (
    <div className={"ov" + (order ? " open" : "")} onClick={(ev) => ev.target === ev.currentTarget && closeAll()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Send your order on WhatsApp">
        <button className="xbtn" aria-label="Close" onClick={closeAll} style={{ position: "absolute", top: 16, right: 16 }}>✕</button>
        <h2 style={{ fontSize: "1.35rem", marginBottom: 4 }}>Send your order on WhatsApp</h2>
        <p className="mini">Review or edit your message, then open WhatsApp. We reply every day, 9 am to 9 pm.</p>
        <textarea style={{ marginTop: 12, minHeight: 140 }} value={msg} onChange={(x) => setMsg(x.target.value)} />
        <div className="opt-grid">
          <a className="btn clay g" target="_blank" rel="noopener" href={"https://wa.me/" + NUM + "?text=" + e}>WhatsApp</a>
          <a className="btn soft" target="_blank" rel="noopener" href={"https://web.whatsapp.com/send?phone=" + NUM + "&text=" + e}>WhatsApp Web</a>
          <a className="btn soft" href={"whatsapp://send?phone=" + NUM + "&text=" + e}>WhatsApp app</a>
          <button className="btn soft" onClick={copy}>Copy message</button>
        </div>
        <p className="mini">WhatsApp not opening? Try WhatsApp Web, or copy the message and paste it in a chat with 0302 6333536.</p>
      </div>
    </div>
  );
}

export default function Layout() {
  const { toast, openCart, totals, showToast } = useStore(), { pathname, search } = useLocation(), [top, setTop] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => { if (new URLSearchParams(search).get("cart") === "1") openCart(); }, [search]); // eslint-disable-line
  useEffect(() => { const f = () => setTop(window.scrollY > 700); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => { let h; try { if (!sessionStorage.getItem("sd_hint")) h = setTimeout(() => { sessionStorage.setItem("sd_hint", "1"); showToast("Not sure which rice to buy? Try the 30-second Rice Finder."); }, 25000); } catch (e) {} return () => clearTimeout(h); }, []); // eslint-disable-line
  const tab = (to, label, ic) => <Link to={to} className={pathname === to ? "on" : ""}><Svg html={SVG[ic]} />{label}</Link>;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="blob b1" /><div className="blob b2" />
      <Ticker /><Header />
      <main className="wrap"><Outlet /></main>
      <Footer />
      <a className="wafloat clay g" target="_blank" rel="noopener" href={wa(HELLO)} aria-label="Chat on WhatsApp"><Svg html={SVG.wa} />Need help? Chat with us</a>
      <button className="ib" id="totop" aria-label="Back to top" style={{ display: top ? "grid" : "none" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
      <nav className="bnav" aria-label="Quick">
        {tab("/store", "Home", "nHome")}{tab("/shop", "Shop", "nShop")}{tab("/cook", "Cook", "nCook")}
        <button onClick={openCart}><Svg html={SVG.nCart} />Cart<span className={"cnt" + (totals.n ? " on" : "")} style={{ top: -2, right: 2 }}>{totals.n}</span></button>
        <a className="wc" target="_blank" rel="noopener" href={wa(HELLO)}><Svg html={SVG.nWa} />WhatsApp</a>
      </nav>
      <CartDrawer /><QuickView /><OrderModal />
      <div id="toast" className={toast ? "on" : ""} role="status">{toast?.msg}{toast?.viewCart && <button onClick={openCart}>View cart</button>}</div>
    </>
  );
}
