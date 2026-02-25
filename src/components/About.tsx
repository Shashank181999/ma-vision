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
  { id: 5, image: "/project/RB.jpg.jpeg", label: "Amenities" },
  { id: 6, image: "/project/5.jpg.jpeg", label: "Exterior" },
];

const mainImage = "/project/buildingView.jpg.jpeg";

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);
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
    // Simple fade-in on load - no scroll triggers
    gsap.fromTo(".abt-hero-content h1",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(".abt-hero-content p",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
    );
  }, []);

  return (
    <div className="abt-pg" ref={pageRef}>
      {/* Hero */}
      <section className="abt-hero">
        <div className="abt-hero-img">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
            alt="MA Vision"
          />
        </div>
        <div className="abt-hero-grad"></div>
        <div className="abt-hero-content">
          <h1>ABOUT US</h1>
          <p>Building Excellence Since 2001</p>
        </div>
      </section>

      {/* About Section */}
      <section className="abt-sec abt-about">
        <div className="abt-wrap">
          <div className="sec-header abt-fade">
            <h2>ABOUT US</h2>
            <div className="sec-line"></div>
          </div>
          <div className="abt-text abt-fade">
            <p>
              MA VISION Developments takes pride in being one of the few homegrown professional
              development firms in the UAE, established in accordance with national regulations
              and built on a foundation of excellence, trust, and vision. We specialize in project
              development, project management, cost consultancy, and strategic advisory services,
              supporting transformative projects that shape communities and elevate urban living.
            </p>
            <p>
              Since our inception, MA VISION has demonstrated consistent and remarkable growth—reflected
              not only in our financial success, but in our expanding client base, diverse portfolio of
              high-impact projects, and the strength of our expert team.
            </p>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num">5B+</span>
              <span className="stat-label">AED Portfolio Value</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">24+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">50+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="abt-sec abt-leader">
        <div className="abt-wrap">
          <div className="sec-header abt-fade">
            <h2>LEADERSHIP</h2>
            <div className="sec-line-full"></div>
          </div>

          <div className="leader-card">
            <div className="leader-img abt-img-reveal">
              <img src="/experience.d1be152f64d97a42f231.jpg" alt="Marwa Abdelaziz" />
              <div className="leader-img-border"></div>
            </div>

            <div className="leader-info abt-fade">
              <h3>MARWA ABDELAZIZ</h3>
              <span>CHAIRMAN</span>
            </div>

            <div className="leader-bio abt-fade">
              <p>
                With over two decades of hands-on experience in the UAE&apos;s dynamic property development
                sector, Marwa is a visionary leader and the driving force behind MA VISION Developments.
                Since 2001, she has played a pivotal role in shaping and delivering some of the region&apos;s
                most complex and high-value real estate projects, with a combined portfolio value
                exceeding AED 5 billion.
              </p>
              <p>
                Marwa&apos;s expertise spans the full project lifecycle—from site identification, feasibility
                planning, and financial structuring to acquisition, master planning, design management,
                and tendering. Her holistic approach integrates strategic insight with operational precision.
              </p>
              <p>
                Marwa holds a Bachelor&apos;s degree in Architectural Engineering, a Project Management
                Professional (PMP) certification, and a Master&apos;s in Project Management from the
                American Academy, U.S.A.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="abt-sec abt-vision">
        <div className="abt-wrap">
          <div className="vision-grid">
            <div className="vision-content">
              <div className="sec-header abt-fade">
                <h2>VISION</h2>
                <div className="sec-line-full"></div>
              </div>
              <div className="abt-text abt-fade">
                <p>
                  To be a catalyst for intelligent urban transformation in the UAE and beyond—developing
                  vibrant, sustainable communities that embody innovation, quality, and long-term value.
                </p>
              </div>
            </div>
            <div className="vision-img abt-img-reveal">
              <img src="/stride.05438c1efd4803d1b82d.jpg" alt="Vision" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="abt-sec abt-mission">
        <div className="abt-wrap">
          <div className="sec-header abt-fade">
            <h2>MISSION</h2>
            <div className="sec-line-full"></div>
          </div>
          <div className="abt-text abt-fade">
            <p>
              At MA VISION Developments, we are driven by a strong commitment to delivering smart,
              sustainable solutions to the pressing challenge of quality, affordable housing. We believe
              that attainable housing should not only be accessible—but also vibrant, inspiring, and an
              asset to the communities it serves.
            </p>
            <p>
              Our approach focuses on creating thoughtfully designed, well-managed living environments
              that enhance the daily lives of individuals, families, and seniors.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="abt-sec abt-projects">
        <div className="abt-wrap">
          <div className="sec-header abt-fade">
            <h2>OUR PROJECT</h2>
            <div className="sec-line"></div>
          </div>

          {/* Featured Project Showcase */}
          <div className="featured-project">
            {/* Main Image */}
            <div
              className="fp-main"
              onClick={() => openLightbox(mainImage)}
              style={{
                position: 'relative',
                width: '100%',
                height: '500px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#1a1a1a',
                cursor: 'pointer'
              }}
            >
              <img
                src="/project/buildingView.jpg.jpeg"
                alt="MA Vision Development"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div className="fp-main-overlay"></div>
              <div className="fp-main-content">
                <span className="fp-tag">Featured Development</span>
                <h3>MA Vision Tower</h3>
                <p>Dubai, UAE</p>
              </div>
            </div>

            {/* Project Info */}
            <div className="fp-info abt-fade">
              <p>
                A landmark mixed-use development combining premium residential units,
                commercial spaces, and world-class amenities. This flagship project
                represents our commitment to excellence and innovation in urban development.
              </p>
              <div className="fp-stats">
                <div className="fp-stat">
                  <span className="fp-stat-num">45</span>
                  <span className="fp-stat-label">Floors</span>
                </div>
                <div className="fp-stat">
                  <span className="fp-stat-num">200+</span>
                  <span className="fp-stat-label">Units</span>
                </div>
                <div className="fp-stat">
                  <span className="fp-stat-num">2025</span>
                  <span className="fp-stat-label">Completion</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="fp-gallery">
              {projectGallery.map((item, index) => (
                <div
                  className="fp-thumb proj-card"
                  key={item.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => openLightbox(item.image)}
                >
                  <div className="fp-thumb-img">
                    <img src={item.image} alt={item.label} />
                    <div className="fp-thumb-overlay">
                      <span>{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="abt-sec abt-cta">
        <div className="abt-wrap">
          <div className="cta-card abt-fade">
            <h3>Ready to Build Your Vision?</h3>
            <p>Partner with MA Vision for your next transformative project</p>
            <a href="/#contact" className="cta-link">
              Get In Touch
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

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
  );
}
