import React from 'react';
import { ChefHat } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ChefHat className="h-6 w-6 text-orange-500" />
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading delicious recipes...</p>
    </div>
  );
};

export default LoadingSpinner;