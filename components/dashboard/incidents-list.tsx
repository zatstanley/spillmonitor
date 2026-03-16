"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { spillIncidents } from "@/lib/dashboard-data"
import { AlertCircle, CheckCircle2, Clock, Droplet, List } from "lucide-react"

const statusConfig = {
  active: { 
    label: "Ativo", 
    icon: AlertCircle, 
    bgColor: "bg-red-100 dark:bg-red-500/20",
    textColor: "text-red-600 dark:text-red-400",
  },
  contained: { 
    label: "Contido", 
    icon: Clock, 
    bgColor: "bg-amber-100 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  cleanup: { 
    label: "Limpeza", 
    icon: Droplet, 
    bgColor: "bg-cyan-100 dark:bg-cyan-500/20",
    textColor: "text-cyan-600 dark:text-cyan-400",
  },
  resolved: { 
    label: "Resolvido", 
    icon: CheckCircle2, 
    bgColor: "bg-emerald-100 dark:bg-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
}

const riskColors = {
  critical: "bg-red-500 text-white",
  high: "bg-amber-500 text-white",
  medium: "bg-violet-500 text-white",
  low: "bg-emerald-500 text-white",
}

const riskLabels = {
  critical: "Crítico",
  high: "Alto",
  medium: "Médio",
  low: "Baixo",
}

export function IncidentsList() {
  return (
    <Card className="border-primary/20 bg-card shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/25">
            <List className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-base font-semibold">Incidentes Recentes</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2 p-2.5 pt-2">
          {spillIncidents.map((incident, index) => {
            const StatusIcon = statusConfig[incident.status].icon
            const statusStyle = statusConfig[incident.status]
            
            return (
              <div
                key={incident.id}
                className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-border bg-background p-2 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative flex items-center gap-3">
                  <div className={`rounded-xl p-2 transition-transform group-hover:scale-110 ${statusStyle.bgColor}`}>
                    <StatusIcon className={`h-4 w-4 ${statusStyle.textColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{incident.id}</span>
                      <Badge className={`text-xs shadow-sm ${riskColors[incident.riskLevel]}`}>
                        {riskLabels[incident.riskLevel]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{incident.location}</p>
                  </div>
                </div>
                <div className="relative text-right">
                  <p className="text-base font-bold text-foreground">{incident.volume.toLocaleString()} bbl</p>
                  <p className={`text-sm font-medium ${statusStyle.textColor}`}>{statusStyle.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
