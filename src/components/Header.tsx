import React, { useEffect, useRef, useState } from "react";

const Header: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [catEmoji, setCatEmoji] = useState("🐱");
  const [dogEmoji, setDogEmoji] = useState("🐶");

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

    return () => {};
  }, []);

  const catEmojis = ["🐱", "😺", "😸", "😻", "😽", "🙀", "😹"];

  const dogEmojis = ["🐶", "🦮", "🐕‍🦺", "🐩", "🐕", "🦴", "🐾"];

  const handleCatClick = () => {
    const randomIndex = Math.floor(Math.random() * catEmojis.length);
    setCatEmoji(catEmojis[randomIndex]);
    playEmojiFx("cat");
  };

  const handleDogClick = () => {
    const randomIndex = Math.floor(Math.random() * dogEmojis.length);
    setDogEmoji(dogEmojis[randomIndex]);
    playEmojiFx("dog");
  };

  const playEmojiFx = (type: string) => {
    const emojiElement = document.querySelector(`.decoration-icon.${type}`);
    if (emojiElement) {
      emojiElement.classList.add("pulse-effect");
      setTimeout(() => {
        emojiElement.classList.remove("pulse-effect");
      }, 500);
    }
  };

  return (
    <header className="site-header">
      <div className="header-content">
        <div className="typewriter">
          <h1 ref={titleRef} className="header-title"></h1>
        </div>
        <div className="header-decoration">
          <div className="decoration-line left"></div>
          <span
            className="decoration-icon cat"
            onClick={handleCatClick}
            title="Click me!"
          >
            {catEmoji}
          </span>
          <span
            className="decoration-icon dog"
            onClick={handleDogClick}
            title="Click me too!"
          >
            {dogEmoji}
          </span>
          <div className="decoration-line right"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
