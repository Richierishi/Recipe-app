// Recipe type definitions as JSDoc comments for better IDE support

/**
 * @typedef {Object} Recipe
 * @property {string} idMeal
 * @property {string} strMeal
 * @property {string} [strDrinkAlternate]
 * @property {string} strCategory
 * @property {string} strArea
 * @property {string} strInstructions
 * @property {string} strMealThumb
 * @property {string} [strTags]
 * @property {string} [strYoutube]
 * @property {string} [strIngredient1]
 * @property {string} [strIngredient2]
 * @property {string} [strIngredient3]
 * @property {string} [strIngredient4]
 * @property {string} [strIngredient5]
 * @property {string} [strIngredient6]
 * @property {string} [strIngredient7]
 * @property {string} [strIngredient8]
 * @property {string} [strIngredient9]
 * @property {string} [strIngredient10]
 * @property {string} [strIngredient11]
 * @property {string} [strIngredient12]
 * @property {string} [strIngredient13]
 * @property {string} [strIngredient14]
 * @property {string} [strIngredient15]
 * @property {string} [strIngredient16]
 * @property {string} [strIngredient17]
 * @property {string} [strIngredient18]
 * @property {string} [strIngredient19]
 * @property {string} [strIngredient20]
 * @property {string} [strMeasure1]
 * @property {string} [strMeasure2]
 * @property {string} [strMeasure3]
 * @property {string} [strMeasure4]
 * @property {string} [strMeasure5]
 * @property {string} [strMeasure6]
 * @property {string} [strMeasure7]
 * @property {string} [strMeasure8]
 * @property {string} [strMeasure9]
 * @property {string} [strMeasure10]
 * @property {string} [strMeasure11]
 * @property {string} [strMeasure12]
 * @property {string} [strMeasure13]
 * @property {string} [strMeasure14]
 * @property {string} [strMeasure15]
 * @property {string} [strMeasure16]
 * @property {string} [strMeasure17]
 * @property {string} [strMeasure18]
 * @property {string} [strMeasure19]
 * @property {string} [strMeasure20]
 * @property {string} [strSource]
 * @property {string} [strImageSource]
 * @property {string} [strCreativeCommonsConfirmed]
 * @property {string} [dateModified]
 */

/**
 * @typedef {Object} Category
 * @property {string} idCategory
 * @property {string} strCategory
 * @property {string} strCategoryThumb
 * @property {string} strCategoryDescription
 */

/**
 * @typedef {Object} ProcessedRecipe
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} area
 * @property {string} instructions
 * @property {string} image
 * @property {string[]} tags
 * @property {string} [youtube]
 * @property {Array<{name: string, measure: string}>} ingredients
 */

export {};