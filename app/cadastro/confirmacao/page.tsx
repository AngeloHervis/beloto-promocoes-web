export default function ConfirmacaoPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-3">Confirme seu email</h1>

          <p className="text-slate-600 mb-6 leading-relaxed">
            Enviamos um link de confirmação para o seu email. Por favor, verifique sua caixa de entrada e clique no link
            para completar seu cadastro.
          </p>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-indigo-800 font-medium">Não recebeu o email?</p>
            <p className="text-xs text-indigo-600 mt-1">Verifique sua pasta de spam ou lixo eletrônico</p>
          </div>

          <a
            href="/login"
            className="inline-block w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all"
          >
            Voltar para o login
          </a>
        </div>
      </div>
    </div>
  )
}
