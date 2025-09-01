"use client"

import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { ChefHat, Home, BookOpen, Calendar, ShoppingCart, User, Settings, LogOut } from "lucide-react"
import { useAuthPresenter } from "../../lib/hooks/use-auth-presenter"

export function Sidebar() {
  const location = useLocation()
  const { user, logout } = useAuthPresenter()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Recipes", href: "/recipes", icon: BookOpen },
    { name: "Meal Planner", href: "/planner", icon: Calendar },
    { name: "Grocery Lists", href: "/grocery", icon: ShoppingCart },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const isActive = (href) => location.pathname === href

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">MealPlan</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.name} to={item.href}>
              <Button variant={isActive(item.href) ? "default" : "ghost"} className="w-full justify-start gap-3">
                <Icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">{user?.name?.charAt(0) || "U"}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
