"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { responseTeams, vessels } from "@/lib/dashboard-data"
import { Anchor, Plane, Ship, Users, Wrench, Zap, Waves } from "lucide-react"

const teamStatusConfig = {
  deployed: { 
    label: "Em Campo", 
    bgColor: "bg-emerald-100 dark:bg-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400"
  },
  standby: { 
    label: "Aguardando", 
    bgColor: "bg-amber-100 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400"
  },
  returning: { 
    label: "Retornando", 
    bgColor: "bg-cyan-100 dark:bg-cyan-500/20",
    textColor: "text-cyan-600 dark:text-cyan-400"
  },
}

const vesselStatusConfig = {
  active: { 
    label: "Ativo", 
    bgColor: "bg-emerald-100 dark:bg-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400"
  },
  standby: { 
    label: "Aguardando", 
    bgColor: "bg-amber-100 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400"
  },
  maintenance: { 
    label: "Manutencao", 
    bgColor: "bg-red-100 dark:bg-red-500/20",
    textColor: "text-red-600 dark:text-red-400"
  },
}

const vesselIcons = {
  skimmer: Ship,
  supply: Anchor,
  command: Zap,
  helicopter: Plane,
}

export function ResponseTeamsPanel() {
  const deployedCount = responseTeams.filter((t) => t.status === "deployed").length
  const deployedMembers = responseTeams
    .filter((t) => t.status === "deployed")
    .reduce((acc, t) => acc + t.members, 0)

  return (
    <Card className="border-primary/20 bg-card shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/25">
              <Users className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-semibold">Equipes de Resposta</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {responseTeams.map((team) => {
          const statusStyle = teamStatusConfig[team.status]
          return (
            <div
              key={team.id}
              className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-border bg-background p-2.5 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-foreground">{team.name}</span>
                  <Badge className={`text-xs ${statusStyle.bgColor} ${statusStyle.textColor} border-0`}>
                    {statusStyle.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{team.members} membros</span>
                  {team.currentMission && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      Missao: {team.currentMission}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-1.5">
                {team.equipment.slice(0, 2).map((eq) => (
                  <Badge key={eq} variant="secondary" className="text-sm">
                    {eq}
                  </Badge>
                ))}
                {team.equipment.length > 2 && (
                  <Badge variant="secondary" className="text-sm">
                    +{team.equipment.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )
        })}
        
        {/* Progress card */}
        <div className="mt-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-3 dark:from-blue-500/10 dark:to-cyan-500/10">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">Equipes em Campo</span>
            <span className="text-lg font-bold text-foreground">
              {deployedCount}/{responseTeams.length}
            </span>
          </div>
          <Progress value={(deployedCount / responseTeams.length) * 100} className="mt-2 h-2.5" />
        </div>
      </CardContent>
    </Card>
  )
}

export function VesselsPanel() {
  const activeCount = vessels.filter((v) => v.status === "active").length
  const totalCapacity = vessels.reduce((acc, v) => acc + v.capacity, 0)
  const activeCapacity = vessels
    .filter((v) => v.status === "active")
    .reduce((acc, v) => acc + v.capacity, 0)

  return (
    <Card className="border-primary/20 bg-card shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-md shadow-cyan-500/25">
              <Ship className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-semibold">Embarcacoes e Aeronaves</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {vessels.map((vessel) => {
          const statusStyle = vesselStatusConfig[vessel.status]
          const VesselIcon = vesselIcons[vessel.type]
          return (
            <div
              key={vessel.id}
              className="group flex items-center justify-between rounded-xl border border-border bg-background p-2.5 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-xl p-2.5 transition-transform group-hover:scale-110 ${statusStyle.bgColor}`}>
                  <VesselIcon className={`h-5 w-5 ${statusStyle.textColor}`} />
                </div>
                <div className="space-y-0.5">
                  <span className="text-base font-semibold text-foreground">{vessel.name}</span>
                  <p className="text-sm text-muted-foreground">{vessel.location}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`text-xs ${statusStyle.bgColor} ${statusStyle.textColor} border-0`}>
                  {statusStyle.label}
                </Badge>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{vessel.capacity.toLocaleString()} bbl</p>
              </div>
            </div>
          )
        })}
        
        {/* Stats cards */}
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-3 text-center dark:from-emerald-500/10 dark:to-teal-500/10">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{activeCount}</p>
            <p className="text-sm font-medium text-muted-foreground">Unidades Ativas</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-sky-50 p-3 text-center dark:from-cyan-500/10 dark:to-sky-500/10">
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{(totalCapacity / 1000).toFixed(1)}k</p>
            <p className="text-sm font-medium text-muted-foreground">Capacidade (bbl)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CleanupProgressPanel() {
  const cleanupData = [
    { id: "SP-001", location: "Costa do Golfo", progress: 35, status: "Em andamento" },
    { id: "SP-002", location: "Plataforma Delta", progress: 68, status: "Em andamento" },
    { id: "SP-003", location: "Terminal Sul", progress: 92, status: "Finalizando" },
  ]
  const avgProgress = Math.round(
    cleanupData.reduce((acc, item) => acc + item.progress, 0) / cleanupData.length
  )

  return (
    <Card className="border-primary/20 bg-card shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-amber-500/25">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-semibold">Progresso de Limpeza</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {cleanupData.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-base font-semibold text-foreground">{item.id}</span>
                <p className="text-sm text-muted-foreground">{item.location}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-foreground">{item.progress}%</span>
                <p className="text-sm text-muted-foreground">{item.status}</p>
              </div>
            </div>
            <Progress value={item.progress} className="h-2.5" />
          </div>
        ))}
        
        {/* Status banner */}
        <div className="mt-2 flex items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-2.5 dark:from-emerald-500/10 dark:to-teal-500/10">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20">
              <Waves className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Operacoes em progresso</span>
          </div>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {cleanupData.filter((d) => d.progress < 100).length} ativas
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
