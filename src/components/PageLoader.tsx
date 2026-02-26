"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  // Check sessionStorage synchronously to determine initial state
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem("mavision_loaded");
    }
    return true;
  });
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem("mavision_loaded");
    }
    return true;
  });

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("mavision_loaded");

    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("mavision_loaded", "true");
          // Dispatch event to notify other components loader is done
          window.dispatchEvent(new CustomEvent('loaderComplete'));
        }, 500);
      }, 2200);

      return () => clearTimeout(timer);
    } else {
      // Already loaded before, dispatch event immediately
      window.dispatchEvent(new CustomEvent('loaderComplete'));
    }
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
