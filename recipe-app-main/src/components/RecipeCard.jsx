import React from 'react';
import { Heart, Clock, Users } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

const RecipeCard = ({ recipe, onClick }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe.idMeal);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite(recipe.idMeal)
                ? 'text-red-500 fill-current'
                : 'text-gray-600'
            }`}
          />
        </button>
        <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          {recipe.strCategory}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {recipe.strMeal}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>4 servings</span>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            {recipe.strArea}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;