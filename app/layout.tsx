import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { AuthProvider } from "@/contexts/AuthContext"

export const metadata: Metadata = {
  title: "Beloto Promoções",
  description: "As melhores ofertas e promoções em um só lugar",
  icons: {
    icon: "/favicon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">
            <div className="container-app py-6">{children}</div>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
