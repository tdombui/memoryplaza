'use client'
import { motion } from 'framer-motion'
import React from 'react'

export default function TaipeiSceneCanvas() {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white select-none"
            transition={{ duration: 2.5, ease: 'easeInOut' }}
        >
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">Memory Plaza — Taipei</h1>
                <p className="text-lg">Coming soon...</p>
            </div>
        </motion.div>
    )
}
