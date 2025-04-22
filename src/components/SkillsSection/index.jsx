import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import skillsColors from '../../data/skillsColors.json';

function SkillsSection() {
  const { t } = useTranslation();

  // const defaultIcon = '/assets/icons/default.svg';

  const languageSkills = [
    { name: 'PHP', icon: '/assets/icons/php.svg' },
    { name: 'Java', icon: null },
    { name: 'JavaScript', icon: '/assets/icons/javascript.svg' },
    { name: 'Python', icon: '/assets/icons/python.svg' },
    { name: 'ShellScript', icon: null }
  ];

  const toolSkills = [
    { name: 'Laravel', icon: '/assets/icons/laravel.svg' },
    { name: 'Vue.js', icon: '/assets/icons/vuedotjs.svg' },
    { name: 'SpringBoot', icon: '/assets/icons/springboot.svg' },
    { name: 'Docker', icon: '/assets/icons/docker.svg' },
    { name: 'Git', icon: '/assets/icons/git.svg' },
    { name: 'GitHub', icon: '/assets/icons/github.svg' },
    { name: 'GitLab', icon: '/assets/icons/gitlab.svg' },
    { name: 'AWS', icon: '/assets/icons/amazonwebservices.svg' },
    { name: 'MySQL', icon: '/assets/icons/mysql.svg' },
    { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg' },
    { name: 'MongoDB', icon: '/assets/icons/mongodb.svg' },
    { name: 'Raspberry Pi', icon: '/assets/icons/raspberrypi.svg' },
    { name: 'Oracle', icon: '/assets/icons/oracle.svg' },
    { name: 'Visual Studio Code', icon: '/assets/icons/visualstudiocode.svg' },
    { name: 'Sourcetree', icon: '/assets/icons/sourcetree.svg' },
    { name: 'JasperReports', icon: '/assets/icons/jasperreports.svg' }
  ];

  const getColor = (name) => {
    const match = skillsColors.find((item) => item.name === name);
    return match ? match.color : '#666';
  };

  const renderSkillList = (skills) =>
    skills.map((skill) => {
      const color = getColor(skill.name);
      return (
        <li key={skill.name} className="skill-item">
          {skill.icon && (
            <div className="skill-icon-wrapper" style={{ backgroundColor: color }}>
              <img
                src={skill.icon}
                alt={skill.name}
                className="skill-icon"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          {skill.name}
        </li>
      );
    });

  return (
    <section className="skills">
      <div className="skills-container">
        <h2 className="skills-title">{t('skills.language')}</h2>
        <ul className="skills-list">{renderSkillList(languageSkills)}</ul>

        <h2 className="skills-title">{t('skills.tools')}</h2>
        <ul className="skills-list">{renderSkillList(toolSkills)}</ul>
      </div>
    </section>
  );
}

export default SkillsSection;
