"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Clock,
  Search,
  Box,
  CircleDot
} from "lucide-react"

const trackingSteps = [
  { 
    status: "Order Placed", 
    date: "May 5, 2026 - 10:30 AM", 
    description: "Your order has been confirmed",
    completed: true 
  },
  { 
    status: "Processing", 
    date: "May 5, 2026 - 2:15 PM", 
    description: "Your order is being prepared",
    completed: true 
  },
  { 
    status: "Shipped", 
    date: "May 6, 2026 - 9:00 AM", 
    description: "Package handed to courier",
    completed: true 
  },
  { 
    status: "Out for Delivery", 
    date: "May 8, 2026 - 8:30 AM", 
    description: "Package is on its way",
    completed: true,
    current: true
  },
  { 
    status: "Delivered", 
    date: "Expected: May 8, 2026", 
    description: "Package will be delivered today",
    completed: false 
  },
]

const recentOrders = [
  {
    id: "ORD-2024-8847",
    product: "Apple MacBook Pro 14\"",
    status: "Out for Delivery",
    date: "May 8, 2026",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop"
  },
  {
    id: "ORD-2024-8832",
    product: "Sony WH-1000XM5 Headphones",
    status: "Delivered",
    date: "May 3, 2026",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
  },
  {
    id: "ORD-2024-8819",
    product: "Samsung Galaxy S24 Ultra",
    status: "Delivered",
    date: "Apr 28, 2026",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop"
  },
]

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("ORD-2024-8847")
  const [isTracking, setIsTracking] = useState(true)

  const handleTrack = () => {
    if (trackingNumber) {
      setIsTracking(true)
    }
  }

  return (
    <PageLayout activeItem="Track Order">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <Package className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Track Order</h1>
          <p className="text-sm text-muted-foreground">Track your orders in real-time</p>
        </div>
      </div>

      {/* Search Box */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-semibold text-foreground mb-4">Enter Order ID or Tracking Number</h2>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="e.g., ORD-2024-8847"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleTrack} className="px-6">
            Track Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tracking Timeline */}
        {isTracking && (
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-foreground">Order #{trackingNumber}</h2>
                <p className="text-sm text-muted-foreground">Estimated delivery: Today by 6 PM</p>
              </div>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-amber-100 text-amber-700">
                Out for Delivery
              </span>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-48 bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
              <div className="relative text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Live tracking available</p>
                <p className="text-xs text-muted-foreground">Driver is 2.5 km away</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {trackingSteps.map((step, index) => (
                <div key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.current 
                        ? "bg-primary text-primary-foreground" 
                        : step.completed 
                          ? "bg-green-500 text-white" 
                          : "bg-muted text-muted-foreground"
                    }`}>
                      {step.completed && !step.current ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : step.current ? (
                        <Truck className="h-4 w-4" />
                      ) : (
                        <CircleDot className="h-4 w-4" />
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-16 ${
                        step.completed ? "bg-green-500" : "bg-muted"
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className={`font-medium ${
                      step.current ? "text-primary" : step.completed ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.status}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {step.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => {
                  setTrackingNumber(order.id)
                  setIsTracking(true)
                }}
                className={`w-full p-3 rounded-lg border transition-colors text-left ${
                  trackingNumber === order.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${order.image})` }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                    <p className="font-medium text-foreground truncate">{order.product}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === "Delivered" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
