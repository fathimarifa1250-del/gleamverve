import ProductDetails from "@/components/ProductDetails";
import RelatedProducts from "@/components/RelatedProducts";

async function getProduct(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <main className="min-h-screen bg-[#f5eee6] px-6 md:px-20 py-20">

      <ProductDetails product={product} />

      <RelatedProducts
        category={product.Category}
        currentId={product["Product ID"]}
      />

    </main>
  );
}