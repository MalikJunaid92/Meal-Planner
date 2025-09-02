import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Calendar, ShoppingCart, Plus, BookOpen } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data - in real app this would come from API
  const recentRecipes = [
    { id: 1, name: "Chicken Stir Fry", cookTime: "25 min", difficulty: "Easy" },
    { id: 2, name: "Pasta Carbonara", cookTime: "20 min", difficulty: "Medium" },
    { id: 3, name: "Vegetable Curry", cookTime: "35 min", difficulty: "Easy" },
  ]

  const weeklyPlan = [
    { day: "Monday", meal: "Chicken Stir Fry" },
    { day: "Tuesday", meal: "Pasta Carbonara" },
    { day: "Wednesday", meal: "Not planned" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your meal planning overview.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/recipes/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Recipe
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Planned Meals</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Grocery Items</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">In current list</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Recipes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Recipes</CardTitle>
                  <Link href="/recipes">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <CardDescription>Your latest recipe additions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRecipes.map((recipe) => (
                    <div key={recipe.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <ChefHat className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{recipe.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {recipe.cookTime} • {recipe.difficulty}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Plan Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>This Week's Plan</CardTitle>
                  <Link href="/planner">
                    <Button variant="outline" size="sm">
                      Plan Week
                    </Button>
                  </Link>
                </div>
                <CardDescription>Your upcoming meals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyPlan.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{plan.day}</p>
                        <p className="text-sm text-muted-foreground">{plan.meal}</p>
                      </div>
                      {plan.meal === "Not planned" && (
                        <Button variant="ghost" size="sm">
                          Plan
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
