import type { Metadata } from "next"
import { Shield, Eye, Lock, UserCheck, Database, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Políticas de Privacidade - Beloto Promoções",
  description: "Conheça nossas políticas de privacidade e proteção de dados",
}

export default function PoliticasPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">Políticas de Privacidade</h1>
            <p className="text-green-100 mt-2">Última atualização: Janeiro de 2025</p>
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <Eye className="w-6 h-6 text-green-600" />
            Introdução
          </h2>
          <p className="text-slate-600 leading-relaxed">
            O Beloto Promoções está comprometido em proteger sua privacidade e seus dados pessoais. Esta Política de
            Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações quando você utiliza
            nossa plataforma.
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            Ao utilizar o Beloto Promoções, você concorda com as práticas descritas nesta política. Recomendamos que
            você leia atentamente este documento.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <Database className="w-6 h-6 text-indigo-600" />
            Informações que Coletamos
          </h2>
          <div className="space-y-4 text-slate-600">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Informações de Cadastro</h3>
              <p className="leading-relaxed">
                Quando você cria uma conta, coletamos informações como nome, email e senha (criptografada). Essas
                informações são necessárias para fornecer nossos serviços e personalizar sua experiência.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Informações de Uso</h3>
              <p className="leading-relaxed">
                Coletamos dados sobre como você interage com nossa plataforma, incluindo ofertas visualizadas, pesquisas
                realizadas, favoritos salvos e cliques em links de afiliados.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Informações Técnicas</h3>
              <p className="leading-relaxed">
                Automaticamente coletamos informações técnicas como endereço IP, tipo de navegador, sistema operacional
                e dados de cookies para melhorar nossos serviços.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-indigo-600" />
            Como Usamos suas Informações
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span>Fornecer, manter e melhorar nossos serviços</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span>Personalizar sua experiência e recomendar ofertas relevantes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span>Enviar notificações sobre ofertas e atualizações (com seu consentimento)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span>Processar transações de afiliados e comissões</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span>Analisar tendências e comportamentos para melhorar a plataforma</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span>Prevenir fraudes e garantir a segurança da plataforma</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <Lock className="w-6 h-6 text-indigo-600" />
            Proteção de Dados
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra
            acesso não autorizado, alteração, divulgação ou destruição.
          </p>
          <div className="bg-indigo-50 rounded-lg p-4 space-y-2 text-sm text-slate-600">
            <p className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span>Criptografia SSL/TLS para transmissão de dados</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span>Senhas armazenadas com hash seguro</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span>Acesso restrito aos dados pessoais</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span>Monitoramento contínuo de segurança</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Compartilhamento de Informações</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Não vendemos suas informações pessoais. Podemos compartilhar dados apenas nas seguintes situações:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">•</span>
              <span>
                Com parceiros de afiliados quando você clica em ofertas (apenas dados necessários para rastreamento)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Com prestadores de serviços que nos auxiliam (hospedagem, análise, etc.)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Quando exigido por lei ou para proteger nossos direitos</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Seus Direitos</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem os seguintes direitos:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="font-semibold text-slate-900 mb-1">Acesso</p>
              <p className="text-sm text-slate-600">Solicitar cópia dos seus dados</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="font-semibold text-slate-900 mb-1">Correção</p>
              <p className="text-sm text-slate-600">Atualizar dados incorretos</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="font-semibold text-slate-900 mb-1">Exclusão</p>
              <p className="text-sm text-slate-600">Solicitar remoção dos dados</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="font-semibold text-slate-900 mb-1">Portabilidade</p>
              <p className="text-sm text-slate-600">Transferir dados para outro serviço</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies</h2>
          <p className="text-slate-600 leading-relaxed">
            Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e
            personalizar conteúdo. Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Alterações nesta Política</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças
                significativas através do email cadastrado ou por meio de aviso em nossa plataforma.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Contato</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Se você tiver dúvidas sobre esta Política de Privacidade ou quiser exercer seus direitos, entre em contato
            conosco:
          </p>
          <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
            <p className="text-slate-600 flex items-center gap-2">
              <span className="font-semibold text-slate-900">Email:</span> contato@belotoplays.com.br
            </p>
            <p className="text-slate-600 flex items-center gap-2">
              <span className="font-semibold text-slate-900">WhatsApp:</span> +55 11 98810-2938
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
