"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { spillIncidents, responseTeams, vessels, containmentProgress } from "@/lib/dashboard-data"
import { AlertTriangle, Activity, Droplets, Timer, Users, Ship } from "lucide-react"

const riskOrder = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
} as const

const riskStyles = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-warning text-warning-foreground",
  medium: "bg-chart-4 text-foreground",
  low: "bg-success text-success-foreground",
} as const

const statusLabels = {
  active: "Ativo",
  contained: "Contido",
  cleanup: "Limpeza",
  resolved: "Resolvido",
} as const

const cleanupData = [
  { id: "SP-001", location: "Costa do Golfo", progress: 35, status: "Em andamento" },
  { id: "SP-002", location: "Plataforma Delta", progress: 68, status: "Em andamento" },
  { id: "SP-003", location: "Terminal Sul", progress: 92, status: "Finalizando" },
]

function formatCompact(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return value.toString()
}

export function CommandCenterPanel() {
  const activeIncidents = spillIncidents.filter((i) => i.status !== "resolved")
  const criticalCount = spillIncidents.filter((i) => i.riskLevel === "critical").length
  const totalVolume = activeIncidents.reduce((acc, i) => acc + i.volume, 0)
  const avgResponse = activeIncidents.length
    ? Math.round(activeIncidents.reduce((acc, i) => acc + i.responseTime, 0) / activeIncidents.length)
    : 0

  const deployedTeams = responseTeams.filter((t) => t.status === "deployed").length
  const deployedMembers = responseTeams
    .filter((t) => t.status === "deployed")
    .reduce((acc, t) => acc + t.members, 0)

  const activeVessels = vessels.filter((v) => v.status === "active").length
  const activeCapacity = vessels
    .filter((v) => v.status === "active")
    .reduce((acc, v) => acc + v.capacity, 0)

  const containmentNow = containmentProgress[containmentProgress.length - 1] ?? { contained: 0, recovered: 0 }
  const cleanupAvg = Math.round(
    cleanupData.reduce((acc, item) => acc + item.progress, 0) / cleanupData.length
  )

  const priorityIncidents = [...spillIncidents]
    .sort(
      (a, b) =>
        riskOrder[a.riskLevel] - riskOrder[b.riskLevel] || b.volume - a.volume
    )
    .slice(0, 3)

  return (
    <Card className="h-full border-primary/20 bg-card shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-500/25">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Centro Operacional</CardTitle>
              <p className="text-xs text-muted-foreground">Resumo em tempo real</p>
            </div>
          </div>
          <Badge className="border-0 bg-destructive text-destructive-foreground">
            Críticos: {criticalCount}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-background/70 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Incidentes Ativos</span>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">{activeIncidents.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-background/70 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Volume Ativo</span>
              <Droplets className="h-4 w-4 text-cyan-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">{formatCompact(totalVolume)} bbl</p>
          </div>
          <div className="rounded-xl border border-border bg-background/70 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Equipes em Campo</span>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">{deployedTeams}</p>
            <p className="text-xs text-muted-foreground">{deployedMembers} membros</p>
          </div>
          <div className="rounded-xl border border-border bg-background/70 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Capacidade Ativa</span>
              <Ship className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {formatCompact(activeCapacity)} bbl
            </p>
            <p className="text-xs text-muted-foreground">{activeVessels} unidades</p>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-3">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background/60 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-semibold text-foreground">Alertas Prioritários</span>
              </div>
              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                {priorityIncidents.length} itens
              </Badge>
            </div>
            <div className="mt-2 min-h-0 space-y-2 overflow-hidden">
              {priorityIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card/80 p-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{incident.id}</span>
                      <Badge className={`text-xs ${riskStyles[incident.riskLevel]}`}>
                        {incident.riskLevel === "critical" ? "Crítico" : incident.riskLevel === "high" ? "Alto" : incident.riskLevel === "medium" ? "Médio" : "Baixo"}
                      </Badge>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{incident.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{formatCompact(incident.volume)} bbl</p>
                    <p className="text-xs text-muted-foreground">{statusLabels[incident.status]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background/60 p-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-sky-600" />
                <span className="text-sm font-semibold text-foreground">Progresso Operacional</span>
              </div>
              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                Resposta média: {avgResponse} min
              </Badge>
            </div>
            <div className="mt-2 min-h-0 space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Contenção</span>
                  <span className="font-semibold text-foreground">{containmentNow.contained}%</span>
                </div>
                <Progress value={containmentNow.contained} className="mt-1.5 h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Limpeza</span>
                  <span className="font-semibold text-foreground">{cleanupAvg}%</span>
                </div>
                <Progress value={cleanupAvg} className="mt-1.5 h-2" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-emerald-50 p-1.5 text-center dark:bg-emerald-500/10">
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {containmentNow.recovered}%
                  </p>
                  <p className="text-[11px] text-muted-foreground">Recuperado</p>
                </div>
                <div className="rounded-lg bg-sky-50 p-1.5 text-center dark:bg-sky-500/10">
                  <p className="text-base font-bold text-sky-600 dark:text-sky-400">
                    {cleanupAvg}%
                  </p>
                  <p className="text-[11px] text-muted-foreground">Limpeza média</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
