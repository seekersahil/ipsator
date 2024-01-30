export type Product = {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  created_at: string;
  photo_url: string;
  price: number;
  updated_at: string;
};
export type ProductCategory = string;

export type ProductAPIModel = {
  limit: number;
  message: string;
  offset: number;
  products: Product[];
  success: boolean;
  total_products: number;
};
