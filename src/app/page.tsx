"use client"

import Link from "next/link";
import { motion } from "framer-motion";

import { useState } from "react";
import DarkModeToggle from "./components/DarkModeToggle";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center px-4 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`rounded-lg shadow-md p-8 max-w-md w-full text-center ${
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
        <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Adicione itens à sua lista e gerencie suas compras de forma simples e eficiente.
        </p>
        <Link
          href="/auth"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Fazer Login
        </Link>
      </div>
    </main>
  );
}
