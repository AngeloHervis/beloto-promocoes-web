"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/Input"
import { Botao } from "@/components/Botao"
import { KeyRound, ArrowLeft } from "lucide-react"

export default function RedefinirSenhaPage() {
  const router = useRouter()

  // 1. ESTADO PARA GUARDAR OS DOIS TOKENS
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  // 2. CAPTURAR AMBOS OS TOKENS DA URL
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)) // remove o '#'
      const token = params.get("access_token")
      const refresh = params.get("refresh_token")

      if (token && refresh) {
        setAccessToken(token)
        setRefreshToken(refresh)
      } else {
        setErro("Token de redefinição inválido ou não encontrado. Solicite um novo link.")
      }
    } else {
      setErro("Nenhum token encontrado. Verifique o link enviado para o seu e-mail.")
    }
  }, []) // Roda apenas 1 vez

  // 3. ENVIAR AMBOS OS TOKENS PARA O BACKEND
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)

    if (!accessToken || !refreshToken) {
      setErro("Token inválido. Por favor, acesse pelo link do seu e-mail.")
      return
    }
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres")
      return
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem")
      return
    }

    setCarregando(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/redefinir-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Token: accessToken,
          RefreshToken: refreshToken,
          NovaSenha: senha,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.errors?.[0]?.message || "Falha ao redefinir a senha."
        throw new Error(errorMessage)
      }

      alert("Senha redefinida com sucesso!")
      router.push("/login")
    } catch (error: any) {
      setErro(error.message || "Erro ao redefinir senha. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  // Tela de loading (agora verifica os dois tokens)
  if (!accessToken && !refreshToken && !erro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <p className="text-slate-600 text-lg">Verificando link de redefinição...</p>
      </div>
    )
  }

  // O resto do seu JSX (Formulário)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* ... (seu JSX de ícone, título, etc. não muda) ... */}
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-6">
            <KeyRound className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Redefinir Senha
          </h1>
          <p className="text-center text-slate-600 mb-8">Digite sua nova senha abaixo</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {erro && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 text-center">{erro}</p>
              </div>
            )}

            <Input tipo="password" placeholder="Nova Senha" valor={senha} aoMudar={setSenha} className="mb-4" />

            <Input
              tipo="password"
              placeholder="Confirmar Senha"
              valor={confirmarSenha}
              aoMudar={setConfirmarSenha}
              className="mb-4"
            />

            <Botao type="submit" titulo={carregando ? "Redefinindo..." : "Redefinir Senha"} className="w-full" />
          </form>
          {/* ... (seu JSX de "Voltar para o login" não muda) ... */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
