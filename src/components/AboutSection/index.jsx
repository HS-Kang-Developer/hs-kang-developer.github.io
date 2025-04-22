import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

function AboutSection() {
  const { t } = useTranslation();

  const tags = ['FullStack', 'React', 'Laravel', 'SpringBoot', 'Node.js', 'AWS'];

  return (
    <section className="about"  id="about">
      <div className="about-container">
        <h2 className="about-title">{t('about.title')}</h2>
        <p className="about-text">{t('about.description')}</p>
        <ul className="about-keywords">
          {tags.map((tag) => (
            <li key={tag}>#{t(`about.tags.${tag}`, tag)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AboutSection;
