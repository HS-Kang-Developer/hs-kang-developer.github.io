import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

function MainHero() {
  const { t, i18n } = useTranslation();

  return (
    <div className="hero-container">
      <header className="hero-header">
        <div className="logo">React <span className="highlight">Résumé</span></div>
        <nav>
          <a href="#features">{t('features')}</a>
          <a href="#pricing">{t('pricing')}</a>
          <a href="#blog">{t('blog')}</a>
          <a href="#examples">{t('examples')}</a>
        </nav>
        <button className="get-started">Get Started</button>
      </header>

      <main className="hero-content">
        <h1>
          {t('headline.part1')} <span className="highlight">{t('headline.part2')}</span>
        </h1>
        <p>{t('subtext')}</p>
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => i18n.changeLanguage('ko')}>🇰🇷</button>
          <button onClick={() => i18n.changeLanguage('ja')}>🇯🇵</button>
        </div>
        <button className="get-started-big">{t('cta')}</button>
      </main>
    </div>
  );
}

export default MainHero;
