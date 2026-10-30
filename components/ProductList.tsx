
"use client";

import { useState } from "react";
import type { Product } from "@/src/types/product";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductList({
  products,
  onAddToCart,
}: ProductListProps) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [category, setCategory] = useState("all");

  // Search va Category Filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sorting
  const sortedProducts = [...filteredProducts];

  if (sortOrder === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortOrder === "az") {
    sortedProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sortOrder === "za") {
    sortedProducts.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  return (
    <section>
      {/* Filter panel */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Find your perfect product
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search */}
          <div>
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Search
            </label>

            <input
              id="product-search"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-gray-900 outline-none focus:border-purple-500"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="product-category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <select
              id="product-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-gray-900 outline-none focus:border-purple-500"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label
              htmlFor="product-sort"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Sort By
            </label>

            <select
              id="product-sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-gray-900 outline-none focus:border-purple-500"
            >
              <option value="default">Default sorting</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="az">Name: A to Z</option>
              <option value="za">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products heading */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">
          Our Products
        </h2>

        <p className="text-sm text-gray-500">
          {sortedProducts.length} products found
        </p>
      </div>

      {/* Product cards */}
      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-gray-800">
            No products found
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex h-52 items-center justify-center rounded-xl bg-gray-50 p-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>

              <div className="mt-4 flex flex-1 flex-col">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-purple-600">
                  {product.category}
                </p>

                <h3 className="line-clamp-2 min-h-12 font-semibold text-gray-900">
                  {product.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  ⭐ {product.rating}
                </p>

                <div className="mt-auto pt-4">
                  <p className="mb-4 text-xl font-bold text-purple-600">
                    ${product.price.toFixed(2)}
                  </p>

                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="w-full cursor-pointer rounded-xl bg-purple-600 px-4 py-3 font-medium text-white transition-colors hover:bg-purple-700"
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
