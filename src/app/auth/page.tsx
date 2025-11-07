'use client'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner';
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Header from '../components/Header';

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    // redireciona se o usuário já estiver logado
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push('/dashboard')
    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.push('/dashboard')
    })

    return () => data?.subscription?.unsubscribe()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return alert(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) return alert(error.message);
      alert('Conta criada! Confirme o e-mail e depois faça login.');
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    setLoading(false);
    
    if (error) {
      alert('Erro ao enviar e-mail: ' + error.message);
    } else {
      alert('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      setShowResetPassword(false);
      setResetEmail('');
    }
  }

  const spinnerLabel = showResetPassword
    ? 'Enviando e-mail de recuperação...'
    : isLogin
      ? 'Entrando na sua conta...'
      : 'Criando sua conta...';

  return (
    <>
      <Header />
      <div className="relative flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <Spinner show={loading} label={spinnerLabel} />

        {showResetPassword ? (
          <form onSubmit={handleResetPassword} className="w-full max-w-sm space-y-4 rounded bg-white p-6 text-black shadow">
            <h1 className="text-center text-2xl font-bold">Recuperar Senha</h1>
            <p className="text-center text-sm text-gray-600">
              Digite seu e-mail para receber um link de recuperação
            </p>

            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="E-mail"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              className="w-full rounded border p-2"
              required
              disabled={loading}
            />

            <button
              type="submit"
              className="w-full cursor-pointer rounded bg-teal-600 py-2 font-medium text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              Enviar Link
            </button>

            <button
              type="button"
              className="mx-auto block text-sm font-medium text-teal-600 transition hover:invert"
              onClick={() => setShowResetPassword(false)}
              disabled={loading}
            >
              Voltar ao login
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-4 rounded bg-white p-6 text-black shadow"
            autoComplete="on"
          >
            <h1 className="text-center text-2xl font-bold">{isLogin ? 'Acessar' : 'Criar conta'}</h1>

            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded border p-2"
              required
              disabled={loading}
            />

            <input
              type="password"
              name="password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded border p-2"
              required
              disabled={loading}
              minLength={6}
            />

            <button
              type="submit"
              className="w-full cursor-pointer rounded bg-teal-600 py-2 font-medium text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>

            {isLogin && (
              <button
                type="button"
                className="mx-auto block text-sm font-medium text-teal-600 transition hover:invert"
                onClick={() => setShowResetPassword(true)}
                disabled={loading}
              >
                Esqueci minha senha
              </button>
            )}

            <button
              type="button"
              className="mx-auto block text-sm font-medium text-teal-600 transition hover:invert"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
            >
              {isLogin ? 'Criar conta' : 'Já tenho conta'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}