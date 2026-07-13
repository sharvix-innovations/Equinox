import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// Fibonacci-sphere distribution → particles sit evenly on the globe surface.
function spherePoints(count, radius) {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    positions[i * 3] = Math.cos(theta) * r * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return positions
}

// Random points in a shell around the globe → "atmosphere" of air/water/soil motes.
function shellPoints(count, inner, outer) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const radius = inner + Math.random() * (outer - inner)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.cos(phi)
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
  }
  return positions
}

function Globe() {
  const surface = useRef()
  const halo = useRef()

  const surfacePositions = useMemo(() => spherePoints(2600, 1.6), [])
  const haloPositions = useMemo(() => shellPoints(900, 1.9, 3.0), [])

  useFrame((state, delta) => {
    if (surface.current) surface.current.rotation.y += delta * 0.05
    if (halo.current) {
      halo.current.rotation.y -= delta * 0.02
      halo.current.rotation.x += delta * 0.008
    }
  })

  return (
    <group rotation={[0.35, 0, 0.15]}>
      {/* Globe surface (soil/land grid) */}
      <Points ref={surface} positions={surfacePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00AEEF"
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>

      {/* Atmosphere shell (air/water motes) */}
      <Points ref={halo} positions={haloPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00C48C"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshBasicMaterial color="#0A6EFF" transparent opacity={0.07} />
      </mesh>
    </group>
  )
}

export default function ParticleGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
          <Globe />
        </Float>
      </Suspense>
    </Canvas>
  )
}
