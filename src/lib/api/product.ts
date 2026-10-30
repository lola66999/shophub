

import axios from "axios";
import type { ProductsResponse } from "@/src/types/product";

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const response = await axios.get<ProductsResponse>(
      "https://dummyjson.com/products",
      { timeout: 10000 }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API request failed:", {
        message: error.message,
        status: error.response?.status,
        code: error.code,
      });
    } else {
      console.error("Unexpected error:", error);
    }

    throw error;
  }
}
