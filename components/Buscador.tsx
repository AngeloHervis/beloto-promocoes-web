"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

export function Buscador() {
  const router = useRouter()
  const [q, setQ] = useState<string>("")

  const buscar = (e: React.FormEvent) => {
    e.preventDefault()
    const termo = q.trim()
    router.push(`/busca${termo ? `?q=${encodeURIComponent(termo)}` : ""}`)
  }

  return (
    <form onSubmit={buscar} className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar ofertas, produtos, marcas..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors shadow-sm"
        />
      </div>
    </form>
  )
}
