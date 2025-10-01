import React from 'react';
import { Check, X, Filter, RotateCcw, TrendingUp, Star, Zap, Tag } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showOnSale: boolean;
  onToggleOnSale: () => void;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

const categories = [
  { id: 'Frutas y Verduras', name: 'Frutas y Verduras', count: 45 },
  { id: 'Panadería', name: 'Panadería', count: 23 },
  { id: 'Lácteos', name: 'Lácteos', count: 18 },
  { id: 'Carnes', name: 'Carnes', count: 32 },
  { id: 'Snacks', name: 'Snacks', count: 67 },
  { id: 'Bebidas', name: 'Bebidas', count: 28 },
];

const sortOptions = [
  { id: 'default', name: 'Relevancia', icon: Filter },
  { id: 'trending', name: 'Tendencias', icon: TrendingUp },
  { id: 'rating', name: 'Mejor Puntuado', icon: Star },
  { id: 'bestseller', name: 'Más Vendidos', icon: Zap },
  { id: 'price-low', name: 'Precio: Menor a Mayor', icon: null },
  { id: 'price-high', name: 'Precio: Mayor a Menor', icon: null },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  selectedCategories,
  onToggleCategory,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
  showOnSale,
  onToggleOnSale,
  activeFiltersCount,
  onClearFilters
}) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onPriceRangeChange([priceRange[0], value]);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onPriceRangeChange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 100;
    onPriceRangeChange([priceRange[0], value]);
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Filtros</h2>
            {activeFiltersCount > 0 && (
              <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <button
                onClick={onClearFilters}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Limpiar filtros"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          <div className="p-6 space-y-8">
            {/* Ordenar por */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Ordenar por</h3>
              <div className="space-y-2">
                {sortOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name="sortBy"
                          value={option.id}
                          checked={sortBy === option.id}
                          onChange={(e) => onSortChange(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`
                          w-4 h-4 rounded-full border-2 transition-all duration-200
                          ${sortBy === option.id 
                            ? 'bg-teal-600 border-teal-600' 
                            : 'border-gray-500 group-hover:border-gray-400'
                          }
                        `}>
                          {sortBy === option.id && (
                            <div className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-0.5" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {IconComponent && <IconComponent className="w-4 h-4 text-gray-400" />}
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                          {option.name}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Ofertas especiales */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Ofertas Especiales</h3>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showOnSale}
                    onChange={onToggleOnSale}
                    className="sr-only"
                  />
                  <div className={`
                    w-5 h-5 rounded border-2 transition-all duration-200
                    ${showOnSale 
                      ? 'bg-teal-600 border-teal-600' 
                      : 'border-gray-500 group-hover:border-gray-400'
                    }
                  `}>
                    {showOnSale && <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    Solo productos en oferta
                  </span>
                </div>
              </label>
            </div>

            {/* Categorías */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categorías</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => onToggleCategory(category.id)}
                        className="sr-only"
                      />
                      <div className={`
                        w-5 h-5 rounded border-2 transition-all duration-200
                        ${selectedCategories.includes(category.id)
                          ? 'bg-teal-600 border-teal-600' 
                          : 'border-gray-500 group-hover:border-gray-400'
                        }
                      `}>
                        {selectedCategories.includes(category.id) && (
                          <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rango de Precio */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Rango de Precio</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <style jsx>{`
                    .slider::-webkit-slider-thumb {
                      appearance: none;
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: #14b8a6;
                      cursor: pointer;
                      border: 2px solid #fff;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    }
                    .slider::-moz-range-thumb {
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: #14b8a6;
                      cursor: pointer;
                      border: 2px solid #fff;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    }
                  `}</style>
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                    min="0"
                    max="100"
                    className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                    min="0"
                    max="100"
                    className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;