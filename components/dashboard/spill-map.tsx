"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { spillIncidents, type SpillIncident } from "@/lib/dashboard-data"
import { useState, useEffect } from "react"
import { MapPin, X, Navigation, Layers, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const riskColors = {
  critical: { bg: "bg-destructive", text: "text-destructive-foreground", hex: "#ef4444" },
  high: { bg: "bg-warning", text: "text-warning-foreground", hex: "#f59e0b" },
  medium: { bg: "bg-chart-4", text: "text-foreground", hex: "#8b5cf6" },
  low: { bg: "bg-success", text: "text-success-foreground", hex: "#10b981" },
}

const statusLabels = {
  active: "Ativo",
  contained: "Contido",
  cleanup: "Limpeza",
  resolved: "Resolvido",
}

const riskLabels = {
  critical: "Crítico",
  high: "Alto",
  medium: "Médio",
  low: "Baixo",
}

// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)
const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
)
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
)
function MapControls({ onZoomIn, onZoomOut, onReset }: { onZoomIn: () => void; onZoomOut: () => void; onReset: () => void }) {
  return (
    <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
      <Button
        size="icon"
        variant="secondary"
        className="h-9 w-9 bg-card/90 shadow-lg backdrop-blur-sm hover:bg-card"
        onClick={onZoomIn}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="h-9 w-9 bg-card/90 shadow-lg backdrop-blur-sm hover:bg-card"
        onClick={onZoomOut}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="h-9 w-9 bg-card/90 shadow-lg backdrop-blur-sm hover:bg-card"
        onClick={onReset}
      >
        <Navigation className="h-4 w-4" />
      </Button>
    </div>
  )
}

function IncidentPopup({ incident }: { incident: SpillIncident }) {
  return (
    <div className="min-w-[240px] p-1">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
          <MapPin className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{incident.id}</p>
          <p className="text-xs text-muted-foreground">{incident.location}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge variant="secondary" className="text-xs">
            {statusLabels[incident.status]}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Risco</span>
          <Badge className={`${riskColors[incident.riskLevel].bg} ${riskColors[incident.riskLevel].text}`}>
            {riskLabels[incident.riskLevel]}
          </Badge>
        </div>
        <div className="my-2 h-px bg-border" />
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-secondary/50 p-2 text-center">
            <p className="text-base font-semibold text-foreground">{incident.volume.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">bbl</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-2 text-center">
            <p className="text-base font-semibold text-foreground">{incident.affectedArea}</p>
            <p className="text-xs text-muted-foreground">km2</p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-primary/10 p-2">
          <span className="text-sm text-muted-foreground">Resposta</span>
          <span className="font-semibold text-primary">{incident.responseTime} min</span>
        </div>
      </div>
    </div>
  )
}

function MapContent({ selectedIncident, setSelectedIncident }: { 
  selectedIncident: SpillIncident | null
  setSelectedIncident: (incident: SpillIncident | null) => void 
}) {
  const [mapRef, setMapRef] = useState<L.Map | null>(null)
  const [mapKey] = useState(() => `spill-map-${Math.random().toString(36).slice(2)}`)
  
  const defaultCenter: [number, number] = [27.5, -90]
  const defaultZoom = 6

  useEffect(() => {
    if (selectedIncident && mapRef) {
      mapRef.setView(
        [selectedIncident.coordinates.lat, selectedIncident.coordinates.lng],
        8,
        { animate: true }
      )
    }
  }, [selectedIncident, mapRef])

  useEffect(() => {
    return () => {
      mapRef?.remove()
    }
  }, [mapRef])

  return (
    <>
      <MapContainer
        key={mapKey}
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
        zoomControl={false}
        whenCreated={setMapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {spillIncidents.map((incident) => {
          const size = Math.max(8, Math.min(20, incident.volume / 500))
          const color = riskColors[incident.riskLevel].hex
          const isSelected = selectedIncident?.id === incident.id
          
          return (
            <CircleMarker
              key={incident.id}
              center={[incident.coordinates.lat, incident.coordinates.lng]}
              radius={isSelected ? size * 1.5 : size}
              pathOptions={{
                fillColor: color,
                fillOpacity: incident.status === "resolved" ? 0.4 : 0.8,
                color: isSelected ? "#ffffff" : color,
                weight: isSelected ? 3 : 2,
                opacity: 1,
              }}
              eventHandlers={{
                click: () => setSelectedIncident(incident),
              }}
            >
              <Popup>
                <IncidentPopup incident={incident} />
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
      
      <MapControls
        onZoomIn={() => mapRef?.zoomIn()}
        onZoomOut={() => mapRef?.zoomOut()}
        onReset={() => mapRef?.setView(defaultCenter, defaultZoom)}
      />
    </>
  )
}

export function SpillMap() {
  const [selectedIncident, setSelectedIncident] = useState<SpillIncident | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Card className="group relative h-full overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card to-ocean-light/10 shadow-lg shadow-primary/5 lg:col-span-2">
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
              <Navigation className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Mapa de Incidentes</CardTitle>
              <p className="text-xs text-muted-foreground">Golfo do Mexico - Tempo Real</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-destructive shadow-sm" />
              <span className="text-muted-foreground">Crítico</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-warning shadow-sm" />
              <span className="text-muted-foreground">Alto</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-chart-4 shadow-sm" />
              <span className="text-muted-foreground">Medio</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-success shadow-sm" />
              <span className="text-muted-foreground">Baixo</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative flex-1">
        <div className="relative h-full min-h-[200px] w-full overflow-hidden rounded-xl ring-1 ring-border">
          {isClient ? (
            <MapContent 
              selectedIncident={selectedIncident} 
              setSelectedIncident={setSelectedIncident} 
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary/30">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Layers className="h-8 w-8 animate-pulse" />
                <span className="text-sm">Carregando mapa...</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Selected incident sidebar */}
        {selectedIncident && (
          <div className="absolute bottom-6 left-6 z-[1000] w-72 overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur-md">
            <div className="bg-gradient-to-r from-primary/15 to-accent/15 p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{selectedIncident.id}</span>
                    <p className="text-xs text-muted-foreground">{selectedIncident.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="rounded-lg p-1.5 transition-colors hover:bg-secondary"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3 p-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="secondary" className="text-xs">
                  {statusLabels[selectedIncident.status]}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Nivel de Risco</span>
                <Badge className={`${riskColors[selectedIncident.riskLevel].bg} ${riskColors[selectedIncident.riskLevel].text}`}>
                  {riskLabels[selectedIncident.riskLevel]}
                </Badge>
              </div>
              <div className="h-px bg-border/50" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-secondary/50 p-2 text-center">
                  <p className="text-lg font-semibold text-foreground">{selectedIncident.volume.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">bbl derramados</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-2 text-center">
                  <p className="text-lg font-semibold text-foreground">{selectedIncident.affectedArea}</p>
                  <p className="text-xs text-muted-foreground">km2 afetados</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-primary/10 p-2">
                <span className="text-sm text-muted-foreground">Tempo de Resposta</span>
                <span className="font-semibold text-primary">{selectedIncident.responseTime} min</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
