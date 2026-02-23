"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// Floating particles for cards
function CardParticles({ color = "#c9a962", count = 100 }) {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Floating geometric shape
function FloatingShape({ shape = "box", position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "icosahedron":
        return <icosahedronGeometry args={[0.5, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.5, 0]} />;
      case "torus":
        return <torusGeometry args={[0.4, 0.15, 8, 20]} />;
      case "cone":
        return <coneGeometry args={[0.4, 0.8, 4]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.5, 0]} />;
      default:
        return <boxGeometry args={[0.6, 0.6, 0.6]} />;
    }
  }, [shape]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        {geometry}
        <meshBasicMaterial
          color="#c9a962"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

// Orbiting ring
function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.2, 0.02, 8, 50]} />
      <meshBasicMaterial color="#c9a962" transparent opacity={0.3} />
    </mesh>
  );
}

// Energy sphere
function EnergySphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color="#c9a962" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

// Different card background variants
export function Card3DConstruction() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <CardParticles count={80} />
      <FloatingShape shape="box" position={[0.5, 0, 0]} />
      <FloatingShape shape="cone" position={[-0.5, -0.3, 0]} />
      <OrbitRing />
    </Canvas>
  );
}

export function Card3DDesign() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <CardParticles count={100} />
      <FloatingShape shape="icosahedron" position={[0, 0, 0]} />
      <OrbitRing />
    </Canvas>
  );
}

export function Card3DSustainable() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <CardParticles count={120} color="#4ade80" />
      <FloatingShape shape="dodecahedron" position={[0, 0, 0]} />
      <EnergySphere />
    </Canvas>
  );
}

export function Card3DCommercial() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <CardParticles count={60} />
      <FloatingShape shape="box" position={[0.3, 0.2, 0]} />
      <FloatingShape shape="box" position={[-0.3, -0.2, 0]} />
    </Canvas>
  );
}

export function Card3DResidential() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <CardParticles count={80} />
      <FloatingShape shape="cone" position={[0, 0.2, 0]} />
      <OrbitRing />
    </Canvas>
  );
}

export function Card3DManagement() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <CardParticles count={70} />
      <FloatingShape shape="octahedron" position={[0, 0, 0]} />
      <OrbitRing />
    </Canvas>
  );
}

export function Card3DArchitecture() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <CardParticles count={90} />
      <FloatingShape shape="torus" position={[0, 0, 0]} />
      <EnergySphere />
    </Canvas>
  );
}

export function Card3DRenovation() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <CardParticles count={100} />
      <FloatingShape shape="icosahedron" position={[0.3, 0, 0]} />
      <FloatingShape shape="box" position={[-0.3, 0, 0]} />
    </Canvas>
  );
}

export function Card3DLand() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <CardParticles count={150} color="#c9a962" />
      <FloatingShape shape="dodecahedron" position={[0, 0, 0]} />
      <OrbitRing />
      <EnergySphere />
    </Canvas>
  );
}

// Generic card background
export default function Card3DBackground({ variant = 0 }) {
  const variants = [
    Card3DConstruction,
    Card3DDesign,
    Card3DSustainable,
    Card3DCommercial,
    Card3DResidential,
    Card3DManagement,
    Card3DArchitecture,
    Card3DRenovation,
    Card3DLand,
  ];

  const Component = variants[variant % variants.length];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: "none",
      }}
    >
      <Component />
    </div>
  );
}
