// Product type
export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  seller: string;
  featured: boolean;
  updatedAt: string;
  includes: string[];
  features: string[];
  reviewsList: {
    name: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  demoUrl?: string;
  sellerId: string;
}

// Purchase type
export interface Purchase {
  id: string;
  product: Product;
  purchaseDate: string;
  downloadCount: number;
}

// Sale type
export interface Sale {
  id: string;
  product: Product;
  customer: string;
  date: string;
  amount: number;
}

// Cart item type
export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin";
  status: "active" | "inactive" | "pending";
  joinDate: string;
}
