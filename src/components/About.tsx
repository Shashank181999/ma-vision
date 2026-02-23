"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../content-database.json";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { about, statistics } = data;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-image-box", {
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 80%",
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-content-box", {
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 80%",
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-stat-item", {
        scrollTrigger: {
          trigger: ".about-stats",
          start: "top 85%",
        },
        opacity: 0,
        y: 25,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-contained" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          <div className="about-image-box">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
              alt="Modern Architecture"
              className="about-image"
            />
            <div className="about-logo-overlay">
              <img src="/MA_VISION_02-removebg-preview.png" alt="MA Vision" />
            </div>
            <div className="about-image-badge">
              <span>{statistics.years_experience}</span>
              <p>Years</p>
            </div>
          </div>

          <div className="about-content-box">
            <span className="about-tag">About Us</span>
            <h2 className="about-title">
              Building the Future of UAE Real Estate
            </h2>
            <p className="about-desc">
              {about.main_description}
            </p>
            <p className="about-desc secondary">
              {about.secondary_description}
            </p>
            <p className="about-desc light">
              {about.mission}
            </p>

            <div className="about-stats">
              <div className="about-stat-item">
                <span className="stat-value">{statistics.development_value}</span>
                <span className="stat-label">Development Value</span>
              </div>
              <div className="about-stat-item">
                <span className="stat-value">{statistics.projects_completed}</span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </div>

            <a href="#contact" className="about-btn">
              Get In Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
