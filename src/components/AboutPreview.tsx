"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../content-database.json";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { statistics, core_values } = data;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.from(".about-v3-image", {
        scrollTrigger: {
          trigger: ".about-v3-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -100,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
      });

      // Badge animation
      gsap.from(".about-v3-badge", {
        scrollTrigger: {
          trigger: ".about-v3-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
      });

      // Content stagger animation
      const contentElements = gsap.utils.toArray(".about-v3-content > *");
      gsap.from(contentElements, {
        scrollTrigger: {
          trigger: ".about-v3-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Values animation
      gsap.from(".value-item", {
        scrollTrigger: {
          trigger: ".about-v3-values",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Stats animation
      gsap.from(".stat-block", {
        scrollTrigger: {
          trigger: ".about-v3-stats",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-v3-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-v3-grid">
          {/* Image Side */}
          <div className="about-v3-image">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"
              alt="Modern Architecture"
            />
            <div className="about-v3-badge">
              <span className="badge-number">{statistics.years_experience}</span>
              <span className="badge-text">Years of Excellence</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="about-v3-content">
            <div className="about-v3-label">
              <span className="label-line"></span>
              <span>About Us</span>
            </div>

            <h2 className="about-v3-title">
              Building Opportunities, <span>Strengthening Communities</span>
            </h2>

            <p className="about-v3-text">
              MA VISION Developments takes pride in being one of the few homegrown professional development firms in the UAE, established in accordance with national regulations and built on a foundation of excellence, trust, and vision.
            </p>

            <p className="about-v3-text light">
              We specialize in project development, project management, cost consultancy, and strategic advisory services, supporting transformative projects that shape communities and elevate urban living.
            </p>

            {/* Values */}
            <div className="about-v3-values">
              {core_values.map((value, index) => (
                <div className="value-item" key={index}>
                  <span className="value-dot"></span>
                  <span>{value}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="about-v3-stats">
              <div className="stat-block">
                <span className="stat-number">{statistics.development_value}</span>
                <span className="stat-label">Development Value</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-block">
                <span className="stat-number">{statistics.projects_completed}</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-block">
                <span className="stat-number">{statistics.years_experience}</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>

            {/* Actions */}
            <div className="about-v3-actions">
              <Link href="/about" className="about-v3-btn primary">
                Discover Our Story
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                </svg>
              </Link>
              <a href="#contact" className="about-v3-btn secondary">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
