import { NUM, DISC, P } from "./data/data.js";
export const rs = (n) => "Rs " + Math.round(n).toLocaleString("en-PK");
export const wa = (t) => "https://wa.me/" + NUM + "?text=" + encodeURIComponent(t);
export const byId = (i) => P[i];
export const unitKg = (p, s) => Math.round(p.kg * (1 - DISC[s]));
export const packPrice = (p, s) => unitKg(p, s) * s;
export const packOrig = (p, s) => p.kg * s;
export const minPrice = (k) => Math.min(...P.filter((p) => p.c === k).map((p) => p.kg));
export const load = (k) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : []; } catch (e) { return []; } };
export const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
export function plan(kg) {
  let rem = kg; const out = [];
  [50, 25, 10, 5].forEach((s, i) => { const n = i < 3 ? Math.floor(rem / s) : Math.ceil(rem / s); if (n > 0) { out.push({ s, n }); rem -= n * s; } });
  return out;
}
export function countdownText() {
  const now = new Date(), end = new Date(); end.setHours(21, 0, 0, 0);
  const s = Math.max(0, Math.floor((end - now) / 1000));
  if (!s) return "orders open tomorrow 9 am";
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((v) => String(v).padStart(2, "0")).join(":");
}
