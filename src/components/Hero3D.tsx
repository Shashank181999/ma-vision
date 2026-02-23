"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Main 3D Sphere with distortion
function MainSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#c9a962"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Orbiting rings
function OrbitRing({ radius, speed, color, thickness }: { radius: number; speed: number; color: string; thickness: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * speed;
      ringRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

// Floating particles using drei Points
function Particles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c9a962"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// Small floating cubes
function FloatingCubes() {
  const cubes = [
    { position: [-3, 2, -2] as [number, number, number], scale: 0.3 },
    { position: [3.5, -1.5, -1] as [number, number, number], scale: 0.25 },
    { position: [-2.5, -2, 1] as [number, number, number], scale: 0.2 },
    { position: [2, 2.5, -3] as [number, number, number], scale: 0.35 },
    { position: [-4, 0, -2] as [number, number, number], scale: 0.15 },
  ];

  return (
    <>
      {cubes.map((cube, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={1} floatIntensity={0.5}>
          <mesh position={cube.position} scale={cube.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#c9a962" wireframe transparent opacity={0.5} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// Camera controller for scroll
function CameraController({ scrollProgress }: { scrollProgress: React.MutableRefObject<{ value: number }> }) {
  const { camera } = useThree();

  useFrame(() => {
    const progress = scrollProgress.current.value;
    camera.position.z = 6 - progress * 8;
    camera.position.y = progress * 2;
    camera.rotation.x = progress * 0.3;
  });

  return null;
}

// 3D Scene
function Scene({ scrollProgress }: { scrollProgress: React.MutableRefObject<{ value: number }> }) {
  return (
    <>
      <CameraController scrollProgress={scrollProgress} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#c9a962" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Particles />
      <MainSphere />
      <OrbitRing radius={2.8} speed={0.3} color="#c9a962" thickness={0.02} />
      <OrbitRing radius={3.2} speed={-0.2} color="#a88b4a" thickness={0.015} />
      <OrbitRing radius={3.6} speed={0.15} color="#d4b87a" thickness={0.01} />
      <FloatingCubes />
    </>
  );
}

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef({ value: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial text animations
      const tl = gsap.timeline({ delay: 2.6 });

      tl.from(".hero-3d-title span", {
        y: 100,
        opacity: 0,
        rotateX: -60,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
      });

      tl.from(".hero-3d-sub", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

      tl.from(".hero-3d-btn", {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.12,
      }, "-=0.4");

      // Scroll animation - pinned
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current.value = self.progress;

          // Fade out content
          gsap.to(".hero-3d-content", {
            opacity: 1 - self.progress * 1.5,
            y: -self.progress * 150,
            scale: 1 - self.progress * 0.3,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hero-3d-section">
      {/* 3D Canvas */}
      <div className="canvas-wrapper">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="hero-3d-content">
        <h1 className="hero-3d-title">
          {"MAVISION".split("").map((char, i) => (
            <span key={i} className={i >= 2 && i <= 7 ? "gold" : ""}>
              {char}
            </span>
          ))}
        </h1>
        <p className="hero-3d-sub">Building Dreams Into Reality</p>
        <div className="hero-3d-buttons">
          <a href="#projects" className="hero-3d-btn primary">
            Explore Projects
            <span>→</span>
          </a>
          <a href="#contact" className="hero-3d-btn secondary">
            Contact Us
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator-3d">
        <span>Scroll to explore</span>
        <div className="scroll-line-3d">
          <div className="scroll-progress-3d"></div>
        </div>
      </div>
    </div>
  );
}
