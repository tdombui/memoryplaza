'use client'

import { Html, useProgress } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function getLoadingStatus(progress: number) {
    if (progress === 0) return 'Initiating...'
    if (progress < 30) return 'Loading assets...'
    if (progress < 60) return 'Compiling shaders...'
    if (progress < 90) return 'Generating scene...'
    if (progress < 100) return 'Finalizing...'
    return ''
}

export default function Loader() {
    const { progress } = useProgress()
    const [fadeOut, setFadeOut] = useState(false)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (progress >= 100) {
            // Start fade
            setFadeOut(true)

            // Fully hide after fade completes
            const timeout = setTimeout(() => {
                setVisible(false)
            }, 2500) // match this to duration below

            return () => clearTimeout(timeout)
        }
    }, [progress])

    const status = getLoadingStatus(progress)

    if (!visible) return null

    return (
        <Html fullscreen zIndexRange={[20, 30]}>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                style={{ backgroundColor: 'black' }}
                animate={{ opacity: fadeOut ? 0 : 1 }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
            >
                <div className="text-center space-y-6">
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
                    <p className="text-xs text-emerald-300 font-mono opacity-60">
                        Optimized for desktop. Initial load may take a few seconds. Performance may vary depending on device and internet speed.
                    </p>

                </div>
            </motion.div>
        </Html>
    )
}
