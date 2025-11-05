"use client"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { User, Heart } from "lucide-react"
import Image from "next/image"

export function Header() {
  const { usuario, logout } = useAuth()
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/logo_promos1.png"
              alt="Beloto Promoções"
              width={200}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="flex items-center gap-4">
            {!usuario ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-green-600 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-sm"
                >
                  Cadastrar
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/minha-conta/favoritos"
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-green-600 transition-colors"
                  title="Favoritos"
                >
                  <Heart className="h-5 w-5" />
                </Link>
                <Link
                  href="/minha-conta/favoritos"
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-green-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{usuario.email.split("@")[0]}</span>
                </Link>
                <button
                  className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
                  onClick={logout}
                >
                  Sair
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
