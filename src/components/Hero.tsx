"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        rotationX: 45,
        duration: 1.2,
        delay: 2.5, // Wait for loader
        ease: "power4.out",
      });

      // Mouse move 3D effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        gsap.to(titleRef.current, {
          rotationY: xPos,
          rotationX: -yPos,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} style={{ position: "relative", zIndex: 10 }}>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title" ref={titleRef}>
            Building <span>Dreams</span>
            <br />
            Into Reality
          </h1>
          <p className="hero-subtitle">
            Transforming visions into architectural masterpieces.
            We create spaces that inspire and endure.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <a href="#projects" className="btn-primary-custom">
              Explore Projects
            </a>
            <a href="#contact" className="btn-outline-custom">
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </div>
  );
}
