export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  inStock?: boolean;
  unit?: string;
  description?: string;
  soldCount?: number;
  totalStock?: number;
  badge?: string;
}

export type ProductSortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating"
  | "discount"
  | "newest";

export interface FilterState {
  category: string;
  searchTerm: string;
  priceRange: [number, number];
  brands: string[];
  minRating: number | null;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}
