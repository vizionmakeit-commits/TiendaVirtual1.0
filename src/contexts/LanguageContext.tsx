import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations = {
  es: {
    // Header
    'search.placeholder': 'Buscar productos...',
    'header.account': 'Cuenta',
    'header.cart': 'Carrito',
    
    // Marketplace
    'marketplace.welcome': 'Bienvenido',
    'marketplace.subtitle': 'Descubre lo mejor de Los Cabos',
    'marketplace.search.placeholder': 'Busca un negocio...',
    'marketplace.no.results': 'No se encontraron resultados para',
    'marketplace.businesses.found': 'negocio encontrado',
    'marketplace.businesses.found.plural': 'negocios encontrados',
    'marketplace.platform.description': 'Tu plataforma de comercio local',
    
    // Storefront
    'storefront.products': 'Productos de',
    'storefront.quality.description': 'Productos frescos y de la mejor calidad en',
    'storefront.results.for': 'Resultados para',
    'storefront.products.found': 'productos encontrados',
    'storefront.no.products': 'No se encontraron productos',
    'storefront.no.products.description': 'No hay resultados para',
    'storefront.try.other.terms': 'Intenta con otros términos de búsqueda.',
    'storefront.back.to.marketplace': 'Volver al Marketplace',
    
    // Product Card
    'product.in.stock': 'En stock',
    'product.add': 'Agregar',
    'product.add.more': 'Agregar más',
    'product.added': '¡Agregado!',
    
    // Product Details
    'product.details.ingredients': 'Datos Destacados',
    'product.details.preparation.time': 'Tiempo de preparación',
    'product.details.temperature': 'Temperatura',
    'product.details.quantity': 'Cantidad:',
    'product.details.add.to.cart': 'Añadir al Carrito',
    'product.details.reviews': 'reviews',
    
    // Cart
    'cart.title': 'Carrito de Compras',
    'cart.empty': 'Tu carrito está vacío',
    'cart.empty.description': 'Parece que no has agregado ningún producto a tu carrito aún. ¡Comienza a comprar para llenarlo con productos increíbles!',
    'cart.continue.shopping': 'Continuar Comprando',
    'cart.subtotal': 'Subtotal',
    'cart.tax': 'Impuestos',
    'cart.shipping': 'Envío',
    'cart.free': 'Gratis',
    'cart.total': 'Total',
    'cart.checkout': 'Proceder al Pago',
    'cart.processing': 'Procesando...',
    'cart.clear': 'Vaciar Carrito',
    'cart.items': 'artículos',
    
    // Sidebar/Filters
    'filters.title': 'Filtros',
    'filters.clear': 'Limpiar filtros',
    'filters.sort.by': 'Ordenar por',
    'filters.sort.relevance': 'Relevancia',
    'filters.sort.trending': 'Tendencias',
    'filters.sort.rating': 'Mejor Puntuado',
    'filters.sort.bestseller': 'Más Vendidos',
    'filters.sort.price.low': 'Precio: Menor a Mayor',
    'filters.sort.price.high': 'Precio: Mayor a Menor',
    'filters.special.offers': 'Ofertas Especiales',
    'filters.on.sale.only': 'Solo productos en oferta',
    'filters.categories': 'Categorías',
    'filters.price.range': 'Rango de Precio',
    
    // Categories
    'category.fruits.vegetables': 'Frutas y Verduras',
    'category.bakery': 'Panadería',
    'category.dairy': 'Lácteos',
    'category.meat': 'Carnes',
    'category.snacks': 'Snacks',
    'category.drinks': 'Bebidas',
    'category.bottles': 'Botellas',
    'category.cocktails': 'Cocteles',
    'category.food': 'Comidas',
    'category.appetizers': 'Entradas',
    'category.tacos': 'Tacos y Quesadillas',
    'category.tostadas': 'Tostadas',
    
    // Error messages
    'error.something.wrong': '¡Oops! Algo salió mal',
    'error.try.again': 'Intentar de nuevo',
    'error.go.home': 'Ir al inicio',
    'error.contact.support': 'Si el problema persiste, contacta al soporte técnico.',
    
    // Loading
    'loading.default': 'Cargando...',
    'loading.store': 'Cargando tienda',
    'loading.preparing': 'Estamos preparando todo para ti. Solo tomará un momento.',
  },
  en: {
    // Header
    'search.placeholder': 'Search products...',
    'header.account': 'Account',
    'header.cart': 'Cart',
    
    // Marketplace
    'marketplace.welcome': 'Welcome',
    'marketplace.subtitle': 'Discover the best of Los Cabos',
    'marketplace.search.placeholder': 'Search for a business...',
    'marketplace.no.results': 'No results found for',
    'marketplace.businesses.found': 'business found',
    'marketplace.businesses.found.plural': 'businesses found',
    'marketplace.platform.description': 'Your local commerce platform',
    
    // Storefront
    'storefront.products': 'Products from',
    'storefront.quality.description': 'Fresh products of the best quality at',
    'storefront.results.for': 'Results for',
    'storefront.products.found': 'products found',
    'storefront.no.products': 'No products found',
    'storefront.no.products.description': 'No results for',
    'storefront.try.other.terms': 'Try other search terms.',
    'storefront.back.to.marketplace': 'Back to Marketplace',
    
    // Product Card
    'product.in.stock': 'In stock',
    'product.add': 'Add',
    'product.add.more': 'Add more',
    'product.added': 'Added!',
    
    // Product Details
    'product.details.ingredients': 'Key Features',
    'product.details.preparation.time': 'Preparation time',
    'product.details.temperature': 'Temperature',
    'product.details.quantity': 'Quantity:',
    'product.details.add.to.cart': 'Add to Cart',
    'product.details.reviews': 'reviews',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.empty.description': 'Looks like you haven\'t added any items to your cart yet. Start shopping to fill it up with amazing products!',
    'cart.continue.shopping': 'Continue Shopping',
    'cart.subtotal': 'Subtotal',
    'cart.tax': 'Tax',
    'cart.shipping': 'Shipping',
    'cart.free': 'Free',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.processing': 'Processing...',
    'cart.clear': 'Clear Cart',
    'cart.items': 'items',
    
    // Sidebar/Filters
    'filters.title': 'Filters',
    'filters.clear': 'Clear filters',
    'filters.sort.by': 'Sort by',
    'filters.sort.relevance': 'Relevance',
    'filters.sort.trending': 'Trending',
    'filters.sort.rating': 'Top Rated',
    'filters.sort.bestseller': 'Best Sellers',
    'filters.sort.price.low': 'Price: Low to High',
    'filters.sort.price.high': 'Price: High to Low',
    'filters.special.offers': 'Special Offers',
    'filters.on.sale.only': 'On sale items only',
    'filters.categories': 'Categories',
    'filters.price.range': 'Price Range',
    
    // Categories
    'category.fruits.vegetables': 'Fruits & Vegetables',
    'category.bakery': 'Bakery',
    'category.dairy': 'Dairy',
    'category.meat': 'Meat',
    'category.snacks': 'Snacks',
    'category.drinks': 'Drinks',
    'category.bottles': 'Bottles',
    'category.cocktails': 'Cocktails',
    'category.food': 'Food',
    'category.appetizers': 'Appetizers',
    'category.tacos': 'Tacos & Quesadillas',
    'category.tostadas': 'Tostadas',
    
    // Error messages
    'error.something.wrong': 'Oops! Something went wrong',
    'error.try.again': 'Try again',
    'error.go.home': 'Go home',
    'error.contact.support': 'If the problem persists, contact technical support.',
    
    // Loading
    'loading.default': 'Loading...',
    'loading.store': 'Loading store',
    'loading.preparing': 'We are preparing everything for you. It will only take a moment.',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    // Cargar idioma guardado del localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};