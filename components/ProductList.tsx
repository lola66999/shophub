"use client";

import { useState } from "react";
import type { Product } from "@/src/types/product";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section>
      <div>
        <h2 className="mt-4 mb-2 font-semibold text-gray-900">
          Search Product
        </h2>

        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          <p>Found {filteredProducts.length} products</p>
        )}
      </div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none focus:border-purple-500"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="rounded-xl bg-white p-4 shadow-sm">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-48 w-full object-contain"
            />

            <h2 className="mt-4 font-semibold text-gray-900">
              {product.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">{product.description}</p>

            <p className="mt-2 text-sm text-gray-500">⭐ {product.rating}</p>

            <p className="mt-2 text-lg font-bold text-purple-600">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
