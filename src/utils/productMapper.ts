import type { Product as SupabaseProduct } from '../types/supabase';
import type { Product as AppProduct } from '../types/product';

/**
 * Mapea productos de Supabase al formato de la aplicación
 */
export const mapSupabaseProductToApp = (supabaseProduct: SupabaseProduct): AppProduct => {
  // Generar imágenes por defecto basadas en categoría si no hay imagen
  const getDefaultImage = (categoria?: string): string => {
    const categoryImages: Record<string, string> = {
      'Frutas y Verduras': 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Panadería': 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Lácteos': 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Carnes': 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Snacks': 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Bebidas': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Botellas': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Cocteles': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Comidas': 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Entradas': 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Tacos y Quesadillas': 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Tostadas': 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    
    return categoryImages[categoria || ''] || 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  // Calcular rating simulado basado en el precio (para demo)
  const simulatedRating = Math.min(5, Math.max(3, 4 + (Math.random() - 0.5)));
  const simulatedReviews = Math.floor(Math.random() * 50) + 5;

  // Simular atributos para demo si no existen
  const simulatedAttributes = [
    { nombre_atributo: 'Granos arábica selectos', valor_atributo: '100%' },
    { nombre_atributo: 'Tostado artesanal medio', valor_atributo: 'Perfecto' },
    { nombre_atributo: 'Notas de chocolate', valor_atributo: 'Intensas' },
    { nombre_atributo: 'Toques de caramelo', valor_atributo: 'Suaves' }
  ];
  return {
    id: supabaseProduct.id,
    name: supabaseProduct.nombre,
    description: supabaseProduct.descripcion_larga || `Delicioso ${supabaseProduct.nombre} de la mejor calidad.`,
    price: supabaseProduct.en_promocion && supabaseProduct.precio_promocional 
      ? supabaseProduct.precio_promocional 
      : supabaseProduct.precio_venta || 0,
    originalPrice: supabaseProduct.en_promocion && supabaseProduct.precio_promocional 
      ? supabaseProduct.precio_venta 
      : undefined,
    images: supabaseProduct.main_image_url 
      ? [supabaseProduct.main_image_url, getDefaultImage(supabaseProduct.categoria)]
      : [getDefaultImage(supabaseProduct.categoria)],
    category: supabaseProduct.categoria || 'Varios',
    stock: supabaseProduct.stock || 10,
    rating: simulatedRating,
    reviewCount: simulatedReviews,
    tags: supabaseProduct.categoria ? [supabaseProduct.categoria.toLowerCase()] : ['producto'],
    sku: supabaseProduct.id,
    // Nuevos campos del backend
    atributos: simulatedAttributes,
    en_promocion: supabaseProduct.en_promocion || false,
    precio_online: supabaseProduct.precio_venta || 0,
    precio_promocional: supabaseProduct.precio_promocional || undefined,
    descripcion_larga: supabaseProduct.descripcion_larga || `Esta es nuestra estrella principal, una mezcla única desarrollada durante más de 20 años de experiencia. Utilizamos granos 100% arábica de diferentes regiones de América Latina, tostados artesanalmente hasta alcanzar el punto perfecto que resalta las notas naturales de chocolate belga y caramelo.`
  };
};

/**
 * Mapea array de productos de Supabase
 */
export const mapSupabaseProducts = (supabaseProducts: SupabaseProduct[]): AppProduct[] => {
  // El backend ya filtra con is_public=true, no necesitamos filtrado adicional
  return supabaseProducts.map(mapSupabaseProductToApp);
};