// Footer.jsx
import React from 'react';
import '../'

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Alusa Fitness. All rights reserved.</p>
      <ul className="footer-links">
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
      </ul>
    </footer>
  );
};

export default Footer;