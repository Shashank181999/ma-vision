"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

// Dynamic import for 3D backgrounds
const Card3DBackground = dynamic(() => import("./Card3DBackground"), {
  ssr: false,
  loading: () => null,
});

const testimonials = [
  {
    text: "MA Vision transformed our vision into a stunning reality. Their attention to detail and commitment to quality exceeded all our expectations. Working with them was an absolute pleasure.",
    author: "Sarah Johnson",
    role: "Property Investor",
    avatar: "SJ",
    variant: 0,
  },
  {
    text: "The team at MA Vision delivered our commercial project on time and within budget. Their expertise in construction management and design innovation is unmatched in the industry.",
    author: "Michael Chen",
    role: "CEO, Tech Innovations",
    avatar: "MC",
    variant: 1,
  },
  {
    text: "From concept to completion, MA Vision provided exceptional service. Our new headquarters is a testament to their architectural brilliance and sustainable building practices.",
    author: "Emily Rodriguez",
    role: "Director, Green Energy Co.",
    avatar: "ER",
    variant: 2,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".testimonials-title", {
        scrollTrigger: {
          trigger: ".testimonials-title",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Testimonial cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Initial scroll reveal
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            rotationY: index % 2 === 0 ? 30 : -30,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
          });

          // Smooth 3D hover effect
          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
              rotationX: rotateX,
              rotationY: rotateY,
              scale: 1.02,
              y: -8,
              transformPerspective: 1000,
              duration: 0.4,
              ease: "power2.out",
            });

            // Avatar float effect
            const avatar = card.querySelector(".author-avatar");
            if (avatar) {
              gsap.to(avatar, {
                x: (x - centerX) / 10,
                y: (y - centerY) / 10,
                scale: 1.1,
                duration: 0.4,
                ease: "power2.out",
              });
            }

            // Content moves
            const content = card.querySelector(".card-content");
            if (content) {
              gsap.to(content, {
                x: (x - centerX) / 20,
                y: (y - centerY) / 20,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.5)",
            });

            const avatar = card.querySelector(".author-avatar");
            if (avatar) {
              gsap.to(avatar, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)",
              });
            }

            const content = card.querySelector(".card-content");
            if (content) {
              gsap.to(content, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)",
              });
            }
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="testimonials-section"
      id="testimonials"
      ref={sectionRef}
    >
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="section-title testimonials-title">
              What Our <span>Clients Say</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Hear from those who have experienced our commitment to excellence
              firsthand.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div className="col-lg-4" key={index}>
              <div
                className="testimonial-card card-3d-wrapper"
                ref={(el) => { cardsRef.current[index] = el; }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* 3D Background */}
                <Card3DBackground variant={testimonial.variant} />

                {/* Card Content */}
                <div className="card-content" style={{ position: "relative", zIndex: 1 }}>
                  <p className="testimonial-text" style={{ transform: "translateZ(20px)" }}>
                    {testimonial.text}
                  </p>
                  <div className="testimonial-author" style={{ transform: "translateZ(30px)" }}>
                    <div className="author-avatar">{testimonial.avatar}</div>
                    <div className="author-info">
                      <h5>{testimonial.author}</h5>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
