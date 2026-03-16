"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Clock, Droplets, DollarSign, TrendingDown, TrendingUp } from "lucide-react"

interface KPICardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  gradientFrom: string
  gradientTo: string
}

function KPICard({ title, value, change, changeLabel, icon, gradientFrom, gradientTo }: KPICardProps) {
  const isPositive = change > 0
  const isGoodChange = title.includes("Tempo") ? !isPositive : isPositive

  return (
    <Card className="group relative overflow-hidden border-0 bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Gradient header bar */}
      <div 
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }}
      />
      
      <CardContent className="relative p-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <p className="text-xl font-bold tracking-tight text-foreground">{value}</p>
          </div>
          <div 
            className="flex h-9 w-9 items-center justify-center rounded-xl shadow-md transition-transform group-hover:scale-110"
            style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
          >
            {icon}
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-2">
          <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 ${
            isGoodChange 
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" 
              : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
          }`}>
            {isGoodChange ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
            <span className="text-[11px] font-semibold">
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function KPICards() {
  const kpis = [
    {
      title: "Incidentes Ativos",
      value: "5",
      change: 25,
      changeLabel: "vs. mes anterior",
      icon: <AlertTriangle className="h-4 w-4 text-white" />,
      gradientFrom: "#f59e0b",
      gradientTo: "#ef4444",
    },
    {
      title: "Tempo Médio de Resposta",
      value: "33 min",
      change: -12,
      changeLabel: "melhoria",
      icon: <Clock className="h-4 w-4 text-white" />,
      gradientFrom: "#0ea5e9",
      gradientTo: "#3b82f6",
    },
    {
      title: "Volume Derramado (bbl)",
      value: "33.450",
      change: 18,
      changeLabel: "vs. mes anterior",
      icon: <Droplets className="h-4 w-4 text-white" />,
      gradientFrom: "#06b6d4",
      gradientTo: "#0891b2",
    },
    {
      title: "Custo Operacional",
      value: "R$ 5,01M",
      change: 22,
      changeLabel: "este mes",
      icon: <DollarSign className="h-4 w-4 text-white" />,
      gradientFrom: "#10b981",
      gradientTo: "#059669",
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  )
}
