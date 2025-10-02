import React from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCartContext } from '../context/CartContext';

interface HeaderProps {
  onMenuToggle: () => void;
  onCartToggle: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  storeName?: string;
  logoUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuToggle, 
  onCartToggle, 
  searchTerm, 
  onSearchChange,
  storeName = "FreshMart",
  logoUrl
}) => {
  const { t } = useLanguage();
  const { itemCount } = useCartContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y menu mobile */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 ml-2 lg:ml-0">
              <div className="flex items-center space-x-3">
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt={`${storeName} logo`}
                    className="w-8 h-8 rounded-full object-cover border border-gray-600"
                  />
                )}
                <h1 className="text-xl font-bold">{storeName}</h1>
              </div>
            </div>
          </div>

          {/* Buscador */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={t('search.placeholder')}
                className="w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              <User className="h-5 w-5" />
              <span className="hidden sm:block">{t('header.account')}</span>
            </button>
            <button
              onClick={onCartToggle}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 rounded-lg hover:bg-teal-700 transition-all duration-200 hover:scale-105 active:scale-95 relative group"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:block">{t('header.cart')}</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold shadow-lg animate-pulse group-hover:animate-none transition-all duration-200">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Buscador mobile */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t('search.placeholder')}
              className="w-full pl-10 pr-10 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;