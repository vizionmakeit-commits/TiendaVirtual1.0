import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useStorefront } from '../hooks/useStorefront';
import { mapSupabaseProducts } from '../utils/productMapper';
import { CartProvider } from '../context/CartContext';
import Header from './Header';
import ProductGrid from './ProductGrid';
import ShoppingCart from './cart/ShoppingCart';
import ProductDetails from './product/ProductDetails';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { Product } from '../types/product';
import type { Product as SupabaseProduct } from '../types/supabase';

interface StorefrontPageProps {
  subdomain: string;
  onBackToMarketplace?: () => void;
}

const StorefrontPage: React.FC<StorefrontPageProps> = ({ subdomain, onBackToMarketplace }) => {
  const { data, loading, error } = useStorefront(subdomain);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SupabaseProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mapear productos de Supabase al formato de la app
  const mappedProducts = data ? mapSupabaseProducts(data.products) : [];

  // Filtrar productos por término de búsqueda
  const filteredProducts = mappedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  const handleContinueShopping = () => {
    setCartOpen(false);
  };

  const handleProductClick = (product: Product) => {
    // Encontrar el producto original de Supabase
    const originalProduct = data?.products.find(p => p.id === product.id);
    if (originalProduct) {
      setSelectedProduct(originalProduct);
    }
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  // Estados de carga y error
  if (loading) {
    return <LoadingSpinner message={`Cargando tienda ${subdomain}...`} />;
  }

  if (error) {
    return <ErrorMessage error={error} subdomain={subdomain} />;
  }

  if (!data) {
    return <ErrorMessage error="Tienda no encontrada" subdomain={subdomain} />;
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-900">
        {/* Botón de regreso */}
        {onBackToMarketplace && (
          <div className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={onBackToMarketplace}
                className="flex items-center space-x-2 py-3 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Marketplace</span>
              </button>
            </div>
          </div>
        )}
        
        <Header 
          onMenuToggle={() => {}} 
          onCartToggle={handleCartToggle}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          storeName={data.store.nombre_negocio}
          logoUrl={data.store.logo_url}
        />
        
        <ProductGrid 
          products={filteredProducts}
          searchTerm={searchTerm}
          onProductClick={handleProductClick}
          storeName={data.store.nombre_negocio}
        />

        <ShoppingCart 
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onContinueShopping={handleContinueShopping}
        />

        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={handleCloseProductDetails}
          />
        )}
      </div>
    </CartProvider>
  );
};

export default StorefrontPage;