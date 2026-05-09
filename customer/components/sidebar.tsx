"use client"

import Link from "next/link"
import { 
  Home, 
  ShoppingBag, 
  Package, 
  Heart, 
  User, 
  Settings, 
  HelpCircle,
  Gift,
  CreditCard,
  Star
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: ShoppingBag, label: "My Orders", badge: 3, href: "/orders" },
  { icon: Heart, label: "Wishlist", badge: 12, href: "/wishlist" },
  { icon: Package, label: "Track Order", href: "/track-order" },
  { icon: Star, label: "Rewards", badge: "New", href: "/rewards" },
  { icon: Gift, label: "Deals & Offers", href: "/deals" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help Center", href: "/help" },
]

interface SidebarProps {
  activeItem?: string
}

export function Sidebar({ activeItem = "Home" }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-4rem)] sticky top-16 border-r border-border bg-card">
      {/* User Info */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
            JD
          </div>
          <div>
            <h3 className="font-semibold text-foreground">John Doe</h3>
            <p className="text-sm text-muted-foreground">Premium Member</p>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Reward Points</span>
            <span className="font-bold text-primary">2,450 pts</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = item.label === activeItem
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={cn(
                  "px-2 py-0.5 text-xs font-medium rounded-full",
                  typeof item.badge === "number" 
                    ? "bg-primary/20 text-primary" 
                    : "bg-primary text-primary-foreground"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
