"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c9a962"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -2]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial
        color="#c9a962"
        wireframe={true}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      meshRef.current.position.y =
        Math.cos(state.clock.elapsedTime * 0.4) * 0.3 - 1;
    }
  });

  return (
    <mesh ref={meshRef} position={[-3, -1, -3]}>
      <torusGeometry args={[1, 0.3, 16, 50]} />
      <meshBasicMaterial
        color="#c9a962"
        wireframe={true}
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
      meshRef.current.position.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.5 + 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 2, -4]}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshBasicMaterial
        color="#c9a962"
        wireframe={true}
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

export default function Hero3DBackground() {
  return (
    <div
      className="hero-bg-3d"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingGeometry />
        <FloatingTorus />
        <FloatingOctahedron />
      </Canvas>
    </div>
  );
}
