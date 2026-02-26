"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../content-database.json";

gsap.registerPlugin(ScrollTrigger);

export default function HeroPremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { statistics } = data;
  const animationStarted = useRef(false);

  // Handle anchor link clicks with smooth scrolling
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    let ctx: gsap.Context;

    const startAnimations = () => {
      if (animationStarted.current) return;
      animationStarted.current = true;

      // Add ready class to make elements visible
      contentRef.current?.classList.add('ready');
      scrollRef.current?.classList.add('ready');

      ctx = gsap.context(() => {
        // Simple smooth fade in for all hero content
        gsap.to(".hero-left-content", {
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        });
        gsap.to(".hero-scroll-down", {
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out"
        });

        // Only apply scroll parallax effects on desktop
        if (!isMobile) {
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
        }
      }, containerRef);
    };

    // Always wait for loader to complete before starting animations
    window.addEventListener('loaderComplete', startAnimations);

    return () => {
      window.removeEventListener('loaderComplete', startAnimations);
      if (ctx) ctx.revert();
    };
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
      <div ref={contentRef} className="hero-left-content">
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
          <a
            href="#projects"
            className="btn-primary-hero"
            onClick={(e) => handleAnchorClick(e, 'projects')}
          >
            <span>View Projects</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
            </svg>
          </a>
          <a
            href="#contact"
            className="btn-outline-hero"
            onClick={(e) => handleAnchorClick(e, 'contact')}
          >
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
      <div ref={scrollRef} className="hero-scroll-down">
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
