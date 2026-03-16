import { DashboardHeader } from "@/components/dashboard/header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { SpillMap } from "@/components/dashboard/spill-map"
import { CommandCenterPanel } from "@/components/dashboard/command-center"
import {
  IncidentsTrendChart,
  VolumeChart,
  ResponseTimeChart,
  RegionDistributionChart,
  ContainmentProgressChart,
} from "@/components/dashboard/trend-charts"
import { WavePattern, BubbleDecoration, OceanGradientOverlay } from "@/components/dashboard/ocean-elements"
import { LeafletStyles } from "@/components/dashboard/leaflet-styles"

export default function OilSpillDashboard() {
  return (
    <div className="tv-dashboard relative h-screen overflow-hidden bg-background">
      <LeafletStyles />
      {/* Ocean ambient decorations */}
      <OceanGradientOverlay className="fixed inset-0 z-0" />
      <BubbleDecoration className="fixed inset-0 z-0" />
      
      {/* Wave decoration at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-0">
        <WavePattern className="h-32 w-full opacity-30" />
      </div>
      
      <div className="relative z-10 flex h-full flex-col">
        <DashboardHeader />

        <main className="flex-1 min-h-0 p-2 lg:p-3">
          <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-2">
            {/* KPI Cards */}
            <section aria-label="Indicadores principais">
              <KPICards />
            </section>

            {/* Main content grid */}
            <section aria-label="Visao geral" className="grid min-h-0 flex-1 grid-cols-[minmax(0,2.2fr)_minmax(0,1.5fr)_minmax(0,1.2fr)] gap-3">
              <div className="min-h-0">
                <SpillMap />
              </div>
              <div className="grid min-h-0 grid-rows-[minmax(0,2fr)_minmax(0,1fr)] gap-3">
                <div className="grid min-h-0 grid-cols-2 grid-rows-2 gap-3">
                  <IncidentsTrendChart />
                  <VolumeChart />
                  <ResponseTimeChart />
                  <RegionDistributionChart />
                </div>
                <ContainmentProgressChart />
              </div>
              <div className="min-h-0">
                <CommandCenterPanel />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
