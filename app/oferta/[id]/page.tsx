"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/services/api"
import type { Oferta } from "@/types/oferta"
import { CardOferta } from "@/components/CardOferta"
import { ModalWhatsApp } from "@/components/ModalWhatsApp"
import { BotaoFavoritarGrande } from "@/components/BotaoFavoritarGrande"
import { Share2, ExternalLink, Shield, Bell } from "lucide-react"

function getStoreBadge(marketplace: string | undefined) {
  if (!marketplace) {
    return {
      logo: null,
      name: "Loja",
      color: "bg-slate-50 border-slate-200",
      iconBg: "bg-slate-500",
    }
  }

  const lowerMarket = marketplace.toLowerCase()

  if (lowerMarket.includes("shopee")) {
    return {
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopee_logo.svg",
      name: "Shopee",
      color: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-500",
    }
  }

  if (lowerMarket.includes("mercado livre") || lowerMarket.includes("mercadolivre")) {
    return {
      logo: "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png",
      name: "Mercado Livre",
      color: "bg-yellow-50 border-yellow-200",
      iconBg: "bg-yellow-400",
    }
  }

  if (lowerMarket.includes("amazon")) {
    return {
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      name: "Amazon",
      color: "bg-amber-50 border-amber-200",
      iconBg: "bg-amber-500",
    }
  }

  return {
    logo: null,
    name: marketplace,
    color: "bg-slate-50 border-slate-200",
    iconBg: "bg-slate-500",
  }
}

export default function OfertaPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const [oferta, setOferta] = useState<Oferta | null>(null)
  const [sugestoes, setSugestoes] = useState<Oferta[]>([])
  const [erro, setErro] = useState<string | null>(null)
  const [modalAberto, setModalAberto] = useState<boolean>(false)

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await api.get<Oferta>(`/ofertas/${id}`)
        setOferta(data)
      } catch (e) {
        setErro("Oferta não encontrada.")
      }
      try {
        const { data } = await api.get<Oferta[]>(`/ofertas/sugestoes`, { params: { idAtual: id } })
        setSugestoes(data ?? [])
      } catch {}
    }
    if (id) carregar()
  }, [id])

  const compartilhar = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      alert("Link copiado!")
    } catch {}
  }

  const parseBrazilianPrice = (price: string | number | undefined): number | null => {
    if (!price) return null
    if (typeof price === "number") return price

    // Remove "R$", spaces, and dots (thousands separator)
    // Replace comma with dot (decimal separator)
    const cleaned = price
      .replace(/R\$\s?/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
    const parsed = Number.parseFloat(cleaned)

    return isNaN(parsed) ? null : parsed
  }

  const calcularDesconto = () => {
    if (!oferta || !oferta.precoAnterior || !oferta.precoAtual) return null

    const anterior = parseBrazilianPrice(oferta.precoAnterior)
    const atual = parseBrazilianPrice(oferta.precoAtual)

    if (!anterior || !atual || anterior === 0) return null

    const desconto = Math.round(((anterior - atual) / anterior) * 100)
    return isNaN(desconto) ? null : desconto
  }

  const desconto = calcularDesconto()
  const storeBadge = getStoreBadge(oferta?.marketplace)

  console.log("[v0] Oferta data:", {
    id: oferta?.id,
    linkAfiliado: oferta?.linkAfiliado,
    precoAnterior: oferta?.precoAnterior,
    precoAtual: oferta?.precoAtual,
    desconto: desconto,
  })

  const linkProduto = oferta?.linkAfiliado || "#"

  if (erro) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-xl text-slate-600">{erro}</p>
        </div>
      </div>
    )
  }

  if (!oferta) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Carregando oferta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
          <div className="relative">
            <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 aspect-square overflow-hidden">
              <img
                src={oferta?.imagemUrl || "/placeholder.svg"}
                alt={oferta?.titulo}
                className="h-full w-full object-contain p-8"
              />
            </div>
            {desconto && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                -{desconto}%
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">{oferta?.titulo}</h1>

            {oferta?.descricao && <p className="mt-4 text-slate-600 leading-relaxed">{oferta.descricao}</p>}

            <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              {oferta?.precoAnterior && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-slate-500">De:</span>
                  <span className="text-lg text-slate-500 line-through">{oferta.precoAnterior}</span>
                </div>
              )}
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-slate-600">Por:</span>
                <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {oferta.precoAtual}
                </span>
              </div>
            </div>

            <div className={`mt-6 p-4 border rounded-xl flex items-start gap-3 ${storeBadge.color}`}>
              <div
                className={`w-10 h-10 rounded-full ${storeBadge.iconBg} flex items-center justify-center flex-shrink-0`}
              >
                {storeBadge.logo ? (
                  <img
                    src={storeBadge.logo || "/placeholder.svg"}
                    alt={storeBadge.name}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <Shield className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-semibold text-slate-900">Loja verificada</p>
                <p className="text-sm text-slate-700 mt-1">
                  {storeBadge.name === "Amazon" ? (
                    <>
                      Se for comprar pegue FRETE GRÁTIS! Com Amazon PRIME (30 dias grátis){" "}
                      <a
                        href="https://www.amazon.com.br/prime"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline font-semibold"
                      >
                        clicando aqui
                      </a>{" "}
                      Além de filmes, séries e músicas!
                    </>
                  ) : storeBadge.name === "Shopee" ? (
                    <>
                      Se for comprar pegue FRETE GRÁTIS! Com Shopee Coins e cupons{" "}
                      <a
                        href={linkProduto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline font-semibold"
                      >
                        clicando aqui
                      </a>{" "}
                      Além de cashback e ofertas exclusivas!
                    </>
                  ) : storeBadge.name === "Mercado Livre" ? (
                    <>
                      Se for comprar pegue FRETE GRÁTIS! Com Mercado Livre Full{" "}
                      <a
                        href={linkProduto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline font-semibold"
                      >
                        clicando aqui
                      </a>{" "}
                      Além de entrega rápida e garantia estendida!
                    </>
                  ) : (
                    <>
                      Confira esta oferta incrível{" "}
                      <a
                        href={linkProduto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline font-semibold"
                      >
                        clicando aqui!
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={linkProduto}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                Visitar a loja
              </a>
              <button className="px-6 py-4 rounded-xl border-2 border-slate-200 bg-white hover:border-red-500 transition-all flex items-center justify-center">
                <BotaoFavoritarGrande ofertaId={oferta?.id} />
              </button>
              <button
                onClick={() => setModalAberto(true)}
                className="px-6 py-4 rounded-xl border-2 border-slate-200 bg-white text-slate-600 hover:border-green-500 hover:text-green-600 transition-all"
              >
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={compartilhar}
                className="px-6 py-4 rounded-xl border-2 border-slate-200 bg-white text-slate-600 hover:border-green-500 hover:text-green-600 transition-all"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Você pode gostar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sugestoes.map((o) => (
            <CardOferta key={o.id} oferta={o} />
          ))}
        </div>
      </div>

      <ModalWhatsApp estaAberto={modalAberto} aoFechar={() => setModalAberto(false)} />
    </div>
  )
}
