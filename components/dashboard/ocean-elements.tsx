"use client"

export function WavePattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 1440 120"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M0 60C240 20 480 100 720 60C960 20 1200 100 1440 60V120H0V60Z"
        className="fill-sky-200/50 dark:fill-sky-500/10"
      />
      <path
        d="M0 70C240 30 480 110 720 70C960 30 1200 110 1440 70V120H0V70Z"
        className="fill-cyan-200/40 dark:fill-cyan-500/8"
      />
    </svg>
  )
}

export function AnimatedWaves({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <svg
        className="w-[200%] animate-wave"
        viewBox="0 0 2880 60"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30C240 10 480 50 720 30C960 10 1200 50 1440 30C1680 10 1920 50 2160 30C2400 10 2640 50 2880 30V60H0V30Z"
          className="fill-sky-300/30 dark:fill-sky-500/10"
        />
        <path
          d="M0 35C240 15 480 55 720 35C960 15 1200 55 1440 35C1680 15 1920 55 2160 35C2400 15 2640 55 2880 35V60H0V35Z"
          className="fill-cyan-300/20 dark:fill-cyan-500/8"
        />
      </svg>
    </div>
  )
}

export function BubbleDecoration({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <div className="absolute left-[10%] top-[20%] h-2 w-2 animate-float rounded-full bg-sky-400/30 dark:bg-sky-500/20" style={{ animationDelay: "0s" }} />
      <div className="absolute left-[25%] top-[60%] h-3 w-3 animate-float rounded-full bg-cyan-400/20 dark:bg-cyan-500/15" style={{ animationDelay: "1s" }} />
      <div className="absolute right-[15%] top-[30%] h-1.5 w-1.5 animate-float rounded-full bg-blue-400/30 dark:bg-blue-500/25" style={{ animationDelay: "2s" }} />
      <div className="absolute right-[30%] top-[70%] h-2.5 w-2.5 animate-float rounded-full bg-teal-400/25 dark:bg-teal-500/20" style={{ animationDelay: "0.5s" }} />
    </div>
  )
}

export function OceanGradientOverlay({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 via-transparent to-cyan-100/30 dark:from-sky-500/5 dark:via-transparent dark:to-cyan-500/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent dark:via-blue-500/3" />
    </div>
  )
}

export function MarineIcon({ type, className = "" }: { type: "anchor" | "wave" | "compass" | "ship" | "fish" | "coral"; className?: string }) {
  const icons = {
    anchor: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="5" r="3" />
        <line x1="12" y1="8" x2="12" y2="21" />
        <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      </svg>
    ),
    wave: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      </svg>
    ),
    compass: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
      </svg>
    ),
    ship: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 21c.6.5 1.2.8 2.1.8 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 .9 0 1.5.3 2.1.8" />
        <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.19-3.18" />
        <path d="M3 14c.7 2.3 2.1 4.3 3.62 5.92" />
        <path d="M12.8 10.82 9.4 4.64a2 2 0 0 0-1.75-1H6.5" />
        <path d="M12 2v2" />
      </svg>
    ),
    fish: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6-3.56 0-7.56-2.54-8.5-6Z" />
        <path d="M18 12v.5" />
        <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
        <path d="M2 12h4" />
        <path d="M5.5 8.5 3 6" />
        <path d="M5.5 15.5 3 18" />
      </svg>
    ),
    coral: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22V8" />
        <path d="M12 8c0-4 4-4 4-8" />
        <path d="M12 8c0-4-4-4-4-8" />
        <path d="M12 14c-2 0-4-2-4-6" />
        <path d="M12 14c2 0 4-2 4-6" />
        <path d="M8 22c0-3 4-6 4-6s4 3 4 6" />
      </svg>
    ),
  }

  return icons[type]
}
