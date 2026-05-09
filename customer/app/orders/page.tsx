"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { 
  ShoppingBag, 
  Package,
  ChevronRight,
  Star,
  RefreshCw,
  Download,
  Filter
} from "lucide-react"

const orders = [
  {
    id: "ORD-2024-8847",
    date: "May 5, 2026",
    status: "Out for Delivery",
    statusColor: "bg-amber-100 text-amber-700",
    total: 1799.99,
    items: [
      {
        name: "Apple MacBook Pro 14\" M3 Pro Chip",
        price: 1799.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop"
      }
    ]
  },
  {
    id: "ORD-2024-8832",
    date: "May 3, 2026",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-700",
    total: 298.00,
    items: [
      {
        name: "Sony WH-1000XM5 Wireless Headphones",
        price: 298.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
      }
    ]
  },
  {
    id: "ORD-2024-8819",
    date: "Apr 28, 2026",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-700",
    total: 1199.99,
    items: [
      {
        name: "Samsung Galaxy S24 Ultra 256GB",
        price: 1199.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop"
      }
    ]
  },
  {
    id: "ORD-2024-8801",
    date: "Apr 25, 2026",
    status: "Returned",
    statusColor: "bg-blue-100 text-blue-700",
    total: 149.99,
    items: [
      {
        name: "Nike Air Max 90 Premium Sneakers",
        price: 149.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop"
      }
    ]
  },
  {
    id: "ORD-2024-8788",
    date: "Apr 20, 2026",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-700",
    total: 678.00,
    items: [
      {
        name: "Apple Watch Series 9 GPS 45mm",
        price: 429.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop"
      },
      {
        name: "Apple AirPods Pro 2nd Gen",
        price: 249.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop"
      }
    ]
  },
]

const filterOptions = ["All Orders", "Processing", "Shipped", "Delivered", "Returned"]

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState("All Orders")

  const filteredOrders = activeFilter === "All Orders" 
    ? orders 
    : orders.filter(o => o.status === activeFilter)

  return (
    <PageLayout activeItem="My Orders">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
            <p className="text-sm text-muted-foreground">{orders.length} orders placed</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download History
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        {filterOptions.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className="flex-shrink-0"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/30 border-b border-border">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-muted-foreground">Order ID</p>
                  <p className="font-medium text-foreground">{order.id}</p>
                </div>
                <div className="hidden sm:block h-8 w-px bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground">Order Date</p>
                  <p className="font-medium text-foreground">{order.date}</p>
                </div>
                <div className="hidden sm:block h-8 w-px bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-medium text-foreground">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${order.statusColor}`}>
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="p-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-3 border-b border-border last:border-0 last:pb-0 first:pt-0">
                  <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-foreground">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Order Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/30 border-t border-border">
              <div className="flex items-center gap-2">
                {order.status === "Delivered" && (
                  <>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Star className="h-4 w-4" />
                      Write Review
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <RefreshCw className="h-4 w-4" />
                      Buy Again
                    </Button>
                  </>
                )}
                {order.status === "Out for Delivery" && (
                  <Button variant="outline" size="sm" className="gap-1">
                    <Package className="h-4 w-4" />
                    Track Package
                  </Button>
                )}
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-1">No orders found</p>
            <p className="text-muted-foreground">No orders match the selected filter.</p>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
