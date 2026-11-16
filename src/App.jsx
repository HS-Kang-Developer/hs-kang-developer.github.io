import React, { useEffect, useRef } from 'react';
import './App.css';
import './i18n';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import './styles/portfolio.css';

function Home() {
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <main className="portfolio-main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <StudyProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function PortfolioShell() {
  const { pathname } = useLocation();
  const container = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!window.IntersectionObserver) return undefined;

    const elements = Array.from(container.current.querySelectorAll(
      '.about-container, .skills-box, .projects-slider-title, .slider-wrapper, .contact-section, .project-detail-section'
    ));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.dataset.portfolioReveal = 'visible';
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    const updateMotion = () => {
      observer.disconnect();
      elements.forEach((element) => {
        delete element.dataset.portfolioReveal;
        if (!motion.matches && element.getBoundingClientRect().top >= window.innerHeight) {
          element.dataset.portfolioReveal = 'pending';
          observer.observe(element);
        }
      });
    };
    updateMotion();
    motion.addEventListener('change', updateMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', updateMotion);
      elements.forEach((element) => { delete element.dataset.portfolioReveal; });
    };
  }, [pathname]);

  return (
    <div className="portfolio-site" ref={container}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <PortfolioShell />
    </Router>
  );
}

export default App;
