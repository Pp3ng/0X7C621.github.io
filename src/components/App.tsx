import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import LoveTimer from "./LoveTimer";
import AlbumEntry from "./AlbumEntry";
import Footer from "./Footer";
import NyanCat from "./NyanCat";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Page loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "❤";
      heart.style.left = `${Math.random() * window.innerWidth}px`;
      heart.style.top = `${window.innerHeight}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    };

    const heartInterval = setInterval(createHeart, 300);

    const handleScroll = () => {
      const scrollProgress = document.querySelector(
        ".scroll-progress"
      ) as HTMLElement;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${scrolled / scrollable})`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(heartInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="page-loader">
          <div className="loader-heart">❤️</div>
          <div className="loader-text">Loading memories...</div>
        </div>
      )}

      <div className="scroll-progress"></div>
      <canvas id="confetti-canvas" ref={confettiCanvasRef}></canvas>
      <div className="container">
        <Header />
        <LoveTimer />

        {/* 移除惊喜按钮 */}

        <AlbumEntry
          title="First Memory"
          description="The first time ever I saw your face, I saw the sun rise in your eyes, and the moon and stars were the gift you gave to the dark and empty skies."
          images={["/photos/firstmemory/SHY.jpg"]}
          date="2023.02.02"
        />

        <AlbumEntry
          title="HONG KONG journey"
          images={[
            "/photos/hongkong/hongkong1.jpg",
            "/photos/hongkong/hongkong2.jpg",
          ]}
          mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236161.91654014084!2d114.0084042151371!3d22.35573121670782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403e2eda332980f%3A0xf08ab3badbeac97c!2sHong%20Kong!5e0!3m2!1sen!2s!4v1625308876452!5m2!1sen!2s"
          date="2024.06"
        />

        <AlbumEntry
          title="Liao Ning journey"
          images={[
            "/photos/liaoning/liaoning1.jpg",
            "/photos/liaoning/liaoning2.jpg",
          ]}
          mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5921373.996708418!2d118.27080754775716!3d41.29426075258454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35e8d0d7e1a1c1b1%3A0x5e3b4e7f0c064f2c!2sLiaoning%2C%20China!5e0!3m2!1sen!2s!4v1625308987654!5m2!1sen!2s"
          date="2024.08"
        />

        <AlbumEntry
          title="Seoul journey"
          images={["/photos/seoul/seoul1.jpg", "/photos/seoul/seoul2.jpg"]}
          mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202405.92701130618!2d126.8474699639411!3d37.56468403676705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d5c39cf%3A0x7e11eca1405bf29b!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2s!4v1625309098765!5m2!1sen!2s"
          date="2024.09"
        />

        <AlbumEntry
          title="Busan journey"
          images={["/photos/busan/busan1.jpg", "/photos/busan/busan2.jpg"]}
          mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236161.91654014084!2d129.0754784!3d35.1795542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c22e1d58d7de1%3A0x540b8cc40f57f2d8!2sBusan!5e0!3m2!1sen!2s!4v1670492055911!5m2!1sen!2s"
          date="2024.11"
        />

        <Footer />
      </div>

      <NyanCat />
    </>
  );
};

export default App;
