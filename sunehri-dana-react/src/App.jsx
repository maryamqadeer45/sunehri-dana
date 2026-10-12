import { Navigate, Route, Routes } from "react-router-dom";
import { StoreProvider } from "./store.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import { Cook, Tools, Prices, About, Contact } from "./pages/Info.jsx";
import Landing from "./pages/Landing.jsx";
import Explore3D from "./pages/Explore3D.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        {/* The 3D gallery has its own CSS and no store chrome */}
        <Route path="/" element={<Explore3D />} />
        <Route path="/explore" element={<Navigate to="/" replace />} />
        <Route element={<Layout />}>
          <Route path="store" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cook" element={<Cook />} />
          <Route path="tools" element={<Tools />} />
          <Route path="prices" element={<Prices />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path=":slug" element={<Landing />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StoreProvider>
  );
}
