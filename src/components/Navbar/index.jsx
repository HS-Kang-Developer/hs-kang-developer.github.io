import React, { useEffect, useState } from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import { Link as ScrollLink } from 'react-scroll';

function Navbar() {
  const { t, i18n } = useTranslation();
  const isJapanese = (i18n.resolvedLanguage || i18n.language).startsWith('ja');
  const [smoothScroll, setSmoothScroll] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setSmoothScroll(!motion.matches);
    motion.addEventListener('change', updateMotion);
    return () => motion.removeEventListener('change', updateMotion);
  }, []);

  // Keep section tracking local: queued library spy callbacks can outlive a hash route.
  useEffect(() => {
    let frame;
    const updateActiveSection = () => {
      frame = undefined;
      const navigation = document.querySelector('.portfolio-site .navbar');
      const readingLine = Math.max(160, (navigation?.getBoundingClientRect().bottom || 64) + 24);
      const sections = ['about', 'projects', 'study', 'contact'].map((id) => document.getElementById(id)).filter(Boolean);
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      const atBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2;
      setActiveSection(atBottom ? 'contact' : current?.id || '');
    };
    const scheduleUpdate = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(updateActiveSection);
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    updateActiveSection();
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, [i18n.resolvedLanguage]);
  const handleMenuKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className={`navbar ${i18n.language === 'ja' ? 'lang-ja' : ''}`}>
      <div className="navbar-left">
        <a className="logo" href="#/" onClick={() => window.scrollTo({ top: 0, behavior: smoothScroll ? 'smooth' : 'instant' })}>
          HEESOO<span className="accent">KANG</span>
        </a>
      </div>

      <ul className="navbar-menu">
        <li>
          <ScrollLink
            to="about"
            spy={false}
            className={activeSection === 'about' ? 'active' : undefined}
            aria-current={activeSection === 'about' ? 'location' : undefined}
            smooth={smoothScroll}
            role="button"
            tabIndex={0}
            onKeyDown={handleMenuKeyDown}
            // smooth={false}
            duration={500}
            offset={-136}
            activeClass="active"
          >
            {t('nav.features')}
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="projects"
            spy={false}
            className={activeSection === 'projects' ? 'active' : undefined}
            aria-current={activeSection === 'projects' ? 'location' : undefined}
            smooth={smoothScroll}
            role="button"
            tabIndex={0}
            onKeyDown={handleMenuKeyDown}
            // smooth="easeInOutQuart"
            duration={600}
            offset={-136}
            activeClass="active"
          >
            {t('nav.projects')}
          </ScrollLink>
        </li>
        {/* <li>
          <ScrollLink
            to="blog"
            spy={true}
            // smooth={true}
            duration={500}
            offset={-136}
            activeClass="active"
          >
            {t('nav.blog')}
          </ScrollLink>
        </li> */}
        <li>
          <ScrollLink
            to="study"
            spy={false}
            className={activeSection === 'study' ? 'active' : undefined}
            aria-current={activeSection === 'study' ? 'location' : undefined}
            smooth={smoothScroll}
            role="button"
            tabIndex={0}
            onKeyDown={handleMenuKeyDown}
            // smooth={true}
            duration={500}
            offset={-136}
            activeClass="active"
          >
            {t('nav.study')}
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="contact"
            spy={false}
            className={activeSection === 'contact' ? 'active' : undefined}
            aria-current={activeSection === 'contact' ? 'location' : undefined}
            smooth={smoothScroll}
            role="button"
            tabIndex={0}
            onKeyDown={handleMenuKeyDown}
            // smooth={true}
            duration={500}
            offset={-136}
            activeClass="active"
          >
            {t('nav.contact')}
          </ScrollLink>
        </li>
      </ul>

      <div className="navbar-right">
        <button className="lang" type="button" lang="ko" aria-label="한국어" aria-pressed={!isJapanese} onClick={() => changeLang('ko')}>KO</button>
        <button className="lang" type="button" lang="ja" aria-label="日本語" aria-pressed={isJapanese} onClick={() => changeLang('ja')}>日本語</button>
      </div>
    </nav>
  );
}

export default Navbar;
