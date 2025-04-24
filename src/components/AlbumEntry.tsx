import React, { useEffect, useRef } from "react";

interface AlbumEntryProps {
  title: string;
  description?: string;
  images: string[];
  mapUrl?: string;
  date: string;
}

const AlbumEntry: React.FC<AlbumEntryProps> = ({
  title,
  description,
  images,
  mapUrl,
  date,
}) => {
  const entryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entryRef.current) {
            entryRef.current.style.opacity = "1";
            entryRef.current.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    if (entryRef.current) {
      observer.observe(entryRef.current);
    }

    return () => {
      if (entryRef.current) {
        observer.unobserve(entryRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (entryRef.current) {
        const rect = entryRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        entryRef.current.style.transform = `
          perspective(1000px)
          rotateY(${(x - rect.width / 2) / 90}deg)
          rotateX(${-(y - rect.height / 2) / 90}deg)
        `;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="album-entry"
      ref={entryRef}
      style={{
        opacity: 0,
        transform: "translateY(50px)",
        transition: "opacity 0.5s, transform 0.5s",
      }}
    >
      <h2>{title}</h2>
      {description && <p>{description}</p>}

      <div className="image-gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title} ${index + 1}`}
            loading="lazy"
            className="glow-effect"
            onLoad={(e) => (e.target as HTMLElement).classList.add("loaded")}
          />
        ))}
      </div>

      {mapUrl && (
        <iframe
          className="journey-map"
          src={mapUrl}
          allowFullScreen
          loading="lazy"
          title={`Map for ${title}`}
        />
      )}

      <div className="date-label">{date}</div>
    </div>
  );
};

export default AlbumEntry;
