
"use client";

import type { Product } from "@/src/types/product";

interface CartProps {
  cart: Product[];
}

export default function Cart({ cart }: CartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
      <p className="whitespace-nowrap font-semibold text-gray-900">
        🛒 Cart ({cart.length})
      </p>
    </div>
  );
}
