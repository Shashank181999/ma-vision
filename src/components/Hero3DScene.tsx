"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Trail } from "@react-three/drei";
import * as THREE from "three";

// Running Horse made of particles
function HorseParticles() {
  const ref = useRef<THREE.Points>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  // Horse shape approximation with particles
  const particles = useMemo(() => {
    const positions: number[] = [];
    const count = 800;

    // Body
    for (let i = 0; i < count * 0.4; i++) {
      const x = (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 0.8;
      const z = (Math.random() - 0.5) * 0.6;
      positions.push(x, y, z);
    }

    // Neck
    for (let i = 0; i < count * 0.15; i++) {
      const x = 1 + Math.random() * 0.5;
      const y = 0.3 + Math.random() * 0.8;
      const z = (Math.random() - 0.5) * 0.3;
      positions.push(x, y, z);
    }

    // Head
    for (let i = 0; i < count * 0.1; i++) {
      const x = 1.5 + Math.random() * 0.4;
      const y = 0.9 + Math.random() * 0.3;
      const z = (Math.random() - 0.5) * 0.2;
      positions.push(x, y, z);
    }

    // Legs (4 legs with running motion built in)
    for (let leg = 0; leg < 4; leg++) {
      const legX = leg < 2 ? -0.6 : 0.6;
      const legZ = leg % 2 === 0 ? 0.2 : -0.2;
      for (let i = 0; i < count * 0.05; i++) {
        const x = legX + (Math.random() - 0.5) * 0.2;
        const y = -0.4 - Math.random() * 0.8;
        const z = legZ + (Math.random() - 0.5) * 0.1;
        positions.push(x, y, z);
      }
    }

    // Tail
    for (let i = 0; i < count * 0.1; i++) {
      const x = -1.2 - Math.random() * 0.6;
      const y = 0.2 + (Math.random() - 0.5) * 0.4;
      const z = (Math.random() - 0.5) * 0.3;
      positions.push(x, y, z);
    }

    // Mane
    for (let i = 0; i < count * 0.05; i++) {
      const x = 0.8 + Math.random() * 0.5;
      const y = 0.5 + Math.random() * 0.5;
      const z = (Math.random() - 0.5) * 0.2;
      positions.push(x, y, z);
    }

    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Running animation - bobbing up and down
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 8) * 0.1;
      // Slight rotation for dynamic feel
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 8) * 0.05;
    }
  });

  return (
    <group position={[2, 0, 0]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c9a962"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
    </group>
  );
}

// Dust particles behind the horse
function DustTrail() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = -2 - Math.random() * 4;
      positions[i * 3 + 1] = -0.5 + (Math.random() - 0.5) * 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 500; i++) {
        positions[i * 3] -= 0.02;
        if (positions[i * 3] < -6) {
          positions[i * 3] = -2;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a88b4a"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

// Floating geometric shapes
function FloatingBuildings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, 0, -5]}>
      {/* Building 1 */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-4, 1, 0]}>
          <boxGeometry args={[0.5, 2, 0.5]} />
          <meshBasicMaterial color="#c9a962" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* Building 2 */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-3, 0.5, 1]}>
          <boxGeometry args={[0.4, 1.5, 0.4]} />
          <meshBasicMaterial color="#c9a962" wireframe transparent opacity={0.25} />
        </mesh>
      </Float>

      {/* Building 3 */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[4, 1.5, -1]}>
          <boxGeometry args={[0.6, 2.5, 0.6]} />
          <meshBasicMaterial color="#c9a962" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* Pyramid */}
      <Float speed={1} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh position={[3, 0, 2]}>
          <coneGeometry args={[1, 1.5, 4]} />
          <meshBasicMaterial color="#c9a962" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

// Star field background
function StarField() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Golden ring portal
function GoldenPortal() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <torusGeometry args={[3, 0.05, 16, 100]} />
      <meshBasicMaterial color="#c9a962" transparent opacity={0.4} />
    </mesh>
  );
}

// Energy lines
function EnergyLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, i) => {
        (child as THREE.Mesh).position.x = Math.sin(state.clock.elapsedTime + i) * 0.5;
      });
    }
  });

  return (
    <group ref={linesRef} position={[-3, 0, 0]}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, (i - 2) * 0.3, 0]}>
          <boxGeometry args={[4, 0.02, 0.02]} />
          <meshBasicMaterial color="#c9a962" transparent opacity={0.3 + i * 0.1} />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <StarField />
        <HorseParticles />
        <DustTrail />
        <FloatingBuildings />
        <GoldenPortal />
        <EnergyLines />
      </Canvas>
    </div>
  );
}
