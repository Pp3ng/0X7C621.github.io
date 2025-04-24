import React, { useEffect, useState, useRef } from "react";

const NyanCat: React.FC = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [isFlying, setIsFlying] = useState(true);
  const [isTurboMode, setIsTurboMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const catRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Nyan Cat movement
    let speed = 2;
    let angle = Math.random() * 2 * Math.PI;
    let catX = Math.random() * (window.innerWidth - 150);
    let catY = Math.random() * (window.innerHeight - 150);

    // Main function for Nyan Cat movement
    const updateNyanCatPosition = () => {
      if (catRef.current) {
        // Adjust speed based on acceleration mode
        const currentSpeed = isTurboMode ? speed * 2.5 : speed;

        catX += currentSpeed * Math.cos(angle);
        catY += currentSpeed * Math.sin(angle);

        // Boundary collision detection and bounce
        if (catX + 150 > window.innerWidth || catX < 0) {
          angle = Math.PI - angle;
          // Create stars effect on collision with wall
          createStars(5);
        }
        if (catY + 150 > window.innerHeight || catY < 0) {
          angle = -angle;
          // Create stars effect on collision with wall
          createStars(5);
        }

        catRef.current.style.left = `${catX}px`;
        catRef.current.style.top = `${catY}px`;

        // Probability for random direction change
        if (Math.random() < 0.005) {
          angle += ((Math.random() - 0.5) * Math.PI) / 2;
        }

        animationRef.current = requestAnimationFrame(updateNyanCatPosition);
      }
    };

    animationRef.current = requestAnimationFrame(updateNyanCatPosition);

    // Randomly create stars in Turbo mode
    const turboStarsInterval = setInterval(() => {
      if (isTurboMode) {
        createStars(2);
      }
    }, 300);

    // Handle window resize
    const handleResize = () => {
      if (catRef.current) {
        // Make sure the cat doesn't go off screen
        catX = Math.min(catX, window.innerWidth - 150);
        catY = Math.min(catY, window.innerHeight - 150);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(turboStarsInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isTurboMode]);

  // Function to create star elements
  const createStars = (count: number) => {
    if (!starsRef.current) return;

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // Set random size and position for the star
      const size = Math.random() * 5 + 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      const catRect = catRef.current?.getBoundingClientRect();
      if (catRect) {
        const x = catRect.x + Math.random() * catRect.width;
        const y = catRect.y + Math.random() * catRect.height;
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
      }

      starsRef.current.appendChild(star);

      // Remove star after a certain time
      setTimeout(() => {
        if (starsRef.current?.contains(star)) {
          starsRef.current.removeChild(star);
        }
      }, 1000 + Math.random() * 1000);
    }
  };

  // Function to create musical note elements
  const createMusicNotes = () => {
    if (!containerRef.current || !catRef.current) return;

    const catRect = catRef.current.getBoundingClientRect();
    const notes = ["♪", "♫", "♬", "♩", "♭", "♮"];

    for (let i = 0; i < 3; i++) {
      const note = document.createElement("div");
      note.className = "music-note";
      note.textContent = notes[Math.floor(Math.random() * notes.length)];

      // Random position, rotation and floating direction
      const x = catRect.right - 30;
      const y = catRect.top + Math.random() * 30;
      note.style.left = `${x}px`;
      note.style.top = `${y}px`;
      note.style.setProperty("--x", `${(Math.random() - 0.5) * 40}px`);
      note.style.setProperty("--r", `${(Math.random() - 0.5) * 40}deg`);

      containerRef.current.appendChild(note);

      // Remove note after animation ends
      setTimeout(() => {
        if (containerRef.current?.contains(note)) {
          containerRef.current.removeChild(note);
        }
      }, 2000);
    }
  };

  // Click event handler
  const handleClick = () => {
    // Update click count
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    // Toggle rotation state
    setIsRotating(!isRotating);

    // Create star effects
    createStars(10);

    // Create music note effects
    createMusicNotes();

    // Enter/exit Turbo mode after every 5 consecutive clicks
    if (newClickCount % 5 === 0) {
      setIsTurboMode(!isTurboMode);
    }
  };

  // Double click handler
  const handleDoubleClick = () => {
    // Toggle flying animation
    setIsFlying(!isFlying);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <div ref={starsRef}></div>
      <img
        ref={catRef}
        src="/nyancat.gif"
        alt="Nyan Cat"
        className={`nyan-cat ${isRotating ? "rotating" : ""} ${
          isFlying ? "flying" : ""
        } ${isTurboMode ? "turbo-mode" : ""}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={{ pointerEvents: "auto" }}
      />
    </div>
  );
};

export default NyanCat;
