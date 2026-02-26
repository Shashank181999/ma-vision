"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  // Always show loader on page load
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Always show loader for 1.5 seconds on every reload
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsLoading(false);
        // Dispatch event to notify other components loader is done
        window.dispatchEvent(new CustomEvent('loaderComplete'));
      }, 500);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`page-loader ${!isVisible ? "fade-out" : ""}`}>
      <div className="loader-content">
        <div className="loader-icon">
          <svg viewBox="0 0 100 100" className="loader-circle">
            <circle cx="50" cy="50" r="45" />
          </svg>
          <div className="loader-diamond">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
        <div className="loader-logo">
          <span className="logo-ma">MA</span>
          <span className="logo-vision">VISION</span>
        </div>
        <div className="loader-tagline">Building Excellence</div>
      </div>
    </div>
  );
}
