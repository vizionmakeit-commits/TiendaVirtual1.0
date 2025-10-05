export interface RouteInfo {
  mode: 'storefront' | 'marketplace';
  subdomain?: string;
}

/**
 * Detecta el modo de la aplicación basado en la URL actual
 * @returns RouteInfo con el modo y subdominio si aplica
 */
export function getRouteInfo(): RouteInfo {
  // En desarrollo, usamos localhost
  if (typeof window === 'undefined') {
    return { mode: 'marketplace' };
  }

  const hostname = window.location.hostname;
  
  // Para desarrollo local y entornos de vista previa
  if (hostname === 'localhost' || hostname === '127.0.0.1' || isPreviewEnvironment(hostname)) {
    // Podemos simular subdominios usando parámetros de URL para testing
    const urlParams = new URLSearchParams(window.location.search);
    const testSubdomain = urlParams.get('subdomain');
    
    if (testSubdomain) {
      return {
        mode: 'storefront',
        subdomain: testSubdomain
      };
    }
    
    return { mode: 'marketplace' };
  }

  // Para producción
  const parts = hostname.split('.');
  
  // Si tiene más de 2 partes, es un subdominio
  // Ejemplo: pizzeria-luigi.tuplataforma.com
  if (parts.length > 2) {
    const subdomain = parts[0];
    
    // Excluir subdominios del sistema (www, api, admin, etc.)
    const systemSubdomains = ['www', 'api', 'admin', 'app', 'dashboard'];
    
    if (!systemSubdomains.includes(subdomain)) {
      return {
        mode: 'storefront',
        subdomain: subdomain
      };
    }
  }
  
  // Dominio principal o subdominios del sistema
  return { mode: 'marketplace' };
}

/**
 * Detecta si estamos en un entorno de vista previa (como Bolt, Vercel, Netlify, etc.)
 * @param hostname - El hostname actual
 * @returns true si es un entorno de vista previa
 */
function isPreviewEnvironment(hostname: string): boolean {
  // Patrones comunes de entornos de vista previa
  const previewPatterns = [
    /^[a-z0-9]{8,}-.*\.bolt\.new$/,           // Bolt preview URLs
    /^[a-z0-9]{8,}-.*\.vercel\.app$/,         // Vercel preview URLs
    /^[a-z0-9]{8,}-.*\.netlify\.app$/,        // Netlify preview URLs
    /^[a-z0-9]{8,}-.*\.surge\.sh$/,           // Surge preview URLs
    /^[a-z0-9]{8,}-.*\.herokuapp\.com$/,      // Heroku preview URLs
    /^[a-z0-9]{8,}\..*\.pages\.dev$/,         // Cloudflare Pages
    /^preview-[a-z0-9]{8,}\..*$/,             // Generic preview pattern
  ];
  
  return previewPatterns.some(pattern => pattern.test(hostname));
}
/**
 * Genera URL de storefront para un subdominio dado
 * @param subdomain - El subdominio de la tienda
 * @returns URL completa del storefront
 */
export function generateStorefrontUrl(subdomain: string): string {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // En desarrollo y entornos de vista previa
  if (hostname === 'localhost' || hostname === '127.0.0.1' || isPreviewEnvironment(hostname)) {
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${protocol}//${hostname}${port}?subdomain=${subdomain}`;
  }
  
  // En producción
  const baseDomain = hostname.replace(/^[^.]+\./, ''); // Remueve cualquier subdominio existente
  return `${protocol}//${subdomain}.${baseDomain}`;
}

/**
 * Hook para obtener información de ruta de forma reactiva
 */
export function useRouteInfo(): RouteInfo {
  const [routeInfo, setRouteInfo] = React.useState<RouteInfo>(() => getRouteInfo());
  
  React.useEffect(() => {
    const handleLocationChange = () => {
      setRouteInfo(getRouteInfo());
    };
    
    // Escuchar cambios en la URL (para SPAs)
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  return routeInfo;
}

// Para debugging en desarrollo
export function debugRouteInfo(): void {
  if (process.env.NODE_ENV === 'development') {
    const info = getRouteInfo();
    const hostname = window.location.hostname;
    const isPreview = isPreviewEnvironment(hostname);
    
    console.log('🔍 Route Info Debug:', {
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      search: window.location.search,
      isPreviewEnvironment: isPreview,
      routeInfo: info
    });
  }
}