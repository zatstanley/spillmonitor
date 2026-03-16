# 🌊 Ocean Spill Monitor

> Painel de monitoramento marinho em tempo real para gestão de incidentes de derramamento de petróleo.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat&logo=tailwindcss)

---

## 📋 Sobre o projeto

O **Ocean Spill Monitor** é um dashboard interativo desenvolvido para monitoramento e gestão operacional de derramamentos de óleo no ambiente marinho. A interface consolida dados de múltiplas fontes em tempo real, permitindo tomadas de decisão rápidas e eficientes por equipes de resposta a emergências ambientais.

---

## ✨ Funcionalidades

- 📍 **Mapa interativo** com localização geográfica dos incidentes ativos (Leaflet)
- 📊 **Gráficos dinâmicos** de tendência, volume derramado e tempo de resposta (Recharts)
- 🚨 **Central de alertas** com classificação por criticidade (Crítico, Alto, Médio, Baixo)
- 📈 **KPIs em tempo real**: incidentes ativos, tempo médio de resposta, volume e custo operacional
- 🎯 **Progresso de contenção** por ocorrência com métricas de recuperação
- 🌍 **Distribuição regional** com gráfico de rosca interativo

---

## 🛠️ Stack tecnológica

| Tecnologia     | Versão | Uso                          |
|----------------|--------|------------------------------|
| React          | 18     | Interface e componentes       |
| TypeScript     | 5      | Tipagem estática             |
| Tailwind CSS   | 3      | Estilização utilitária       |
| Recharts       | 2      | Gráficos e visualizações     |
| Leaflet        | 1.9    | Mapas interativos            |

---

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/zatsstanley/ocean-spill-monitor.git

# Instale as dependências
cd ocean-spill-monitor
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`

---

## 📁 Estrutura do projeto

```
├── app/                          # Rotas e páginas (Next.js App Router)
├── components/
│   ├── dashboard/
│   │   ├── command-center.tsx    # Central de comando operacional
│   │   ├── header.tsx            # Cabeçalho do dashboard
│   │   ├── incidents-list.tsx    # Lista de incidentes ativos
│   │   ├── kpi-cards.tsx         # Cards de métricas principais
│   │   ├── leaflet-styles.tsx    # Estilos customizados do mapa
│   │   ├── ocean-elements.tsx    # Elementos visuais do oceano
│   │   ├── operations-panel.tsx  # Painel operacional
│   │   ├── ospr-data-provider.tsx# Provedor de dados dos incidentes
│   │   ├── spill-map.tsx         # Mapa interativo de derramamentos
│   │   └── trend-charts.tsx      # Gráficos de tendência
│   └── ui/
│       └── theme-provider.tsx    # Provedor de tema (dark/light)
├── hooks/
│   ├── use-mobile.ts             # Hook de detecção mobile
│   └── use-toast.ts              # Hook de notificações
├── lib/
│   ├── dashboard-data.ts         # Dados simulados do dashboard
│   └── utils.ts                  # Funções utilitárias
├── styles/
│   └── globals.css               # Estilos globais
└── public/                       # Assets estáticos
```

---

## 📄 Licença

MIT © 2026 — Desenvolvido por Manoela Stanley
