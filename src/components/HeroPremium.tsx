"use client";

import { useEffect, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../content-database.json";

gsap.registerPlugin(ScrollTrigger);

// Burj Khalifa Style Tower
function BurjKhalifa({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.005;
      groupRef.current.scale.y = scale;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Base section */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 1.6, 3]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Middle sections - stepped */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 1.2, 3]} />
        <meshStandardMaterial color="#2a4a6f" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[0, 3.3, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 3]} />
        <meshStandardMaterial color="#3a5a7f" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[0, 4.2, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.8, 3]} />
        <meshStandardMaterial color="#4a6a8f" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[0, 4.9, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 0.6, 3]} />
        <meshStandardMaterial color="#5a7a9f" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Spire */}
      <mesh position={[0, 5.7, 0]}>
        <coneGeometry args={[0.08, 1, 8]} />
        <meshStandardMaterial color="#c9a962" metalness={1} roughness={0} emissive="#c9a962" emissiveIntensity={0.5} />
      </mesh>

      {/* Window lights */}
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * 0.8) * 0.3,
          0.3 + i * 0.12,
          Math.sin(i * 0.8) * 0.3
        ]} scale={0.03}>
          <boxGeometry />
          <meshBasicMaterial color="#c9a962" transparent opacity={0.6 + Math.random() * 0.4} />
        </mesh>
      ))}
    </group>
  );
}

// Modern Glass Tower
function GlassTower({ position, height, width }: { position: [number, number, number], height: number, width: number }) {
  const glassRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glassRef.current) {
      const material = glassRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Core */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, width * 0.8]} />
        <meshStandardMaterial color="#0a1525" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glass facade */}
      <mesh ref={glassRef} position={[0, height / 2, width * 0.41]}>
        <boxGeometry args={[width * 0.95, height * 0.98, 0.02]} />
        <meshStandardMaterial
          color="#4a8ab0"
          metalness={0.98}
          roughness={0.02}
          transparent
          opacity={0.85}
          emissive="#c9a962"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Floor lines */}
      {Array.from({ length: Math.floor(height * 4) }).map((_, i) => (
        <mesh key={i} position={[0, 0.15 + i * 0.25, width * 0.42]}>
          <boxGeometry args={[width * 0.98, 0.015, 0.01]} />
          <meshStandardMaterial color="#c9a962" metalness={0.9} emissive="#c9a962" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Crown */}
      <mesh position={[0, height + 0.15, 0]}>
        <boxGeometry args={[width * 0.7, 0.3, width * 0.5]} />
        <meshStandardMaterial color="#c9a962" metalness={0.95} roughness={0.1} emissive="#c9a962" emissiveIntensity={0.4} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, height + 0.6, 0]}>
        <cylinderGeometry args={[0.02, 0.04, 0.6, 8]} />
        <meshStandardMaterial color="#c9a962" metalness={1} emissive="#c9a962" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// Curved Tower (like Cayan Tower)
function TwistedTower({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={i} position={[0, i * 0.25, 0]} rotation={[0, i * 0.08, 0]}>
          <boxGeometry args={[0.5, 0.25, 0.35]} />
          <meshStandardMaterial
            color="#1a3050"
            metalness={0.95}
            roughness={0.05}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      {/* Top glow */}
      <mesh position={[0, 3.9, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#c9a962" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// Sail Tower (like Burj Al Arab style)
function SailTower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main sail shape */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.8, 3, 4]} />
        <meshStandardMaterial
          color="#1e3a5f"
          metalness={0.9}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner structure */}
      <mesh position={[0, 1.5, 0.2]}>
        <coneGeometry args={[0.6, 2.8, 4]} />
        <meshStandardMaterial
          color="#4a8ab0"
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.7}
          emissive="#c9a962"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 1, 0.3, 32]} />
        <meshStandardMaterial color="#c9a962" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Dubai Skyline Composition
function DubaiSkyline() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Main Burj Khalifa */}
      <BurjKhalifa position={[0, 0, 0]} />

      {/* Surrounding towers */}
      <GlassTower position={[-2, 0, 0.5]} height={3.5} width={0.8} />
      <GlassTower position={[2.2, 0, 0.3]} height={3} width={0.7} />
      <GlassTower position={[-3.5, 0, -0.5]} height={2.5} width={0.6} />
      <GlassTower position={[3.8, 0, -0.3]} height={2.8} width={0.65} />

      {/* Twisted tower */}
      <TwistedTower position={[1.2, 0, 1]} />

      {/* Sail tower */}
      <SailTower position={[-1.5, 0, 1.5]} />

      {/* Background buildings */}
      <GlassTower position={[-1, 0, -2]} height={2} width={0.5} />
      <GlassTower position={[1.5, 0, -1.8]} height={2.2} width={0.55} />
      <GlassTower position={[-2.8, 0, -1.5]} height={1.8} width={0.45} />
      <GlassTower position={[3, 0, -1.2]} height={1.5} width={0.4} />
    </group>
  );
}

// Animated Crane
function ConstructionCrane() {
  const armRef = useRef<THREE.Group>(null);
  const hookRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(t * 0.25) * 0.4;
    }
    if (hookRef.current) {
      hookRef.current.position.x = Math.sin(t * 0.25) * 2.5;
      hookRef.current.position.y = -1.2 + Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group position={[5.5, -1.5, 2]}>
      {/* Tower */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[0.2, 7, 0.2]} />
        <meshStandardMaterial color="#c9a962" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Arm */}
      <group ref={armRef} position={[0, 6.5, 0]}>
        <mesh position={[-2.5, 0, 0]}>
          <boxGeometry args={[5.5, 0.15, 0.15]} />
          <meshStandardMaterial color="#c9a962" metalness={0.8} />
        </mesh>
        <mesh position={[1, 0, 0]}>
          <boxGeometry args={[1.5, 0.12, 0.12]} />
          <meshStandardMaterial color="#c9a962" metalness={0.8} />
        </mesh>
        <mesh position={[1.6, -0.15, 0]}>
          <boxGeometry args={[0.4, 0.3, 0.3]} />
          <meshStandardMaterial color="#444" metalness={0.5} />
        </mesh>

        {/* Hook */}
        <group ref={hookRef} position={[-3.5, 0, 0]}>
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 1, 8]} />
            <meshStandardMaterial color="#222" />
          </mesh>
          <mesh position={[0, -1.2, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.08]} />
            <meshStandardMaterial color="#c9a962" metalness={0.9} />
          </mesh>
          {/* Lifted panel */}
          <mesh position={[0, -1.5, 0]}>
            <boxGeometry args={[0.5, 0.3, 0.05]} />
            <meshStandardMaterial color="#4a8ab0" metalness={0.9} transparent opacity={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// City lights particles
function CityLights() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      // Distribute in city area
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = Math.random() * 6 - 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c9a962"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// Orbiting energy rings
function EnergyRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.15;
      ring1.current.rotation.z = t * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.12;
      ring2.current.rotation.x = Math.PI / 4;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.18;
      ring3.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group position={[0, 2, 0]}>
      <mesh ref={ring1}>
        <torusGeometry args={[7, 0.02, 16, 100]} />
        <meshStandardMaterial color="#c9a962" metalness={1} emissive="#c9a962" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[8, 0.015, 16, 100]} />
        <meshStandardMaterial color="#d4b87a" metalness={1} transparent opacity={0.6} emissive="#c9a962" emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[9, 0.01, 16, 100]} />
        <meshStandardMaterial color="#a88b4a" metalness={1} transparent opacity={0.4} emissive="#c9a962" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

// Reflective ground with city grid
function CityGround() {
  return (
    <group position={[0, -1.5, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#050510" metalness={0.95} roughness={0.05} />
      </mesh>
      <gridHelper args={[50, 100, "#c9a962", "#0a0a15"]} position={[0, 0.01, 0]} />

      {/* Road lines */}
      <mesh position={[0, 0.02, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 20]} />
        <meshBasicMaterial color="#c9a962" transparent opacity={0.3} />
      </mesh>
      <mesh position={[5, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.1, 20]} />
        <meshBasicMaterial color="#c9a962" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Floating architectural elements
function FloatingElements() {
  const elements = [
    { pos: [-6, 4, -4] as [number, number, number], scale: 0.35 },
    { pos: [7, 3, -3] as [number, number, number], scale: 0.3 },
    { pos: [-5, 1, 5] as [number, number, number], scale: 0.25 },
    { pos: [6, 5, 2] as [number, number, number], scale: 0.28 },
    { pos: [-4, 6, -2] as [number, number, number], scale: 0.22 },
    { pos: [5, 2, 4] as [number, number, number], scale: 0.2 },
  ];

  return (
    <>
      {elements.map((el, i) => (
        <Float key={i} speed={1.2 + i * 0.15} rotationIntensity={1.2} floatIntensity={1}>
          <mesh position={el.pos} scale={el.scale}>
            {i % 3 === 0 ? (
              <octahedronGeometry args={[1]} />
            ) : i % 3 === 1 ? (
              <tetrahedronGeometry args={[1]} />
            ) : (
              <icosahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial
              color="#c9a962"
              metalness={0.95}
              roughness={0.05}
              wireframe
              emissive="#c9a962"
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// Main Scene
function Scene({ scrollProgress }: { scrollProgress: { current: { value: number } } }) {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (sceneRef.current) {
      const progress = scrollProgress.current.value;
      sceneRef.current.position.z = progress * -12;
      sceneRef.current.rotation.x = progress * 0.35;
      sceneRef.current.scale.setScalar(1 + progress * 1.5);
    }
  });

  return (
    <>
      {/* Dramatic lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[15, 20, 15]} intensity={3} color="#ffffff" />
      <pointLight position={[-15, 15, -15]} intensity={2} color="#c9a962" />
      <pointLight position={[0, -5, 15]} intensity={1} color="#4a8ab0" />
      <spotLight
        position={[0, 25, 0]}
        intensity={2}
        angle={0.4}
        penumbra={1}
        color="#c9a962"
      />
      <pointLight position={[0, 8, 0]} intensity={1.5} color="#c9a962" />

      {/* Atmosphere */}
      <Sparkles count={300} scale={30} size={4} speed={0.3} color="#c9a962" opacity={0.6} />
      <fog attach="fog" args={['#050510', 15, 40]} />

      <group ref={sceneRef}>
        <DubaiSkyline />
        <ConstructionCrane />
      </group>

      <CityGround />
      <CityLights />
      <EnergyRings />
      <FloatingElements />
    </>
  );
}

export default function HeroPremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef({ value: 0 });
  const { statistics, company } = data;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.5 });

      tl.from(".hero-brand", { opacity: 0, y: -30, duration: 1, ease: "power3.out" });
      tl.from(".title-line", { opacity: 0, y: 100, rotateX: -45, duration: 1.2, ease: "power4.out", stagger: 0.15 }, "-=0.5");
      tl.from(".hero-tagline", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" }, "-=0.6");
      tl.from(".hero-actions a", { opacity: 0, y: 20, duration: 0.6, ease: "back.out(1.7)", stagger: 0.15 }, "-=0.4");
      tl.from(".hero-stats", { opacity: 0, y: 50, duration: 0.8, ease: "power3.out" }, "-=0.5");

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          scrollProgress.current.value = self.progress;
          gsap.to(".hero-content-3d", { opacity: 1 - self.progress * 1.5, y: -self.progress * 150, scale: 1 - self.progress * 0.3 });
          gsap.to(".hero-stats", { opacity: 1 - self.progress * 2, y: self.progress * 100 });
          gsap.to(".scroll-vignette", { opacity: self.progress });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-premium">
      <div className="hero-canvas-wrapper">
        <Canvas camera={{ position: [8, 4, 12], fov: 40 }} shadows>
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero-overlay-gradient"></div>

      <div className="hero-content-3d">
        <div className="container">
          <div className="hero-brand">
            <span className="brand-diamond">◆</span>
            <span>PREMIUM DEVELOPMENT</span>
          </div>

          <div className="hero-title-3d">
            <div className="title-line title-line-1"><span className="gold">MA</span><span className="gold">VISION</span></div>
            <div className="title-line title-line-2">
              <span className="outline">BUILDING</span>
              <span>DREAMS</span>
            </div>
            <div className="title-line title-line-3"><span>INTO REALITY</span></div>
          </div>

          <p className="hero-tagline">{company.headquarters}&apos;s Premier {company.industry} Company</p>

          <div className="hero-actions">
            <a href="#projects" className="btn-gold-premium">
              <span>View Portfolio</span>
              <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn-outline-premium">Schedule Consultation</a>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat"><span className="stat-num">{statistics.projects_completed}</span><span className="stat-txt">Iconic Projects</span></div>
        <div className="stat-line"></div>
        <div className="stat"><span className="stat-num">{statistics.years_experience}</span><span className="stat-txt">Years Excellence</span></div>
        <div className="stat-line"></div>
        <div className="stat"><span className="stat-num">{statistics.development_value}</span><span className="stat-txt">Portfolio Value</span></div>
      </div>

      <div className="scroll-hint-3d">
        <span>Scroll</span>
        <div className="scroll-bar"><div className="scroll-fill"></div></div>
      </div>

      <div className="scroll-vignette"></div>
    </section>
  );
}
