"use client"

import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Header } from "../header"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const revenueData = [
  { month: "Jan", revenue: 24000, profit: 8400 },
  { month: "Feb", revenue: 18000, profit: 6300 },
  { month: "Mar", revenue: 32000, profit: 11200 },
  { month: "Apr", revenue: 28000, profit: 9800 },
  { month: "May", revenue: 42000, profit: 14700 },
  { month: "Jun", revenue: 38000, profit: 13300 },
  { month: "Jul", revenue: 52000, profit: 18200 },
  { month: "Aug", revenue: 48000, profit: 16800 },
  { month: "Sep", revenue: 58000, profit: 20300 },
  { month: "Oct", revenue: 54000, profit: 18900 },
  { month: "Nov", revenue: 68000, profit: 23800 },
  { month: "Dec", revenue: 62000, profit: 21700 },
]

const categoryData = [
  { name: "Electronics", value: 45, color: "oklch(0.45 0.15 250)" },
  { name: "Wearables", value: 25, color: "oklch(0.55 0.18 160)" },
  { name: "Accessories", value: 20, color: "oklch(0.65 0.15 45)" },
  { name: "Other", value: 10, color: "oklch(0.50 0.18 280)" },
]

const conversionData = [
  { day: "Mon", visitors: 1200, conversions: 84 },
  { day: "Tue", visitors: 1400, conversions: 112 },
  { day: "Wed", visitors: 1100, conversions: 77 },
  { day: "Thu", visitors: 1600, conversions: 144 },
  { day: "Fri", visitors: 1800, conversions: 162 },
  { day: "Sat", visitors: 2200, conversions: 198 },
  { day: "Sun", visitors: 1900, conversions: 152 },
]

const topProducts = [
  { name: "Smart Watch Pro", sales: 1247, revenue: "₹572,973", growth: 23 },
  { name: "Premium Headphones", sales: 986, revenue: "₹294,714", growth: 18 },
  { name: "Mechanical Keyboard", sales: 754, revenue: "₹112,346", growth: 12 },
  { name: "USB-C Hub", sales: 642, revenue: "₹50,718", growth: 8 },
  { name: "Wireless Mouse", sales: 534, revenue: "₹26,166", growth: -5 },
]

const kpiCards = [
  {
    title: "Total Revenue",
    value: "₹524,890",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Total Orders",
    value: "8,456",
    change: "+12.4%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    title: "Conversion Rate",
    value: "8.9%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Avg Order Value",
    value: "₹62.08",
    change: "-1.3%",
    trend: "down",
    icon: DollarSign,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
]

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string; color: string; name?: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="pro-card rounded-xl p-3 min-w-[150px]">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <span className="text-muted-foreground capitalize">{entry.dataKey}</span>
            <span className="font-medium text-foreground">
              {entry.dataKey.includes("revenue") || entry.dataKey.includes("profit")
                ? `₹${entry.value.toLocaleString()}`
                : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function AnalyticsModule() {
  return (
    <div className="space-y-6">
      <Header title="Analytics & Insights" subtitle="Deep dive into your store performance and trends" />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon
          const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="pro-card rounded-xl p-5 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className={cn("p-3 rounded-xl", kpi.bgColor)}>
                  <Icon className={cn("w-5 h-5", kpi.color)} />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    kpi.trend === "up" ? "text-success" : "text-destructive"
                  )}
                >
                  <TrendIcon className="w-3 h-3" />
                  {kpi.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pro-card rounded-xl p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Revenue & Profit</h3>
            <p className="text-sm text-muted-foreground mt-1">Monthly financial performance</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">Profit</span>
            </div>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.45 0.15 250)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="oklch(0.45 0.15 250)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.18 160)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="oklch(0.55 0.18 160)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 260)" />
              <XAxis dataKey="month" stroke="oklch(0.45 0.01 260)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="oklch(0.45 0.01 260)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.45 0.15 250)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="oklch(0.55 0.18 160)"
                strokeWidth={2}
                strokeDasharray="5 5"
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pro-card rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Sales by Category</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="pro-card rounded-xl p-3">
                          <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
                          <p className="text-xs text-muted-foreground">{payload[0].value}%</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className="text-sm text-muted-foreground">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{category.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Conversion Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pro-card rounded-xl p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Visitor Conversion</h3>
              <p className="text-sm text-muted-foreground mt-1">Weekly visitors vs conversions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-info" />
                <span className="text-xs text-muted-foreground">Visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Conversions</span>
              </div>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 260)" />
                <XAxis dataKey="day" stroke="oklch(0.45 0.01 260)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.45 0.01 260)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="visitors" fill="oklch(0.55 0.15 230)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" fill="oklch(0.45 0.15 250)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* AI Predictions & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Sales Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pro-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI Sales Prediction</h3>
              <p className="text-sm text-muted-foreground">Next month forecast</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-xs text-muted-foreground">Predicted Revenue</p>
              <p className="text-2xl font-bold text-foreground mt-1">₹72,450</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-xs text-success">+16.8% vs last month</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-xs text-muted-foreground">Predicted Orders</p>
              <p className="text-2xl font-bold text-foreground mt-1">1,156</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-xs text-success">+14.2% vs last month</span>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm text-foreground font-medium mb-2">AI Insight</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Based on current trends and seasonal patterns, expect a significant increase in sales during the upcoming holiday period. Consider increasing inventory for your top 3 products.
            </p>
          </div>
        </motion.div>

        {/* Top Products Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pro-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Top Products Performance</h3>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary/50 flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales.toLocaleString()} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{product.revenue}</p>
                  <div
                    className={cn(
                      "flex items-center gap-1 justify-end",
                      product.growth >= 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {product.growth >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span className="text-xs">{product.growth >= 0 ? "+" : ""}{product.growth}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
