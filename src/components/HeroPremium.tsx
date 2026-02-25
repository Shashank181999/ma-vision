"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../content-database.json";

gsap.registerPlugin(ScrollTrigger);

export default function HeroPremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { statistics, company } = data;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(".hero-left-content", { opacity: 0, x: -60, duration: 1, ease: "power3.out" });
      tl.from(".hero-tagline", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.6");
      tl.from(".hero-title span", { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.4");
      tl.from(".hero-text", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4");
      tl.from(".hero-buttons a", { opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.3");
      tl.from(".hero-stat-box", { opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: "power3.out" }, "-=0.3");

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(".hero-video", { scale: 1 + self.progress * 0.08 });
          gsap.to(".hero-left-content", { y: self.progress * -60, opacity: 1 - self.progress * 1.3 });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-section-v2">
      {/* Video Background */}
      <div className="hero-video-bg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src="/MA VISION HORSE C77.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay-video"></div>
      </div>

      {/* Left solid background */}
      <div className="hero-overlay-left"></div>
      <div className="hero-overlay-bottom"></div>

      {/* Left Content */}
      <div className="hero-left-content">
        <div className="hero-tagline">
          <span className="tagline-icon">◆</span>
          <span>Premium Real Estate Development</span>
        </div>

        <h1 className="hero-title">
          <span className="title-line-1">Building</span>
          <span className="title-line-2">Excellence</span>
          <span className="title-line-3">& Vision</span>
        </h1>

        <p className="hero-text">
          MA VISION Developments is one of the UAE&apos;s leading homegrown professional development firms, built on a foundation of excellence, trust, and vision.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn-primary-hero">
            <span>View Projects</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
            </svg>
          </a>
          <a href="#contact" className="btn-outline-hero">
            Contact Us
          </a>
        </div>

        <div className="hero-stats-row">
          <div className="hero-stat-box">
            <span className="stat-num">{statistics.development_value}</span>
            <span className="stat-txt">Portfolio Value</span>
          </div>
          <div className="hero-stat-box">
            <span className="stat-num">{statistics.years_experience}</span>
            <span className="stat-txt">Years Experience</span>
          </div>
          <div className="hero-stat-box">
            <span className="stat-num">{statistics.projects_completed}</span>
            <span className="stat-txt">Projects</span>
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <div className="hero-scroll-down">
        <span>Scroll</span>
        <div className="scroll-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" />
          </svg>
        </div>
      </div>
    </section>
  );
}
