
import { connection } from "next/server";
import { getProducts } from "@/src/lib/api/product";
import Shop from "@/components/Shop";

export default async function HomePage() {
  await connection();

  const data = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-8">
      <Shop products={data.products} />
    </main>
  );
}
