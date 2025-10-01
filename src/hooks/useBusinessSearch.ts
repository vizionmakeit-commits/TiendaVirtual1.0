import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import type { BusinessResult } from '../types/supabase';

interface UseBusinessSearchResult {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  results: BusinessResult[];
  isLoading: boolean;
  error: string | null;
}

export const useBusinessSearch = (): UseBusinessSearchResult => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<BusinessResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Limpiar resultados si el término está vacío
    if (searchTerm.trim() === '') {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Solo buscar si el término tiene más de 2 caracteres
    if (searchTerm.length <= 2) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Implementar debounce de 300ms
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log(`🔍 Buscando negocios con término: "${searchTerm}"`);
        
        const { data, error: rpcError } = await supabase
          .rpc('search_tenants_by_name', { search_term: searchTerm });

        if (rpcError) {
          console.error('❌ Error en RPC search_tenants_by_name:', rpcError);
          setError('Error al buscar negocios');
          setResults([]);
        } else {
          console.log('✅ Resultados encontrados:', data?.length || 0);
          setResults(data || []);
        }
      } catch (err) {
        console.error('❌ Error al buscar negocios:', err);
        setError('Error al buscar negocios');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    // Cleanup function para cancelar el timeout si el componente se desmonta o searchTerm cambia
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    isLoading,
    error
  };
};