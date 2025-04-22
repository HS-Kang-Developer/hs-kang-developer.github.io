import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

function ProjectsSection() {
  const { t } = useTranslation();

  // i18n의 배열 데이터 가져오기 (returnObjects: true 필수!)
  const projects = t('projects.items', { returnObjects: true });

  return (
    <section className="projects" id="projects">
      <h2 className="projects-title">{t('projects.title')}</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <a className="project-link" href={project.link || '#'}>
              {t('projects.viewMore')} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
