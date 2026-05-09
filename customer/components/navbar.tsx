"use client"

import { Search, ShoppingCart, Heart, Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
              N
            </div>
            <span className="hidden sm:block text-xl font-bold text-foreground">NexaShop</span>
          </div>

          {/* Search Bar */}
          <div className={`relative flex-1 max-w-xl transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, brands, categories..."
                className="w-full pl-10 pr-4 h-10 rounded-lg border-border bg-muted text-foreground placeholder:text-muted-foreground focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary hover:bg-primary/10">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary hover:bg-primary/10">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                2
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden text-muted-foreground hover:text-primary hover:bg-primary/10">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
