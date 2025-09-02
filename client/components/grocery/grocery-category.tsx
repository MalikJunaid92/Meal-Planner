"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Package } from "lucide-react"

interface GroceryItem {
  id: number
  name: string
  quantity: string
  checked: boolean
  fromRecipe?: string
}

interface GroceryCategoryProps {
  title: string
  items: GroceryItem[]
  onToggleItem: (itemId: number) => void
  onRemoveItem: (itemId: number) => void
}

export function GroceryCategory({ title, items, onToggleItem, onRemoveItem }: GroceryCategoryProps) {
  const checkedCount = items.filter((item) => item.checked).length
  const totalCount = items.length

  if (items.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge variant="outline">
              {checkedCount}/{totalCount}
            </Badge>
          </div>
          {checkedCount === totalCount && totalCount > 0 && (
            <Badge variant="default" className="bg-primary">
              Complete
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                item.checked ? "bg-muted/50 border-muted" : "bg-background border-border hover:bg-muted/20"
              }`}
            >
              <Checkbox checked={item.checked} onCheckedChange={() => onToggleItem(item.id)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-medium ${item.checked ? "line-through text-muted-foreground" : ""}`}>
                    {item.name}
                  </span>
                  <span className={`text-sm ${item.checked ? "line-through text-muted-foreground" : "text-primary"}`}>
                    {item.quantity}
                  </span>
                </div>
                {item.fromRecipe && <div className="text-xs text-muted-foreground">From: {item.fromRecipe}</div>}
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemoveItem(item.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
