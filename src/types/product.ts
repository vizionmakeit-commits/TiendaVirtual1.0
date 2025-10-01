export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  tags?: string[];
  brand?: string;
  sku?: string;
  // Nuevas propiedades del backend
  atributos?: ProductAttribute[];
  en_promocion?: boolean;
  precio_online?: number;
  precio_promocional?: number;
  descripcion_larga?: string;
}

export interface ProductAttribute {
  nombre_atributo: string;
  valor_atributo: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock?: number;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

export interface ProductDetailsProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  relatedProducts?: Product[];
  isTransactional?: boolean;
}