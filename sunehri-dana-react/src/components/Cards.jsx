import { Link } from "react-router-dom";
import { DISHES, DSLUG, P } from "../data/data.js";
import { Dish } from "./Bits.jsx";
export function UseCard({ d, full }) {
  const best = d.picks.map((i) => P[i].n).slice(0, full ? 3 : 2).join(", ");
  return (
    <article className="clay use">
      <Dish d={d} /><h3>{d.n}</h3>
      <p>{d.d}{full && <><br /><br /><b>Tip:</b> {d.tip}</>}</p>
      <span className="best">Best rice: {best}</span>
      <Link className="btn clay o sm" to={"/" + DSLUG[d.id]}>Shop rice for {d.n.toLowerCase()}</Link>
    </article>
  );
}
export const dishById = (id) => DISHES.find((d) => d.id === id);
