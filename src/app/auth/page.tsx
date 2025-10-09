'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
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
    e.preventDefault()
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return alert(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) return alert(error.message)
      alert('Conta criada! Confirme o e-mail e depois faça login.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className=" text-black w-96 p-6 bg-white shadow rounded space-y-4">
        <h1 className="text-2xl font-bold text-center">{isLogin ? 'Entrar' : 'Criar conta'}</h1>

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

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>

        <p
          className="text-center text-blue-600 cursor-pointer text-sm"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Criar conta' : 'Já tenho conta'}
        </p>
      </form>
    </div>
  )
}