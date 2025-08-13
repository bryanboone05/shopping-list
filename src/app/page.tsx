"use client"

import Link from "next/link";
import { motion } from "framer-motion";

import { useState } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`rounded-lg shadow-md p-8 max-w-md w-full text-center transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
  <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <h1 className={`text-3xl font-bold mb-4 flex items-center justify-center gap-2 ${
          darkMode ? "text-gray-100" : "text-gray-800"
        }`}>
          Bem-vindo!
          <motion.span
            style={{ display: "inline-block" }}
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            👋
          </motion.span>
        </h1>
        <ul className={`mb-6 text-left list-disc pl-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          <li>Organize suas compras de forma prática e rápida</li>
          <li>Tenha acesso à sua lista em qualquer lugar</li>
          <li>Modo escuro para mais conforto visual</li>
          <li>Interface simples, moderna e intuitiva</li>
        </ul>
        <p className={`mb-6 text-center ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
          Faça login para começar a usar ou crie sua conta agora mesmo!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/auth"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition text-center"
          >
            Fazer Login
          </Link>
          <Link
            href="/register"
            className={`inline-block border px-6 py-2 rounded transition text-center ${darkMode ? "border-blue-400 text-blue-200 hover:bg-blue-800" : "border-blue-600 text-blue-700 hover:bg-blue-100"}`}
          >
            Criar Conta
          </Link>
        </div>
      </div>
    </main>
  );
}
