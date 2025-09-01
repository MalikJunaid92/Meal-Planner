import { MealPlanService } from "./meal-plan-service.js"

const categoryMapping = {
  // Produce
  "bell pepper": "produce",
  onion: "produce",
  garlic: "produce",
  ginger: "produce",
  "green onions": "produce",
  lemon: "produce",
  carrots: "produce",
  potatoes: "produce",
  peas: "produce",
  cilantro: "produce",

  // Meat & Seafood
  chicken: "meat",
  pancetta: "meat",
  salmon: "meat",

  // Dairy & Eggs
  eggs: "dairy",
  parmesan: "dairy",
  "coconut milk": "dairy",

  // Pantry & Condiments
  spaghetti: "pantry",
  "soy sauce": "pantry",
  "oyster sauce": "pantry",
  "sesame oil": "pantry",
  "vegetable oil": "pantry",
  "sesame seeds": "pantry",
  "olive oil": "pantry",
  "curry powder": "pantry",
  salt: "pantry",
  pepper: "pantry",

  // Herbs & Spices
  dill: "herbs",
  "garlic powder": "herbs",
}

export class GroceryService {
  static groceryLists = []
  static nextItemId = 1

  static async generateFromMealPlan(startDate) {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const weekPlans = await MealPlanService.getWeekMealPlan(startDate)
    const ingredientMap = new Map()

    // Collect all ingredients from meal plans
    weekPlans.forEach((plan) => {
      ;[plan.breakfast, plan.lunch, plan.dinner].forEach((recipe) => {
        if (recipe) {
          recipe.ingredients.forEach((ingredient) => {
            const normalizedName = this.normalizeIngredientName(ingredient)
            const quantity = this.extractQuantity(ingredient)

            if (ingredientMap.has(normalizedName)) {
              const existing = ingredientMap.get(normalizedName)
              existing.recipes.push(recipe.title)
              // For now, just keep the first quantity - in real app would sum quantities
            } else {
              ingredientMap.set(normalizedName, {
                quantity,
                recipes: [recipe.title],
              })
            }
          })
        }
      })
    })

    // Convert to grocery items
    const items = Array.from(ingredientMap.entries()).map(([name, data]) => ({
      id: this.nextItemId++,
      name: this.capitalizeWords(name),
      quantity: data.quantity,
      category: this.categorizeIngredient(name),
      checked: false,
      fromRecipe: data.recipes[0], // Show first recipe, could show all
    }))

    const groceryList = {
      id: `meal-plan-${Date.now()}`,
      items: items.sort((a, b) => a.category.localeCompare(b.category)),
      generatedFrom: "meal-plan",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.groceryLists.push(groceryList)
    return groceryList
  }

  static async addManualItem(name, quantity, category) {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const item = {
      id: this.nextItemId++,
      name: this.capitalizeWords(name),
      quantity,
      category,
      checked: false,
    }

    return item
  }

  static async toggleItemChecked(itemId, groceryList) {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const updatedItems = groceryList.items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item,
    )

    return {
      ...groceryList,
      items: updatedItems,
      updatedAt: new Date(),
    }
  }

  static async removeItem(itemId, groceryList) {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const updatedItems = groceryList.items.filter((item) => item.id !== itemId)

    return {
      ...groceryList,
      items: updatedItems,
      updatedAt: new Date(),
    }
  }

  static async clearCheckedItems(groceryList) {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const updatedItems = groceryList.items.filter((item) => !item.checked)

    return {
      ...groceryList,
      items: updatedItems,
      updatedAt: new Date(),
    }
  }

  static getItemsByCategory(groceryList) {
    const categorized = {
      produce: [],
      meat: [],
      dairy: [],
      pantry: [],
      herbs: [],
      frozen: [],
      bakery: [],
      other: [],
    }

    groceryList.items.forEach((item) => {
      categorized[item.category].push(item)
    })

    return categorized
  }

  static normalizeIngredientName(ingredient) {
    // Remove quantities and common descriptors
    return ingredient
      .toLowerCase()
      .replace(
        /^\d+(\.\d+)?\s*(cups?|tbsp|tsp|lbs?|oz|g|kg|pieces?|cloves?|medium|large|small|bunch|bottle|pack)\s*/g,
        "",
      )
      .replace(/,.*$/, "") // Remove everything after comma
      .trim()
  }

  static extractQuantity(ingredient) {
    const match = ingredient.match(
      /^(\d+(\.\d+)?\s*(cups?|tbsp|tsp|lbs?|oz|g|kg|pieces?|cloves?|medium|large|small|bunch|bottle|pack))/i,
    )
    return match ? match[1] : "1 unit"
  }

  static categorizeIngredient(ingredient) {
    const normalized = ingredient.toLowerCase()

    for (const [key, category] of Object.entries(categoryMapping)) {
      if (normalized.includes(key)) {
        return category
      }
    }

    return "other"
  }

  static capitalizeWords(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }
}
