import { RecipeService } from "./recipe-service.js"

// Mock meal plan data
const mockMealPlans = {
  "2024-01-15": {
    id: "2024-01-15",
    date: "2024-01-15",
    breakfast: undefined,
    lunch: undefined,
    dinner: undefined,
  },
}

export class MealPlanService {
  static mealPlans = { ...mockMealPlans }

  static async getMealPlan(date) {
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (!this.mealPlans[date]) {
      this.mealPlans[date] = {
        id: date,
        date,
        breakfast: undefined,
        lunch: undefined,
        dinner: undefined,
      }
    }

    return this.mealPlans[date]
  }

  static async getWeekMealPlan(startDate) {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const weekPlans = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const dateString = date.toISOString().split("T")[0]

      weekPlans.push(await this.getMealPlan(dateString))
    }

    return weekPlans
  }

  static async addMealToPlan(date, mealType, recipeId) {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const recipe = await RecipeService.getRecipeById(recipeId)
    if (!recipe) return null

    const mealPlan = await this.getMealPlan(date)
    mealPlan[mealType] = recipe

    this.mealPlans[date] = mealPlan
    return mealPlan
  }

  static async removeMealFromPlan(date, mealType) {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const mealPlan = await this.getMealPlan(date)
    mealPlan[mealType] = undefined

    this.mealPlans[date] = mealPlan
    return mealPlan
  }

  static async getWeekStats(startDate) {
    const weekPlans = await this.getWeekMealPlan(startDate)

    let totalMeals = 0
    let totalCookTime = 0

    weekPlans.forEach((plan) => {
      if (plan.breakfast) {
        totalMeals++
        totalCookTime += plan.breakfast.cookTime
      }
      if (plan.lunch) {
        totalMeals++
        totalCookTime += plan.lunch.cookTime
      }
      if (plan.dinner) {
        totalMeals++
        totalCookTime += plan.dinner.cookTime
      }
    })

    return {
      totalMeals,
      totalCookTime,
      mealsToGo: 21 - totalMeals, // 7 days × 3 meals
    }
  }
}
