import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const title = t(`projects.detail.${id}.title`);
  const description = t(`projects.detail.${id}.description`);
  const overview = t(`projects.detail.${id}.overview`);
  const techList = t(`projects.detail.${id}.tech`, { returnObjects: true });
  const features = t(`projects.detail.${id}.features`, { returnObjects: true });
  // const thumbnail = t(`projects.detail.${id}.thumbnail`);
  // const links = t(`projects.detail.${id}.links`, { returnObjects: true });

  return (
    <main className="project-detail-page">
      <header className="project-detail-hero">
        <h1 className="project-detail-title">{title}</h1>
        <p className="project-detail-description">{description}</p>
{/* 
        {thumbnail && (
          <div className="project-detail-thumbnail">
            <img src={thumbnail} alt="Project Thumbnail" />
          </div>
        )}

        <div className="project-detail-links">
          {links?.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="project-detail-button github">
              🔗 GitHub
            </a>
          )}
          {links?.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer" className="project-detail-button demo">
              🚀 데모 보기
            </a>
          )}
        </div> */}

        <div className="project-detail-navigation-buttons">
          <button className="project-detail-button back" onClick={() => navigate(-1)}>
            ← {t('projects.detail.back')}
          </button>
          <button className="project-detail-button home" onClick={() => navigate('/')}>🏠 {t('projects.detail.toHome')}</button>
        </div>
      </header>

      <section className="project-detail-content">
        {overview && (
          <section className="project-detail-section">
            <h2>{t('projects.detail.overviewTitle')}</h2>
            <p>{overview}</p>
          </section>
        )}

        {Array.isArray(techList) && (
          <section className="project-detail-section">
            <h2>{t('projects.detail.techTitle')}</h2>
            <ul className="project-detail-tech-list">
              {techList.map((tech, idx) => <li key={idx}>{tech}</li>)}
            </ul>
          </section>
        )}

        {Array.isArray(features) && (
          <section className="project-detail-section">
            <h2>{t('projects.detail.featuresTitle')}</h2>
            <ul className="project-detail-feature-list">
              {features.map((feature, idx) => <li key={idx}>{feature}</li>)}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}

export default ProjectDetail;
