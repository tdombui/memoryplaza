// src/app/MainMenuPage.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import MainMenuClock from './components/clocks/MainMenuClock'
import MainMenuBackground from './components/ui/MainMenuBackground'

export default function MainMenuPage() {
    const locations = [
        { name: 'Tokyo', path: '/tokyo', bg: 'bg-emerald-500', active: true, flag: '🇯🇵' },
        { name: 'Taipei', path: '/taipei', bg: 'bg-indigo-600', active: false, flag: '🇹🇼' },
        { name: 'Xiamen', path: '/xiamen', bg: 'bg-yellow-500', active: false, flag: '🇨🇳' },
        { name: 'Los Angeles', path: '/losangeles', bg: 'bg-pink-600', active: false, flag: '🇺🇸' },
    ]

    return (
        <div className="relative">
            <a
                className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[32rem] font-bold text-emerald-50 select-none blur-[.4px] pointer-events-none animate-glow drop-shadow-[0_0_8px_rgba(94,252,232,0.9)] animate-glow z-1"
                style={{ fontFamily: 'Yoster' }}
            >
                ~
            </a>
            <a
                className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[34rem] font-bold text-emerald-300 select-none blur-[10px] pointer-events-none animate-glow drop-shadow-[0_0_8px_rgba(94,252,232,0.9)] animate-glow z-0"
                style={{ fontFamily: 'Yoster' }}
            >
                ~
            </a>

            <div className="relative w-screen h-screen overflow text-white font-mono flex items-center justify-center">
                <MainMenuBackground />

                <motion.div
                    className="z-10 space-y-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                >

                    <h1
                        className="text-7xl font-bold text-emerald-50 select-none drop-shadow-[0_0_8px_rgba(94,252,232,0.9)] mt-4 animate-glow"
                        style={{ fontFamily: 'Apple Garamond' }}
                    >
                        Memory Plaza
                    </h1>

                    <MainMenuClock />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {locations.map((loc) =>
                            loc.active ? (
                                <Link key={loc.name} href={loc.path}>
                                    <motion.div
                                        whileHover={{ scale: 0.97 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`px-6 py-4 rounded-xl text-center ${loc.bg} text-white cursor-pointer select-none hover:shadow-[0_0_20px_rgba(255,255,255,0.9)] transition-shadow duration-300 ease-in-out hover:bg-emerald-500/70`}
                                    >
                                        <h2 className="text-xl font-semibold">
                                            {loc.name} ({loc.flag})
                                        </h2>
                                        <p className="text-sm opacity-80">Enter the scene →</p>
                                    </motion.div>
                                </Link>
                            ) : (
                                <div
                                    key={loc.name}
                                    className={`px-2 py-4 rounded-xl text-center ${loc.bg} text-white opacity-55 cursor-not-allowed select-none hover:blur-sm`}
                                    title="Under Construction"
                                >
                                    <h2 className="text-xl font-semibold">
                                        {loc.name} ({loc.flag})
                                    </h2>
                                    <p className="text-sm opacity-80">Under Construction</p>
                                </div>
                            )
                        )}
                    </div>

                </motion.div>

                <footer className="absolute bottom-8 w-full text-center z-10">
                    <motion.a
                        href="https://dombui.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 1.5 }}
                        className="text-emerald-50 text-sm px-3 py-1 rounded hover:text-emerald-300 hover:bg-black/20"
                    >
                        © dombui — all rights reserved
                    </motion.a>
                </footer>
            </div>
        </div>
    )
}
