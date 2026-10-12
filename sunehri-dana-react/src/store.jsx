import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { P } from "./data/data.js";
import { load, save, packPrice, packOrig } from "./lib.js";

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load("sd_cart"));
  const [wish, setWish] = useState(() => load("sd_wish"));
  const [cartOpen, setCartOpen] = useState(false);
  const [quick, setQuick] = useState(null);            // {id,size,qty}
  const [order, setOrder] = useState(null);            // {msg,fromCart}
  const [toast, setToast] = useState(null);            // {msg,viewCart}
  const tt = useRef();

  useEffect(() => save("sd_cart", cart), [cart]);
  useEffect(() => save("sd_wish", wish), [wish]);

  const showToast = useCallback((msg, viewCart) => {
    setToast({ msg, viewCart }); clearTimeout(tt.current); tt.current = setTimeout(() => setToast(null), 3200);
  }, []);
  const closeAll = useCallback(() => { setCartOpen(false); setQuick(null); setOrder(null); }, []);
  useEffect(() => { const k = (e) => e.key === "Escape" && closeAll(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [closeAll]);

  const addToCart = useCallback((id, size, qty = 1) => {
    setCart((c) => {
      const f = c.find((i) => i.id === id && i.size === size);
      return f ? c.map((i) => (i === f ? { ...i, qty: i.qty + qty } : i)) : [...c, { id, size, qty }];
    });
    showToast(P[id].n + " (" + size + " kg) added", true);
  }, [showToast]);
  const changeQty = (i, d) => setCart((c) => c.map((it, k) => (k === i ? { ...it, qty: it.qty + d } : it)).filter((it) => it.qty > 0));
  const removeItem = (i) => setCart((c) => c.filter((_, k) => k !== i));
  const clearCart = () => setCart([]);
  const toggleWish = (id) => setWish((w) => { if (w.includes(id)) return w.filter((x) => x !== id); showToast("Saved to your list"); return [...w, id]; });

  const totals = useMemo(() => {
    let sub = 0, orig = 0, kg = 0, n = 0;
    cart.forEach((it) => { const p = P[it.id]; sub += packPrice(p, it.size) * it.qty; orig += packOrig(p, it.size) * it.qty; kg += it.size * it.qty; n += it.qty; });
    return { sub, orig, kg, n, save: orig - sub };
  }, [cart]);

  const v = {
    cart, wish, totals, addToCart, changeQty, removeItem, clearCart, toggleWish, showToast, closeAll,
    cartOpen, openCart: () => { closeAll(); setCartOpen(true); },
    quick, openQuick: (id, size = 25) => { closeAll(); setQuick({ id, size, qty: 1 }); }, setQuick,
    order, openOrder: (msg, fromCart = false) => { closeAll(); setOrder({ msg: msg || "Assalam o Alaikum, I would like to know about your rice rates and ordering.", fromCart }); },
    toast,
  };
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>;
}
