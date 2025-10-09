"use client";

// import confetti from "canvas-confetti";

// import { useState } from "react";

// export default function Page() {
//   const [clicked, setClicked] = useState(false);

//   function handleConfetti() {
//     confetti({
//       particleCount: 200,
//       spread: 120,
//       startVelocity: 40,
//       scalar: 1.5,
//       ticks: 300,
//     });
//     setClicked(true);
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white gap-4">
//       <h1 className="text-4xl font-bold">Clica ai seu besta! 🎉</h1>
//       <button
//         className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//         onClick={handleConfetti}
//         disabled={clicked}
//       >
//         Não clique aqui!
//       </button>
//     </div>
//   );
// }

// import { supabase } from '@/lib/supabaseClient'
// import { useEffect, useState } from 'react'

// export default function Home() {
//   const [data, setData] = useState<any[]>([])

//   useEffect(() => {
//     supabase.from('products').select('*').then(({ data, error }) => {
//       if (error) console.log('Erro:', error)
//       else setData(data || [])
//     })
//   }, [])

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Produtos</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   )
// }

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function HomePage() {
  const router = useRouter();

  // Se já estiver logado, vai direto pro dashboard
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) router.push("/dashboard");
    };
    checkUser();
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white text-gray-800 px-4">
      <div className="max-w-md text-center space-y-8">
        <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
          🛒 Shopping List
        </h1>

        <p className="text-lg text-gray-600">
          Organize suas compras e acompanhe a variação de preços dos seus
          produtos favoritos com facilidade.
        </p>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={() => router.push("/auth")}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Entrar ou Criar Conta
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="border border-blue-600 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Acessar Dashboard
          </button>
        </div>

        <footer className="mt-12 text-sm text-gray-500">
          Feito com 💙 usando Next.js + Supabase + TailwindCSS
        </footer>
      </div>
    </main>
  );
}
