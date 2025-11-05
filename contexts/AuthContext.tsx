"use client"
import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { api } from "@/services/api"
import { jwtDecode } from "jwt-decode"

interface Usuario {
  id: string
  nome?: string
  email: string
}

interface LoginResponse {
  access_token: string
  expires_in: number
  token_type: string
}

interface AuthContextValue {
  usuario: Usuario | null
  token: string | null
  login: (email: string, senha: string) => Promise<void>
  registrar: (nome: string, email: string, senha: string) => Promise<void>
  logout: () => Promise<void>
}

interface SupabaseJwt {
  sub: string
  email: string
  user_metadata?: {
    name?: string
  }
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [carregando, setCarregando] = useState<boolean>(true)

  const decodeUserFromToken = (jwt: string): Usuario | null => {
    try {
      const payload = jwtDecode<SupabaseJwt>(jwt)
      return {
        id: payload.sub,
        email: payload.email,
        nome: payload.user_metadata?.name || payload.email?.split("@")[0],
      }
    } catch {
      return null
    }
  }

  const tryRefreshSession = useCallback(async () => {
    try {
      // aqui o cookie HttpOnly (sb_refresh_token) é enviado automaticamente por causa do withCredentials
      const { data } = await api.post<LoginResponse>("/auth/refresh-token")
      const newToken = data.access_token

      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`

      setToken(newToken)
      setUsuario(decodeUserFromToken(newToken))
    } catch (err) {
      console.log("[auth] Nenhuma sessão ativa ou refresh falhou.")
      setToken(null)
      setUsuario(null)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      await tryRefreshSession()
      setCarregando(false)
    })()
  }, [tryRefreshSession])

  const login = useCallback(async (email: string, senha: string) => {
    const { data } = await api.post<LoginResponse>(`/auth/login`, { email, senha })
    const t = data.access_token
    setToken(t)
    setUsuario(decodeUserFromToken(t))
    api.defaults.headers.common["Authorization"] = `Bearer ${t}`
  }, [])

  const registrar = useCallback(async (nome: string, email: string, senha: string) => {
    await api.post(`/auth/registro`, { nome, email, senha })
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout")
    } catch {
      // se der erro aqui, tanto faz, vamos limpar o estado mesmo assim
    }
    setUsuario(null)
    setToken(null)
    delete api.defaults.headers.common["Authorization"]
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ usuario, token, login, registrar, logout }),
    [usuario, token, login, registrar, logout],
  )

  if (carregando) {
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider")
  return ctx
}
