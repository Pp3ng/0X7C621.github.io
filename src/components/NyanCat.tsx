import React, { useEffect, useState, useRef } from "react";

const NyanCat: React.FC = () => {
  const [isRotating, setIsRotating] = useState(false);
  const catRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const speed = 2;
    let angle = Math.random() * 2 * Math.PI;
    let catX = Math.random() * (window.innerWidth - 150);
    let catY = Math.random() * (window.innerHeight - 150);

    const updateNyanCatPosition = () => {
      if (catRef.current) {
        catX += speed * Math.cos(angle);
        catY += speed * Math.sin(angle);

        // 碰到边界反弹
        if (catX + 150 > window.innerWidth || catX < 0) {
          angle = Math.PI - angle;
        }
        if (catY + 150 > window.innerHeight || catY < 0) {
          angle = -angle;
        }

        catRef.current.style.left = `${catX}px`;
        catRef.current.style.top = `${catY}px`;

        animationRef.current = requestAnimationFrame(updateNyanCatPosition);
      }
    };

    animationRef.current = requestAnimationFrame(updateNyanCatPosition);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    setIsRotating(!isRotating);
  };

  return (
    <img
      ref={catRef}
      src="/nyancat.gif"
      alt="Nyan Cat"
      className={`nyan-cat ${isRotating ? "rotating" : ""}`}
      onClick={handleClick}
    />
  );
};

export default NyanCat;
