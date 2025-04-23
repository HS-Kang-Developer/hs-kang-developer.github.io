import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import { Link as ScrollLink } from 'react-scroll';

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className={`navbar ${i18n.language === 'ja' ? 'lang-ja' : ''}`}>
      <div className="navbar-left">
        <span className="logo">
          <span className="accent"></span>
        </span>
      </div>

      <ul className="navbar-menu">
        <li>
          <ScrollLink
            to="about"
            spy={true}
            // smooth={false}
            duration={500}
            offset={-80}
            activeClass="active"
          >
            {t('nav.features')}
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="projects"
            spy={true}
            // smooth="easeInOutQuart"
            duration={600}
            offset={-80}
            activeClass="active"
          >
            {t('nav.projects')}
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="blog"
            spy={true}
            // smooth={true}
            duration={500}
            offset={-80}
            activeClass="active"
          >
            {t('nav.blog')}
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="contact"
            spy={true}
            // smooth={true}
            duration={500}
            offset={-80}
            activeClass="active"
          >
            {t('nav.contact')}
          </ScrollLink>
        </li>
      </ul>

      <div className="navbar-right">
        <button className="lang" onClick={() => changeLang('ko')}>🇰🇷</button>
        <button className="lang" onClick={() => changeLang('ja')}>🇯🇵</button>
      </div>
    </nav>
  );
}

export default Navbar;
