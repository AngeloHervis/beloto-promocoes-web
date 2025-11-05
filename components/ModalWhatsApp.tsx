"use client"
import { Modal } from "@/components/Modal"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"

interface ModalWhatsAppProps {
  estaAberto: boolean
  aoFechar: () => void
}

export function ModalWhatsApp({ estaAberto, aoFechar }: ModalWhatsAppProps) {
  return (
    <Modal estaAberto={estaAberto} aoFechar={aoFechar}>
      <div className="p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <WhatsAppIcon className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-bold text-slate-900">Receba as Melhores Ofertas!</h2>

        <p className="mb-6 text-slate-600 leading-relaxed">
          Entre no nosso grupo exclusivo do WhatsApp e seja o primeiro a receber notificações sobre promoções
          imperdíveis, cupons de desconto e ofertas relâmpago!
        </p>

        <a
          href="https://sndflw.com/i/brJkW0O45v6fRSvG9HPu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <WhatsAppIcon className="h-6 w-6" />
          Clique aqui para entrar no grupo de promoções
        </a>

        <p className="mt-4 text-xs text-slate-500">Ao entrar, você concorda em receber notificações sobre ofertas</p>
      </div>
    </Modal>
  )
}
