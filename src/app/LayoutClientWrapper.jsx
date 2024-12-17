'use client'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * A client-side component that wraps the children in an AnimatePresence
 * component from framer-motion, which allows for animations when the
 * children change.
 *
 * The animation is a simple fade-in and slide-up effect, with a short
 * duration of 0.4 seconds.
 *
 * The LayoutClientWrapper is a utility component that is used in the
 * pages/_app.jsx file to wrap the entire app in an AnimatePresence
 * component.
 */
export default function LayoutClientWrapper({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
