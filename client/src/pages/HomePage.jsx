import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { ChefHat, Calendar, ShoppingCart, Users } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">MealPlan</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Plan Your Meals, Simplify Your Shopping
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Create recipes, plan your weekly meals, and generate smart grocery lists automatically. Make cooking and
            shopping effortless with our intelligent meal planning system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Planning Free
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Everything You Need for Meal Planning
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <ChefHat className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Recipe Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Save and organize your favorite recipes with ingredients, steps, and tags
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Weekly Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Plan your meals for each day of the week with an intuitive calendar view
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Smart Grocery Lists</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Auto-generate organized grocery lists that combine and categorize ingredients
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Family Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Plan meals for your whole family with portion scaling and dietary preferences
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h3 className="text-3xl font-bold text-foreground mb-6">Ready to Transform Your Meal Planning?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of home cooks who have simplified their kitchen routine
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 MealPlan. Built with React and love for good food.</p>
        </div>
      </footer>
    </div>
  )
}
