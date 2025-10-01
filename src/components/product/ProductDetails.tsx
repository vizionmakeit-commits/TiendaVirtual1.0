import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product, ProductDetailsProps } from '../../types/product';
import { useCartContext } from '../../context/CartContext';
import ImageGallery from './ImageGallery';
import ProductRating from './ProductRating';
import ProductReviews from './ProductReviews';

// Sample reviews data
const sampleReviews = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent quality and fast delivery. The product exceeded my expectations!',
    date: '2024-01-15',
    helpful: 12,
    verified: true
  },
  {
    id: '2',
    userId: '2',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Good value for money. Would recommend to others.',
    date: '2024-01-10',
    helpful: 8,
    verified: true
  },
  {
    id: '3',
    userId: '3',
    userName: 'Emma Davis',
    rating: 5,
    comment: 'Perfect! Exactly what I was looking for. Great customer service too.',
    date: '2024-01-08',
    helpful: 15,
    verified: false
  }
];

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  relatedProducts = [] 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
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
      price: product.price,
      image: product.images[0],
      category: product.category,
      maxStock: product.stock
    });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200"
              aria-label="Close product details"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                {/* Left Column - Images */}
                <div className="space-y-6">
                  <ImageGallery images={product.images} productName={product.name} />
                </div>

                {/* Right Column - Product Info */}
                <div className="space-y-6">
                  {/* Product Header */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                      {discount > 0 && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                          {discount}% OFF
                        </span>
                      )}
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                      {product.name}
                    </h1>
                    
                    <ProductRating 
                      rating={product.rating} 
                      reviewCount={product.reviewCount}
                      size="lg"
                    />
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      product.stock > 10 ? 'bg-green-500' : 
                      product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm text-gray-600">
                      {product.stock > 10 ? 'In Stock' : 
                       product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Variants */}
                  {product.variants && product.variants.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        {product.variants[0].name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((variant) => (
                          <button
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant.id)}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${
                              selectedVariant === variant.id
                                ? 'border-teal-500 bg-teal-50 text-teal-700'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {variant.value}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.stock} available
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                    
                    <div className="flex space-x-3">
                      <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>Wishlist</span>
                      </button>
                      <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Truck className="w-5 h-5 text-teal-600" />
                        <span>Free shipping on orders over $50</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <RotateCcw className="w-5 h-5 text-teal-600" />
                        <span>30-day return policy</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Shield className="w-5 h-5 text-teal-600" />
                        <span>2-year warranty included</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Tabs */}
              <div className="border-t border-gray-200">
                <div className="px-6">
                  <div className="flex space-x-8 border-b border-gray-200">
                    {[
                      { id: 'description', label: 'Description' },
                      { id: 'specifications', label: 'Specifications' },
                      { id: 'reviews', label: 'Reviews' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-teal-500 text-teal-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-6">
                  {activeTab === 'description' && (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {activeTab === 'specifications' && (
                    <div className="space-y-4">
                      {product.specifications ? (
                        Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-900">{key}</span>
                            <span className="text-gray-600">{value}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No specifications available.</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <ProductReviews
                      reviews={sampleReviews}
                      averageRating={product.rating}
                      totalReviews={product.reviewCount}
                    />
                  )}
                </div>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="border-t border-gray-200 px-6 py-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Related Products</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.slice(0, 4).map((relatedProduct) => (
                      <div key={relatedProduct.id} className="group cursor-pointer">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                          <img
                            src={relatedProduct.images[0]}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                          {relatedProduct.name}
                        </h4>
                        <p className="text-teal-600 font-bold text-sm">
                          ${relatedProduct.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
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