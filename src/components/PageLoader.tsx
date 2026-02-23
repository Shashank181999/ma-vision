"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`page-loader ${!isLoading ? "hidden" : ""}`}>
      <div className="loader-content">
        <div className="loader-logo">
          MA <span>VISION</span>
        </div>
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
}
