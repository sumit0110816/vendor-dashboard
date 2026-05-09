"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  MessageSquare,
  Star,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  X,
  Users,
  UserPlus,
  UserCheck,
} from "lucide-react"
import { Header } from "../header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const statusConfig = {
  active: { label: "Active", bg: "bg-success/10", text: "text-success" },
  inactive: { label: "Inactive", bg: "bg-muted", text: "text-muted-foreground" },
  vip: { label: "VIP", bg: "bg-primary/10", text: "text-primary" },
}

export function CustomersModule() {
  const [customers, setCustomers] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState<"customers" | "reviews" | "messages">("customers")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/customers").then((res) => res.json()),
      fetch("/api/reviews").then((res) => res.json())
    ]).then(([customersData, reviewsData]) => {
      setCustomers(customersData)
      setReviews(reviewsData)
      setLoading(false)
    })
  }, [])

  return (
    <div className="space-y-6">
      <Header title="Customer Management" subtitle="Manage your customers, reviews and support tickets" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: customers.length.toString(), icon: Users, color: "text-primary" },
          { label: "New This Month", value: "0", icon: UserPlus, color: "text-success" },
          { label: "Active Customers", value: customers.filter(c => c.status === "active").length.toString(), icon: UserCheck, color: "text-info" },
          { label: "Avg Rating", value: (customers.reduce((acc, c) => acc + c.rating, 0) / (customers.length || 1)).toFixed(1), icon: Star, color: "text-warning" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pro-card rounded-xl p-4 flex items-center gap-3"
          >
            <div className={cn("p-2 rounded-lg bg-secondary/50", stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        {[
          { id: "customers", label: "Customers" },
          { id: "reviews", label: "Reviews & Ratings" },
          { id: "messages", label: "Messages" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "customers" && (
          <motion.div
            key="customers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Search & Filter */}
            <div className="pro-card rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <Button variant="outline" className="gap-2 rounded-xl">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Customer List */}
            <div className="pro-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                        Contact
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Total Spent
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                        Status
                      </th>
                      <th className="text-right py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-sm font-medium text-primary-foreground">
                              {customer.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{customer.name}</p>
                              <p className="text-xs text-muted-foreground">{customer.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden lg:table-cell">
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                          <p className="text-xs text-muted-foreground">{customer.phone}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm font-medium text-foreground">{customer.orders}</p>
                          <p className="text-xs text-muted-foreground">{customer.lastOrder}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm font-semibold text-foreground">{customer.spent}</p>
                        </td>
                        <td className="py-4 px-6 hidden md:table-cell">
                          <span
                            className={cn(
                              "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
                              statusConfig[customer.status as keyof typeof statusConfig].bg,
                              statusConfig[customer.status as keyof typeof statusConfig].text
                            )}
                          >
                            {statusConfig[customer.status as keyof typeof statusConfig].label}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelectedCustomer(customer)}
                              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                            >
                              <MessageSquare className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="pro-card rounded-xl p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-sm font-medium text-primary-foreground">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{review.customer}</p>
                      <p className="text-xs text-muted-foreground">{review.product}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < review.rating ? "text-warning fill-warning" : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{review.comment}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    Reply
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "messages" && (
          <motion.div
            key="messages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pro-card rounded-xl p-8 text-center"
          >
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Messages Yet</h3>
            <p className="text-sm text-muted-foreground">Customer messages will appear here</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer Detail Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCustomer(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="pro-card rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Customer Details</h2>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-3">
                  {selectedCustomer.avatar}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{selectedCustomer.name}</h3>
                <span
                  className={cn(
                    "inline-flex px-2.5 py-1 rounded-full text-xs font-medium mt-2",
                    statusConfig[selectedCustomer.status as keyof typeof statusConfig].bg,
                    statusConfig[selectedCustomer.status as keyof typeof statusConfig].text
                  )}
                >
                  {statusConfig[selectedCustomer.status as keyof typeof statusConfig].label}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{selectedCustomer.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="text-center p-3 rounded-xl bg-secondary/30">
                  <p className="text-lg font-bold text-foreground">{selectedCustomer.orders}</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/30">
                  <p className="text-lg font-bold text-foreground">{selectedCustomer.spent}</p>
                  <p className="text-xs text-muted-foreground">Spent</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/30">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <span className="text-lg font-bold text-foreground">{selectedCustomer.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <Button variant="outline" className="flex-1 gap-2 rounded-xl">
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
                <Button className="flex-1 gap-2 rounded-xl">
                  <ShoppingBag className="w-4 h-4" />
                  View Orders
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
