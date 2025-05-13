import React, { useEffect } from 'react';
import './App.css';
import './i18n';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import StudyProjectsSection from './components/StudyProjectsSection';
import AnalyticsTracker from './components/AnalyticsTracker';
import Footer from './components/Footer';
import ProjectDetail from './pages/Project/ProjectDetail';
import ContactSection from './components/ContactSection';

function Home() {
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <StudyProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
