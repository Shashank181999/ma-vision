"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    // Skip parallax effects on mobile devices for better performance
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

    if (isMobile) {
      // On mobile, just ensure ScrollTrigger is initialized but don't add parallax
      return;
    }

    // Parallax scrolling for sections (desktop only)
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        // Subtle parallax effect
      });
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      const nowMobile = window.innerWidth <= 768;
      if (nowMobile) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      } else {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
