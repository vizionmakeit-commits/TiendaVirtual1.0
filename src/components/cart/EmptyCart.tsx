import React from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

interface EmptyCartProps {
  onContinueShopping: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  return (
    <div className="text-center py-16 px-6">
      <div className="max-w-md mx-auto">
        {/* Empty Cart Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>

        {/* Empty State Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Looks like you haven't added any items to your cart yet. 
          Start shopping to fill it up with amazing products!
        </p>

        {/* Continue Shopping Button */}
        <button
          onClick={onContinueShopping}
          className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Continue Shopping</span>
        </button>

        {/* Additional Actions */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Need help finding something?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors">
              Browse Categories
            </button>
            <button className="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors">
              View Popular Items
            </button>
            <button className="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;