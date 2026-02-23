"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSmooth() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations after loader
      const tl = gsap.timeline({ delay: 2.6 });

      // Image entrance - zoom from far
      tl.from(".hero-image-3d", {
        scale: 0.5,
        opacity: 0,
        rotateX: 20,
        z: -500,
        duration: 1.5,
        ease: "power4.out",
      });

      // Title entrance
      tl.from(".hero-main-title span", {
        y: 100,
        opacity: 0,
        rotateX: -45,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      }, "-=1");

      // Subtitle
      tl.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

      // Buttons
      tl.from(".hero-cta a", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.15,
      }, "-=0.4");

      // Floating animation for image
      gsap.to(".hero-image-3d", {
        y: -15,
        rotateY: 3,
        rotateX: 2,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Mouse move parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 2;
        const y = (clientY / innerHeight - 0.5) * 2;

        gsap.to(".hero-image-3d", {
          rotateY: x * 10,
          rotateX: -y * 8,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // SCROLL 3D EFFECT - Pinned until complete
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Image 3D zoom towards viewer
      scrollTl.to(".hero-image-3d", {
        scale: 2.5,
        z: 600,
        rotateX: 10,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      }, 0);

      // Glow expands
      scrollTl.to(".image-glow", {
        scale: 3,
        opacity: 0,
        duration: 1,
      }, 0);

      // Content fades up
      scrollTl.to(".hero-text-content", {
        y: -100,
        opacity: 0,
        duration: 0.5,
      }, 0.2);

      // Background zooms
      scrollTl.to(".hero-bg", {
        scale: 1.3,
        duration: 1,
      }, 0);

      // Particles fly
      scrollTl.to(".float-particle", {
        y: -500,
        opacity: 0,
        stagger: 0.02,
        duration: 0.8,
      }, 0.1);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hero-3d">
      {/* Background */}
      <div className="hero-bg"></div>

      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="hero-inner">
        {/* 3D Image */}
        <div className="hero-image-wrapper">
          <div className="image-glow"></div>
          <div className="hero-image-3d">
            <Image
              src="/MA VISION 02.png"
              alt="MA Vision"
              width={600}
              height={600}
              priority
              className="main-img"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="hero-text-content">
          <h1 className="hero-main-title">
            <span>B</span><span>U</span><span>I</span><span>L</span><span>D</span><span>I</span><span>N</span><span>G</span>
            <br />
            <span className="gold">D</span><span className="gold">R</span><span className="gold">E</span><span className="gold">A</span><span className="gold">M</span><span className="gold">S</span>
          </h1>
          <p className="hero-sub">Transforming Visions Into Reality</p>
          <div className="hero-cta">
            <a href="#projects" className="cta-primary">
              Explore Projects
              <span className="arrow">→</span>
            </a>
            <a href="#contact" className="cta-secondary">Contact Us</a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-down">
        <span>Scroll</span>
        <div className="scroll-bar">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </div>
  );
}
