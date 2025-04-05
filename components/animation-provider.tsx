"use client"

import { useEffect, createContext, useContext, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

type AnimationContextType = {
  observeElements: () => void
}

const AnimationContext = createContext<AnimationContextType>({
  observeElements: () => {},
})

export const useAnimation = () => useContext(AnimationContext)

export default function AnimationProvider({ children }: { children: ReactNode }) {
  const observeElements = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element)
    })
  }

  useEffect(() => {
    observeElements()

    // Re-observe elements when the DOM might have changed
    window.addEventListener("load", observeElements)
    window.addEventListener("resize", observeElements)

    return () => {
      window.removeEventListener("load", observeElements)
      window.removeEventListener("resize", observeElements)
    }
  }, [])

  return (
    <AnimationContext.Provider value={{ observeElements }}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </AnimationContext.Provider>
  )
}

