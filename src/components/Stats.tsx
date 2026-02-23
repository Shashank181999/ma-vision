"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 250, suffix: "+", label: "Projects Completed" },
  { number: 15, suffix: "+", label: "Years Experience" },
  { number: 180, suffix: "+", label: "Happy Clients" },
  { number: 45, suffix: "+", label: "Expert Team" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          if (!hasAnimated) {
            setHasAnimated(true);
            stats.forEach((stat, index) => {
              gsap.to(
                {},
                {
                  duration: 2,
                  ease: "power2.out",
                  onUpdate: function () {
                    const progress = this.progress();
                    setCounts((prev) => {
                      const newCounts = [...prev];
                      newCounts[index] = Math.round(stat.number * progress);
                      return newCounts;
                    });
                  },
                }
              );
            });
          }
        },
      });

      // 3D tilt effect on stat items
      const items = document.querySelectorAll(".stat-item");
      items.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          scale: 0.8,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasAnimated]);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container">
        <div className="row">
          {stats.map((stat, index) => (
            <div className="col-6 col-lg-3" key={index}>
              <div className="stat-item">
                <div className="stat-number">
                  {counts[index]}
                  {stat.suffix}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
