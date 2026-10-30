import { connection } from "next/server";
import { getProducts } from "@/src/lib/api/product";
import ProductList from "@/components/ProductList";

export default async function HomePage() {
  await connection();
  const data = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-8 text-3xl font-bold text-purple-600">ShopHub 🛍️</h1>

      <ProductList products={data.products} />
    </main>
  );
}
