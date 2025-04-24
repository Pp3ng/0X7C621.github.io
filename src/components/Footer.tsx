import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div>&copy; {year} ZLP & NJR's Album. All rights reserved.</div>
        <div>
          Made with memories
          <span className="flower">🌷</span>
          <span className="flower">🌸</span>
          <span className="flower">🌺</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
