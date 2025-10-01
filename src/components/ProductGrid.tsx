import React from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Verduras Frescas Mixtas',
    description: 'Selección premium de verduras frescas del día. Incluye zanahorias, brócoli, espinacas y más.',
    price: 15.99,
    images: [
      'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'Frutas y Verduras',
    stock: 25,
    rating: 4.5,
    reviewCount: 23,
    specifications: {
      'Origin': 'Local Farm',
      'Organic': 'Yes',
      'Weight': '2 lbs'
    }
  },
  {
    id: '2',
    name: 'Frutas Tropicales Mixtas',
    description: 'Mangos, piñas, papayas y más frutas tropicales maduras y jugosas.',
    price: 18.75,
    originalPrice: 22.50,
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'Frutas y Verduras',
    stock: 18,
    rating: 4.8,
    reviewCount: 45
  },
  {
    id: '3',
    name: 'Pan Artesanal Integral',
    description: 'Pan integral artesanal horneado diariamente con ingredientes naturales.',
    price: 8.50,
    images: ['https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'Panadería',
    stock: 12,
    rating: 4.2,
    reviewCount: 18
  },
  {
    id: '4',
    name: 'Quesos Gourmet Variados',
    description: 'Selección de quesos premium: manchego, brie, roquefort y más.',
    price: 24.99,
    images: ['https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'Lácteos',
    stock: 8,
    rating: 4.7,
    reviewCount: 32
  },
  {
    id: '5',
    name: 'Carne Premium Angus',
    description: 'Cortes premium de res Angus, perfectos para asados y parrillas.',
    price: 32.00,
    images: ['https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'Carnes',
    stock: 6,
    rating: 4.9,
    reviewCount: 67
  },
  {
    id: '6',
    name: 'Mix de Frutos Secos',
    description: 'Mezcla premium de almendras, nueces, pistachos y avellanas.',
    price: 16.25,
    images: ['https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'Snacks',
    stock: 20,
    rating: 4.3,
    reviewCount: 28
  }
];

interface ProductGridProps {
  products: Product[];
  searchTerm: string;
  onProductClick?: (product: Product) => void;
  storeName?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  searchTerm, 
  onProductClick,
  storeName = "FreshMart"
}) => {
  const getCategoryTitle = () => {
    if (searchTerm) {
      return `Resultados para "${searchTerm}"`;
    }
    return `Productos de ${storeName}`;
  };

  const getCategoryDescription = () => {
    if (searchTerm) {
      return `${products.length} productos encontrados`;
    }
    return `Productos frescos y de la mejor calidad en ${storeName}`;
  };

  return (
    <div className="flex-1 p-6">
      {/* Header de la sección */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{getCategoryTitle()}</h2>
            <p className="text-gray-400">{getCategoryDescription()}</p>
          </div>
          {searchTerm && (
            <div className="flex items-center space-x-2 text-gray-400">
              <Search className="w-5 h-5" />
              <span className="text-sm">Búsqueda activa</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={{
              ...product,
              image: product.images[0]
            }} 
            onProductClick={onProductClick}
          />
        ))}
      </div>

      {/* Estado vacío */}
      {products.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              No se encontraron productos
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm 
                ? `No hay resultados para "${searchTerm}". Intenta con otros términos de búsqueda.`
                : 'Intenta ajustar los filtros de búsqueda o explorar otras categorías.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;