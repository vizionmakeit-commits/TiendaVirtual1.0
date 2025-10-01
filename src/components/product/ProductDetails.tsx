import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingCart, Clock, Thermometer } from 'lucide-react';
import { Product, ProductDetailsProps, ProductAttribute } from '../../types/product';
import { useCartContext } from '../../context/CartContext';
import ImageGallery from './ImageGallery';
import ProductRating from './ProductRating';

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  relatedProducts = [],
  isTransactional = true
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartContext();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: getCurrentPrice(),
      image: product.images[0],
      category: product.category,
      maxStock: product.stock
    });
  };

  const getCurrentPrice = () => {
    if (product.en_promocion && product.precio_promocional) {
      return product.precio_promocional;
    }
    return product.precio_online || product.price;
  };

  const getOriginalPrice = () => {
    if (product.en_promocion && product.precio_online) {
      return product.precio_online;
    }
    return product.originalPrice;
  };

  const getDiscountPercentage = () => {
    if (product.en_promocion && product.precio_online && product.precio_promocional) {
      return Math.round(((product.precio_online - product.precio_promocional) / product.precio_online) * 100);
    }
    return 0;
  };

  const renderAttributeIcon = (attributeName: string) => {
    const name = attributeName.toLowerCase();
    if (name.includes('tiempo') || name.includes('preparación')) {
      return <Clock className="w-4 h-4 text-amber-600" />;
    }
    if (name.includes('temperatura') || name.includes('intensidad')) {
      return <Thermometer className="w-4 h-4 text-red-500" />;
    }
    return <div className="w-4 h-4 bg-teal-500 rounded-full" />;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200"
              aria-label="Cerrar detalles del producto"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Main Content - Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Column - Image */}
                <div className="relative bg-gray-50 p-6">
                  <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-8 left-8 flex flex-col space-y-2">
                    <span className="bg-teal-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                      Signature
                    </span>
                    <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                      Popular
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-8 right-8">
                    <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
                      <div className="text-right">
                        {product.en_promocion && getOriginalPrice() && (
                          <div className="text-sm text-gray-500 line-through">
                            ${getOriginalPrice()?.toFixed(2)}
                          </div>
                        )}
                        <div className="text-2xl font-bold text-gray-900">
                          ${getCurrentPrice().toFixed(2)}
                        </div>
                        {product.en_promocion && getDiscountPercentage() > 0 && (
                          <div className="text-xs text-red-600 font-semibold">
                            -{getDiscountPercentage()}% OFF
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="p-6 flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                      {product.name}
                    </h1>
                    
                    <ProductRating 
                      rating={product.rating} 
                      reviewCount={product.reviewCount}
                      size="md"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-6 flex-1">
                    <p className="text-gray-700 leading-relaxed">
                      {product.descripcion_larga || product.description}
                    </p>
                  </div>

                  {/* Attributes Section */}
                  {product.atributos && product.atributos.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                        Ingredientes
                      </h3>
                      <div className="space-y-3">
                        {product.atributos.map((atributo: ProductAttribute, index: number) => (
                          <div key={index} className="flex items-center space-x-3">
                            {renderAttributeIcon(atributo.nombre_atributo)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                  {atributo.nombre_atributo}
                                </span>
                                <span className="text-sm text-gray-600">
                                  {atributo.valor_atributo}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-gray-700">Tiempo de preparación</span>
                      </div>
                      <span className="text-sm text-gray-600">3-4 minutos</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-gray-700">Temperatura</span>
                      </div>
                      <span className="text-sm text-gray-600">Hot</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Zone - Conditional */}
              {isTransactional && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center justify-between max-w-md ml-auto">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Añadir al Carrito</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;