"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../content-database.json";

gsap.registerPlugin(ScrollTrigger);

export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const { leadership, statistics } = data;
  const leader = leadership[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image wrapper animation
      gsap.from(".leader-image-wrapper", {
        scrollTrigger: {
          trigger: ".leadership-v2-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -100,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
      });

      // Badge pop in
      gsap.from(".leader-exp-badge", {
        scrollTrigger: {
          trigger: ".leader-image-wrapper",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        delay: 0.6,
        ease: "back.out(1.7)",
      });

      // Quick stats slide up
      gsap.from(".quick-stat", {
        scrollTrigger: {
          trigger: ".leader-quick-stats",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Content side stagger
      const contentElements = gsap.utils.toArray(".leader-content-side > *");
      gsap.from(contentElements, {
        scrollTrigger: {
          trigger: ".leader-content-side",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Credentials items
      gsap.from(".cred-item", {
        scrollTrigger: {
          trigger: ".leader-credentials",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Achievement slide in
      gsap.from(".leader-achievement", {
        scrollTrigger: {
          trigger: ".leader-achievement",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="leadership-v2" id="leadership" ref={sectionRef}>
      <div className="container">
        <div className="leadership-v2-grid">
          {/* Image Side */}
          <div className="leader-image-side">
            <div className="leader-image-wrapper">
              <img
                src="/experience.d1be152f64d97a42f231.jpg"
                alt={leader.name}
                className="leader-photo"
              />
              <div className="leader-image-overlay"></div>

              {/* Experience Badge */}
              <div className="leader-exp-badge">
                <span className="exp-since">Since</span>
                <span className="exp-year">{leader.since}</span>
              </div>
            </div>

            {/* Stats under image */}
            <div className="leader-quick-stats">
              <div className="quick-stat">
                <span className="qs-number">{statistics.development_value}</span>
                <span className="qs-label">Portfolio Value</span>
              </div>
              <div className="quick-stat">
                <span className="qs-number">{leader.experience_years}</span>
                <span className="qs-label">Years Leading</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="leader-content-side">
            <div className="leader-label">
              <span className="label-line"></span>
              <span>Leadership</span>
            </div>

            <h2 className="leader-headline">
              Guided by <span>Experience</span> & Vision
            </h2>

            <div className="leader-info">
              <h3 className="leader-name">{leader.name}</h3>
              <p className="leader-position">{leader.title}</p>
            </div>

            <p className="leader-bio">
              At the forefront of our leadership is Marwa, a seasoned expert and pioneer in the UAE&apos;s property development sector since 2001. Her experience spans the full project lifecycle—from site selection and feasibility analysis to financial modeling, acquisition, master planning, design management, and tendering. Over her career, she has led and coordinated developments with a combined value exceeding AED 5 billion.
            </p>

            {/* Credentials */}
            <div className="leader-credentials">
              <span className="cred-title">Credentials</span>
              <div className="cred-list">
                <div className="cred-item">
                  <span className="cred-dot"></span>
                  <span>Degree in Architectural Engineering</span>
                </div>
                <div className="cred-item">
                  <span className="cred-dot"></span>
                  <span>Certified PMP</span>
                </div>
                <div className="cred-item">
                  <span className="cred-dot"></span>
                  <span>Master&apos;s in Project Management from the American Academy, U.S.A.</span>
                </div>
              </div>
            </div>

            {/* Achievement */}
            <div className="leader-achievement">
              <div className="achievement-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div className="achievement-content">
                <span className="achievement-label">Key Achievement</span>
                <span className="achievement-value">Led developments exceeding AED 5B+ combined value</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
