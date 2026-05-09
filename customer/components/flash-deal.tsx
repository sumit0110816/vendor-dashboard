"use client"

import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Clock, Zap } from "lucide-react"
import { useEffect, useState } from "react"

interface FlashDealProps {
  deal: {
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    endTime: Date
    sold: number
    total: number
  }
}

export function FlashDeal({ deal }: FlashDealProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = deal.endTime.getTime()
      const diff = end - now

      if (diff > 0) {
        setTimeLeft({
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [deal.endTime])

  const discount = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
  const soldPercent = (deal.sold / deal.total) * 100

  return (
    <GlassCard className="overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Image */}
        <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${deal.image})`,
              backgroundColor: '#f4f4f5'
            }}
          />
          <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded-md bg-red-500 text-white flex items-center gap-1">
            <Zap className="h-3 w-3" />
            -{discount}%
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <h3 className="font-medium text-foreground line-clamp-2">{deal.name}</h3>
          
          {/* Timer */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <div className="flex items-center gap-1 font-mono text-sm">
              <span className="px-2 py-1 rounded bg-primary/10 text-primary font-bold">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-muted-foreground">:</span>
              <span className="px-2 py-1 rounded bg-primary/10 text-primary font-bold">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-muted-foreground">:</span>
              <span className="px-2 py-1 rounded bg-primary/10 text-primary font-bold">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">${deal.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through">${deal.originalPrice.toFixed(2)}</span>
          </div>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${soldPercent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{deal.sold} sold of {deal.total}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
