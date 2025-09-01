// Mock data - in real app this would be API calls
const mockRecipes = [
  {
    id: 1,
    title: "Chicken Stir Fry",
    description: "Quick and healthy stir fry with fresh vegetables and tender chicken",
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    tags: ["Quick", "Healthy", "Asian"],
    image: "/chicken-stir-fry-dish.png",
    ingredients: [
      "2 boneless chicken breasts, sliced thin",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "1 medium onion, sliced",
      "2 cloves garlic, minced",
      "1 tbsp fresh ginger, grated",
      "2 tbsp vegetable oil",
      "3 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tsp sesame oil",
      "2 green onions, chopped",
      "1 tbsp sesame seeds",
    ],
    steps: [
      "Heat 1 tablespoon of oil in a large wok or skillet over high heat.",
      "Add the sliced chicken and cook for 3-4 minutes until golden brown and cooked through. Remove and set aside.",
      "Add remaining oil to the pan. Add onion, bell peppers, garlic, and ginger. Stir-fry for 2-3 minutes until vegetables are crisp-tender.",
      "Return chicken to the pan and add soy sauce, oyster sauce, and sesame oil. Toss everything together for 1-2 minutes.",
      "Remove from heat and garnish with green onions and sesame seeds. Serve immediately over rice or noodles.",
    ],
  },
  {
    id: 2,
    title: "Pasta Carbonara",
    description: "Classic Italian pasta with eggs, cheese, and pancetta",
    cookTime: 20,
    servings: 2,
    difficulty: "Medium",
    tags: ["Italian", "Pasta", "Classic"],
    image: "/pasta-carbonara.png",
    ingredients: [
      "200g spaghetti",
      "100g pancetta, diced",
      "2 large eggs",
      "50g parmesan cheese, grated",
      "2 cloves garlic, minced",
      "Black pepper to taste",
      "Salt for pasta water",
    ],
    steps: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
      "While pasta cooks, fry pancetta in a large pan until crispy.",
      "In a bowl, whisk together eggs, parmesan, and black pepper.",
      "Drain pasta, reserving 1 cup pasta water.",
      "Add hot pasta to the pan with pancetta, remove from heat, and quickly stir in egg mixture with pasta water until creamy.",
    ],
  },
  {
    id: 3,
    title: "Vegetable Curry",
    description: "Aromatic curry with mixed vegetables in coconut milk",
    cookTime: 35,
    servings: 6,
    difficulty: "Easy",
    tags: ["Vegetarian", "Indian", "Spicy"],
    image: "/vegetable-curry.png",
    ingredients: [
      "2 cups mixed vegetables (carrots, potatoes, peas)",
      "400ml coconut milk",
      "2 tbsp curry powder",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "2 tbsp vegetable oil",
      "Salt to taste",
      "Fresh cilantro for garnish",
    ],
    steps: [
      "Heat oil in a large pot and sauté onion until translucent.",
      "Add garlic, ginger, and curry powder. Cook for 1 minute until fragrant.",
      "Add vegetables and cook for 5 minutes.",
      "Pour in coconut milk and simmer for 20 minutes until vegetables are tender.",
      "Season with salt and garnish with cilantro before serving.",
    ],
  },
  {
    id: 4,
    title: "Grilled Salmon",
    description: "Perfectly grilled salmon with lemon and herbs",
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    tags: ["Healthy", "Fish", "Quick"],
    image: "/grilled-salmon-with-lemon.png",
    ingredients: [
      "2 salmon fillets",
      "1 lemon, sliced",
      "2 tbsp olive oil",
      "Fresh dill",
      "Salt and pepper to taste",
      "Garlic powder",
    ],
    steps: [
      "Preheat grill to medium-high heat.",
      "Brush salmon with olive oil and season with salt, pepper, and garlic powder.",
      "Grill salmon for 4-5 minutes per side until cooked through.",
      "Serve with lemon slices and fresh dill.",
    ],
  },
]

export class RecipeService {
  static recipes = [...mockRecipes]
  static nextId = 5

  static async getAllRecipes() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.recipes]
  }

  static async getRecipeById(id) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return this.recipes.find((recipe) => recipe.id === id) || null
  }

  static async createRecipe(data) {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const newRecipe = {
      ...data,
      id: this.nextId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.recipes.push(newRecipe)
    return newRecipe
  }

  static async updateRecipe(data) {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const index = this.recipes.findIndex((recipe) => recipe.id === data.id)
    if (index === -1) return null

    const updatedRecipe = {
      ...this.recipes[index],
      ...data,
      updatedAt: new Date(),
    }

    this.recipes[index] = updatedRecipe
    return updatedRecipe
  }

  static async deleteRecipe(id) {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const index = this.recipes.findIndex((recipe) => recipe.id === id)
    if (index === -1) return false

    this.recipes.splice(index, 1)
    return true
  }

  static async searchRecipes(query, tags = []) {
    await new Promise((resolve) => setTimeout(resolve, 100))

    return this.recipes.filter((recipe) => {
      const matchesQuery =
        query === "" ||
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase())

      const matchesTags = tags.length === 0 || tags.some((tag) => recipe.tags.includes(tag))

      return matchesQuery && matchesTags
    })
  }

  static getAllTags() {
    const allTags = this.recipes.flatMap((recipe) => recipe.tags)
    return Array.from(new Set(allTags)).sort()
  }
}
