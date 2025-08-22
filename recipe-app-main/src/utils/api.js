import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const recipeApi = {
  // Search recipes by name
  searchByName: async (name) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search.php?s=${name}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      return [];
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories.php`);
      return response.data.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  filterByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error filtering by category:', error);
      return [];
    }
  },

  getRecipeById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return null;
    }
  },

  getRandomRecipes: async (count = 12) => {
    try {
      const promises = Array.from({ length: count }, () => 
        axios.get(`${API_BASE_URL}/random.php`)
      );
      const responses = await Promise.all(promises);
      return responses.map(response => response.data.meals[0]).filter(Boolean);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      return [];
    }
  },
};