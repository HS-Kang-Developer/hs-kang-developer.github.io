import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          {t('hero.greeting')} <span className="highlight">{t('hero.name')}</span>{t('hero.end')}
        </h1>
        {/* <p className="hero-subtitle">{t('hero.title')}</p> */}
        <p className="hero-subtitle">{t('hero.status')}</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">{t('hero.viewProjects', 'View Projects')}</a>
          <a href="#contact" className="btn-secondary">{t('hero.contactMe', 'Contact Me')}</a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
