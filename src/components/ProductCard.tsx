import React from 'react';
import { Plus, Check } from 'lucide-react';
import { useCartContext } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { addItem, items } = useCartContext();
  const [isAdding, setIsAdding] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);

  const isInCart = items.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    
    // Simulate brief loading state
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name, // Este ya viene mapeado correctamente del productMapper
        price: product.price,
        image: product.image,
        category: product.category,
        maxStock: product.stock
      });
      
      setIsAdding(false);
      setJustAdded(true);
      
      // Reset the "just added" state after animation
      setTimeout(() => setJustAdded(false), 2000);
    }, 300);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div 
      className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Imagen del producto */}
      <div className="relative overflow-hidden h-48">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge de categoría */}
        <div className="absolute top-3 left-3">
          <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>
        
        {/* Badge de stock */}
        <div className="absolute top-3 right-3">
          <span className="bg-gray-900 bg-opacity-80 text-white text-xs px-2 py-1 rounded-full">
            En stock
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-teal-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Precio y botón */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">
            ${product.price.toFixed(2)}
          </span>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 active:scale-95 font-medium ${
              justAdded 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : isInCart
                ? 'bg-teal-700 hover:bg-teal-800 text-white'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            } ${isAdding ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>...</span>
              </>
            ) : justAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>{isInCart ? 'Agregar más' : 'Agregar'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;