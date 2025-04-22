import React from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
function App() {
  return (
    <div className="App">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
    </div>
  );
}

export default App;
