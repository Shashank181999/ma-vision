"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../content-database.json";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { services } = data;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-header", {
        scrollTrigger: {
          trigger: ".services-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
          });

          const handleMouseEnter = () => {
            gsap.to(card, {
              y: -8,
              borderColor: "rgba(201, 169, 98, 0.4)",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              borderColor: "rgba(201, 169, 98, 0.1)",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="container">
        <div className="services-header">
          <span className="section-tag">WHAT WE DO</span>
          <h2 className="services-heading">
            Our <span>Services</span>
          </h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              className="service-item"
              key={service.id}
              ref={(el) => { cardsRef.current[index] = el; }}
            >
              <span className="service-icon">{service.icon}</span>
              <h4 className="service-title">{service.title}</h4>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
