
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
   rating: number;
   description:string;
   category: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
 
}
