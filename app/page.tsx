import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Collections from "../components/Collections";
import ProductGrid from "../components/ProductGrid";
import CartDrawer from "../components/CartDrawer";

export default function Home() {
  return (
    <main className="bg-[#f5eee6]">
      <Navbar />
      <Hero />
      <Collections />
      <ProductGrid />
      <CartDrawer />
    </main>
  );
}