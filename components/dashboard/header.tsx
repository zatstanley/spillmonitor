"use client"

import { Badge } from "@/components/ui/badge"
import { Waves } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

export function DashboardHeader() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="relative overflow-hidden border-b border-border bg-card shadow-sm">
      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500" />
      
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Ocean-themed logo */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 shadow-lg shadow-sky-500/25">
            <Waves className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Ocean Spill Monitor
            </h1>
            <p className="text-sm text-muted-foreground">
              Painel de Monitoramento Marinho
            </p>
          </div>
          <Badge className="ml-2 border-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md">
            <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Tempo Real
          </Badge>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/logospillmonitor.png"
            alt="Logo Spill Monitor"
            width={210}
            height={56}
            className="h-12 w-auto"
            priority
          />
        </div>

        <div className="flex justify-end">
          <div className="relative overflow-hidden rounded-2xl border border-sky-200/60 bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-5 py-3 text-right shadow-sm shadow-sky-500/10">
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-sky-200/40 blur-2xl" />
              <div className="absolute -bottom-6 left-4 h-16 w-16 rounded-full bg-cyan-200/40 blur-2xl" />
            </div>
            <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-sky-700/70">
              Horário local
            </p>
            <p className="relative text-2xl font-bold tracking-[0.08em] text-slate-900">
              {now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
