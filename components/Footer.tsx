import Link from "next/link"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"
import { Instagram, Youtube } from "lucide-react"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Logo e Redes Sociais */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Beloto Promoções</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-md">
              As melhores ofertas e promoções em um só lugar. Economize com descontos imperdíveis!
            </p>
            <div className="flex gap-3">
              <a
                href="https://sndflw.com/i/brJkW0O45v6fRSvG9HPu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-all hover:scale-110"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/tiagobeloto/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.youtube.com/@BelotoPlays"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@belotoplays"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-black flex items-center justify-center transition-all hover:scale-110"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Links Institucionais */}
          <div className="md:text-right">
            <h4 className="font-semibold text-slate-900 mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-slate-600 hover:text-green-600 transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-slate-600 hover:text-green-600 transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/politicas" className="text-slate-600 hover:text-green-600 transition-colors">
                  Políticas de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Beloto Promoções. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
