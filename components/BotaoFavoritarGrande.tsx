"use client"
import { useState } from "react"
import type React from "react"

import { Heart } from "lucide-react"
import { api } from "@/services/api"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

interface Props {
  ofertaId: string
  className?: string
}

export function BotaoFavoritarGrande({ ofertaId, className = "" }: Props) {
  const { usuario, token } = useAuth()
  const router = useRouter()
  const [favoritado, setFavoritado] = useState<boolean>(false)
  const [carregando, setCarregando] = useState<boolean>(false)

  const alternar = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!usuario || !token) {
      router.push("/login")
      return
    }

    setCarregando(true)
    try {
      if (favoritado) {
        await api.delete(`/favoritos/${ofertaId}`)
        setFavoritado(false)
      } else {
        await api.post(`/favoritos/${ofertaId}`)
        setFavoritado(true)
      }
    } catch (error) {
      console.error("Erro ao favoritar:", error)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <button
      onClick={alternar}
      disabled={carregando}
      className={`transition-all disabled:opacity-50 ${className}`}
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
