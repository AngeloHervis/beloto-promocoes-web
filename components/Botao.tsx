"use client"

type Variante = "primario" | "secundario"

interface BotaoProps {
  variante?: Variante
  titulo: string
  aoClicar?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
}

export function Botao({ variante = "primario", titulo, aoClicar, type = "button", className }: BotaoProps) {
  const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all"
  const estilos: Record<Variante, string> = {
    primario:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg",
    secundario: "bg-slate-200 text-slate-900 hover:bg-slate-300",
  }
  return (
    <button type={type} onClick={aoClicar} className={`${base} ${estilos[variante]} ${className ?? ""}`.trim()}>
      {titulo}
    </button>
  )
}
