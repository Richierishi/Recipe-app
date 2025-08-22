/**
 * Process a raw recipe from the API into a more usable format
 * @param {import('../types/Recipe.js').Recipe} recipe 
 * @returns {import('../types/Recipe.js').ProcessedRecipe}
 */
export const processRecipe = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }

  return {
    id: recipe.idMeal,
    name: recipe.strMeal,
    category: recipe.strCategory,
    area: recipe.strArea,
    instructions: recipe.strInstructions,
    image: recipe.strMealThumb,
    tags: recipe.strTags ? recipe.strTags.split(',').map(tag => tag.trim()) : [],
    youtube: recipe.strYoutube,
    ingredients,
  };
};