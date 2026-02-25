"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Always start from top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Scroll to top instantly when navigating
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-main ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link className="navbar-brand" href="/" onClick={handleLinkClick}>
          <img src="/logo.svg" alt="MA Vision" className="navbar-logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "rgba(201, 169, 98, 0.5)" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="/" scroll={false} onClick={handleLinkClick}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about" scroll={false} onClick={handleLinkClick}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/projects" scroll={false} onClick={handleLinkClick}>Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact" scroll={false} onClick={handleLinkClick}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
