"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { monthlyTrends, containmentProgress, regionData } from "@/lib/dashboard-data"
import { TrendingUp, BarChart3, Timer, PieChartIcon, Activity } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Bright, visible ocean-inspired colors
const COLORS = ["#0ea5e9", "#06b6d4", "#14b8a6", "#8b5cf6"]

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-xl">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="mt-1 text-sm text-muted-foreground">
            {entry.name}: <span className="font-semibold text-foreground">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function IncidentsTrendChart() {
  return (
    <Card className="group border-primary/20 bg-card shadow-md transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-500/25">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-base font-semibold">Tendencia de Incidentes</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrends}>
              <defs>
                <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.5} />
                  <stop offset="50%" stopColor="#0ea5e9" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="incidents"
                name="Incidentes"
                stroke="#0ea5e9"
                strokeWidth={3}
                fill="url(#incidentGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function VolumeChart() {
  return (
    <Card className="group border-primary/20 bg-card shadow-md transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-md shadow-cyan-500/25">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-base font-semibold">Volume Derramado (bbl)</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrends}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="volume" 
                name="Volume" 
                fill="url(#volumeGradient)" 
                radius={[6, 6, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function ResponseTimeChart() {
  return (
    <Card className="group border-primary/20 bg-card shadow-md transition-all hover:border-success/40 hover:shadow-lg hover:shadow-success/10">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-md shadow-emerald-500/25">
            <Timer className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-base font-semibold">Tempo de Resposta (min)</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrends}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                domain={[20, 50]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="responseTime"
                name="Tempo (min)"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ fill: "#14b8a6", strokeWidth: 0, r: 5 }}
                activeDot={{ r: 7, strokeWidth: 0, fill: "#14b8a6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function RegionDistributionChart() {
  return (
    <Card className="group border-primary/20 bg-card shadow-md transition-all hover:border-chart-4/40 hover:shadow-lg hover:shadow-chart-4/10">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-md shadow-violet-500/25">
            <PieChartIcon className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-base font-semibold">Distribuição por Região</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex h-[140px] items-center">
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={regionData}
                  dataKey="incidents"
                  nameKey="region"
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={56}
                  paddingAngle={4}
                  strokeWidth={0}
                >
                  {regionData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="transition-all hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 space-y-2">
            {regionData.map((item, index) => (
              <div key={item.region} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full shadow-sm" 
                    style={{ 
                      backgroundColor: COLORS[index],
                      boxShadow: `0 0 10px ${COLORS[index]}50`
                    }} 
                  />
                  <span className="text-muted-foreground">{item.region}</span>
                </div>
                <span className="font-bold text-foreground">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ContainmentProgressChart() {
  return (
    <Card className="border-primary/20 bg-card shadow-md h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/25">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-base font-semibold">Progresso de Contenção (SP-001)</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex h-full min-h-0 flex-col">
        <div className="min-h-[90px] flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={containmentProgress}>
              <defs>
                <linearGradient id="containedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="recoveredGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="contained"
                name="Contido (%)"
                stroke="#0ea5e9"
                strokeWidth={3}
                fill="url(#containedGradient)"
              />
              <Area
                type="monotone"
                dataKey="recovered"
                name="Recuperado (%)"
                stroke="#14b8a6"
                strokeWidth={3}
                fill="url(#recoveredGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-1 flex justify-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-5 rounded-full bg-sky-500 shadow-sm" style={{ boxShadow: "0 0 8px #0ea5e950" }} />
            <span className="text-muted-foreground">Contido</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-5 rounded-full bg-teal-500 shadow-sm" style={{ boxShadow: "0 0 8px #14b8a650" }} />
            <span className="text-muted-foreground">Recuperado</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
