import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer>&copy; {year} ZLP & NJR's Album. All rights reserved. 🌷</footer>
  );
};

export default Footer;
