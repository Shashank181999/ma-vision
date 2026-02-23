"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../content-database.json";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { projects } = data;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 100,
            scale: 0.9,
            duration: 1,
            delay: (index % 3) * 0.1,
            ease: "power3.out",
          });

          const handleMouseEnter = () => {
            gsap.to(card, {
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out",
            });
            const image = card.querySelector(".project-image");
            if (image) {
              gsap.to(image, { scale: 1.1, duration: 0.4, ease: "power2.out" });
            }
            const overlay = card.querySelector(".project-overlay");
            if (overlay) {
              gsap.to(overlay, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
            const image = card.querySelector(".project-image");
            if (image) {
              gsap.to(image, { scale: 1, duration: 0.4, ease: "power2.out" });
            }
            const overlay = card.querySelector(".project-overlay");
            if (overlay) {
              gsap.to(overlay, { y: 30, opacity: 0.8, duration: 0.4, ease: "power2.out" });
            }
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="section-title projects-title">
              Featured <span>Projects</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Explore our portfolio of exceptional developments that showcase
              our commitment to quality and innovation.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {projects.map((project, index) => (
            <div className="col-md-6 col-lg-4" key={project.id}>
              <div
                className="project-card"
                ref={(el) => { cardsRef.current[index] = el; }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image"
                />
                <div className="project-overlay">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
