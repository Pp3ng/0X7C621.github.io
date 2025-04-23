import React, { useState, useEffect, useRef } from "react";

const LoveTimer: React.FC = () => {
  const [timeValues, setTimeValues] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const updateLoveTimer = () => {
      const startDate = new Date("2024-06-21T01:30:00");
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeValues({ days, hours, minutes, seconds });

      if (seconds === 0 && minutes % 10 === 0) {
        miniCelebration();
      }
    };

    updateLoveTimer();
    const interval = setInterval(updateLoveTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && isHovered) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        containerRef.current.style.transform = `perspective(1000px)
           rotateY(${x * 10}deg) 
           rotateX(${y * -10}deg)
           translateZ(20px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  const resetTransform = () => {
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 0.5s ease-out";
      containerRef.current.style.transform =
        "perspective(1000px) rotateY(0) rotateX(0) translateZ(0)";
      setTimeout(() => {
        if (containerRef.current) containerRef.current.style.transition = "";
      }, 500);
    }
  };

  const miniCelebration = () => {
    if (containerRef.current) {
      containerRef.current.classList.add("pulse-effect");
      setTimeout(() => {
        if (containerRef.current)
          containerRef.current.classList.remove("pulse-effect");
      }, 1000);
    }
  };

  const celebration = () => {
    try {
      const confetti = (window as any).confetti;
      if (confetti) {
        const colors = ["#ff6b6b", "#4ecdc4", "#ffbe76", "#ff7979"];

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: colors,
          shapes: ["circle", "square"],
          ticks: 200,
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          });

          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          });
        }, 250);

        for (let i = 0; i < 15; i++) {
          setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.textContent = "❤";
            heart.style.left = `${Math.random() * window.innerWidth}px`;
            heart.style.top = `${
              containerRef.current?.getBoundingClientRect().top || 0
            }px`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
          }, i * 150);
        }
      }
    } catch (error) {
      console.error("Could not run confetti:", error);
    }
  };

  const specialCelebration = () => {
    try {
      const confetti = (window as any).confetti;
      if (confetti) {
        const duration = 8 * 1000;
        const animationEnd = Date.now() + duration;
        const colors = [
          "#ff6b6b",
          "#4ecdc4",
          "#ffbe76",
          "#ff7979",
          "#a29bfe",
          "#74b9ff",
          "#fd79a8",
        ];

        confetti({
          particleCount: 200,
          spread: 160,
          origin: { y: 0.6, x: 0.5 },
          colors: colors,
          shapes: ["circle", "square", "star"],
          ticks: 300,
          gravity: 0.5,
        });

        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 70,
            origin: { x: 0, y: 0.5 },
            colors: colors,
            startVelocity: 40,
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 70,
            origin: { x: 1, y: 0.5 },
            colors: colors,
            startVelocity: 40,
          });
          confetti({
            particleCount: 80,
            angle: 180,
            spread: 70,
            origin: { x: 0.5, y: 0 },
            colors: colors,
            startVelocity: 40,
          });
          confetti({
            particleCount: 80,
            angle: 0,
            spread: 70,
            origin: { x: 0.5, y: 1 },
            colors: colors,
            startVelocity: 40,
          });
        }, 500);

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            particleCount: Math.floor(particleCount),
            spread: 80,
            origin: {
              x: Math.random(),
              y: Math.random() * 0.5 + 0.3,
            },
            colors: colors,
            disableForReducedMotion: true,
          });
        }, 400);

        for (let i = 0; i < 30; i++) {
          setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.textContent = ["❤", "💖", "💕", "💗", "💓", "💘"][
              Math.floor(Math.random() * 6)
            ];
            heart.style.fontSize = `${Math.random() * 20 + 15}px`;
            heart.style.left = `${Math.random() * window.innerWidth}px`;
            heart.style.top = `${
              containerRef.current?.getBoundingClientRect().top || 0
            }px`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
          }, i * 100);
        }

        if (containerRef.current) {
          containerRef.current.style.animation = "pulse 0.5s infinite";
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.animation = "";
            }
          }, 4000);
        }
      }
    } catch (error) {
      console.error("Could not run special confetti:", error);
    }
  };

  const handleClick = () => {
    const newClickCount = (clickCount + 1) % 4;
    setClickCount(newClickCount);

    if (newClickCount === 0) {
      specialCelebration();
    } else {
      celebration();
    }
  };

  const calculateMilestones = () => {
    const startDate = new Date("2024-06-21T01:30:00");
    const now = new Date();
    const daysDiff = Math.floor(
      (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const milestones = [10, 30, 50, 100, 365, 500, 1000];
    const nextMilestone = milestones.find((m) => m > daysDiff) || daysDiff + 10;
    const daysToNextMilestone = nextMilestone - daysDiff;

    return {
      daysPassed: daysDiff,
      nextMilestone,
      daysToNextMilestone,
    };
  };

  const getTimeDigits = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  const triggerDigitAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    triggerDigitAnimation();
  }, [timeValues.seconds]);

  const milestoneData = calculateMilestones();

  return (
    <div
      className={`love-timer ${isHovered ? "hovered" : ""} ${
        isAnimating ? "second-change" : ""
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetTransform();
      }}
      ref={containerRef}
    >
      <div className="love-timer-decoration left"></div>
      <div className="love-timer-decoration right"></div>

      <h2 className="timer-title">
        <span className="timer-icon">❤️</span>
        Our Love Timer
        <span className="timer-icon">❤️</span>
      </h2>

      <div className="timer-container">
        <div className="time-block days-block">
          <div className="time-value">{getTimeDigits(timeValues.days)}</div>
          <div className="time-label">days</div>
          <div className="time-block-decoration"></div>
        </div>
        <div className="time-separator">:</div>
        <div className="time-block hours-block">
          <div className="time-value">{getTimeDigits(timeValues.hours)}</div>
          <div className="time-label">hours</div>
          <div className="time-block-decoration"></div>
        </div>
        <div className="time-separator">:</div>
        <div className="time-block minutes-block">
          <div className="time-value">{getTimeDigits(timeValues.minutes)}</div>
          <div className="time-label">minutes</div>
          <div className="time-block-decoration"></div>
        </div>
        <div className="time-separator">:</div>
        <div className="time-block seconds-block">
          <div className="time-value">{getTimeDigits(timeValues.seconds)}</div>
          <div className="time-label">seconds</div>
          <div className="time-block-decoration"></div>
        </div>
      </div>

      <div className="milestone-message">
        <p className="current-milestone">
          {milestoneData.daysPassed === 0
            ? "Our journey begins today! ❤️"
            : `We've been together for ${milestoneData.daysPassed} days!`}
        </p>
        <p className="next-milestone">
          {milestoneData.daysToNextMilestone > 0 &&
            `${milestoneData.daysToNextMilestone} days until our ${milestoneData.nextMilestone} day anniversary!`}
        </p>
      </div>

      <div className="timer-footer">Click for celebration ✨</div>
    </div>
  );
};

export default LoveTimer;
