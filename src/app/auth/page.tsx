'use client'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner';
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <Spinner />
      ) : showResetPassword ? (
        <form onSubmit={handleResetPassword} className="text-black w-96 p-6 bg-white shadow rounded space-y-4">
          <h1 className="text-2xl font-bold text-center">Recuperar Senha</h1>
          <p className="text-sm text-gray-600 text-center">
            Digite seu e-mail para receber um link de recuperação
          </p>

          <input
            type="email"
            placeholder="E-mail"
            value={resetEmail}
            onChange={e => setResetEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <button type="submit" className="w-full py-2 bg-teal-600 text-white rounded cursor-pointer hover:bg-teal-700">
            Enviar Link
          </button>

          <p
            className="text-center text-teal-600 cursor-pointer text-sm hover:invert"
            onClick={() => setShowResetPassword(false)}
          >
            Voltar ao login
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className=" text-black w-96 p-6 bg-white shadow rounded space-y-4">
          <h1 className="text-2xl font-bold text-center">{isLogin ? 'Acessar' : 'Criar conta'}</h1>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded cursor-pointer">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>

          {isLogin && (
            <p
              className="text-center text-gray-600 cursor-pointer text-sm hover:text-blue-600"
              onClick={() => setShowResetPassword(true)}
            >
              Esqueci minha senha
            </p>
          )}

          <p
            className="text-center text-blue-600 cursor-pointer text-sm"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Criar conta' : 'Já tenho conta'}
          </p>
        </form>
      )}
    </div>
  )
}