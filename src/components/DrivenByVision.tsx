"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    title: "Impact",
    description: "A commitment to creating inclusive, uplifting environments that improve quality of life.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1400&q=80"
  },
  {
    id: 2,
    title: "Leadership",
    description: "24 years of proven success in complex, large-scale developments.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80"
  },
  {
    id: 3,
    title: "Sustainability",
    description: "Integrating eco-conscious practices into every stage of planning and construction.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1400&q=80"
  },
  {
    id: 4,
    title: "AI & Tech",
    description: "Leveraging smart solutions to enhance efficiency, livability, and long-term value.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80"
  },
];

export default function DrivenByVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (sliderRef.current) {
      const newIndex = (index + slides.length) % slides.length;
      setCurrentIndex(newIndex);

      gsap.to(sliderRef.current, {
        x: `-${newIndex * 100}%`,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vision-title", {
        scrollTrigger: {
          trigger: ".vision-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".vision-line", {
        scrollTrigger: {
          trigger: ".vision-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scaleX: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".vision-subtitle", {
        scrollTrigger: {
          trigger: ".vision-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".vision-slider-wrap", {
        scrollTrigger: {
          trigger: ".vision-slider-wrap",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="vision-section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="vision-header">
          <h2 className="vision-title">DRIVEN BY VISION</h2>
          <div className="vision-line"></div>
          <p className="vision-subtitle">
            Every project begins with a clear purpose and long-term perspective.
          </p>
        </div>

        {/* Slider */}
        <div
          className="vision-slider-wrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="vision-slider" ref={sliderRef}>
            {slides.map((slide) => (
              <div className="vision-slide" key={slide.id}>
                <div className="vision-slide-img">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <div className="vision-slide-overlay"></div>
                <div className="vision-slide-content">
                  <div className="vision-slide-left">
                    <h3>{slide.title}</h3>
                  </div>
                  <div className="vision-slide-right">
                    <p>{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="vision-arrow vision-prev" onClick={prevSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="vision-arrow vision-next" onClick={nextSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="vision-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`vision-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
