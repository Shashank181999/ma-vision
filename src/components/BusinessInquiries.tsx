"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BusinessInquiries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".biz-heading", {
        scrollTrigger: {
          trigger: ".biz-content",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });

      // Line animation
      gsap.from(".biz-line", {
        scrollTrigger: {
          trigger: ".biz-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scaleX: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      // Subheading
      gsap.from(".biz-subheading", {
        scrollTrigger: {
          trigger: ".biz-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });

      // Description
      gsap.from(".biz-desc", {
        scrollTrigger: {
          trigger: ".biz-content",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      });

      // Button
      gsap.from(".biz-btn", {
        scrollTrigger: {
          trigger: ".biz-content",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.8,
        delay: 0.7,
        ease: "back.out(1.7)",
      });

      // Background parallax
      gsap.to(".biz-bg-pattern", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -50,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="biz-section" ref={sectionRef}>
      {/* Background */}
      <div className="biz-bg">
        <div className="biz-bg-pattern"></div>
        <div className="biz-bg-overlay"></div>
      </div>

      {/* Decorative Elements */}
      <div className="biz-decor biz-decor-left"></div>
      <div className="biz-decor biz-decor-right"></div>

      {/* Content */}
      <div className="biz-content">
        <h2 className="biz-heading">BUSINESS INQUIRIES</h2>
        <div className="biz-line"></div>

        <p className="biz-subheading">
          Land and Property Owners, Investors, Real Estate Agencies
          <br />
          <span>Complete construction & development services from land acquisition to opening day.</span>
        </p>

        <p className="biz-desc">
          Our team of professionals have an extensive background and experience in all aspects of
          project development to provide complete turnkey service from Acquisition, Engineering,
          Design, Permitting through Construction for real estate development.
        </p>

        <button className="biz-btn" onClick={scrollToContact}>
          Contact Us
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
