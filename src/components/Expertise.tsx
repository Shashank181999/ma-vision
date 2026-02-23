"use client";

import data from "../../content-database.json";

export default function Expertise() {
  const { expertise_areas, core_values } = data;

  return (
    <section className="exp-section" id="expertise">
      <div className="container">
        {/* Header */}
        <div className="exp-header">
          <span className="exp-tag">OUR EXPERTISE</span>
          <h2 className="exp-title">What We <span>Excel</span> At</h2>
        </div>

        {/* 4 Expertise Cards */}
        <div className="exp-grid">
          {expertise_areas.map((area, index) => (
            <div className="exp-card" key={index}>
              <span className="exp-card-num">0{index + 1}</span>
              <h4 className="exp-card-title">{area}</h4>
            </div>
          ))}
        </div>

        {/* Core Values Bar */}
        <div className="cv-bar">
          <div className="cv-label">
            <span>BUILT ON</span>
            <strong>Our Core Values</strong>
          </div>
          <div className="cv-list">
            {core_values.map((value, index) => (
              <div className="cv-item" key={index}>
                <span className="cv-diamond">◆</span>
                <span className="cv-text">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
