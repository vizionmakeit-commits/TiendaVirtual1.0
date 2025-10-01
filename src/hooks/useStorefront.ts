import { useState, useEffect } from 'react';
import { getStorefrontBySubdomain } from '../utils/supabase';
import type { StorefrontData } from '../types/supabase';

interface UseStorefrontResult {
  data: StorefrontData | null;
  loading: boolean;
  error: string | null;
}

export const useStorefront = (subdomain: string | undefined): UseStorefrontResult => {
  const [data, setData] = useState<StorefrontData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStorefront = async () => {
      if (!subdomain) {
        setError('No subdomain provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔍 Buscando datos del storefront para: ${subdomain}`);
        console.log(`📡 URL Supabase: ${import.meta.env.VITE_SUPABASE_URL}`);
        console.log(`🔑 Anon Key configurada: ${import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Sí' : 'No'}`);
        
        const storefrontData = await getStorefrontBySubdomain(subdomain);
        
        if (!storefrontData) {
          setError(`❌ Tienda no encontrada para el subdominio: ${subdomain}`);
          setData(null);
        } else {
          console.log('✅ Datos del storefront cargados:', storefrontData);
          console.log(`🏪 Tienda: ${storefrontData.store?.nombre_negocio}`);
          console.log(`📦 Productos encontrados: ${storefrontData.products?.length || 0}`);
          console.log('📋 Lista de productos:', storefrontData.products?.map(p => ({ 
            id: p.id, 
            nombre: p.nombre, 
            categoria: p.categoria,
            precio: p.precio_venta 
          })));
          setData(storefrontData);
        }
      } catch (err) {
        console.error('❌ Error al cargar storefront:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar la tienda');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStorefront();
  }, [subdomain]);

  return { data, loading, error };
};