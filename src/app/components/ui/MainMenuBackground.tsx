'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const BLOB_COUNT = 10
const colors = [
    'rgba(255, 200, 221, 0.32)', // light pink
    'rgba(180, 230, 255, 0.32)', // baby blue
    'rgba(200, 255, 221, 0.42)', // mint
    'rgba(255, 245, 200, 0.42)', // butter yellow
    'rgba(235, 200, 255, 0.42)', // lavender
]

type Blob = {
    top: number
    left: number
    color: string
}

export default function MainMenuBackground() {
    const controls = useAnimation()
    const containerRef = useRef<HTMLDivElement>(null)
    const [blobs, setBlobs] = useState<Blob[]>([])

    useEffect(() => {
        // Only run this on the client
        const generatedBlobs = Array.from({ length: BLOB_COUNT }).map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            color: colors[Math.floor(Math.random() * colors.length)],
        }))
        setBlobs(generatedBlobs)

        controls.start(i => ({
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            transition: {
                delay: i * 0.25,
                duration: 20,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
            },
        }))
    }, [controls])

    return (
        <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
            {/* 🌄 Darker pastel-inspired gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#12123f] via-[#6ee7b7] to-[#caaaff] opacity-[0.6]" />

            {/* 🧵 Noise overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.55] mix-blend-overlay pointer-events-none" />

            {/* 🫧 Animated pastel blobs */}
            {blobs.map((blob, i) => (
                <motion.div
                    key={i}
                    custom={i}
                    animate={controls}
                    className="absolute w-[400px] h-[400px] rounded-full blur-[120px]"
                    style={{
                        top: `${blob.top}%`,
                        left: `${blob.left}%`,
                        backgroundColor: blob.color,
                    }}
                />
            ))}
        </div>
    )
}
