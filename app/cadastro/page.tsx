"use client"
import { useState } from "react"
import type React from "react"

import { Input } from "@/components/Input"
import { Botao } from "@/components/Botao"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { UserPlus, Mail, Lock, User } from "lucide-react"

export default function CadastroPage() {
  const { registrar } = useAuth()
  const router = useRouter()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    try {
      await registrar(nome, email, senha)
      router.push("/cadastro/confirmacao")
    } catch (e) {
      setErro("Não foi possível concluir o cadastro.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Criar conta</h1>
          <p className="mt-2 text-slate-600">Cadastre-se para receber as melhores ofertas</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
          {erro && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">{erro}</div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nome completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input placeholder="Seu nome" valor={nome} aoMudar={setNome} className="pl-10" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input tipo="email" placeholder="seu@email.com" valor={email} aoMudar={setEmail} className="pl-10" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input tipo="password" placeholder="••••••••" valor={senha} aoMudar={setSenha} className="pl-10" />
              </div>
            </div>

            <Botao
              type="submit"
              titulo={loading ? "Cadastrando..." : "Criar conta"}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold shadow-lg hover:shadow-xl transition-all"
            />
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
