import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, ArrowLeft, Edit, Heart, Calendar, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data - in real app this would come from API based on params
const mockRecipe = {
  id: 1,
  title: "Chicken Stir Fry",
  description:
    "Quick and healthy stir fry with fresh vegetables and tender chicken. Perfect for busy weeknights when you want something nutritious and delicious.",
  cookTime: 25,
  servings: 4,
  difficulty: "Easy",
  tags: ["Quick", "Healthy", "Asian", "Weeknight"],
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
}

export default function RecipeDetailPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/recipes">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Recipes
                </Button>
              </Link>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Add to Plan
              </Button>
              <Button variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to List
              </Button>
              <Link href={`/recipes/${mockRecipe.id}/edit`}>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
            </div>
          </div>

          <div className="max-w-4xl space-y-6">
            {/* Recipe Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Image
                  src={mockRecipe.image || "/placeholder.svg"}
                  alt={mockRecipe.title}
                  width={600}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{mockRecipe.title}</h1>
                  <p className="text-muted-foreground text-lg">{mockRecipe.description}</p>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{mockRecipe.cookTime} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{mockRecipe.servings} servings</span>
                  </div>
                  <Badge variant="secondary">{mockRecipe.difficulty}</Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mockRecipe.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button size="lg" className="w-full">
                  Start Cooking
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ingredients */}
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                  <CardDescription>Everything you'll need for this recipe</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                  <CardDescription>Step-by-step cooking guide</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {mockRecipe.steps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
