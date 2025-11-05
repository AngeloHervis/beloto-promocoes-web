import type { Metadata } from "next"
import { Target, Users, Award, TrendingUp, Mail } from "lucide-react"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"

export const metadata: Metadata = {
  title: "Sobre Nós - Beloto Promoções",
  description: "Conheça a história e missão do Beloto Promoções",
}

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre o Beloto Promoções</h1>
        <p className="text-xl text-green-100">Conectando você às melhores ofertas desde 2020</p>
      </div>

      <div className="prose prose-slate max-w-none">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Nossa História</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            O Beloto Promoções nasceu da paixão por encontrar as melhores oportunidades de economia para os consumidores
            brasileiros. Fundado em 2020, começamos como um pequeno projeto de compartilhamento de cupons e promoções
            entre amigos, e rapidamente crescemos para nos tornar uma das principais plataformas de ofertas do Brasil.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Hoje, ajudamos milhares de pessoas a economizar todos os dias, reunindo as melhores ofertas, cupons de
            desconto e promoções de centenas de lojas parceiras em um único lugar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Nossa Missão</h3>
            <p className="text-slate-600 leading-relaxed">
              Democratizar o acesso às melhores ofertas e promoções, ajudando consumidores a economizar e fazer compras
              mais inteligentes.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Nossa Comunidade</h3>
            <p className="text-slate-600 leading-relaxed">
              Mais de 100 mil usuários ativos que confiam no Beloto Promoções para encontrar as melhores ofertas e
              compartilhar suas descobertas.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Qualidade</h3>
            <p className="text-slate-600 leading-relaxed">
              Todas as ofertas são verificadas pela nossa equipe para garantir que você tenha acesso apenas a promoções
              reais e vantajosas.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Crescimento</h3>
            <p className="text-slate-600 leading-relaxed">
              Estamos em constante evolução, adicionando novas funcionalidades e parcerias para oferecer cada vez mais
              valor aos nossos usuários.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Por que escolher o Beloto?</h2>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>Ofertas verificadas e atualizadas diariamente</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>Interface simples e intuitiva para encontrar o que você procura</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>Alertas personalizados para suas categorias favoritas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>Comunidade ativa compartilhando as melhores descobertas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>100% gratuito, sem taxas ou assinaturas</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Entre em Contato</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Email</p>
                <p className="text-sm text-slate-600">contato@belotoplays.com.br</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <WhatsAppIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">WhatsApp</p>
                <p className="text-sm text-slate-600">+55 11 98810-2938</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
