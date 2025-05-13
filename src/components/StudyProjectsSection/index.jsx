import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

function StudyProjectsSection() {
  const { t } = useTranslation();
  const projects = t('study.items', { returnObjects: true });

  const settings = {
    dots: true,
    infinite: false,  // 1개만 있을 때 무한루프 돌지 않게
    speed: 500,
    slidesToShow: Math.min(projects.length, 3),
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(projects.length, 2) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <section className="projects-slider" id="study">
      <h2 className="projects-slider-title">
        {t('study.title')}
        {projects?.length > 0 && ` (${projects.length})`}
      </h2>

      {Array.isArray(projects) && projects.length > 0 ? (
        <div className="slider-wrapper">
          <Slider {...settings}>
            {projects.map((project, index) => (
              <div className="project-slide" key={index}>
                <div className="project-card">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <a className="project-link" href={project.link || '#'} target="_blank" rel="noreferrer">
                    {t('study.viewMore')} →
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p style={{ color: '#888', marginTop: '1rem' }}>{t('study.empty')}</p>
      )}
    </section>
  );
}

export default StudyProjectsSection;
