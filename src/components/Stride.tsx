"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Stride() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Control fixed background visibility
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => setIsVisible(true),
        onLeave: () => setIsVisible(false),
        onEnterBack: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });

      // Title animation
      gsap.from(".stride-heading", {
        scrollTrigger: {
          trigger: ".stride-content-inner",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Accent line
      gsap.from(".stride-line", {
        scrollTrigger: {
          trigger: ".stride-content-inner",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scaleX: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      // Description
      gsap.from(".stride-text", {
        scrollTrigger: {
          trigger: ".stride-content-inner",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stride-section-new" ref={sectionRef}>
      {/* Fixed Background */}
      <div className={`stride-bg-fixed ${isVisible ? 'visible' : ''}`}>
        <img
          src="/stride.05438c1efd4803d1b82d.jpg"
          alt="MA Vision Stride"
        />
      </div>

      {/* Content */}
      <div className="stride-content-inner">
        <span className="stride-tag">OUR PHILOSOPHY</span>
        <h2 className="stride-heading">OUR STRIDE</h2>
        <div className="stride-line"></div>
        <p className="stride-text">
          We move with purpose, igniting creativity and championing lasting,
          positive change across the communities we shape.
        </p>
      </div>
    </section>
  );
}
