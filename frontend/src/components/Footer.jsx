import React from 'react';

function Footer() {
  return (
    <footer>
      <p className="copyright">
        © {new Date().getFullYear()} &nbsp;
        <a href="https://akiif.dev/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          @akiif
        </a>
      </p>
    </footer>
  );
}

export default Footer;
