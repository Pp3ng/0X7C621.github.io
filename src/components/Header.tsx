import React, { useEffect,  useRef } from "react";

const Header: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const titleText = "Welcome to\nZLP & NJR's Album!";

    if (titleRef.current) {
      const element = titleRef.current;
      const speed = 150;
      let i = 0;

      element.innerHTML =
        '<span class="text"></span><span class="cursor"></span>';
      const textElement = element.querySelector(".text");
      const cursor = element.querySelector(".cursor");

      function type() {
        if (i < titleText.length && textElement) {
          textElement.textContent += titleText.charAt(i);
          i++;
          setTimeout(type, speed);
        } else if (cursor) {
          cursor.classList.add("done");
          // Show subtitle with a delay after typing completes
        }
      }

      type();
    }

    return () => {
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-content">
        <div className="typewriter">
          <h1 ref={titleRef} className="header-title"></h1>
        </div>
        <div className="header-decoration">
          <div className="decoration-line left"></div>
          <span className="decoration-icon">🐱</span>
          <span className="decoration-icon">🐶</span>
          <div className="decoration-line right"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
