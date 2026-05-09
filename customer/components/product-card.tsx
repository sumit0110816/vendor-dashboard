"use client"

import { Heart, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { useState } from "react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
    badge?: string
    vendor: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <GlassCard 
      className="group overflow-hidden"
      hover={false}
    >
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-xl bg-muted">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ 
              backgroundImage: `url(${product.image})`,
              backgroundColor: '#f4f4f5'
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badge && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground backdrop-blur-sm">
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-red-500/90 text-white backdrop-blur-sm">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 h-8 w-8 rounded-full transition-all duration-300 shadow-sm ${
              isWishlisted 
                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                : 'bg-white text-muted-foreground hover:bg-white hover:text-foreground'
            } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>

          {/* Quick Add Button */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-md">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <p className="text-xs text-primary font-medium">{product.vendor}</p>
          <h3 className="font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} 
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
