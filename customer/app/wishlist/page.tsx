"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star,
  Share2,
  Bell,
  Grid,
  List
} from "lucide-react"

const wishlistItems = [
  {
    id: 1,
    name: "Apple MacBook Pro 14\" M3 Pro Chip",
    price: 1799.99,
    originalPrice: 1999.99,
    rating: 4.8,
    reviews: 2453,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    inStock: true,
    vendor: "Apple Store",
    addedOn: "May 2, 2026"
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 298.00,
    originalPrice: 399.99,
    rating: 4.9,
    reviews: 8921,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    inStock: true,
    vendor: "Sony Official",
    addedOn: "Apr 28, 2026"
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra 256GB",
    price: 1199.99,
    rating: 4.7,
    reviews: 3241,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    inStock: true,
    vendor: "Samsung Store",
    addedOn: "Apr 25, 2026"
  },
  {
    id: 4,
    name: "Apple Watch Series 9 GPS 45mm",
    price: 429.00,
    originalPrice: 499.00,
    rating: 4.6,
    reviews: 1892,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    inStock: false,
    vendor: "Apple Store",
    addedOn: "Apr 20, 2026"
  },
  {
    id: 5,
    name: "Canon EOS R6 Mark II Camera Body",
    price: 2499.00,
    rating: 4.9,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    inStock: true,
    vendor: "Canon Direct",
    addedOn: "Apr 15, 2026"
  },
  {
    id: 6,
    name: "Nike Air Max 90 Premium Sneakers",
    price: 149.99,
    originalPrice: 189.99,
    rating: 4.5,
    reviews: 4521,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    inStock: true,
    vendor: "Nike Store",
    addedOn: "Apr 10, 2026"
  },
]

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const totalValue = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <PageLayout activeItem="Wishlist">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-red-500/10">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Wishlist</h1>
            <p className="text-sm text-muted-foreground">{items.length} items saved</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-primary/10 text-primary" : ""}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-primary/10 text-primary" : ""}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share List
          </Button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-xl font-bold text-foreground">${totalValue.toLocaleString()}</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-sm text-muted-foreground">In Stock</p>
              <p className="text-xl font-bold text-green-600">{items.filter(i => i.inStock).length}</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <p className="text-xl font-bold text-red-500">{items.filter(i => !i.inStock).length}</p>
            </div>
          </div>
          <Button className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add All to Cart
          </Button>
        </div>
      </div>

      {/* Wishlist Items */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden group">
              <div className="relative aspect-square bg-muted">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 bg-white shadow-sm hover:bg-red-50 hover:text-red-500"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-white shadow-sm hover:bg-primary/10 hover:text-primary">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{item.vendor}</p>
                <h3 className="font-medium text-foreground line-clamp-2 mb-2">{item.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({item.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-foreground">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">${item.originalPrice}</span>
                    )}
                  </div>
                  <Button size="sm" disabled={!item.inStock} className="gap-1">
                    <ShoppingCart className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border p-4 flex gap-4">
              <div className="w-24 h-24 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">{item.vendor}</p>
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{item.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({item.reviews.toLocaleString()})</span>
                      {!item.inStock && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">Out of Stock</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">${item.price}</p>
                    {item.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">${item.originalPrice}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-muted-foreground">Added on {item.addedOn}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" disabled={!item.inStock} className="gap-1">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
