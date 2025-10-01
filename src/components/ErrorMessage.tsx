import React from 'react';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
  subdomain?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, subdomain }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    // Ir al marketplace principal
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      const port = window.location.port ? `:${window.location.port}` : '';
      window.location.href = `${protocol}//${hostname}${port}`;
    } else {
      // En producción, ir al dominio principal
      const baseDomain = hostname.replace(/^[^.]+\./, '');
      window.location.href = `${protocol}//${baseDomain}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          ¡Oops! Algo salió mal
        </h1>
        
        <p className="text-gray-400 mb-2">
          {error}
        </p>
        
        {subdomain && (
          <p className="text-gray-500 text-sm mb-8">
            Subdominio: <code className="bg-gray-800 px-2 py-1 rounded">{subdomain}</code>
          </p>
        )}
        
        <div className="space-y-4">
          <button
            onClick={handleRefresh}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Intentar de nuevo</span>
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Ir al inicio</span>
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-500 text-sm">
            Si el problema persiste, contacta al soporte técnico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;