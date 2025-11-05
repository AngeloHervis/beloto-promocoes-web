"use client"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { User, Tag } from "lucide-react"

export function Header() {
  const { usuario, logout } = useAuth()
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="container-app flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 px-4 py-2">
            <Tag className="h-5 w-5 text-white" />
            <span className="text-lg font-bold text-white">Beloto Ofertas</span>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          {!usuario ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/cadastro"
                className="rounded-lg bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600 transition-colors shadow-sm"
              >
                Cadastro
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/minha-conta/favoritos"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
              >
                <User className="h-4 w-4" />
                Minha Conta
              </Link>
              <button
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
                onClick={logout}
              >
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
