// 'use client'
// import { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabaseClient'
// import { useRouter } from 'next/navigation'

// interface Product {
//   id: string
//   name: string
//   current_price: number
//   created_at: string
// }

// export default function Dashboard() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [name, setName] = useState('')
//   const [price, setPrice] = useState('')
//   const router = useRouter()

//   // garante que o usuário esteja logado
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       if (!data.session) router.push('/auth')
//       else fetchProducts()
//     })
//   }, [router])

//   const fetchProducts = async () => {
//     const { data, error } = await supabase
//       .from('products')
//       .select('*')
//       .order('created_at', { ascending: false })

//     if (error) console.log('Erro ao buscar produtos:', error)
//     else setProducts(data || [])
//   }

//   const handleAddProduct = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const user = (await supabase.auth.getUser()).data.user
//     if (!user) return alert('Usuário não autenticado')

//     const { error } = await supabase.from('products').insert([
//       {
//         name,
//         current_price: Number(price),
//         user_id: user.id,
//       },
//     ])

//     if (error) return alert('Erro ao adicionar produto: ' + error.message)

//     setName('')
//     setPrice('')
//     fetchProducts()
//   }

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//     router.push('/auth')
//   }

//   return (
//     <div className="min-h-screen text-black bg-gray-100 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">🛒 Lista de Compras</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Sair
//         </button>
//       </div>

//       <form onSubmit={handleAddProduct} className="flex gap-2 mb-6">
//         <input
//           type="text"
//           placeholder="Nome do produto"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           className="flex-1 p-2 border rounded"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Preço"
//           value={price}
//           onChange={e => setPrice(e.target.value)}
//           className="w-32 p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Adicionar
//         </button>
//       </form>

//       <div className="bg-white shadow rounded p-4">
//         {products.length === 0 ? (
//           <p className="text-gray-500">Nenhum produto ainda.</p>
//         ) : (
//           <ul className="divide-y">
//             {products.map(prod => (
//               <li key={prod.id} className="py-2 flex justify-between">
//                 <span>{prod.name}</span>
//                 <span className="text-gray-700 font-medium">
//                   R$ {prod.current_price.toFixed(2)}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Spinner from '../components/Spinner'

interface Product {
  id: string
  name: string
  current_price: number
  created_at: string
}

interface PriceHistory {
  id: string
  price: number
  recorded_at: string
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [history, setHistory] = useState<Record<string, PriceHistory[]>>({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // garante que o usuário esteja logado
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/auth')
      else fetchProducts()
    })
  }, [router])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.log('Erro ao buscar produtos:', error)
    else setProducts(data || [])
    setLoading(false)
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    const user = (await supabase.auth.getUser()).data.user
    if (!user) return alert('Usuário não autenticado')

    const parsedPrice = parseFloat(price.replace(',', '.'))
    if (isNaN(parsedPrice)) return alert('Preço inválido')

    // 1️⃣ Cria produto
    const { data: newProduct, error: prodError } = await supabase
      .from('products')
      .insert([{ name, current_price: parsedPrice, user_id: user.id }])
      .select()
      .single()

    if (prodError || !newProduct) return alert('Erro ao adicionar produto: ' + prodError?.message)

    // 2️⃣ Cria histórico de preço
    const { error: priceError } = await supabase
      .from('price_history')
      .insert([{ product_id: newProduct.id, user_id: user.id, price: parsedPrice }])

    if (priceError) console.error('Erro ao salvar histórico de preço:', priceError)

    setName('')
    setPrice('')
    fetchProducts()
  }

  const handleDeleteProduct = async (productId: string) => {
    const confirmDelete = confirm('Deseja realmente excluir este produto?')
    if (!confirmDelete) return

    const { error } = await supabase.from('products').delete().eq('id', productId)
    if (error) return console.error('Erro ao deletar produto:', error)

    fetchProducts()
  }

  const toggleHistory = async (productId: string) => {
    if (history[productId]) {
      setHistory(prev => {
        const { [productId]: _, ...rest } = prev
        return rest
      })
      return
    }

    const { data, error } = await supabase
      .from('price_history')
      .select('*')
      .eq('product_id', productId)
      .order('recorded_at', { ascending: false })

    if (error) console.error('Erro ao buscar histórico:', error)
    else setHistory(prev => ({ ...prev, [productId]: data || [] }))
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Header />

      <Spinner show={loading} label="Carregando seus produtos..." />

      <main className="p-6">
        <h1 className="mb-6 text-2xl font-bold">🛒 Lista de Compras</h1>

        <form onSubmit={handleAddProduct} className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={e => setName(e.target.value)}
            className="flex-1 rounded border p-2"
            required
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Preço"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="w-32 rounded border p-2"
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            Adicionar
          </button>
        </form>

        <div className="rounded bg-white p-4 shadow">
          {products.length === 0 ? (
            <p className="text-gray-500">Nenhum produto ainda.</p>
          ) : (
            <ul className="divide-y">
              {products.map(prod => (
                <li key={prod.id} className="py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{prod.name}</span> -{' '}
                      <span className="text-gray-700">R$ {prod.current_price.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleHistory(prod.id)}
                        className="text-sm text-blue-600 transition hover:underline"
                      >
                        Histórico
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="text-sm text-red-600 transition hover:underline"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                  {history[prod.id] && history[prod.id].length > 0 && (
                    <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                      {history[prod.id].map(h => (
                        <li key={h.id}>
                          R$ {h.price.toFixed(2)} - {new Date(h.recorded_at).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}

