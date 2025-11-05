"use client"

import Link from "next/link"
import type { Oferta } from "@/types/oferta"
import { BotaoFavoritar } from "@/components/BotaoFavoritar"
import { ExternalLink, Tag } from "lucide-react"

interface Props {
  oferta: Oferta
}

function parseBrazilianPrice(price: string | undefined): number | null {
  if (!price) return null
  try {
    // Remove R$, spaces, and dots (thousands separator), then replace comma with dot
    const cleanPrice = price
      .replace(/R\$\s?/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
    const parsed = Number.parseFloat(cleanPrice)
    return isNaN(parsed) ? null : parsed
  } catch {
    return null
  }
}

function calcularDesconto(precoAnterior: string | undefined, precoAtual: string | undefined): number | null {
  const anterior = parseBrazilianPrice(precoAnterior)
  const atual = parseBrazilianPrice(precoAtual)

  if (!anterior || !atual || anterior <= atual) return null

  return Math.round(((anterior - atual) / anterior) * 100)
}

function getStoreLogo(marketplace: string | undefined) {
  if (!marketplace) {
    return <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Loja</span>
  }

  const lowerMarket = marketplace.toLowerCase()

  if (lowerMarket.includes("shopee")) {
    return (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopee_logo.svg"
        alt="Shopee"
        className="h-7 w-auto"
      />
    )
  }

  if (lowerMarket.includes("mercado livre") || lowerMarket.includes("mercadolivre")) {
    return (
      <img
        src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png"
        alt="Mercado Livre"
        className="h-6 w-auto"
      />
    )
  }

  if (lowerMarket.includes("amazon")) {
    return (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon"
        className="h-5 w-auto"
      />
    )
  }

  return <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{marketplace}</span>
}

export function CardOferta({ oferta }: Props) {
  const desconto = calcularDesconto(oferta.precoAnterior, oferta.precoAtual)
  const descontoLabel = desconto ? `-${desconto}%` : undefined

  return (
    <Link href={`/oferta/${oferta.id}`} className="block">
      <div className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-xl hover:border-indigo-200">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={oferta.imagemUrl || "/placeholder.svg"}
            alt={oferta.titulo}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {descontoLabel && (
            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-3 py-1.5 shadow-lg">
              <Tag className="h-3 w-3 text-white" />
              <span className="text-xs font-bold text-white">{descontoLabel}</span>
            </div>
          )}
          <div className="absolute right-3 top-3" onClick={(e) => e.preventDefault()}>
            <BotaoFavoritar ofertaId={oferta.id} />
          </div>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-indigo-600 mb-2">
            {oferta.titulo}
          </h3>

          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-indigo-600">{oferta.precoAtual}</span>
            {oferta.precoAnterior && (
              <span className="text-sm text-slate-400 line-through">{oferta.precoAnterior}</span>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <div className="flex items-center">{getStoreLogo(oferta.marketplace)}</div>
            <div className="flex items-center gap-1 rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 group-hover:bg-indigo-100 transition-colors">
              Ver oferta
              <ExternalLink className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
