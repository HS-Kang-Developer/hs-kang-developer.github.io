import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import './style.css';

function ContactSection() {
  const { t } = useTranslation();
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'fail'

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('loading');

    emailjs
      .sendForm(
        'service_5lrdhkc',
        'template_7rhigoo',
        formRef.current,
        '5M6pIempBtogTDh3F'
      )
      .then(
        () => {
          setStatus('success');
          formRef.current.reset();
          setTimeout(() => setStatus('idle'), 3000);
        },
        () => {
          setStatus('fail');
          setTimeout(() => setStatus('idle'), 3000);
        }
      );
  };

  return (
    <div className="contact-section-wrapper">
      <section id="contact" className="contact-section">
        <h2>{t('contact.title')}</h2>

        <form ref={formRef} onSubmit={sendEmail} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder={t('contact.name')}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t('contact.email')}
            required
          />
          <textarea
            name="message"
            placeholder={t('contact.message')}
            required
          />

          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading'
              ? t('contact.sending')
              : t('contact.send')}
          </button>
        </form>

        {status === 'success' && (
          <p className="status-message success">✅ {t('contact.success')}</p>
        )}
        {status === 'fail' && (
          <p className="status-message fail">❌ {t('contact.fail')}</p>
        )}
      </section>
    </div>
  );
}

export default ContactSection;
