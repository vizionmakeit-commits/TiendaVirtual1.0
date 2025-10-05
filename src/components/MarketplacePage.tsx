import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useBusinessSearch } from '../hooks/useBusinessSearch';
import BusinessCard from './BusinessCard';

interface MarketplacePageProps {
  onBusinessSelect: (subdomain: string) => void;
}

const MarketplacePage: React.FC<MarketplacePageProps> = ({ onBusinessSelect }) => {
  const { searchTerm, setSearchTerm, results, isLoading, error } = useBusinessSearch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Logo OneShop */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            {/* Logo con letras superpuestas O y S */}
            <div className="relative">
              <div className="flex items-center justify-center w-24 h-24 mb-4">
                {/* Letra O */}
                <div className="absolute left-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">O</span>
                </div>
                {/* Letra S superpuesta */}
                <div className="absolute right-0 w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">S</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Título OneShop */}
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="text-blue-600">One</span>
            <span className="text-teal-600">Shop</span>
          </h1>
        </div>

        {/* Bienvenida */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bienvenido
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Descubre lo mejor de Los Cabos
          </p>
          
          {/* Input de búsqueda */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-teal-400 animate-spin" />
                ) : (
                  <Search className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Busca un negocio..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          {/* Contenedor para resultados */}
          <div className="mt-6 max-w-2xl mx-auto">
            {error && (
              <div className="text-red-400 text-sm mb-4">
                {error}
              </div>
            )}
            
            {searchTerm.length > 2 && !isLoading && results.length === 0 && !error && (
              <div className="text-gray-400 text-sm">
                No se encontraron resultados para "{searchTerm}"
              </div>
            )}
            
            {results.length > 0 && (
              <div className="space-y-3">
                <div className="text-gray-300 text-sm mb-4">
                  {results.length} negocio{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                </div>
                {results.map((business) => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    onClick={onBusinessSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="mt-16 flex justify-center space-x-8">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 text-gray-400 text-sm">
          <p>Tu plataforma de comercio local</p>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;