// import React from 'react';
// import './style.css';
// import { useTranslation } from 'react-i18next';

// function ProjectsSection() {
//   const { t } = useTranslation();

//   // i18n의 배열 데이터 가져오기 (returnObjects: true 필수!)
//   const projects = t('projects.items', { returnObjects: true });

//   return (
//     <section className="projects" id="projects">
//       <h2 className="projects-title">{t('projects.title')}</h2>
//       <div className="projects-container">
//         {projects.map((project, index) => (
//           <div className="project-card" key={index}>
//             <h3 className="project-title">{project.title}</h3>
//             <p className="project-description">{project.description}</p>
//             <a className="project-link" href={project.link || '#'}>
//               {t('projects.viewMore')} →
//             </a>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default ProjectsSection;
// ProjectsSection.jsx (슬라이더 적용 버전)
import React from 'react';
import Slider from 'react-slick';
import './style.css';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function ProjectsSection() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <section className="projects-slider" id="projects">
      <h2 className="projects-slider-title">{t('projects.title')}  ({projects.length})</h2>
      <div className="slider-wrapper">
        <Slider {...settings}>
          {projects.map((project, index) => (
            <div className="project-slide" key={index}>
              <div className="project-card">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <a className="project-link" href={project.link || '#'}>
                  {t('projects.viewMore')} →
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default ProjectsSection;
