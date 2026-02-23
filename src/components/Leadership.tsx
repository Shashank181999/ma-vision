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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".leadership-left", {
        scrollTrigger: {
          trigger: ".leadership-left",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".leader-card-new", {
        scrollTrigger: {
          trigger: ".leader-card-new",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="leadership-new" id="leadership" ref={sectionRef}>
      <div className="container">
        <div className="leadership-wrapper">
          <div className="leadership-left">
            <span className="leadership-tag">LEADERSHIP</span>
            <h2 className="leadership-title">
              Guided by<br />
              <span>Experience</span><br />
              & Vision
            </h2>

            <p className="leadership-bio">
              {leader.bio}
            </p>

            <div className="leadership-stats-row">
              <div className="leadership-stat">
                <span className="stat-number">{statistics.development_value}</span>
                <span className="stat-text">DEVELOPMENT<br />VALUE</span>
              </div>
              <div className="leadership-stat">
                <span className="stat-number">{leader.experience_years}</span>
                <span className="stat-text">YEARS<br />EXPERIENCE</span>
              </div>
            </div>
          </div>

          <div className="leadership-right">
            <div className="leader-card-new">
              <div className="leader-company-logo">
                <img src="/MA_VISION_02-removebg-preview.png" alt="MA Vision" />
              </div>
              <div className="leader-avatar-new">
                <span>{getInitials(leader.name)}</span>
              </div>
              <h3 className="leader-name-new">{leader.name}</h3>
              <p className="leader-title-new">{leader.title.toUpperCase()}</p>
              <div className="leader-badges">
                {leader.education.map((edu, index) => (
                  <span key={index} className="leader-badge">{edu}</span>
                ))}
              </div>

              {/* Achievements */}
              <div className="leader-achievements">
                {leader.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <span className="achievement-icon">★</span>
                    <span className="achievement-text">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
