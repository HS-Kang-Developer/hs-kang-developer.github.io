import React from 'react';
import './App.css';
import './i18n';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar'; 
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import SkillsSection from './components/SkillsSection';
function App() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="App">
      <Navbar />
      {/* <header className="language-toggle">
        <button onClick={() => handleLanguageChange('ko')}>🇰🇷 한국어</button>
        <button onClick={() => handleLanguageChange('ja')}>🇯🇵 日本語</button>
      </header> */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
    </div>
  );
}

export default App;
