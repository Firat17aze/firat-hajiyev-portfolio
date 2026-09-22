import Image from "next/image"
import type { CSSProperties } from "react"

interface ProjectVisualProps {
  image: string
  title: string
  priority?: boolean
  className?: string
}

const coverDetails: Record<string, { label: string; code: string; accent: string }> = {
  "drone-link": { label: "MAVLink", code: "LINK // 01", accent: "#4fd1c5" },
  "edge-camera": { label: "Edge vision", code: "INT8 // 02", accent: "#7dd3fc" },
  "motor-control": { label: "PID loop", code: "CTRL // 03", accent: "#fbbf24" },
  "gdb-stub": { label: "Debug bridge", code: "GDB // 04", accent: "#c4b5fd" },
  profiler: { label: "CPU samples", code: "PERF // 05", accent: "#fb7185" },
  chip8: { label: "CHIP-8", code: "ASCII // 06", accent: "#a3e635" },
  "flash-fs": { label: "Flash storage", code: "FS // 07", accent: "#fda4af" },
  btree: { label: "B-Tree", code: "DB // 08", accent: "#f0abfc" },
  "crash-report": { label: "Crash log", code: "WDT // 09", accent: "#fb923c" },
  "ring-buffer": { label: "Ring buffer", code: "FIFO // 10", accent: "#38bdf8" },
  stackscope: { label: "Stack scope", code: "RAM // 11", accent: "#2dd4bf" },
  "simon-says": { label: "Serial game", code: "I/O // 12", accent: "#facc15" },
  safeguard: { label: "Safety HMI", code: "HMI // 13", accent: "#f87171" },
}

/** A project thumbnail that uses owned project imagery when available and a tailored systems visual otherwise. */
export default function ProjectVisual({
  image,
  title,
  priority = false,
  className = "",
}: ProjectVisualProps) {
  if (!image.startsWith("cover:")) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/45 via-transparent to-transparent" />
      </div>
    )
  }

  const detail = coverDetails[image.slice("cover:".length)] ?? {
    label: "Embedded system",
    code: "FW // SYS",
    accent: "#67e8f9",
  }

  return (
    <div
      aria-hidden="true"
      className={`project-visual relative overflow-hidden ${className}`}
      style={{ "--project-accent": detail.accent } as CSSProperties}
    >
      <div className="project-visual__grid absolute inset-0" />
      <div className="project-visual__orb absolute -right-8 -top-12 size-40 rounded-full" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/55">
        <span>{detail.code}</span>
        <span className="size-2 rounded-full bg-[var(--project-accent)] shadow-[0_0_16px_var(--project-accent)]" />
      </div>
      <div className="absolute inset-x-5 bottom-5">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--project-accent)]">
          {detail.label}
        </p>
        <div className="mt-3 flex items-end gap-1.5" aria-hidden="true">
          {[28, 55, 38, 76, 48, 88, 62, 94].map((height, index) => (
            <span
              key={index}
              className="w-full rounded-t-sm bg-[var(--project-accent)]/80"
              style={{ height: `${height}%`, opacity: 0.35 + index * 0.07 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
