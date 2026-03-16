export interface SpillIncident {
  id: string
  location: string
  coordinates: { lat: number; lng: number }
  volume: number // barrels
  riskLevel: "critical" | "high" | "medium" | "low"
  status: "active" | "contained" | "cleanup" | "resolved"
  reportedAt: string
  responseTime: number // minutes
  affectedArea: number // km²
  estimatedCost: number
}

export interface ResponseTeam {
  id: string
  name: string
  status: "deployed" | "standby" | "returning"
  currentMission?: string
  members: number
  equipment: string[]
}

export interface Vessel {
  id: string
  name: string
  type: "skimmer" | "supply" | "command" | "helicopter"
  status: "active" | "maintenance" | "standby"
  location: string
  capacity: number
}

export const spillIncidents: SpillIncident[] = [
  {
    id: "SP-001",
    location: "Costa do Golfo - Setor A",
    coordinates: { lat: 28.5, lng: -88.5 },
    volume: 15000,
    riskLevel: "critical",
    status: "active",
    reportedAt: "2026-03-13T08:30:00",
    responseTime: 45,
    affectedArea: 25.5,
    estimatedCost: 2500000,
  },
  {
    id: "SP-002",
    location: "Plataforma Offshore Delta",
    coordinates: { lat: 29.2, lng: -87.8 },
    volume: 8500,
    riskLevel: "high",
    status: "contained",
    reportedAt: "2026-03-12T14:15:00",
    responseTime: 32,
    affectedArea: 12.3,
    estimatedCost: 1200000,
  },
  {
    id: "SP-003",
    location: "Terminal Portuário Sul",
    coordinates: { lat: 27.8, lng: -89.2 },
    volume: 3200,
    riskLevel: "medium",
    status: "cleanup",
    reportedAt: "2026-03-11T22:45:00",
    responseTime: 28,
    affectedArea: 5.8,
    estimatedCost: 450000,
  },
  {
    id: "SP-004",
    location: "Baía de Mobile",
    coordinates: { lat: 30.3, lng: -88.0 },
    volume: 950,
    riskLevel: "low",
    status: "resolved",
    reportedAt: "2026-03-10T11:00:00",
    responseTime: 22,
    affectedArea: 1.2,
    estimatedCost: 85000,
  },
  {
    id: "SP-005",
    location: "Costa de Pensacola",
    coordinates: { lat: 30.1, lng: -87.3 },
    volume: 5800,
    riskLevel: "high",
    status: "active",
    reportedAt: "2026-03-13T03:20:00",
    responseTime: 38,
    affectedArea: 8.9,
    estimatedCost: 780000,
  },
]

export const responseTeams: ResponseTeam[] = [
  {
    id: "RT-001",
    name: "Equipe Alpha",
    status: "deployed",
    currentMission: "SP-001",
    members: 12,
    equipment: ["Skimmer", "Barreiras", "Dispersantes"],
  },
  {
    id: "RT-002",
    name: "Equipe Bravo",
    status: "deployed",
    currentMission: "SP-005",
    members: 10,
    equipment: ["Skimmer", "Barreiras"],
  },
  {
    id: "RT-003",
    name: "Equipe Charlie",
    status: "standby",
    members: 8,
    equipment: ["Barreiras", "Equipamento de Limpeza"],
  },
  {
    id: "RT-004",
    name: "Equipe Delta",
    status: "returning",
    currentMission: "SP-003",
    members: 11,
    equipment: ["Skimmer", "Dispersantes", "Drones"],
  },
]

export const vessels: Vessel[] = [
  {
    id: "V-001",
    name: "Gulf Responder",
    type: "skimmer",
    status: "active",
    location: "SP-001",
    capacity: 5000,
  },
  {
    id: "V-002",
    name: "Ocean Guardian",
    type: "command",
    status: "active",
    location: "SP-001",
    capacity: 2000,
  },
  {
    id: "V-003",
    name: "Coastal Defender",
    type: "skimmer",
    status: "active",
    location: "SP-005",
    capacity: 3500,
  },
  {
    id: "V-004",
    name: "Eagle One",
    type: "helicopter",
    status: "standby",
    location: "Base Principal",
    capacity: 500,
  },
  {
    id: "V-005",
    name: "Supply Runner",
    type: "supply",
    status: "maintenance",
    location: "Porto",
    capacity: 8000,
  },
]

export const monthlyTrends = [
  { month: "Jan", incidents: 4, volume: 12500, responseTime: 42 },
  { month: "Fev", incidents: 3, volume: 8200, responseTime: 38 },
  { month: "Mar", incidents: 5, volume: 28450, responseTime: 33 },
  { month: "Abr", incidents: 2, volume: 5600, responseTime: 35 },
  { month: "Mai", incidents: 6, volume: 32100, responseTime: 41 },
  { month: "Jun", incidents: 4, volume: 15800, responseTime: 29 },
  { month: "Jul", incidents: 7, volume: 45200, responseTime: 36 },
  { month: "Ago", incidents: 5, volume: 22400, responseTime: 32 },
  { month: "Set", incidents: 3, volume: 9800, responseTime: 28 },
  { month: "Out", incidents: 4, volume: 18600, responseTime: 34 },
  { month: "Nov", incidents: 2, volume: 6200, responseTime: 25 },
  { month: "Dez", incidents: 3, volume: 11500, responseTime: 30 },
]

export const regionData = [
  { region: "Costa do Golfo", incidents: 18, percentage: 38 },
  { region: "Offshore", incidents: 12, percentage: 25 },
  { region: "Terminais", incidents: 9, percentage: 19 },
  { region: "Baías", incidents: 8, percentage: 18 },
]

export const containmentProgress = [
  { hour: "00:00", contained: 0, recovered: 0 },
  { hour: "04:00", contained: 15, recovered: 5 },
  { hour: "08:00", contained: 35, recovered: 18 },
  { hour: "12:00", contained: 58, recovered: 32 },
  { hour: "16:00", contained: 75, recovered: 48 },
  { hour: "20:00", contained: 88, recovered: 62 },
  { hour: "24:00", contained: 95, recovered: 78 },
]
