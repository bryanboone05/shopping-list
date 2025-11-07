'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Spinner from '../../components/Spinner'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verifica se há um código de recuperação na URL
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // O usuário clicou no link de recuperação
      }
    })
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return alert('As senhas não coincidem!')
    }

    if (password.length < 6) {
      return alert('A senha deve ter pelo menos 6 caracteres!')
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    setLoading(false)

    if (error) {
      alert('Erro ao redefinir senha: ' + error.message)
    } else {
      alert('Senha redefinida com sucesso!')
      router.push('/dashboard')
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Spinner show={loading} label="Atualizando senha..." />

      <form onSubmit={handleResetPassword} className="w-full max-w-sm space-y-4 rounded bg-white p-6 text-black shadow">
        <h1 className="text-2xl font-bold text-center">Nova Senha</h1>
        <p className="text-sm text-gray-600 text-center">
          Digite sua nova senha
        </p>

        <input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full rounded border p-2"
          required
          minLength={6}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full rounded border p-2"
          required
          minLength={6}
          disabled={loading}
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          Redefinir Senha
        </button>
      </form>
    </div>
  )
}
