import { createClient } from '@supabase/supabase-js';
import type { StorefrontData, PublicTenant } from '../types/supabase';

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Obtiene datos del storefront por subdominio
 */
export async function getStorefrontBySubdomain(subdomain: string): Promise<StorefrontData | null> {
  try {
    console.log(`🔍 Llamando RPC: get_storefront_by_subdomain con subdomain: "${subdomain}"`);
    
    const { data, error } = await supabase
      .rpc('get_storefront_by_subdomain', { subdomain_text: subdomain });

    if (error) {
      console.error('❌ Error en RPC get_storefront_by_subdomain:', error);
      console.error('📋 Detalles del error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return null;
    }

    console.log('📊 Respuesta RPC recibida:', data);
    return data;
  } catch (error) {
    console.error('❌ Error al llamar get_storefront_by_subdomain:', error);
    return null;
  }
}

/**
 * Obtiene todos los tenants públicos para el marketplace
 */
export async function getAllPublicTenants(): Promise<PublicTenant[]> {
  try {
    const { data, error } = await supabase
      .rpc('get_all_public_tenants');

    if (error) {
      console.error('Error fetching public tenants:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error calling get_all_public_tenants:', error);
    return [];
  }
}

/**
 * Verifica la conexión con Supabase
 */
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('tenants')
      .select('id')
      .limit(1);

    return !error;
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return false;
  }
}