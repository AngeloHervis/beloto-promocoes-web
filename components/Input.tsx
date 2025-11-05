"use client"

interface InputProps {
  tipo?: "text" | "email" | "password"
  placeholder?: string
  valor?: string
  aoMudar?: (valor: string) => void
  className?: string
}

export function Input({ tipo = "text", placeholder, valor, aoMudar, className }: InputProps) {
  return (
    <input
      type={tipo}
      placeholder={placeholder}
      value={valor}
      onChange={(e) => aoMudar?.(e.target.value)}
      className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors ${className ?? ""}`.trim()}
    />
  )
}
