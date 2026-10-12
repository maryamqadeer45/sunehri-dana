import { Link } from "react-router-dom";
export default function NotFound() {
  return <section className="page show"><div className="glass pad"><h1>Page not found</h1><p style={{ margin: "8px 0 16px" }}>That page does not exist. Browse our rice instead.</p><Link className="btn clay o" to="/shop">Shop rice</Link></div></section>;
}
