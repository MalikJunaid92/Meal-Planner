/**
 * @typedef {Object} Recipe
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} cookTime
 * @property {number} servings
 * @property {"Easy" | "Medium" | "Hard"} difficulty
 * @property {string[]} tags
 * @property {string} [image]
 * @property {string[]} ingredients
 * @property {string[]} steps
 * @property {Date} [createdAt]
 * @property {Date} [updatedAt]
 */

/**
 * @typedef {Object} MealPlan
 * @property {string} id
 * @property {string} date
 * @property {Recipe} [breakfast]
 * @property {Recipe} [lunch]
 * @property {Recipe} [dinner]
 */

/**
 * @typedef {"produce" | "meat" | "dairy" | "pantry" | "herbs" | "frozen" | "bakery" | "other"} GroceryCategory
 */

/**
 * @typedef {Object} GroceryItem
 * @property {number} id
 * @property {string} name
 * @property {string} quantity
 * @property {GroceryCategory} category
 * @property {boolean} checked
 * @property {string} [fromRecipe]
 * @property {number} [fromRecipeId]
 */

/**
 * @typedef {Object} GroceryList
 * @property {string} id
 * @property {GroceryItem[]} items
 * @property {"manual" | "meal-plan"} generatedFrom
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {"breakfast" | "lunch" | "dinner"} MealType
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {Object} [preferences]
 * @property {string[]} [preferences.dietaryRestrictions]
 * @property {string[]} [preferences.favoriteCategories]
 * @property {Object} [preferences.mealPreferences]
 * @property {MealType[]} [preferences.mealPreferences.preferredMealTypes]
 * @property {number} [preferences.mealPreferences.mealFrequency]
 */

/**
 * @typedef {Object} CreateRecipeData
 * @property {string} title
 * @property {string} description
 * @property {number} cookTime
 * @property {number} servings
 * @property {"Easy" | "Medium" | "Hard"} difficulty
 * @property {string[]} tags
 * @property {string[]} ingredients
 * @property {string[]} steps
 * @property {string} [image]
 */

/**
 * @typedef {Object} UpdateRecipeData
 * @property {number} id
 * @property {string} [title]
 * @property {string} [description]
 * @property {number} [cookTime]
 * @property {number} [servings]
 * @property {"Easy" | "Medium" | "Hard"} [difficulty]
 * @property {string[]} [tags]
 * @property {string[]} ingredients
 * @property {string[]} [steps]
 * @property {string} [image]
 */

// Constants for validation and UI
export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"]

export const GROCERY_CATEGORIES = ["produce", "meat", "dairy", "pantry", "herbs", "frozen", "bakery", "other"]

export const MEAL_TYPES = ["breakfast", "lunch", "dinner"]

export const CATEGORY_LABELS = {
  produce: "Produce",
  meat: "Meat & Seafood",
  dairy: "Dairy",
  pantry: "Pantry",
  herbs: "Herbs & Spices",
  frozen: "Frozen",
  bakery: "Bakery",
  other: "Other",
}

// Default values for forms
export const DEFAULT_RECIPE = {
  title: "",
  description: "",
  cookTime: 30,
  servings: 4,
  difficulty: "Easy",
  tags: [],
  ingredients: [""],
  steps: [""],
  image: "",
}

export const DEFAULT_USER_PREFERENCES = {
  dietaryRestrictions: [],
  favoriteCategories: [],
  mealPreferences: {
    preferredMealTypes: ["breakfast", "lunch", "dinner"],
    mealFrequency: 7,
  },
}
