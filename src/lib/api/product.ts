
import axios from "axios";
import  { ProductsResponse } from "@/src/types/product";

export async function getProducts(): Promise<ProductsResponse> {
  const response = await axios.get<ProductsResponse>(
    "https://dummyjson.com/products"
  );

  return response.data;
}
