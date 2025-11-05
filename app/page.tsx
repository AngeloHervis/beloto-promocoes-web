"use client"
import { useEffect, useState } from "react"
import { Modal } from "@/components/Modal"
import { CardOferta } from "@/components/CardOferta"
import { Buscador } from "@/components/Buscador"
import { Filtros } from "@/components/Filtros"
import type { Oferta } from "@/types/oferta"
import { api } from "@/services/api"
import { MessageCircle, Send, Sparkles } from "lucide-react"

export default function HomePage() {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [carregando, setCarregando] = useState<boolean>(true)
  const [erro, setErro] = useState<string | null>(null)
  const [modalAberto, setModalAberto] = useState<boolean>(false)
  const [ordem, setOrdem] = useState<string>("mais_recente")

  useEffect(() => {
    const carregar = async () => {
      setCarregando(true)
      setErro(null)
      try {
        const { data } = await api.get<Oferta[]>("/ofertas/recentes")
        setOfertas(data ?? [])
      } catch (e) {
        setErro("Falha ao carregar ofertas.")
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [])

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 p-8 shadow-xl md:p-12">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          <div className="absolute right-12 top-12 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute right-24 bottom-12 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-semibold text-white">Ofertas exclusivas todos os dias</span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
            As melhores ofertas em um só lugar
          </h1>
          <p className="mb-8 text-lg text-indigo-50 md:text-xl">
            Receba notificações instantâneas das promoções mais quentes e economize muito!
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setModalAberto(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-indigo-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </button>
            <button
              onClick={() => setModalAberto(true)}
              className="flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
            >
              <Send className="h-5 w-5" />
              Telegram
            </button>
          </div>
        </div>
      </section>

      <Buscador />
      <Filtros ordem={ordem} onChangeOrdem={setOrdem} />

      {erro && <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">{erro}</div>}

      {carregando ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>
      ) : ofertas.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 py-16 text-center">
          <p className="text-slate-500">Nenhuma oferta disponível no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ofertas.map((o) => (
            <CardOferta key={o.id} oferta={o} />
          ))}
        </div>
      )}

      <Modal estaAberto={modalAberto} aoFechar={() => setModalAberto(false)}>
        <div className="p-6">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Entrar no Grupo</h2>
          <p className="mb-6 text-slate-600">
            Escaneie o QR Code ou clique no botão abaixo para entrar no nosso grupo.
          </p>
          <button className="w-full rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white hover:bg-indigo-600 transition-colors shadow-lg">
            Entrar agora
          </button>
        </div>
      </Modal>
    </div>
  )
}
