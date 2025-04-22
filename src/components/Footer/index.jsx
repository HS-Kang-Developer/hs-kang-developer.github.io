import React from 'react';
import './style.css';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="logo">HEESOO<span className="accent">KANG</span></span>
      </div>
      <div className="footer-right">
      <img src="/assets/icons/gmail.svg" className="gmail-icon" alt="Gmail Icon" />
        <a href="mailto:audentia16@gmail.com" className="footer-email">audentia16@gmail.com</a>
        {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a> */}
      </div>
    </footer>
  );
}

export default Footer;
