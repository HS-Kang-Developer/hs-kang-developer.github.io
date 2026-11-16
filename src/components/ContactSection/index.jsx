import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import './style.css';

const contactEmail = 'audentia16@gmail.com';

function ContactSection() {
  const { t } = useTranslation();
  const formRef = useRef();
  const [copyStatus, setCopyStatus] = useState('idle');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'fail'
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const hasEmailConfig = [serviceId, templateId, publicKey].every(
    value => typeof value === 'string' && value.trim().length > 0
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyStatus('success');
    } catch {
      setCopyStatus('fail');
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!hasEmailConfig) return;
    setStatus('loading');

    emailjs
      .sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
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

        {hasEmailConfig ? (
          <>
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
          </>
        ) : (
          <div className="contact-card" aria-describedby="contact-direct-description">
            <p id="contact-direct-description" className="contact-direct-description">
              {t('contact.directDescription')}
            </p>
            <p className="contact-email-address">{contactEmail}</p>
            <div className="contact-card-actions">
              <a href={`mailto:${contactEmail}`} className="contact-email-action">
                {t('contact.openEmailApp')}
              </a>
              <button type="button" className="contact-copy-action" onClick={copyEmail}>
                {t('contact.copyEmail')}
              </button>
            </div>
            <p className="contact-email-hint">{t('contact.emailAppHint')}</p>
            <p className="contact-copy-status" role="status" aria-live="polite" aria-atomic="true" data-status={copyStatus}>
              {copyStatus === 'success' && t('contact.copySuccess')}
              {copyStatus === 'fail' && t('contact.copyFail')}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ContactSection;
