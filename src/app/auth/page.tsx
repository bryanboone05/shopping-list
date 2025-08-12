"use client"

import React, { useState } from "react";
import DarkModeToggle from "../components/DarkModeToggle";

const AuthPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dummy validation
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        setError("");
        // Handle login logic here
    };

    return (
        <div className={`flex min-h-screen items-center justify-center transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <div className={`w-full max-w-md p-8 rounded shadow transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? "text-blue-300" : "text-blue-500"}`}>Login</h2>
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className={`block mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`} htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div>
                        <label className={`block mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`} htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 rounded transition ${darkMode ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;