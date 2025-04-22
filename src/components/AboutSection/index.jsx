import React from 'react';
import './style.css';

function AboutSection() {
  return (
    <section className="about">
      <div className="about-container">
        <h2 className="about-title">About Me</h2>
        <p className="about-text">
          I'm a developer who loves building tools that solve real-world problems.
          I enjoy working across the full stack and always strive for clean, maintainable code.
        </p>
        <ul className="about-keywords">
          <li>#FullStack</li>
          <li>#React</li>
          <li>#Laravel</li>
          <li>#SpringBoot</li>
          <li>#Node.js</li>
          <li>#AWS</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutSection;
