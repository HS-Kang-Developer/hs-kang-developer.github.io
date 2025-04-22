import React from 'react';
import './style.css';

function MainHero() {
  return (
    <div className="hero-container">
      <header className="hero-header">
        <div className="logo">React <span className="highlight">Résumé</span></div>
        <nav>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
          <a href="#">Examples</a>
        </nav>
        <button className="get-started">Get Started</button>
      </header>

      <main className="hero-content">
        <h1>
          Effortlessly craft stunning <br /> resume sites that <span className="highlight">stand out.</span>
        </h1>
        <p>
          Build a stunning resume and portfolio website in minutes with React Résumé! Choose from our professional templates, customize with ease, and host your site automatically to impress potential employers and clients.
        </p>
        <button className="get-started-big">Get Started Today!</button>
      </main>
    </div>
  );
}

export default MainHero;
