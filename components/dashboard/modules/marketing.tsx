"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Percent,
  Zap,
  Tag,
  Megaphone,
  Mail,
  Calendar,
  Copy,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react"
import { Header } from "../header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const coupons = [
  {
    id: 1,
    code: "SUMMER25",
    discount: "25%",
    type: "percentage",
    usageLimit: 100,
    used: 67,
    expiresAt: "Jun 30, 2024",
    status: "active",
  },
  {
    id: 2,
    code: "FLAT50",
    discount: "₹50",
    type: "fixed",
    usageLimit: 50,
    used: 42,
    expiresAt: "May 15, 2024",
    status: "active",
  },
  {
    id: 3,
    code: "WELCOME10",
    discount: "10%",
    type: "percentage",
    usageLimit: 500,
    used: 234,
    expiresAt: "Dec 31, 2024",
    status: "active",
  },
  {
    id: 4,
    code: "FLASH20",
    discount: "20%",
    type: "percentage",
    usageLimit: 200,
    used: 200,
    expiresAt: "Apr 1, 2024",
    status: "expired",
  },
]

const flashSales = [
  {
    id: 1,
    name: "Weekend Flash Sale",
    discount: "30% off",
    products: 24,
    startDate: "Jan 20, 2024",
    endDate: "Jan 22, 2024",
    status: "scheduled",
  },
  {
    id: 2,
    name: "Electronics Clearance",
    discount: "40% off",
    products: 12,
    startDate: "Jan 15, 2024",
    endDate: "Jan 18, 2024",
    status: "active",
  },
]

const campaigns = [
  {
    id: 1,
    name: "New Year Sale Campaign",
    type: "email",
    sent: 2500,
    opened: 1250,
    clicked: 375,
    status: "completed",
  },
  {
    id: 2,
    name: "Product Launch SMS",
    type: "sms",
    sent: 1800,
    opened: 1620,
    clicked: 486,
    status: "active",
  },
]

const statusConfig = {
  active: { label: "Active", bg: "bg-success/10", text: "text-success" },
  scheduled: { label: "Scheduled", bg: "bg-info/10", text: "text-info" },
  expired: { label: "Expired", bg: "bg-muted", text: "text-muted-foreground" },
  completed: { label: "Completed", bg: "bg-primary/10", text: "text-primary" },
}

export function MarketingModule() {
  const [activeTab, setActiveTab] = useState<"coupons" | "flash" | "campaigns">("coupons")
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="space-y-6">
      <Header title="Marketing Tools" subtitle="Manage coupons, promotions and marketing campaigns" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Coupons", value: "12", icon: Tag, color: "text-primary" },
          { label: "Flash Sales", value: "3", icon: Zap, color: "text-warning" },
          { label: "Active Campaigns", value: "5", icon: Megaphone, color: "text-info" },
          { label: "Total Reach", value: "45.2K", icon: Mail, color: "text-success" },
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
      <div className="flex items-center justify-between border-b border-border pb-2">
        <div className="flex items-center gap-2">
          {[
            { id: "coupons", label: "Coupons", icon: Tag },
            { id: "flash", label: "Flash Sales", icon: Zap },
            { id: "campaigns", label: "Campaigns", icon: Megaphone },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        <Button className="gap-2 rounded-xl" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4" />
          Create New
        </Button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "coupons" && (
          <motion.div
            key="coupons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {coupons.map((coupon, index) => (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="pro-card rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Percent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-foreground">{coupon.code}</span>
                        <button className="p-1 rounded hover:bg-secondary/50 transition-colors">
                          <Copy className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">{coupon.discount} off</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium",
                      statusConfig[coupon.status as keyof typeof statusConfig].bg,
                      statusConfig[coupon.status as keyof typeof statusConfig].text
                    )}
                  >
                    {statusConfig[coupon.status as keyof typeof statusConfig].label}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Usage: {coupon.used}/{coupon.usageLimit}</span>
                    <span>{Math.round((coupon.used / coupon.usageLimit) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(coupon.used / coupon.usageLimit) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Expires: {coupon.expiresAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "flash" && (
          <motion.div
            key="flash"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {flashSales.map((sale, index) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="pro-card rounded-xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-warning/10">
                      <Zap className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{sale.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sale.discount} on {sale.products} products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        statusConfig[sale.status as keyof typeof statusConfig].bg,
                        statusConfig[sale.status as keyof typeof statusConfig].text
                      )}
                    >
                      {statusConfig[sale.status as keyof typeof statusConfig].label}
                    </span>
                    <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {sale.startDate} - {sale.endDate}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "campaigns" && (
          <motion.div
            key="campaigns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="pro-card rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-xl",
                      campaign.type === "email" ? "bg-info/10" : "bg-success/10"
                    )}>
                      <Mail className={cn(
                        "w-6 h-6",
                        campaign.type === "email" ? "text-info" : "text-success"
                      )} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{campaign.type} Campaign</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium",
                      statusConfig[campaign.status as keyof typeof statusConfig].bg,
                      statusConfig[campaign.status as keyof typeof statusConfig].text
                    )}
                  >
                    {statusConfig[campaign.status as keyof typeof statusConfig].label}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-xl bg-secondary/30 text-center">
                    <p className="text-lg font-bold text-foreground">{campaign.sent.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Sent</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/30 text-center">
                    <p className="text-lg font-bold text-foreground">{campaign.opened.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Opened ({Math.round((campaign.opened / campaign.sent) * 100)}%)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/30 text-center">
                    <p className="text-lg font-bold text-foreground">{campaign.clicked.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Clicked ({Math.round((campaign.clicked / campaign.sent) * 100)}%)</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="pro-card rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Create Coupon</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Coupon Code</label>
                  <input
                    type="text"
                    placeholder="e.g., SUMMER25"
                    className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Discount Type</label>
                    <select className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Discount Value</label>
                    <input
                      type="number"
                      placeholder="25"
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Usage Limit</label>
                    <input
                      type="number"
                      placeholder="100"
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Expiry Date</label>
                    <input
                      type="date"
                      className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 rounded-xl">Create Coupon</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
