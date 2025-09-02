"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Clock, Users, Plus } from "lucide-react"
import Image from "next/image"

// Mock recipes data
const mockRecipes = [
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
    tags: ["Italian", "Pasta", "Classic"],
    image: "/pasta-carbonara.png",
  },
  {
    id: 3,
    title: "Vegetable Curry",
    description: "Aromatic curry with mixed vegetables",
    cookTime: 35,
    servings: 6,
    difficulty: "Easy",
    tags: ["Vegetarian", "Indian", "Spicy"],
    image: "/vegetable-curry.png",
  },
  {
    id: 4,
    title: "Grilled Salmon",
    description: "Perfectly grilled salmon with lemon",
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    tags: ["Healthy", "Fish", "Quick"],
    image: "/grilled-salmon-with-lemon.png",
  },
]

interface AddMealDialogProps {
  isOpen: boolean
  onClose: () => void
  date: string
  mealType: string
  onAddMeal: (recipeId: number) => void
}

export function AddMealDialog({ isOpen, onClose, date, mealType, onAddMeal }: AddMealDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRecipes = mockRecipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Meal</DialogTitle>
          <DialogDescription>
            Choose a recipe for {mealType} on {formatDate(date)}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Recipe Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecipes.map((recipe) => (
                <Card key={recipe.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1 truncate">{recipe.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{recipe.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {recipe.cookTime}m
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {recipe.servings}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {recipe.difficulty}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {recipe.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" onClick={() => onAddMeal(recipe.id)} className="w-full">
                          <Plus className="h-3 w-3 mr-1" />
                          Add to Plan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recipes found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
