import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import type { Product as SupabaseProduct } from '../../types/supabase';
import { useCartContext } from '../../context/CartContext';

interface ProductDetailsProps {
  product: SupabaseProduct;
  isOpen: boolean;
  onClose: () => void;
  isTransactional?: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  isTransactional = true
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartContext();

  const handleQuantityChange = (newQuantity: number) => {
    const maxStock = product.stock || 10;
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.titulo_tienda || product.nombre,
      price: getCurrentPrice(),
      image: product.main_image_url || getDefaultImage(),
      category: product.categoria || 'Producto',
      maxStock: product.stock || 10
    });
  };

  const getCurrentPrice = () => {
    if (product.en_promocion && product.precio_promocional) {
      return product.precio_promocional;
    }
    return product.precio_online || 0;
  };

  const getOriginalPrice = () => {
    if (product.en_promocion && product.precio_online) {
      return product.precio_online;
    }
    return undefined;
  };

  const getDiscountPercentage = () => {
    if (product.en_promocion && product.precio_online && product.precio_promocional) {
      return Math.round(((product.precio_online - product.precio_promocional) / product.precio_online) * 100);
    }
    return 0;
  };

  const getDefaultImage = () => {
    const categoryImages: Record<string, string> = {
      'Frutas y Verduras': 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Panadería': 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Lácteos': 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Carnes': 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Snacks': 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Bebidas': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Botellas': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Cocteles': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Comidas': 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Entradas': 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Tacos y Quesadillas': 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Tostadas': 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    
    return categoryImages[product.categoria || ''] || 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  const renderAttributeIcon = (attributeName: string) => {
    const name = attributeName.toLowerCase();
    return <div className="w-4 h-4 bg-teal-500 rounded-full" />;
  };

  const getBadges = () => {
    const badges = [];
    
    // Badge basado en etiquetas
    if (product.etiquetas && product.etiquetas.length > 0) {
      badges.push(...product.etiquetas.slice(0, 2)); // Máximo 2 badges
    } else {
      // Badges por defecto si no hay etiquetas
      badges.push('Signature');
      if (product.en_promocion) {
        badges.push('Popular');
      }
    }
    
    return badges;
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
                      src={product.main_image_url || getDefaultImage()}
                      alt={product.titulo_tienda || product.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Dynamic Badges */}
                  <div className="absolute top-8 left-8 flex flex-col space-y-2">
                    {getBadges().map((badge, index) => (
                      <span 
                        key={index}
                        className={`text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg ${
                          index === 0 ? 'bg-teal-600' : 'bg-green-600'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
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
                      {product.titulo_tienda || product.nombre}
                    </h1>
                    
                    {/* Simulated Rating - En un futuro esto vendría del backend */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`w-4 h-4 ${
                              star <= 4.5 ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">4.5</span>
                      <span className="text-gray-500 text-sm">(23 reviews)</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6 flex-1">
                    <p className="text-gray-700 leading-relaxed">
                      {product.descripcion_larga || `Delicioso ${product.nombre} de la mejor calidad.`}
                    </p>
                  </div>

                  {/* Attributes Section - DATOS REALES */}
                  {product.atributos && product.atributos.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                        Ingredientes
                      </h3>
                      <div className="space-y-3">
                        {product.atributos.map((atributo, index) => (
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
                          disabled={quantity >= (product.stock || 10)}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;