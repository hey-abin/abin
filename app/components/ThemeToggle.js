"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  const toggleTheme = (e) => {
    // Check if the View Transition API is supported
    if (!document.startViewTransition) {
      setTheme(isDark ? "light" : "dark")
      return
    }

    // View Transition API legendary effect
    document.startViewTransition(() => {
      setTheme(isDark ? "light" : "dark")
    })
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full p-1 transition-all duration-500 overflow-hidden group border border-transparent hover:border-white/20 active:scale-95 shadow-lg z-50"
    >
      {/* Background Gradients */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none
          ${isDark 
            ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-fuchsia-900 opacity-100" 
            : "bg-gradient-to-r from-sky-400 via-rose-300 to-orange-200 opacity-100"
          }`}
      />

      {/* Shapes (Light Mode: Clouds) */}
      {!isDark && (
        <div className="absolute inset-0">
          <motion.div 
            animate={{ x: [0, 5, 0], y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-2 right-4 w-4 h-2 bg-white/60 rounded-full blur-[1px]"
          />
          <motion.div 
            animate={{ x: [0, -4, 0], y: [0, 2, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-2 right-6 w-5 h-2.5 bg-white/40 rounded-full blur-[1px]"
          />
        </div>
      )}

      {/* Shapes (Dark Mode: Stars/Moon) */}
      {isDark && (
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_2px_white]"
              style={{
                top: `${20 + i * 20}%`,
                left: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* Handle (Sun / Moon) */}
      <motion.div
        animate={{ 
          x: isDark ? 32 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden"
      >
        {/* Glow inside handle */}
        <div className={`absolute inset-0 opacity-20 ${isDark ? "bg-indigo-400" : "bg-orange-400"}`} />
      </motion.div>
    </button>
  )
}
