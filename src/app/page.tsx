'use client'

import { useState } from 'react'
import SceneCanvas from '@/app/components/SceneCanvas'

export default function Home() {
  const [target, setTarget] = useState('default')

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Real 3D Scene */}
      <div className="absolute inset-0">
        <SceneCanvas />
      </div>

      {/* Menu Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full space-y-6 text-white font-mono pointer-events-none">


        {/* <nav className="flex flex-col space-y-3 text-xl pointer-events-auto">
          {[
            { label: '▶ Vending Machine', id: 'vending' },
            { label: '▶ Stone Lion', id: 'lion' },
            { label: '▶ Newspaper', id: 'newspaper' },
            { label: '▶ Match Match Can', id: 'match' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTarget(item.id)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition"
            >
              {item.label}
            </button>
          ))}
        </nav> */}
      </div>
    </main>
  )
}
