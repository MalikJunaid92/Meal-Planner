import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Calendar, ShoppingCart, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DemoPage() {
  const demoRecipes = [
    {
      id: 1,
      title: "Chicken Stir Fry",
      description: "Quick and healthy stir fry with fresh vegetables",
      cookTime: 25,
      servings: 4,
      difficulty: "Easy",
      tags: ["Quick", "Healthy", "Asian"],
      image: "/chicken-stir-fry-dish.png",
    },
    {
      id: 2,
      title: "Pasta Carbonara",
      description: "Classic Italian pasta with eggs and cheese",
      cookTime: 20,
      servings: 2,
      difficulty: "Medium",
      tags: ["Italian", "Pasta"],
      image: "/pasta-carbonara.png",
    },
  ]

  const demoMealPlan = [
    { day: "Monday", breakfast: "Overnight Oats", lunch: "Chicken Stir Fry", dinner: "Pasta Carbonara" },
    { day: "Tuesday", breakfast: "Greek Yogurt", lunch: "Leftover Stir Fry", dinner: "Grilled Salmon" },
    { day: "Wednesday", breakfast: "Smoothie Bowl", lunch: "Vegetable Curry", dinner: "Chicken Tacos" },
  ]

  const demoGroceryList = [
    { category: "Produce", items: ["2 Bell Peppers", "1 Onion", "Fresh Ginger", "Garlic"] },
    { category: "Meat", items: ["2 Chicken Breasts", "100g Pancetta", "2 Salmon Fillets"] },
    { category: "Dairy", items: ["6 Eggs", "Parmesan Cheese", "Greek Yogurt"] },
    { category: "Pantry", items: ["Spaghetti", "Soy Sauce", "Olive Oil", "Sesame Oil"] },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <ChefHat className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">MealPlan Demo</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">See MealPlan in Action</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore how our meal planning system works with this interactive demo showing recipes, meal planning, and
            smart grocery lists.
          </p>
        </div>

        {/* Recipe Management Demo */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <ChefHat className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Recipe Management</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {demoRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute bottom-2 left-2" variant="secondary">
                    {recipe.difficulty}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{recipe.title}</CardTitle>
                  <CardDescription>{recipe.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.cookTime} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {recipe.servings} servings
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Meal Planning Demo */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Weekly Meal Planning</h3>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>This Week's Plan</CardTitle>
              <CardDescription>Organized meal schedule for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {demoMealPlan.map((day, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="font-medium text-primary">{day.day}</div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Breakfast</div>
                      <div className="text-sm">{day.breakfast}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Lunch</div>
                      <div className="text-sm">{day.lunch}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Dinner</div>
                      <div className="text-sm">{day.dinner}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Smart Grocery List Demo */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Smart Grocery Lists</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoGroceryList.map((category, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 bg-muted/30 rounded-lg">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Planning?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of home cooks who have simplified their meal planning and grocery shopping
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Create Free Account</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
