"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

// Dynamic import for 3D scene
const Hero3DScene = dynamic(() => import("./Hero3DScene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroTunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scene3DRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wait for loader to complete
      const startDelay = 2.5;

      // Initial content animation
      gsap.from(".hero-title-tunnel", {
        opacity: 0,
        y: 100,
        rotationX: 45,
        duration: 1.2,
        delay: startDelay,
        ease: "power4.out",
      });

      gsap.from(".hero-subtitle-tunnel", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: startDelay + 0.3,
        ease: "power3.out",
      });

      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: startDelay + 0.5,
        ease: "power3.out",
      });

      gsap.from(".scene-3d-wrapper", {
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        delay: startDelay + 0.2,
        ease: "power3.out",
      });

      // Tunnel scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Zoom content into the screen
      tl.to(contentRef.current, {
        scale: 3,
        opacity: 0,
        z: 1000,
        duration: 1,
        ease: "power2.in",
      }, 0);

      // 3D scene zooms and fades
      tl.to(".scene-3d-wrapper", {
        scale: 2,
        opacity: 0,
        z: 500,
        duration: 1,
        ease: "power2.in",
      }, 0);

      // Animate tunnel rings
      tl.to(".tunnel-ring", {
        scale: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.in",
      }, 0);

      // Move through the tunnel layers
      tl.to(".tunnel-layer", {
        z: 2000,
        scale: 5,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power2.in",
      }, 0);

      // Particles accelerate
      tl.to(".tunnel-particle", {
        y: "-200vh",
        scale: 3,
        opacity: 0,
        stagger: {
          each: 0.02,
          from: "random",
        },
        duration: 1,
        ease: "power2.in",
      }, 0);

      // Speed lines appear
      tl.fromTo(".speed-line",
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, stagger: 0.05, duration: 0.3, ease: "power2.out" },
        0.3
      );

      tl.to(".speed-line", {
        y: "-100vh",
        opacity: 0,
        stagger: 0.02,
        duration: 0.5,
        ease: "power2.in",
      }, 0.5);

      // Final flash effect
      tl.to(".tunnel-flash", {
        opacity: 1,
        duration: 0.1,
      }, 0.9);

      tl.to(".tunnel-flash", {
        opacity: 0,
        duration: 0.2,
      }, 1);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generate elements
  const rings = Array.from({ length: 8 }, (_, i) => i);
  const layers = Array.from({ length: 12 }, (_, i) => i);
  const particles = Array.from({ length: 50 }, (_, i) => i);
  const speedLines = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div ref={containerRef} className="hero-tunnel-container">
      {/* 3D Scene with Horse */}
      <div className="scene-3d-wrapper" ref={scene3DRef}>
        <Hero3DScene />
      </div>

      {/* Tunnel effect layers */}
      <div className="tunnel-wrapper">
        {/* Concentric rings */}
        <div className="tunnel-rings">
          {rings.map((i) => (
            <div
              key={`ring-${i}`}
              className="tunnel-ring"
              style={{
                width: `${(i + 1) * 15}vw`,
                height: `${(i + 1) * 15}vh`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Depth layers */}
        <div className="tunnel-layers">
          {layers.map((i) => (
            <div
              key={`layer-${i}`}
              className="tunnel-layer"
              style={{
                transform: `translateZ(${-i * 100}px) scale(${1 + i * 0.1})`,
                opacity: 1 - i * 0.08,
              }}
            />
          ))}
        </div>

        {/* Flying particles */}
        <div className="tunnel-particles">
          {particles.map((i) => (
            <div
              key={`particle-${i}`}
              className="tunnel-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
              }}
            />
          ))}
        </div>

        {/* Speed lines */}
        <div className="speed-lines">
          {speedLines.map((i) => (
            <div
              key={`speed-${i}`}
              className="speed-line"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 30 + 20}vh`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="hero-content-tunnel" ref={contentRef}>
        <p className="hero-tagline">MA VISION DEVELOPMENTS</p>
        <h1 className="hero-title-tunnel">
          Building <span>Dreams</span>
          <br />
          Into Reality
        </h1>
        <p className="hero-subtitle-tunnel">
          Transforming visions into architectural masterpieces.
          <br />
          We create spaces that inspire and endure.
        </p>
        <div className="hero-buttons d-flex gap-3 justify-content-center flex-wrap">
          <a href="#projects" className="btn-primary-custom">
            Explore Projects
          </a>
          <a href="#contact" className="btn-outline-custom">
            Get In Touch
          </a>
        </div>

        <div className="scroll-text">
          <span>Scroll to Enter</span>
          <div className="scroll-arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Flash effect */}
      <div className="tunnel-flash"></div>
    </div>
  );
}
