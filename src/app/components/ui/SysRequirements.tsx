'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Cpu, HardDrive, Globe, X } from 'lucide-react'

export default function SystemRequirements() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="flex justify-center mt-12 z-10 relative">
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-xs px-4 py-2 rounded border border-emerald-400 text-emerald-300 bg-black/30 backdrop-blur hover:bg-emerald-500/20 hover:text-white transition-all font-mono"
                >
                    ⚙️ System Requirements
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="max-w-md w-full bg-black/70 border border-emerald-400 text-emerald-100 p-6 rounded-lg shadow-lg font-mono relative space-y-4"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-2 right-2 text-emerald-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-emerald-300 text-lg font-bold border-b border-emerald-500 pb-2 select-none">
                                ⚙️ System Requirements
                            </h2>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <Monitor className="w-4 h-4 text-emerald-400" />
                                    Modern Web Browser (Chrome, Firefox, Safari, Edge)
                                </li>
                                <li className="flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-emerald-400" />
                                    Dual-core CPU or higher
                                </li>
                                <li className="flex items-center gap-2">
                                    <HardDrive className="w-4 h-4 text-emerald-400" />
                                    4 GB RAM minimum (8 GB recommended)
                                </li>
                                <li className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-emerald-400" />
                                    High-speed internet recommended
                                </li>
                                <li className="text-emerald-200 pt-2 border-t border-emerald-500/20">
                                    ⚠️ 3D scene (~76MB GLB) may take a few seconds to load.
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
