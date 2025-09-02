import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, MoreVertical, Heart, Calendar, ShoppingCart } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

interface Recipe {
  id: number
  title: string
  description: string
  cookTime: number
  servings: number
  difficulty: string
  tags: string[]
  image: string
  ingredients: string[]
}

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/recipes/${recipe.id}/edit`} className="flex items-center w-full">
                  Edit Recipe
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="h-4 w-4 mr-2" />
                Add to Meal Plan
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Grocery List
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete Recipe</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Badge className="absolute bottom-2 left-2" variant="secondary">
          {recipe.difficulty}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          <Link href={`/recipes/${recipe.id}`} className="hover:text-primary transition-colors">
            {recipe.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2">{recipe.description}</CardDescription>
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

        <div className="flex flex-wrap gap-1 mb-4">
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Link href={`/recipes/${recipe.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Recipe
            </Button>
          </Link>
          <Button size="sm" className="flex-1">
            Cook Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
