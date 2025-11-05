"use client"
import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { api } from "@/services/api"
import { useAuth } from "@/contexts/AuthContext"

interface Props {
  ofertaId: string
  className?: string
}

export function BotaoFavoritarGrande({ ofertaId, className = "" }: Props) {
  const { usuario } = useAuth()
  const [favoritado, setFavoritado] = useState<boolean>(false)
  const [carregando, setCarregando] = useState<boolean>(false)

  useEffect(() => {
    const verificar = async () => {
      if (!usuario) return
      try {
        const { data } = await api.get<{ favoritado: boolean }>(`/favoritos/verificar/${ofertaId}`)
        setFavoritado(data.favoritado)
      } catch {}
    }
    verificar()
  }, [ofertaId, usuario])

  const alternar = async () => {
    if (!usuario) {
      alert("Faça login para favoritar ofertas")
      return
    }
    setCarregando(true)
    try {
      if (favoritado) {
        await api.delete(`/favoritos/${ofertaId}`)
        setFavoritado(false)
      } else {
        await api.post("/favoritos", { ofertaId })
        setFavoritado(true)
      }
    } catch {
      alert("Erro ao favoritar")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <button
      onClick={alternar}
      disabled={carregando}
      className={`transition-all ${className}`}
      aria-label={favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart
        className={`h-6 w-6 transition-all ${
          favoritado ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-red-500"
        }`}
      />
    </button>
  )
}
