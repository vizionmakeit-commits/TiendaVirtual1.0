import { useState, useMemo } from 'react';
import { Product } from '../types/product';

export interface FilterState {
  searchTerm: string;
  selectedCategories: string[];
  priceRange: [number, number];
  sortBy: 'default' | 'price-low' | 'price-high' | 'rating' | 'trending' | 'bestseller';
  showOnSale: boolean;
}

export const useFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedCategories: [],
    priceRange: [0, 100],
    sortBy: 'default',
    showOnSale: false
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        filters.selectedCategories.includes(product.category)
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // On sale filter
    if (filters.showOnSale) {
      filtered = filtered.filter(product => product.originalPrice && product.originalPrice > product.price);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'trending':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'bestseller':
        filtered.sort((a, b) => (b.reviewCount * b.rating) - (a.reviewCount * a.rating));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [products, filters]);

  const updateSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(c => c !== category)
        : [...prev.selectedCategories, category]
    }));
  };

  const updatePriceRange = (priceRange: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange }));
  };

  const updateSortBy = (sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const toggleOnSale = () => {
    setFilters(prev => ({ ...prev, showOnSale: !prev.showOnSale }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      selectedCategories: [],
      priceRange: [0, 100],
      sortBy: 'default',
      showOnSale: false
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.selectedCategories.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) count++;
    if (filters.sortBy !== 'default') count++;
    if (filters.showOnSale) count++;
    return count;
  };

  return {
    filters,
    filteredProducts,
    updateSearch,
    toggleCategory,
    updatePriceRange,
    updateSortBy,
    toggleOnSale,
    clearFilters,
    activeFiltersCount: getActiveFiltersCount()
  };
};