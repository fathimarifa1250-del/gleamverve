import ProductCard from "@/components/ProductCard";
import { headers } from "next/headers";

async function getProducts() {
  const host = (await headers()).get("host");

  const res = await fetch(`http://${host}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function CollectionsPage() {
  const products = await getProducts();

  const activeProducts = products
    .filter((product: any) => product.Status === "Active")
    .sort(
      (a: any, b: any) =>
        Number(a["Display Order"] || 999) -
        Number(b["Display Order"] || 999)
    );

  return (
    <main className="min-h-screen bg-[#f5eee6] px-4 md:px-20 py-12 md:py-20">

      <h1 className="text-3xl md:text-5xl font-serif text-[#5a422a] mb-2">
        All Collections
      </h1>

      <p className="text-[#5a422a]/70 mb-8 md:mb-14">
        {activeProducts.length} Products
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">

        {activeProducts.map((product: any) => (
          <ProductCard
            key={product["Product ID"]}
            product={product}
          />
        ))}

      </div>

    </main>
  );
}