import React, { useEffect, useState } from 'react';
import { X, Heart, Clock, Users, Play, ChefHat } from 'lucide-react';
import { recipeApi } from '../utils/api';
import { processRecipe } from '../utils/recipeProcessor';
import { useFavorites } from '../hooks/useFavorites';

const RecipeDetails = ({ recipeId, onClose }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await recipeApi.getRecipeById(recipeId);
        if (data) {
          setRecipe(data);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to load recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md">
          <p className="text-red-600 text-center">{error || 'Recipe not found'}</p>
          <button
            onClick={onClose}
            className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const processedRecipe = processRecipe(recipe);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative">
            <img
              src={processedRecipe.image}
              alt={processedRecipe.name}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={() => toggleFavorite(processedRecipe.id)}
              className="absolute top-4 right-16 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Heart
                className={`h-6 w-6 ${
                  isFavorite(processedRecipe.id)
                    ? 'text-red-500 fill-current'
                    : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          <div className="p-6">
            {/* Title and Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {processedRecipe.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {processedRecipe.category}
                </span>
                <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                  {processedRecipe.area}
                </span>
                {processedRecipe.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>30 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>4 servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  <span>{processedRecipe.area} Cuisine</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Ingredients */}
              <div className="lg:col-span-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Ingredients
                </h2>
                <div className="space-y-2">
                  {processedRecipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-gray-600 text-sm">{ingredient.measure}</span>
                    </div>
                  ))}
                </div>

                {processedRecipe.youtube && (
                  <div className="mt-6">
                    <a
                      href={processedRecipe.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors justify-center"
                    >
                      <Play className="h-5 w-5" />
                      Watch Video Tutorial
                    </a>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Instructions
                </h2>
                <div className="prose prose-lg max-w-none">
                  {processedRecipe.instructions.split('\n').map((step, index) => {
                    if (step.trim()) {
                      return (
                        <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <p className="text-gray-700 leading-relaxed">{step.trim()}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;