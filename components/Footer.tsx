import Link from "next/link"
import { MessageCircle, Send, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white mt-auto">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
              Beloto Ofertas
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Sua plataforma de ofertas e promoções imperdíveis. Encontre os melhores descontos e cupons em um só lugar.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/belotoofertas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/belotoofertas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@belotoofertas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Institucionais */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/politicas" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Políticas de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Beloto Ofertas. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
