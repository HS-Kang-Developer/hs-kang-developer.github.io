import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';
import { scroller } from 'react-scroll';

function HeroSection() {
  const { t } = useTranslation();
  const scrollToSection = (section) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navigationHeight = document.querySelector('.portfolio-site .navbar')?.getBoundingClientRect().height || 64;
    scroller.scrollTo(section, { smooth: !reducedMotion, duration: reducedMotion ? 0 : 600, offset: -navigationHeight - 24 });
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-greeting">{t('hero.greeting')}</span>
          <span className="highlight">{t('hero.name')}</span>{t('hero.end')}
        </h1>
        <p className="hero-subtitle">{t('hero.title')}</p>
        <div className="hero-buttons">
          <button type="button" className="btn-primary" onClick={() => scrollToSection('projects')}>{t('nav.projects')} <span aria-hidden="true">↗</span></button>
          <button type="button" className="btn-secondary" onClick={() => scrollToSection('contact')}>{t('nav.contact')} <span aria-hidden="true">→</span></button>
        </div>
        <p className="hero-status">{t('hero.status')}</p>
      </div>
    </section>
  );
}

export default HeroSection;
