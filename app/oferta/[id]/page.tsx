"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/services/api"
import type { Oferta } from "@/types/oferta"
import { CardOferta } from "@/components/CardOferta"
import { Modal } from "@/components/Modal"
import { Heart, Share2, ExternalLink, Shield } from "lucide-react"

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
  const [favoritado, setFavoritado] = useState<boolean>(false)

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await api.get<Oferta>(`/ofertas/${id}`)
        setOferta(data)
      } catch (e) {
        setErro("Oferta não encontrada.")
      }
      try {
        const { data } = await api.get<Oferta[]>(`/ofertas/sugestoes`, { params: { baseId: id } })
        setSugestoes(data ?? [])
      } catch {}
    }
    if (id) carregar()
  }, [id])

  const compartilhar = async (plataforma?: string) => {
    const url = window.location.href
    const texto = `Confira esta oferta: ${oferta?.titulo}`

    if (plataforma === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(texto + " " + url)}`, "_blank")
    } else if (plataforma === "telegram") {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`, "_blank")
    } else {
      try {
        await navigator.clipboard.writeText(url)
        alert("Link copiado!")
      } catch {}
    }
  }

  const toggleFavorito = () => {
    setFavoritado(!favoritado)
  }

  if (erro) return <div className="text-red-600 text-center py-12">{erro}</div>
  if (!oferta) return <div className="h-96 animate-pulse rounded-xl bg-slate-100" />

  const calcularDesconto = () => {
    if (!oferta.precoAnterior) return null
    const anterior = Number(oferta.precoAnterior)
    const atual = Number(oferta.precoAtual)
    const desconto = Math.round(((anterior - atual) / anterior) * 100)
    return desconto
  }

  const desconto = calcularDesconto()
  const storeBadge = getStoreBadge(oferta.marketplace)

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
          <div className="relative">
            <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 aspect-square overflow-hidden">
              <img
                src={oferta.imagemUrl || "/placeholder.svg"}
                alt={oferta.titulo}
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
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">{oferta.titulo}</h1>

            {oferta.descricao && <p className="mt-4 text-slate-600 leading-relaxed">{oferta.descricao}</p>}

            <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
              {oferta.precoAnterior && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-slate-500">De:</span>
                  <span className="text-lg text-slate-500 line-through">R$ {oferta.precoAnterior}</span>
                </div>
              )}
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-slate-600">Por:</span>
                <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  R$ {oferta.precoAtual}
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
                  Só foi comprar porque FRETE GRÁTIS! Com {storeBadge.name}{" "}
                  <a
                    href={oferta.linkAfiliado}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    clicando aqui!
                  </a>{" "}
                  Além de filmes, séries e músicas! {storeBadge.name}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={oferta.linkAfiliado}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                Visitar a loja
              </a>
              <button
                onClick={toggleFavorito}
                className={`px-6 py-4 rounded-xl border-2 transition-all ${
                  favoritado
                    ? "bg-red-50 border-red-500 text-red-600"
                    : "bg-white border-slate-200 text-slate-600 hover:border-red-500 hover:text-red-600"
                }`}
              >
                <Heart className={`w-5 h-5 ${favoritado ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={() => compartilhar()}
                className="px-6 py-4 rounded-xl border-2 border-slate-200 bg-white text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => compartilhar("whatsapp")}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>
              <button
                onClick={() => compartilhar("telegram")}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram
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

      <Modal estaAberto={modalAberto} aoFechar={() => setModalAberto(false)}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Receber Notificações</h2>
          <p className="text-slate-600 mb-6">Entre no nosso grupo e receba alertas de ofertas em primeira mão!</p>
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Telegram
            </a>
          </div>
        </div>
      </Modal>
    </div>
  )
}
