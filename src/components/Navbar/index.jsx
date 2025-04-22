// src/components/Navbar/index.jsx

import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

function Navbar() {
const { t, i18n } = useTranslation();

const changeLang = (lang) => {
  i18n.changeLanguage(lang);
};

return (
  <nav className="navbar">
    <div className="navbar-left">
      <span className="logo"><span className="accent"></span></span>
    </div>
    <ul className="navbar-menu">
      <li><a href="#about">{t('nav.features')}</a></li>
      <li><a href="#projects">{t('nav.projects')}</a></li>
      <li><a href="#blog">{t('nav.blog')}</a></li>
      <li><a href="#contact">{t('nav.contact')}</a></li>
    </ul>
    <div className="navbar-right">
      <button className="lang" onClick={() => changeLang('ko')}>🇰🇷</button>
      <button className="lang" onClick={() => changeLang('ja')}>🇯🇵</button>
    </div>
  </nav>
);
}

export default Navbar;
