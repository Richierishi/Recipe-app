import React, { useEffect, useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { recipeApi } from '../utils/api';

const FilterPanel = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await recipeApi.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
      >
        <Filter className="h-5 w-5 text-gray-500" />
        <span className="text-gray-700">
          {selectedCategory || 'All Categories'}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
          <div
            onClick={() => handleCategorySelect('')}
            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
              !selectedCategory ? 'bg-orange-50 text-orange-600' : ''
            }`}
          >
            All Categories
          </div>
          {loading ? (
            <div className="px-4 py-3 text-gray-500">Loading categories...</div>
          ) : (
            categories.map((category) => (
              <div
                key={category.idCategory}
                onClick={() => handleCategorySelect(category.strCategory)}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                  selectedCategory === category.strCategory ? 'bg-orange-50 text-orange-600' : ''
                }`}
              >
                {category.strCategory}
              </div>
            ))
          )}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FilterPanel;