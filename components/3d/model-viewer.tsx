'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { staggerItem } from '@/lib/animations'
import React, { Suspense } from 'react'

// Simple DNA Helix Model
function DNAHelix() {
  const helixGeometry = React.useRef<THREE.BufferGeometry>(null)

  React.useEffect(() => {
    if (!helixGeometry.current) return

    const points: [number, number, number][] = []
    for (let i = 0; i < 100; i++) {
      const t = (i / 100) * Math.PI * 4
      const x = Math.cos(t) * 2
      const y = (i / 100) * 4 - 2
      const z = Math.sin(t) * 2
      points.push([x, y, z])
    }

    helixGeometry.current.setFromPoints(
      points.map((p) => new (require('three') as typeof import('three')).Vector3(...p))
    )
  }, [])

  const THREE = require('three')

  return (
    <>
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ambientLight intensity={0.6} />
      <mesh>
        <bufferGeometry ref={helixGeometry} />
        <pointsMaterial color="#3b82f6" size={0.15} />
      </mesh>
      <mesh>
        <torusGeometry args={[2, 0.3, 16, 100]} />
        <meshStandardMaterial color="#2563eb" wireframe />
      </mesh>
    </>
  )
}

// Fallback Component
function ModelLoading() {
  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-muted-foreground">Loading 3D model...</p>
    </div>
  )
}

interface ModelViewerProps {
  title: string
  description: string
}

export function ModelViewer({ title, description }: ModelViewerProps) {
  return (
    <motion.div variants={staggerItem}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </CardHeader>
        <CardContent>
          <div className="w-full h-80 rounded-lg overflow-hidden border">
            <Suspense fallback={<ModelLoading />}>
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <OrbitControls />
                <DNAHelix />
              </Canvas>
            </Suspense>
          </div>
          <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm">
              Tip: Use your mouse to rotate, scroll to zoom, and right-click to pan the 3D model.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
