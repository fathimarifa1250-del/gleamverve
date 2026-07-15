import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import ProductGrid from "../components/ProductGrid";
import CartDrawer from "../components/CartDrawer";

export default function Home() {
  return (
    <main className="bg-[#f5eee6]">
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <ProductGrid />
      <CartDrawer />
    </main>
  );
}