'use client'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import Loader from '../components/Loader'
import SceneFadeOverlay from '../components/SceneFadeOverlay'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useProgress } from '@react-three/drei'
import * as THREE from 'three'

function TokyoScene({ cameraName, onSelect }: { cameraName: string, onSelect: (name: string) => void }) {
    const { scene, cameras } = useGLTF('/3d/memoryplaza-tokyo11.glb') as any
    const { camera, size, gl } = useThree()
    const shakeRef = useRef(0)
    const basePosition = useRef(new THREE.Vector3())
    const baseQuaternion = useRef(new THREE.Quaternion())
    const clickableObjects = useRef<THREE.Object3D[]>([])
    const cameraRig = useRef<THREE.Group>(new THREE.Group())
    const interactiveNames = ['CanMatchMatch', 'CanMatchMatchSingle', 'CanMatchMatchSingle2', 'CanMetsBlack', 'Newspapers', 'SuTuDa']

    useEffect(() => {
        const selected = cameras.find((c: any) => c.name === cameraName)
        if (selected) {
            camera.position.copy(selected.position)
            camera.quaternion.copy(selected.quaternion)

            basePosition.current.copy(selected.position)
            baseQuaternion.current.copy(selected.quaternion)

            cameraRig.current.position.copy(selected.position)
            cameraRig.current.quaternion.copy(selected.quaternion)

            if (typeof selected.fov === 'number') {
                const perspectiveCam = camera as THREE.PerspectiveCamera
                perspectiveCam.fov = selected.fov
                perspectiveCam.near = selected.near
                perspectiveCam.far = selected.far
                perspectiveCam.aspect = size.width / size.height
                perspectiveCam.updateProjectionMatrix()
            }
        }
    }, [cameraName, cameras, camera, size])

    useFrame(() => {
        shakeRef.current += 0.008
        const shakeAmount = 0.0075
        camera.position.x = basePosition.current.x + Math.sin(shakeRef.current * 2.3) * shakeAmount
        camera.position.y = basePosition.current.y + Math.cos(shakeRef.current * 2.1) * shakeAmount
        camera.position.z = basePosition.current.z + Math.sin(shakeRef.current * 1.7) * shakeAmount
        camera.quaternion.copy(baseQuaternion.current)
    })

    useEffect(() => {
        clickableObjects.current = []

        interactiveNames.forEach((name) => {
            const group = scene.getObjectByName(name)
            if (group) {
                clickableObjects.current.push(group)
                group.traverse((child: any) => {
                    if ((child as THREE.Mesh).isMesh) {
                        clickableObjects.current.push(child)
                    }
                })
            } else {
                console.warn(`⚠️ Could not find object named "${name}"`)
            }
        })

        console.log('📦 Registered Clickables:', clickableObjects.current.map((o) => o.name))
    }, [scene])

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const raycaster = new THREE.Raycaster()
            const mouse = new THREE.Vector2()
            const bounds = gl.domElement.getBoundingClientRect()

            mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
            mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1

            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(clickableObjects.current, true)

            if (intersects.length > 0) {
                for (const hit of intersects) {
                    let obj = hit.object
                    while (obj && obj.parent) {
                        if (interactiveNames.includes(obj.name)) {
                            console.log('✅ Clicked:', obj.name)
                            onSelect(obj.name)
                            return
                        }
                        obj = obj.parent
                    }
                }
            }
        }

        gl.domElement.addEventListener('click', handleClick)
        return () => gl.domElement.removeEventListener('click', handleClick)
    }, [camera, gl, onSelect])

    return <primitive object={scene} />
}

export default function SceneCanvas() {
    const [cameraName, setCameraName] = useState('Camera_Main')
    const [selectedObject, setSelectedObject] = useState<string | null>(null)
    const { progress } = useProgress()
    const isFullyLoaded = progress === 100

    const objectInfo: Record<string, { title: string; description: string }> = {
        CanMatchMatch: {
            title: 'Match Match Soda Can',
            description: 'A delicious grapefruit soda with vitamins and minerals.',
        },
        CanMatchMatchSingle: {
            title: 'Match Match Soda Can',
            description: 'A delicious grapefruit soda with vitamins and minerals.',
        },
        CanMatchMatchSingle2: {
            title: 'Match Match Soda Can',
            description: 'A delicious grapefruit soda with vitamins and minerals.',
        },
        CanMetsBlack: {
            title: 'Mets Black Cola Can',
            description: 'A somewhat rare, strong Japanese caffeinated cola.',
        },
        Newspapers: {
            title: 'Newspapers',
            description: 'Someone left a tidy stack of old newspapers.',
        },
        SuTuDa: {
            title: '石狮子 ("shí shīzǐ")',
            description: 'A lion made of stone watches the plaza.',
        },
    }
    const closeCard = () => setSelectedObject(null)

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <AnimatePresence mode="wait">
                <SceneFadeOverlay />

                {selectedObject && objectInfo[selectedObject] && (
                    <motion.div
                        key={selectedObject}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
                        onClick={closeCard}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-black/90 text-white p-6 rounded-lg max-w-md relative shadow-[1px_5px_30px_rgba(0,0,0,0.9)]"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ y: 50, opacity: 0, scale: 0.5 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.5 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <button
                                onClick={closeCard}
                                className="absolute top-2 right-2 text-white hover:text-emerald-400 text-xl"
                            >
                                ×
                            </button>
                            <h2 className="text-2xl font-bold mb-2 text-emerald-300">
                                {objectInfo[selectedObject].title}
                            </h2>
                            <p className="text-sm text-gray-200">
                                {objectInfo[selectedObject].description}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isFullyLoaded && (
                <motion.div
                    className="absolute z-10 top-0 left-0 p-6 font-mono space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.12,
                                delayChildren: 3.4
                            }
                        }
                    }}
                >
                    <motion.h2
                        className="select-none text-3xl font-bold mb-3 px-4 py-2 rounded drop-shadow bg-black/90 text-yellow-300 hover:blur-[0.8px]"
                        style={{ fontFamily: 'Apple Garamond' }}
                    >
                        Memory Plaza—TOKYO
                    </motion.h2>
                    {[{ label: 'Plaza', name: 'Camera_Main' }, { label: 'ライオンの足元にあるソーダ缶', name: 'Camera_Lion_Cans' }, { label: 'Newspapers', name: 'Camera_Newspaper' }, { label: 'Cans', name: 'Camera_Cans' }, { label: 'Terrain', name: 'Camera_Terrain' }, { label: 'Vending Machine', name: 'Camera_Vending_3' }].map((item) => {
                        const isSelected = cameraName === item.name
                        return (
                            <motion.button
                                key={item.name}
                                onClick={() => setCameraName(item.name)}
                                className={`block py-2 px-4 rounded transition font-mono items-center ${isSelected ? 'bg-black/90 text-yellow-300 blur-[0.15px] shadow-[0_3px_10px_rgba(0,0,0,0.8)] ' : 'bg-black/50 hover:bg-black text-white'}`}
                                variants={{
                                    hidden: { opacity: 0, y: -20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <span className="flex items-center space-x-2">
                                    {isSelected && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="text-yellow-300">▶</motion.span>}
                                    <span>{item.label}</span>
                                </span>
                            </motion.button>
                        )
                    })}
                </motion.div>
            )}

            <Canvas shadows>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 10]} intensity={3} />
                <Suspense fallback={null}>
                    <TokyoScene cameraName={cameraName} onSelect={setSelectedObject} />
                </Suspense>
                <Loader />
                <OrbitControls
                    enableZoom
                    minPolarAngle={Math.PI / 2.1}
                    maxPolarAngle={Math.PI / 1.9}
                    minAzimuthAngle={-0.15}
                    maxAzimuthAngle={0.15}
                    enablePan={true}
                />
            </Canvas>

            <footer className="absolute bottom-8 w-full text-center z-10">
                <a
                    href="https://dombui.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-200 bg-black/30 font-mono text-md transition duration-300 hover:text-blur-xl hover:text-emerald-300 hover:bg-black/70 px-3 py-1 rounded blur-[0.7px] hover:blur-[0.3px]"
                >
                    © {new Date().getFullYear()} dombui — all rights reserved
                </a>
            </footer>
        </div>
    )
}
