"use client"
import { useEffect, useState } from "react"
import { ModalWhatsApp } from "@/components/ModalWhatsApp"
import { CardOferta } from "@/components/CardOferta"
import { Buscador } from "@/components/Buscador"
import { Filtros } from "@/components/Filtros"
import type { Oferta } from "@/types/oferta"
import { api } from "@/services/api"
import { Sparkles } from "lucide-react"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"

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
        const { data } = await api.get("/ofertas/recentes")
        console.log("[v0] API Response:", data)

        // Handle different possible response formats
        let ofertasArray: Oferta[] = []

        if (Array.isArray(data)) {
          // If data is directly an array
          ofertasArray = data
        } else if (data && typeof data === "object" && Array.isArray(data.ofertas)) {
          // If data is an object with an ofertas property
          ofertasArray = data.ofertas
        } else if (data && typeof data === "object" && Array.isArray(data.data)) {
          // If data is an object with a data property
          ofertasArray = data.data
        }

        console.log("[v0] Ofertas array:", ofertasArray)
        setOfertas(ofertasArray)
      } catch (e) {
        console.error("[v0] Error loading ofertas:", e)
        setErro("Falha ao carregar ofertas.")
        setOfertas([]) // Ensure ofertas is always an array
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [])

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-8 shadow-xl md:p-12">
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
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
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

      <ModalWhatsApp estaAberto={modalAberto} aoFechar={() => setModalAberto(false)} />
    </div>
  )
}
