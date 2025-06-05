'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'

export default function SceneFadeOverlay() {
    const { progress } = useProgress()
    const [showOverlay, setShowOverlay] = useState(true)

    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => setShowOverlay(false), 1000) // wait for fade
            return () => clearTimeout(timeout)
        }
    }, [progress])

    return (
        <AnimatePresence>
            {showOverlay && (
                <motion.div
                    className="fixed inset-0 z-40 bg-black"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                />
            )}
        </AnimatePresence>
    )
}
