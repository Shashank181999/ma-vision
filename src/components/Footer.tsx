"use client";

import data from "../../content-database.json";

export default function Footer() {
  const { company, contact, services, social_media } = data;

  const socialIcons: Record<string, string> = {
    "LinkedIn": "in",
    "Instagram": "IG",
    "Twitter": "𝕏",
    "Facebook": "f",
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="footer-brand">
              <img src="/logo.svg" alt="MA Vision" className="footer-logo" />
            </div>
            <p className="footer-text">
              {company.tagline}. We are committed to delivering
              exceptional real estate development projects that stand the test
              of time.
            </p>
            <div className="footer-company-info">
              <span>Est. {company.founded}</span>
              <span className="footer-divider">|</span>
              <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                {company.website}
              </a>
            </div>
            <div className="social-links">
              {social_media.map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="social-link"
                  aria-label={platform}
                >
                  {socialIcons[platform] || platform[0]}
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4">
            <h5 className="footer-title">Our Services</h5>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-4">
            <h5 className="footer-title">Contact Info</h5>
            <ul className="footer-links">
              <li>
                <span style={{ color: "var(--primary)" }}>📍</span> {contact.location}
              </li>
              <li>
                <span style={{ color: "var(--primary)" }}>📧</span> {contact.email}
              </li>
              <li>
                <span style={{ color: "var(--primary)" }}>📞</span> {contact.phone}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
            Built with passion and precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
