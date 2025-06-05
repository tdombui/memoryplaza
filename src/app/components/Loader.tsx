'use client'

import { Html, useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

function getLoadingStatus(progress: number) {
    if (progress === 0) return 'Initiating...'
    if (progress < 30) return 'Loading assets...'
    if (progress < 60) return 'Compiling shaders...'
    if (progress < 90) return 'Generating scene...'
    if (progress < 100) return 'Finalizing...'
    return ''
}

function getImageOpacity(progress: number): number {
    return Math.min(0.85, Math.max(0, progress / 120))
}

export default function Loader() {
    const { progress } = useProgress()
    const [showLoader, setShowLoader] = useState(true)
    const status = getLoadingStatus(progress)
    const imageOpacity = getImageOpacity(progress)

    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                setShowLoader(false)
            }, 2000)
            return () => clearTimeout(timeout)
        }
    }, [progress])

    return (
        <AnimatePresence>
            {showLoader && (
                <Html fullscreen zIndexRange={[20, 30]}>
                    <motion.div
                        className="fixed inset-0 bg-black/10 flex items-center justify-center"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Fading background image */}
                        <motion.img
                            src="/loading.png"
                            alt="Loading background"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                                opacity: imageOpacity,
                                zIndex: 1,
                            }}
                            transition={{ duration: 1 }}
                        />

                        {/* Loading UI */}
                        <motion.div
                            className="relative z-10 flex flex-col items-center space-y-6 text-center"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h1
                                className="text-4xl font-bold text-emerald-300 drop-shadow-lg font-mono animate-pulse-flicker"
                                style={{ fontFamily: 'Apple Garamond' }}
                            >
                                Memory Plaza—TOKYO
                            </h1>

                            <div className="w-64 h-4 bg-black/50 rounded-full overflow-hidden border border-emerald-400">
                                <div
                                    className="h-full bg-emerald-300 transition-all duration-200"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <p className="text-emerald-300 font-mono text-sm tracking-wide">
                                {status} ({Math.floor(progress)}%)
                            </p>
                        </motion.div>
                    </motion.div>
                </Html>
            )}
        </AnimatePresence>
    )
}
