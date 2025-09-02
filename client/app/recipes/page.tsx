"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import { RecipeCard } from "@/components/recipes/recipe-card"

// Mock data - in real app this would come from API
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
    ingredients: ["2 chicken breasts", "1 bell pepper", "2 tbsp soy sauce", "1 tbsp oil"],
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
    ingredients: ["200g spaghetti", "100g pancetta", "2 eggs", "50g parmesan"],
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
    ingredients: ["2 cups mixed vegetables", "400ml coconut milk", "2 tbsp curry powder"],
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
    ingredients: ["2 salmon fillets", "1 lemon", "Fresh dill", "Olive oil"],
  },
]

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allTags = Array.from(new Set(mockRecipes.flatMap((recipe) => recipe.tags)))

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => recipe.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Recipes</h1>
              <p className="text-muted-foreground">Manage and organize your recipe collection</p>
            </div>
            <Link href="/recipes/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Recipe
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by tags:</span>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
              {selectedTags.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])} className="text-xs">
                  Clear filters
                </Button>
              )}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No recipes found matching your criteria</p>
              <Link href="/recipes/new">
                <Button>Add Your First Recipe</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
