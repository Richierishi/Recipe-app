import React, { useState, useEffect } from 'react';
import { ChefHat, Heart } from 'lucide-react';
import { recipeApi } from './utils/api';
import { useFavorites } from './hooks/useFavorites';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();

  // Load initial recipes
  useEffect(() => {
    const loadInitialRecipes = async () => {
      try {
        setLoading(true);
        const randomRecipes = await recipeApi.getRandomRecipes(16);
        setRecipes(randomRecipes);
        setFilteredRecipes(randomRecipes);
      } catch (error) {
        console.error('Error loading initial recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialRecipes();
  }, []);

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSelectedCategory('');
    setShowFavorites(false);

    if (!query.trim()) {
      // If search is empty, load random recipes
      setLoading(true);
      const randomRecipes = await recipeApi.getRandomRecipes(16);
      setRecipes(randomRecipes);
      setFilteredRecipes(randomRecipes);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const results = await recipeApi.searchByName(query);
      setRecipes(results);
      setFilteredRecipes(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setFilteredRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle category filter
  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setShowFavorites(false);

    if (!category) {
      // If no category selected, load random recipes
      setLoading(true);
      const randomRecipes = await recipeApi.getRandomRecipes(16);
      setRecipes(randomRecipes);
      setFilteredRecipes(randomRecipes);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const results = await recipeApi.filterByCategory(category);
      setRecipes(results);
      setFilteredRecipes(results);
    } catch (error) {
      console.error('Error filtering recipes:', error);
      setFilteredRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle favorites view
  const handleShowFavorites = async () => {
    if (!showFavorites && favorites.length > 0) {
      setLoading(true);
      try {
        const favoriteRecipes = await Promise.all(
          favorites.map(id => recipeApi.getRecipeById(id))
        );
        const validFavorites = favoriteRecipes.filter(Boolean);
        setRecipes(validFavorites);
        setFilteredRecipes(validFavorites);
        setShowFavorites(true);
        setSearchQuery('');
        setSelectedCategory('');
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // Load random recipes when turning off favorites view
      setShowFavorites(false);
      setLoading(true);
      const randomRecipes = await recipeApi.getRandomRecipes(16);
      setRecipes(randomRecipes);
      setFilteredRecipes(randomRecipes);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-xl">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">RecipeApp</h1>
                <p className="text-gray-600">Discover amazing recipes</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <SearchBar onSearch={handleSearch} />
              <FilterPanel
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              <button
                onClick={handleShowFavorites}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                  showFavorites
                    ? 'bg-red-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className={`h-5 w-5 ${showFavorites ? 'fill-current' : ''}`} />
                <span>Favorites ({favorites.length})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Bar */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {showFavorites && (
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">
                Showing Favorites
              </span>
            )}
            {searchQuery && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Search: "{searchQuery}"
              </span>
            )}
            {selectedCategory && (
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                Category: {selectedCategory}
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-500">
              {showFavorites
                ? "You haven't saved any favorites yet."
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onClick={() => setSelectedRecipeId(recipe.idMeal)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Recipe Details Modal */}
      {selectedRecipeId && (
        <RecipeDetails
          recipeId={selectedRecipeId}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
    </div>
  );
}

export default App;