import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useStorefront } from '../hooks/useStorefront';
import { mapSupabaseProducts } from '../utils/productMapper';
import { useFilters } from '../hooks/useFilters';
import { CartProvider } from '../context/CartContext';
import Header from './Header';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import ShoppingCart from './cart/ShoppingCart';
import ProductDetails from './product/ProductDetails';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { Product } from '../types/product';

interface StorefrontPageProps {
  subdomain: string;
  onBackToMarketplace?: () => void;
}

const StorefrontPage: React.FC<StorefrontPageProps> = ({ subdomain, onBackToMarketplace }) => {
  const { data, loading, error } = useStorefront(subdomain);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mapear productos de Supabase al formato de la app
  const mappedProducts = data ? mapSupabaseProducts(data.products) : [];

  // Initialize filters with mapped products
  const {
    filters,
    filteredProducts,
    updateSearch,
    toggleCategory,
    updatePriceRange,
    updateSortBy,
    toggleOnSale,
    clearFilters,
    activeFiltersCount
  } = useFilters(mappedProducts);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  const handleContinueShopping = () => {
    setCartOpen(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
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
          onMenuToggle={handleMenuToggle} 
          onCartToggle={handleCartToggle}
          searchTerm={filters.searchTerm}
          onSearchChange={updateSearch}
          storeName={data.store.nombre_negocio}
          logoUrl={data.store.logo_url}
        />
        
        <div className="flex">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={handleSidebarClose}
            selectedCategories={filters.selectedCategories}
            onToggleCategory={toggleCategory}
            priceRange={filters.priceRange}
            onPriceRangeChange={updatePriceRange}
            sortBy={filters.sortBy}
            onSortChange={updateSortBy}
            showOnSale={filters.showOnSale}
            onToggleOnSale={toggleOnSale}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={clearFilters}
          />
          <ProductGrid 
            products={filteredProducts}
            searchTerm={filters.searchTerm}
            onProductClick={handleProductClick}
            storeName={data.store.nombre_negocio}
          />
        </div>

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