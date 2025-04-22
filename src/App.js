import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import logo from './logo.svg';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{t('greeting')}</h1>
        <p>{t('description')}</p>
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => i18n.changeLanguage('ko')}>🇰🇷 한국어</button>
          <button onClick={() => i18n.changeLanguage('ja')}>🇯🇵 日本語</button>
        </div>
      </header>
    </div>
  );
}

export default App;
