import React, { useState } from 'react';
import { getRouteInfo, debugRouteInfo } from './utils/getRouteInfo';
import StorefrontPage from './components/StorefrontPage';
import MarketplacePage from './components/MarketplacePage';
import LoadingSpinner from './components/LoadingSpinner';
import { testSupabaseConnection } from './utils/supabase';

function App() {
  const [routeInfo, setRouteInfo] = useState(() => getRouteInfo());
  const [supabaseConnected, setSupabaseConnected] = useState<boolean | null>(null);

  // Debug route info en desarrollo
  React.useEffect(() => {
    debugRouteInfo();
    
    // Test Supabase connection
    const checkSupabase = async () => {
      console.log('🔍 Verificando conexión a Supabase...');
      const isConnected = await testSupabaseConnection();
      setSupabaseConnected(isConnected);
      console.log('📡 Estado de conexión Supabase:', isConnected ? '✅ Conectado' : '❌ Error');
    };
    checkSupabase();

    // Listen for route changes
    const handleLocationChange = () => {
      setRouteInfo(getRouteInfo());
    };
    
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  console.log('🚀 App Route Info:', routeInfo);

  // Mostrar estado de conexión
  if (supabaseConnected === null) {
    return <LoadingSpinner message="Verificando conexión a Supabase..." />;
  }

  if (!supabaseConnected) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-2xl">❌</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Error de Conexión</h1>
          <p className="text-gray-400 mb-6">
            No se pudo conectar a Supabase. Verifica tus credenciales en el archivo .env
          </p>
          <div className="bg-gray-800 p-4 rounded-lg text-left text-sm">
            <p className="text-gray-300 mb-2">Verifica que tengas:</p>
            <code className="text-teal-400 block">VITE_SUPABASE_URL=tu_url</code>
            <code className="text-teal-400 block">VITE_SUPABASE_ANON_KEY=tu_key</code>
          </div>
        </div>
      </div>
    );
  }
  
  // Enrutador condicional basado en el modo detectado
  if (routeInfo.mode === 'storefront' && routeInfo.subdomain) {
    return <StorefrontPage subdomain={routeInfo.subdomain} />;
  }
  
  if (routeInfo.mode === 'marketplace') {
    return <MarketplacePage />;
  }
  
  return (
    <LoadingSpinner message="Preparando marketplace..." />
  );
}

export default App;