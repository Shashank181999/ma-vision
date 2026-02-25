"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectGallery = [
  { id: 1, image: "/project/C1.jpg.jpeg", label: "Lobby" },
  { id: 2, image: "/project/C2.jpg.jpeg", label: "Reception" },
  { id: 3, image: "/project/C5.jpg.jpeg", label: "Lounge" },
  { id: 4, image: "/project/RA2.jpg.jpeg", label: "Interior" },
];

const mainImage = "/project/buildingView.jpg.jpeg";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".home-fp-main", {
        scrollTrigger: {
          trigger: ".home-fp-main",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        scale: 0.98,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".home-fp-thumb", {
        scrollTrigger: {
          trigger: ".home-fp-gallery",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".home-fp-info", {
        scrollTrigger: {
          trigger: ".home-fp-info",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="projects-header">
          <h2 className="section-title projects-title">
            Featured <span>Project</span>
          </h2>
          <p className="section-subtitle">
            Our flagship development showcasing excellence in design and construction.
          </p>
        </div>

        {/* Featured Project */}
        <div className="home-featured-project">
          {/* Main Image */}
          <div className="home-fp-main" onClick={() => openLightbox(mainImage)}>
            <img
              src="/project/buildingView.jpg.jpeg"
              alt="MA Vision Tower"
            />
            <div className="home-fp-overlay"></div>
            <div className="home-fp-content">
              <span className="home-fp-tag">Flagship Development</span>
              <h3>MA Vision Tower</h3>
              <p>Dubai, UAE</p>
            </div>
          </div>

          {/* Info Row */}
          <div className="home-fp-row">
            <div className="home-fp-info">
              <p>
                A landmark mixed-use development combining premium residential units,
                commercial spaces, and world-class amenities.
              </p>
              <a href="/about" className="home-fp-link">
                View Full Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Gallery */}
            <div className="home-fp-gallery">
              {projectGallery.map((item) => (
                <div className="home-fp-thumb" key={item.id} onClick={() => openLightbox(item.image)}>
                  <img src={item.image} alt={item.label} />
                  <div className="home-fp-thumb-overlay">
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={lightboxImage} alt="Project" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
