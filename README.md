# 🌊 Ocean Spill Monitor

> Painel de monitoramento marinho em tempo real para gestão de incidentes de derramamento de petróleo.

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat&logo=tailwindcss)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat&logo=leaflet)

> ⚠️ **Todos os dados exibidos são fictícios e criados apenas para fins ilustrativos.**

---

## 📋 Descrição

O **Ocean Spill Monitor** é um conceito de dashboard de monitoramento ambiental desenvolvido para explorar como interfaces complexas de dados críticos podem ser construídas de forma clara e responsiva.

O projeto simula um painel operacional real para equipes de resposta a derramamentos de petróleo, consolidando em uma única tela: localização geográfica dos incidentes, métricas de desempenho operacional, evolução temporal dos dados e status de contenção por ocorrência — tudo atualizado de forma reativa, a partir de dados simulados.

O principal desafio de design foi lidar com **alta densidade de informação sem sacrificar a legibilidade**. Dashboards operacionais precisam mostrar tudo ao mesmo tempo, mas de forma que quem opera consiga tomar decisões em segundos. Cada componente foi pensado para ter uma hierarquia visual clara: o que é crítico aparece primeiro, o que é contextual fica em segundo plano.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia        | Uso no projeto                                               |
|-------------------|--------------------------------------------------------------|
| **Next.js 14**    | Framework principal com App Router para estrutura de rotas   |
| **TypeScript**    | Tipagem de todos os dados, props e estados da aplicação      |
| **Tailwind CSS**  | Estilização utilitária com design system consistente         |
| **Recharts**      | Gráficos de linha, barra e rosca com responsividade nativa   |
| **Leaflet**       | Mapa interativo com marcadores dinâmicos por severidade      |
| **shadcn/ui**     | Componentes de UI acessíveis como base para o design system  |

---

## 🏗️ Decisões de arquitetura

### Separação entre dados e apresentação
Todos os dados simulados foram centralizados em `lib/dashboard-data.ts`, funcionando como uma camada de "mock de API". Isso mantém os componentes limpos e facilita a substituição futura por uma API real sem alterar a lógica de apresentação.

### Provedor de dados dedicado (`ospr-data-provider.tsx`)
Em vez de passar props por múltiplos níveis, foi criado um provider específico para o dashboard que distribui os dados via Context API. Isso evita prop drilling e mantém cada componente focado apenas na sua responsabilidade visual.

### Componentização por domínio
Os componentes foram organizados por função dentro do domínio `dashboard/`, não por tipo de elemento (ex: não existe pasta `charts/` ou `cards/`). Cada arquivo representa uma seção funcional do painel — `spill-map`, `trend-charts`, `operations-panel` — tornando a navegação no código mais intuitiva.

### Estilos do Leaflet isolados
O Leaflet exige sobrescrever estilos globais que conflitam com o Tailwind. Para evitar poluir o `globals.css`, esses overrides foram encapsulados em `leaflet-styles.tsx`, um componente que injeta os estilos apenas quando o mapa está presente.

### Hook `use-mobile` para responsividade lógica
Além do Tailwind para responsividade visual, foi criado o hook `use-mobile.ts` para adaptar o **comportamento** dos componentes em telas menores — como colapsar o painel lateral ou simplificar os gráficos — separando responsividade de layout da responsividade de lógica.

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

## 🚀 Como rodar localmente

```bash
git clone https://github.com/zatsstanley/ocean-spill-monitor.git
cd ocean-spill-monitor
npm install
npm run dev
```

Acesse em `http://localhost:3000`

---

## 📄 Licença

MIT © 2026 — Desenvolvido por Manoela Stanley
