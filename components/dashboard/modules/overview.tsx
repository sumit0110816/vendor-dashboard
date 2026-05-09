"use client"

import { Header } from "../header"
import { StatsCards } from "../stats-cards"
import { SalesChart } from "../sales-chart"
import { RecentOrders } from "../recent-orders"
import { Notifications } from "../notifications"
import { TopProducts } from "../top-products"

export function OverviewModule() {
  return (
    <div className="space-y-6">
      <Header
        title="Dashboard Overview"
        subtitle="Welcome back, John! Here's what's happening with your store."
      />
      
      <StatsCards />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>
        <div>
          <Notifications />
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>
    </div>
  )
}
