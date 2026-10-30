
"use client";

import { useState } from "react";
import type { Product } from "@/src/types/product";
import ProductList from "./ProductList";
import Cart from "./Cart";

interface ShopProps {
  products: Product[];
}

export default function Shop({ products }: ShopProps) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-purple-100 p-3 text-2xl">
            🛍️
          </div>

          <div>
            <h1 className="text-3xl font-bold text-purple-600">
              ShopHub
            </h1>
            <p className="text-sm text-gray-500">
              Discover your favorites
            </p>
          </div>
        </div>

        <Cart cart={cart} />
      </header>

      {/* Products and filters */}
      <ProductList
        products={products}
        onAddToCart={addToCart}
      />
    </div>
  );
}

