"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus, Calendar, ShoppingCart } from "lucide-react"
import { MealPlanCard } from "@/components/planner/meal-plan-card"
import { AddMealDialog } from "@/components/planner/add-meal-dialog"

// Mock data - in real app this would come from API
const mockMealPlan = {
  "2024-01-15": {
    breakfast: { id: 1, name: "Overnight Oats", cookTime: 5 },
    lunch: { id: 2, name: "Chicken Stir Fry", cookTime: 25 },
    dinner: { id: 3, name: "Pasta Carbonara", cookTime: 20 },
  },
  "2024-01-16": {
    breakfast: null,
    lunch: { id: 4, name: "Vegetable Curry", cookTime: 35 },
    dinner: null,
  },
  "2024-01-17": {
    breakfast: null,
    lunch: null,
    dinner: { id: 5, name: "Grilled Salmon", cookTime: 15 },
  },
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const mealTypes = ["breakfast", "lunch", "dinner"] as const

export default function PlannerPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedMeal, setSelectedMeal] = useState<{
    date: string
    mealType: (typeof mealTypes)[number]
  } | null>(null)

  // Get the start of the current week (Monday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    return new Date(d.setDate(diff))
  }

  const weekStart = getWeekStart(currentWeek)
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    return date
  })

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newDate)
  }

  const getMealForDay = (date: string, mealType: (typeof mealTypes)[number]) => {
    return mockMealPlan[date as keyof typeof mockMealPlan]?.[mealType] || null
  }

  const getTotalMealsPlanned = () => {
    return Object.values(mockMealPlan).reduce((total, day) => {
      return total + Object.values(day).filter(Boolean).length
    }, 0)
  }

  const getWeekRange = () => {
    const start = weekDates[0]
    const end = weekDates[6]
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Meal Planner</h1>
              <p className="text-muted-foreground">Plan your weekly meals and stay organized</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Generate Grocery List
              </Button>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>

          {/* Week Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{getWeekRange()}</h2>
                <p className="text-sm text-muted-foreground">{getTotalMealsPlanned()} meals planned</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" onClick={() => setCurrentWeek(new Date())} className="text-sm bg-transparent">
              Today
            </Button>
          </div>

          {/* Meal Planning Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {weekDates.map((date, dayIndex) => {
              const dateString = formatDate(date)
              const isToday = dateString === formatDate(new Date())

              return (
                <Card key={dateString} className={`${isToday ? "ring-2 ring-primary" : ""}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-center">
                      <div className="text-sm font-medium text-muted-foreground">{daysOfWeek[dayIndex]}</div>
                      <div className={`text-lg ${isToday ? "text-primary font-bold" : ""}`}>{date.getDate()}</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mealTypes.map((mealType) => {
                      const meal = getMealForDay(dateString, mealType)
                      return (
                        <div key={mealType} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground capitalize">{mealType}</span>
                            {!meal && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={() => setSelectedMeal({ date: dateString, mealType })}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          {meal ? (
                            <MealPlanCard
                              meal={meal}
                              onEdit={() => setSelectedMeal({ date: dateString, mealType })}
                              onRemove={() => {
                                // TODO: Implement remove meal logic
                                console.log("Remove meal:", meal.id)
                              }}
                            />
                          ) : (
                            <div
                              className="h-16 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center cursor-pointer hover:border-muted-foreground/40 transition-colors"
                              onClick={() => setSelectedMeal({ date: dateString, mealType })}
                            >
                              <span className="text-xs text-muted-foreground">Add meal</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Weekly Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{getTotalMealsPlanned()}</div>
                  <div className="text-sm text-muted-foreground">Meals Planned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Object.values(mockMealPlan).reduce((total, day) => {
                      return (
                        total +
                        Object.values(day).reduce((dayTotal, meal) => {
                          return dayTotal + (meal?.cookTime || 0)
                        }, 0)
                      )
                    }, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Cook Time (min)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{21 - getTotalMealsPlanned()}</div>
                  <div className="text-sm text-muted-foreground">Meals to Plan</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add Meal Dialog */}
      {selectedMeal && (
        <AddMealDialog
          isOpen={!!selectedMeal}
          onClose={() => setSelectedMeal(null)}
          date={selectedMeal.date}
          mealType={selectedMeal.mealType}
          onAddMeal={(recipeId) => {
            // TODO: Implement add meal logic
            console.log("Add meal:", recipeId, "to", selectedMeal.date, selectedMeal.mealType)
            setSelectedMeal(null)
          }}
        />
      )}
    </div>
  )
}
