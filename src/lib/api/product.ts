
import axios from "axios";
import type { Product } from "@/src/types/product";

// Fake Store API dan keladigan mahsulot formati
interface FakeStoreProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

// ShopHub ishlatadigan javob formati
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const API_URL = "https://fakestoreapi.com/products";

// Fake Store mahsulotini ShopHub formatiga aylantirish
function mapProduct(item: FakeStoreProduct): Product {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    category: item.category,
    thumbnail: item.image,
    rating: item.rating.rate,
  };
}

// Barcha mahsulotlarni olish
export async function getProducts(): Promise<ProductsResponse> {
  const response = await axios.get<FakeStoreProduct[]>(API_URL);

  const products = response.data.map(mapProduct);

  return {
    products,
    total: products.length,
    skip: 0,
    limit: products.length,
  };
}

// Mahsulotlarni nomi bo'yicha qidirish
export async function searchProducts(
  query: string
): Promise<ProductsResponse> {
  const data = await getProducts();

  const products = data.products.filter((product) =>
    product.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return {
    products,
    total: products.length,
    skip: 0,
    limit: products.length,
  };
}

