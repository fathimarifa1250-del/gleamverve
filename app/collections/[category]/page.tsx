import ProductCard from "@/components/ProductCard";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  return res.json();
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const products = await getProducts();

  const filteredProducts = products.filter(
    (product: any) =>
      product.Status === "Active" &&
      product.Category.toLowerCase() === category.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-[#f5eee6] px-4 md:px-20 py-12 md:py-20">

      <h1 className="text-3xl md:text-5xl font-serif text-[#5a422a] capitalize mb-2">
        {category}
      </h1>

      <p className="text-[#5a422a]/70 mb-8 md:mb-14">
        {filteredProducts.length} Products
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">

        {filteredProducts.map((product: any) => (
          <ProductCard
            key={product["Product ID"]}
            product={product}
          />
        ))}

      </div>

    </main>
  );
}