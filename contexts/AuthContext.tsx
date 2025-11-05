"use client"
import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { api } from "@/services/api"

interface Usuario {
  id: string
  nome: string
  email: string
}

interface AuthContextValue {
  usuario: Usuario | null
  token: string | null
  login: (email: string, senha: string) => Promise<void>
  registrar: (nome: string, email: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const carregarToken = async () => {
      if (typeof window === "undefined") return
      const t = localStorage.getItem("token")
      if (t) {
        setToken(t)
        try {
          const { data } = await api.get<Usuario>("/auth/me")
          setUsuario(data)
        } catch {
          // Token inválido, remove
          localStorage.removeItem("token")
        }
      }
    }
    carregarToken()
  }, [])

  const login = useCallback(async (email: string, senha: string) => {
    const { data } = await api.post<{ token: string; usuario: Usuario }>(`/auth/login`, { email, senha })
    const t = data.token
    setToken(t)
    setUsuario(data.usuario)
    if (typeof window !== "undefined") localStorage.setItem("token", t)
  }, [])

  const registrar = useCallback(async (nome: string, email: string, senha: string) => {
    await api.post(`/auth/registro`, { nome, email, senha })
  }, [])

  const logout = useCallback(() => {
    setUsuario(null)
    setToken(null)
    if (typeof window !== "undefined") localStorage.removeItem("token")
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ usuario, token, login, registrar, logout }),
    [usuario, token, login, registrar, logout],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider")
  return ctx
}
