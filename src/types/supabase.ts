// Tipos para las respuestas de Supabase RPC functions

export interface Store {
  id: string;
  nombre_negocio: string;
  logo_url?: string;
  subdomain: string;
  plan?: string;
  timezone?: string;
  created_at: string;
}

export interface Product {
  id: string;
  nombre: string;
  precio_venta?: number;
  categoria?: string;
  stock?: number;
  main_image_url?: string;
  descripcion_larga?: string;
  en_promocion?: boolean;
  precio_promocional?: number;
  created_at: string;
  atributos?: Array<{
    nombre_atributo: string;
    valor_atributo: string;
  }>;
}

export interface StorefrontData {
  store: Store;
  products: Product[];
}

export interface PublicTenant {
  id: string;
  nombre_negocio: string;
  logo_url?: string;
  subdomain: string;
}

export interface BusinessTenant {
  id: string;
  nombre_negocio: string;
  logo_url?: string;
  subdomain: string;
  descripcion?: string;
  categoria?: string;
  plan?: string;
  activo?: boolean;
}

export interface BusinessResult {
  id: string;
  nombre_negocio: string;
  logo_url: string | null;
  subdomain: string;
}
// Tipos para las funciones RPC de Supabase
export interface SupabaseRPCFunctions {
  get_storefront_by_subdomain: (args: { subdomain_text: string }) => Promise<StorefrontData>;
  get_all_public_tenants: () => Promise<PublicTenant[]>;
  search_tenants_by_name: (args: { search_term: string }) => Promise<BusinessResult[]>;
}