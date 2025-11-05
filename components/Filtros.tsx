"use client"
import { SlidersHorizontal } from "lucide-react"

interface Props {
  ordem: string
  onChangeOrdem: (valor: string) => void
}

export function Filtros({ ordem, onChangeOrdem }: Props) {
  return (
    <div className="flex items-center gap-4">
      <button className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors shadow-sm">
        <SlidersHorizontal className="h-4 w-4" />
        Filtrar
      </button>

      <select
        value={ordem}
        onChange={(e) => onChangeOrdem(e.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors shadow-sm"
      >
        <option value="mais_recente">Mais recente</option>
        <option value="preco_asc">Menor preço</option>
        <option value="preco_desc">Maior preço</option>
        <option value="mais_clicado">Mais clicado</option>
      </select>
    </div>
  )
}
