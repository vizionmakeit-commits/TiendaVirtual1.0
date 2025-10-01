import React from 'react';
import { Store } from 'lucide-react';
import type { BusinessResult } from '../types/supabase';

interface BusinessCardProps {
  business: BusinessResult;
  onClick: (subdomain: string) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onClick }) => {
  const handleClick = () => {
    onClick(business.subdomain);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-teal-500 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
    >
      <div className="flex items-center space-x-4">
        {/* Logo del negocio */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
            {business.logo_url ? (
              <img
                src={business.logo_url}
                alt={`${business.nombre_negocio} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback si la imagen no carga
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <Store 
              className={`w-6 h-6 text-gray-400 group-hover:text-teal-400 transition-colors ${
                business.logo_url ? 'hidden' : ''
              }`} 
            />
          </div>
        </div>

        {/* Información del negocio */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors truncate">
            {business.nombre_negocio}
          </h3>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            @{business.subdomain}
          </p>
        </div>

        {/* Indicador visual */}
        <div className="flex-shrink-0">
          <div className="w-2 h-2 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;