"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { FlashDeal } from "@/components/flash-deal"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { 
  Smartphone, 
  Laptop, 
  Shirt, 
  Watch, 
  Headphones, 
  Camera,
  Home as HomeIcon,
  Dumbbell,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Clock,
  Store,
  ArrowRight
} from "lucide-react"

const products = [
  {
    id: 1,
    name: "Apple MacBook Pro 14\" M3 Pro Chip",
    price: 1799.99,
    originalPrice: 1999.99,
    rating: 4.8,
    reviews: 2453,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    badge: "Best Seller",
    vendor: "Apple Store"
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 298.00,
    originalPrice: 399.99,
    rating: 4.9,
    reviews: 8921,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    badge: "Top Rated",
    vendor: "Sony Official"
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra 256GB",
    price: 1199.99,
    rating: 4.7,
    reviews: 3241,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    vendor: "Samsung Store"
  },
  {
    id: 4,
    name: "Apple Watch Series 9 GPS 45mm",
    price: 429.00,
    originalPrice: 499.00,
    rating: 4.6,
    reviews: 1892,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    vendor: "Apple Store"
  },
  {
    id: 5,
    name: "Canon EOS R6 Mark II Camera Body",
    price: 2499.00,
    rating: 4.9,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    badge: "Pro Choice",
    vendor: "Canon Direct"
  },
  {
    id: 6,
    name: "Nike Air Max 90 Premium Sneakers",
    price: 149.99,
    originalPrice: 189.99,
    rating: 4.5,
    reviews: 4521,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    vendor: "Nike Store"
  },
  {
    id: 7,
    name: "iPad Pro 12.9\" M2 WiFi 256GB",
    price: 1099.00,
    originalPrice: 1199.00,
    rating: 4.8,
    reviews: 2109,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    vendor: "Apple Store"
  },
  {
    id: 8,
    name: "Dyson V15 Detect Absolute Vacuum",
    price: 699.99,
    rating: 4.7,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
    badge: "Trending",
    vendor: "Dyson Official"
  },
]

const categories = [
  { name: "Electronics", icon: Smartphone, count: 12450, gradient: "bg-gradient-to-br from-blue-500 to-blue-600" },
  { name: "Laptops", icon: Laptop, count: 3240, gradient: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
  { name: "Fashion", icon: Shirt, count: 28900, gradient: "bg-gradient-to-br from-pink-500 to-pink-600" },
  { name: "Watches", icon: Watch, count: 5670, gradient: "bg-gradient-to-br from-amber-500 to-amber-600" },
  { name: "Audio", icon: Headphones, count: 4320, gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600" },
  { name: "Cameras", icon: Camera, count: 2180, gradient: "bg-gradient-to-br from-red-500 to-red-600" },
  { name: "Home & Living", icon: HomeIcon, count: 15800, gradient: "bg-gradient-to-br from-cyan-500 to-cyan-600" },
  { name: "Sports", icon: Dumbbell, count: 8920, gradient: "bg-gradient-to-br from-orange-500 to-orange-600" },
]

const flashDeals = [
  {
    id: 1,
    name: "JBL Charge 5 Portable Bluetooth Speaker",
    price: 129.99,
    originalPrice: 179.95,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    sold: 234,
    total: 300
  },
  {
    id: 2,
    name: "Logitech MX Master 3S Wireless Mouse",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    sold: 456,
    total: 500
  },
]

const vendors = [
  { name: "Apple Store", logo: "A", products: 1240, rating: 4.9 },
  { name: "Samsung", logo: "S", products: 892, rating: 4.7 },
  { name: "Sony Official", logo: "S", products: 567, rating: 4.8 },
  { name: "Nike Store", logo: "N", products: 2340, rating: 4.6 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      

      <Navbar />

      <div className="flex relative">
        <Sidebar />

        <main className="flex-1 p-4 lg:p-6 space-y-8 max-w-full overflow-x-hidden">
          {/* Welcome Section */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-blue-700 shadow-lg">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
            <div className="relative p-6 lg:p-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-white/90 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-medium">Welcome back, John!</span>
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold text-white mb-3 text-balance">
                  Discover Amazing Products from Top Vendors
                </h1>
                <p className="text-white/80 mb-6">
                  Explore our curated collection of premium products with exclusive deals just for you.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="gap-2 bg-white text-primary hover:bg-white/90 rounded-lg font-semibold">
                    Explore Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 rounded-lg">
                    View Deals
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Shop by Category</h2>
              </div>
              <Button variant="ghost" className="gap-1 text-muted-foreground hover:text-foreground">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {categories.map((category) => (
                <CategoryCard key={category.name} {...category} />
              ))}
            </div>
          </section>

          {/* Flash Deals Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500/10">
                  <Clock className="h-5 w-5 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Flash Deals</h2>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-500">
                  Limited Time
                </span>
              </div>
              <Button variant="ghost" className="gap-1 text-muted-foreground hover:text-foreground">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flashDeals.map((deal) => (
                <FlashDeal key={deal.id} deal={deal} />
              ))}
            </div>
          </section>

          {/* Recommended Products */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
              </div>
              <Button variant="ghost" className="gap-1 text-muted-foreground hover:text-foreground">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Featured Vendors */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Featured Vendors</h2>
              </div>
              <Button variant="ghost" className="gap-1 text-muted-foreground hover:text-foreground">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {vendors.map((vendor) => (
                <GlassCard key={vendor.name} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      {vendor.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{vendor.name}</h3>
                      <p className="text-sm text-muted-foreground">{vendor.products.toLocaleString()} products</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <span className="text-sm font-medium">{vendor.rating}</span>
                        <span className="text-xs">★</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Trending Products */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Trending Now</h2>
              </div>
              <Button variant="ghost" className="gap-1 text-muted-foreground hover:text-foreground">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.slice(4, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
