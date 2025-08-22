import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'recipe-app-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
      }
    }
  }, []);

  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const addToFavorites = (recipeId) => {
    if (!favorites.includes(recipeId)) {
      const newFavorites = [...favorites, recipeId];
      saveFavorites(newFavorites);
    }
  };

  const removeFromFavorites = (recipeId) => {
    const newFavorites = favorites.filter(id => id !== recipeId);
    saveFavorites(newFavorites);
  };

  const toggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFromFavorites(recipeId);
    } else {
      addToFavorites(recipeId);
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.includes(recipeId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };
};