import React from 'react';
import './style.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Hi, I'm <span className="highlight">HS</span>
        </h1>
        <p className="hero-subtitle">
          I’m a software developer.<br />This blog is currently under construction.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-secondary">Contact Me</a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
