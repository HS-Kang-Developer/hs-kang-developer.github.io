// Run: node --test scripts/test-portfolio-refresh.cjs
// Uses only React, i18next, Babel, jsdom and PostCSS already installed with this app.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const babel = require('@babel/core');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { createInstance } = require('i18next');
const { I18nextProvider, initReactI18next } = require('react-i18next');
const { MemoryRouter, Route, Routes } = require('react-router-dom');
const { JSDOM } = require('jsdom');
const postcss = require('postcss');
const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const loadJS = Module._extensions['.js'];
Module._extensions['.css'] = () => {};
for (const extension of ['.js', '.jsx']) {
  Module._extensions[extension] = (module, filename) => {
    if (!filename.startsWith(path.join(root, 'src') + path.sep)) return loadJS(module, filename);
    const result = babel.transformSync(fs.readFileSync(filename, 'utf8'), {
      filename, babelrc: false, configFile: false,
      presets: [
        [require.resolve('@babel/preset-env'), { targets: { node: 'current' } }],
        [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
      ],
    });
    module._compile(result.code, filename);
  };
}
const Hero = require('../src/components/HeroSection').default;
const Skills = require('../src/components/SkillsSection').default;
const Projects = require('../src/components/ProjectsSection').default;
const Study = require('../src/components/StudyProjectsSection').default;
const Detail = require('../src/pages/Project/ProjectDetail.jsx').default;
const colors = JSON.parse(read('src/data/skillsColors.json'));
async function rendered(Component, locale, translation, id) {
  const i18n = createInstance();
  await i18n.use(initReactI18next).init({
    lng: locale, fallbackLng: 'ko', resources: { [locale]: { translation } },
    interpolation: { escapeValue: false }, react: { useSuspense: false },
  });
  let view = React.createElement(Component);
  if (id !== undefined) {
    view = React.createElement(MemoryRouter, { initialEntries: ['/projects/' + id] },
      React.createElement(Routes, null,
        React.createElement(Route, { path: '/projects/:id', element: view })));
  }
  return new JSDOM(renderToStaticMarkup(React.createElement(I18nextProvider, { i18n }, view)));
}
for (const locale of ['ko', 'ja']) {
  const translation = JSON.parse(read('src/i18n/' + locale + '.json'));
  test(locale + ': updated profile, both navigation actions and twenty branded local skill icons render', async () => {
    const hero = await rendered(Hero, locale, translation);
    const skills = await rendered(Skills, locale, translation);
    try {
      const doc = hero.window.document;
      assert.equal(doc.querySelector('.hero-status').textContent,
        'version 1.1 | ' + (locale === 'ko' ? '최종 업데이트' : '最終更新') + ': 2026-11-17');
      assert.equal(doc.querySelector('.hero-subtitle').textContent, translation.hero.title);
      assert.deepEqual(Array.from(doc.querySelectorAll('.hero-buttons button'), button => button.type), ['button', 'button']);
      const cards = Array.from(skills.window.document.querySelectorAll('.skill-item'));
      assert.equal(cards.length, 20);
      for (const card of cards) {
        const label = card.textContent.trim();
        const icon = card.querySelector('img');
        const expectedColor = colors.find(color => color.name === label).color;
        const channels = expectedColor.slice(1).match(/../g).map(channel => parseInt(channel, 16));
        assert.equal(card.querySelector('.skill-icon-wrapper').style.backgroundColor, 'rgb(' + channels.join(', ') + ')', label);
        assert.equal(icon.alt, label);
        assert.match(icon.src, /^\/assets\/icons\/[^/]+\.svg$/);
        assert.ok(fs.existsSync(path.join(root, 'public', icon.src)));
      }
      for (const [label, filename] of [['Java', 'java.svg'], ['ShellScript', 'shellscript.svg']]) {
        assert.equal(cards.find(card => card.textContent.trim() === label).querySelector('img').src, '/assets/icons/' + filename);
      }
    } finally {
      hero.window.close();
      skills.window.close();
    }
  });
  test(locale + ': every original project link and the game study link render with their navigation behavior', async () => {
    for (const [Component, items, external] of [[Projects, translation.projects.items, false], [Study, translation.study.items, true]]) {
      const dom = await rendered(Component, locale, translation);
      try {
        const cards = Array.from(dom.window.document.querySelectorAll('.project-card'));
        assert.deepEqual(cards.map(card => card.querySelector('.project-title').textContent), items.map(item => item.title));
        assert.deepEqual(cards.map(card => card.querySelector('.project-link').getAttribute('href')), items.map(item => item.link));
        for (const card of cards) {
          assert.equal(card.querySelector('a').getAttribute('target'), external ? '_blank' : null);
          assert.equal(card.querySelector('a').getAttribute('rel'), external ? 'noreferrer' : null);
        }
      } finally { dom.window.close(); }
    }
    assert.equal(translation.study.items.filter(item => item.link === '/games/puzzle-arena/').length, 1);
    assert.ok(translation.study.items.some(item => /sudoku/i.test(item.link)), 'existing Sudoku project');
  });
  for (const id of ['1', '2', '3', '4', '5', '6', '7']) {
    test(locale + ': project detail route ' + id + ' retains all translated content', async () => {
      const expected = translation.projects.detail[id];
      const dom = await rendered(Detail, locale, translation, id);
      try {
        const doc = dom.window.document;
        assert.equal(doc.querySelector('.project-detail-title').textContent, expected.title);
        assert.equal(doc.querySelector('.project-detail-description').textContent, expected.description);
        assert.equal(doc.querySelector('.project-detail-section p').textContent, expected.overview);
        assert.deepEqual(Array.from(doc.querySelectorAll('.project-detail-tech-list li'), item => item.textContent), expected.tech);
        assert.deepEqual(Array.from(doc.querySelectorAll('.project-detail-feature-list li'), item => item.textContent), expected.features);
      } finally { dom.window.close(); }
    });
  }
}
test('portfolio styles stay within their shell and cannot restyle the standalone game', () => {
  const css = postcss.parse(read('src/styles/portfolio.css'));
  css.walkRules(rule => {
    if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
    for (const selector of rule.selectors) assert.match(selector, /^(?:\.portfolio-site(?:$|[\s:*.[#])|html:has\(\.portfolio-site\))/);
  });
  css.walkAtRules(rule => assert.notEqual(rule.name, 'import'));
});
