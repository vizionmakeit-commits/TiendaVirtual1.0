import React from 'react';
import { Loader2, Store } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Cargando..." 
}) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-teal-600 rounded-full flex items-center justify-center mb-4">
            <Store className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-24 h-24 text-teal-400 animate-spin" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">
          {message}
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Estamos preparando todo para ti. Solo tomará un momento.
        </p>
        
        {/* Loading dots animation */}
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;