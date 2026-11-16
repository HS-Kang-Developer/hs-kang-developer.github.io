// Run with: node --test scripts/test-contact-section.cjs
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
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
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
const Contact = require('../src/components/ContactSection').default;
const emailjsModule = require('emailjs-com');
const emailjs = emailjsModule.default || emailjsModule;
const keys = ['REACT_APP_EMAILJS_SERVICE_ID', 'REACT_APP_EMAILJS_TEMPLATE_ID', 'REACT_APP_EMAILJS_PUBLIC_KEY'];
const placeholders = ['test-service', 'test-template', 'test-public-key'];
const email = 'audentia16@gmail.com';
const translations = Object.fromEntries(['ko', 'ja'].map(locale => [locale,
  JSON.parse(fs.readFileSync(path.join(root, 'src/i18n', locale + '.json'), 'utf8'))]));
async function withSettings(values, run) {
  const before = keys.map(key => process.env[key]);
  keys.forEach((key, index) => values[index] === undefined ? delete process.env[key] : process.env[key] = values[index]);
  try { return await run(); } finally {
    keys.forEach((key, index) => before[index] === undefined ? delete process.env[key] : process.env[key] = before[index]);
  }
}
async function view(locale) {
  const i18n = createInstance();
  await i18n.use(initReactI18next).init({
    lng: locale, fallbackLng: 'ko',
    resources: Object.fromEntries(Object.entries(translations).map(([language, translation]) => [language, { translation }])),
    interpolation: { escapeValue: false }, react: { useSuspense: false },
  });
  return { i18n, element: React.createElement(I18nextProvider, { i18n }, React.createElement(Contact)) };
}
async function mounted(locale, run) {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'https://portfolio.test/' });
  const pendingTimers = new Set();
  const originalSetTimeout = globalThis.setTimeout;
  const globals = {
    window: dom.window, document: dom.window.document, navigator: dom.window.navigator, IS_REACT_ACT_ENVIRONMENT: true,
    setTimeout: (callback, delay, ...args) => {
      const timer = originalSetTimeout(callback, delay, ...args);
      pendingTimers.add(timer);
      return timer;
    },
  };
  const before = Object.fromEntries(Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  for (const [key, value] of Object.entries(globals)) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
  const { createRoot } = require('react-dom/client');
  const renderer = createRoot(dom.window.document.getElementById('root'));
  try {
    const { element, i18n } = await view(locale);
    await React.act(async () => renderer.render(element));
    await run(dom.window, i18n);
  } finally {
    await React.act(async () => renderer.unmount());
    for (const timer of pendingTimers) clearTimeout(timer);
    for (const [key, descriptor] of Object.entries(before)) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key];
    dom.window.close();
  }
}
for (const locale of ['ko', 'ja']) {
  test(locale + ': absent, partial and whitespace-only settings use direct contact; complete settings retain the form', async () => {
    const cases = Array.from({ length: 8 }, (_, mask) => placeholders.map((value, index) => mask & (1 << index) ? value : undefined));
    cases.push(...keys.map((_, index) => placeholders.map((value, position) => position === index ? '   ' : value)));
    for (const values of cases) await withSettings(values, async () => {
      const { element } = await view(locale);
      const dom = new JSDOM(renderToStaticMarkup(element));
      try {
        const doc = dom.window.document;
        const configured = values.every(value => typeof value === 'string' && value.trim());
        assert.equal(!!doc.querySelector('.contact-form'), configured, 'form eligibility');
        assert.equal(!!doc.querySelector('.contact-card'), !configured, 'direct contact eligibility');
        if (configured) {
          assert.deepEqual(Array.from(doc.querySelectorAll('input,textarea'), field => field.name), ['name', 'email', 'message']);
          assert.ok(Array.from(doc.querySelectorAll('input,textarea')).every(field => field.required));
          assert.equal(doc.querySelector('button[type="submit"]').textContent, translations[locale].contact.send);
        } else {
          assert.equal(doc.querySelector('.contact-email-address').textContent, email);
          assert.equal(doc.querySelector('.contact-email-action').getAttribute('href'), 'mailto:' + email);
          assert.equal(doc.querySelector('.contact-email-action').textContent, translations[locale].contact.openEmailApp);
          assert.equal(doc.querySelector('.contact-copy-action').textContent, translations[locale].contact.copyEmail);
          assert.equal(doc.querySelector('.contact-direct-description').textContent, translations[locale].contact.directDescription);
          assert.equal(doc.querySelector('[role="status"]').getAttribute('aria-live'), 'polite');
        }
      } finally { dom.window.close(); }
    });
  });
  test(locale + ': copy writes the address, localizes feedback, and offers manual copying on denial or unsupported clipboard', async () => {
    await withSettings([], () => mounted(locale, async (window, i18n) => {
      const calls = [];
      Object.defineProperty(window.navigator, 'clipboard', { value: { writeText: async text => calls.push(text) }, configurable: true });
      const button = window.document.querySelector('.contact-copy-action');
      const status = () => window.document.querySelector('[role="status"]').textContent;
      await React.act(async () => button.click());
      assert.deepEqual(calls, [email]);
      assert.equal(status(), translations[locale].contact.copySuccess);
      const other = locale === 'ko' ? 'ja' : 'ko';
      await React.act(async () => i18n.changeLanguage(other));
      assert.equal(button.textContent, translations[other].contact.copyEmail);
      assert.equal(status(), translations[other].contact.copySuccess);
      window.navigator.clipboard.writeText = async () => { throw new Error('Clipboard denied'); };
      await React.act(async () => button.click());
      assert.equal(status(), translations[other].contact.copyFail);
      Object.defineProperty(window.navigator, 'clipboard', { value: undefined, configurable: true });
      await React.act(async () => button.click());
      assert.equal(status(), translations[other].contact.copyFail);
      assert.equal(window.document.querySelector('.contact-email-address').textContent, email);
    }));
  });
  test(locale + ': configured form keeps sendForm parameters, sending state, failure input and success reset without sending email', async () => {
    const originalSend = emailjs.sendForm;
    const calls = [];
    let pending;
    emailjs.sendForm = (...args) => {
      calls.push(args);
      return new Promise((resolve, reject) => { pending = { resolve, reject }; });
    };
    try {
      await withSettings(placeholders, () => mounted(locale, async window => {
        const doc = window.document;
        const form = doc.querySelector('.contact-form');
        assert.equal(form.checkValidity(), false);
        doc.querySelector('[name="name"]').value = 'Local check';
        doc.querySelector('[name="email"]').value = 'local-check@example.invalid';
        doc.querySelector('[name="message"]').value = 'No real message is sent';
        assert.equal(form.checkValidity(), true);
        await React.act(async () => form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })));
        assert.equal(doc.querySelector('button').disabled, true);
        assert.equal(doc.querySelector('button').textContent, translations[locale].contact.sending);
        assert.deepEqual([calls[0][0], calls[0][1], calls[0][3]], placeholders);
        assert.equal(calls[0][2], form);
        await React.act(async () => pending.reject(new Error('Simulated send failure')));
        assert.ok(doc.querySelector('.status-message.fail').textContent.includes(translations[locale].contact.fail));
        assert.equal(doc.querySelector('[name="message"]').value, 'No real message is sent');
        assert.equal(doc.querySelector('button').disabled, false);
        await React.act(async () => form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })));
        await React.act(async () => pending.resolve());
        assert.equal(calls.length, 2);
        assert.ok(doc.querySelector('.status-message.success').textContent.includes(translations[locale].contact.success));
        assert.equal(doc.querySelector('[name="message"]').value, '');
      }));
    } finally { emailjs.sendForm = originalSend; }
  });
}