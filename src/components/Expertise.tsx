"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../content-database.json";

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { expertise_areas, core_values } = data;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".exp-header", {
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: ".exp-grid",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 80,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
          });

          // Hover effect
          const handleMouseEnter = () => {
            gsap.to(card, {
              y: -10,
              scale: 1.03,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);
        }
      });

      // Core values bar animation
      gsap.from(".cv-bar", {
        scrollTrigger: {
          trigger: ".cv-bar",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      // Core value items stagger
      gsap.from(".cv-item", {
        scrollTrigger: {
          trigger: ".cv-bar",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 30,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.3,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="exp-section" id="expertise" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="exp-header">
          <span className="exp-tag">OUR EXPERTISE</span>
          <h2 className="exp-title">What We <span>Excel</span> At</h2>
        </div>

        {/* 4 Expertise Cards */}
        <div className="exp-grid">
          {expertise_areas.map((area, index) => (
            <div
              className="exp-card"
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
            >
              <span className="exp-card-num">0{index + 1}</span>
              <h4 className="exp-card-title">{area}</h4>
            </div>
          ))}
        </div>

        {/* Core Values Bar */}
        <div className="cv-bar">
          <div className="cv-label">
            <span>BUILT ON</span>
            <strong>Our Core Values</strong>
          </div>
          <div className="cv-list">
            {core_values.map((value, index) => (
              <div className="cv-item" key={index}>
                <span className="cv-diamond">◆</span>
                <span className="cv-text">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
