import styles from "./medialightbox.module.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";

export const MediaLightbox = ({ items, initialIndex = 0, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goNext, goPrev, onClose]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) goNext();
      else goPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || !items || items.length === 0) return null;

  const current = items[currentIndex];

  const content = (
    <div
      className={styles.lightboxOverlay}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button className={styles.closeBtn} onClick={onClose}>
        <MdClose />
      </button>

      <div className={styles.counter}>
        {currentIndex + 1} / {items.length}
      </div>

      {items.length > 1 && (
        <button
          className={`${styles.navBtn} ${styles.navLeft}`}
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
        >
          <MdChevronLeft />
        </button>
      )}

      <div
        className={styles.mediaContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {current.type === "video" ? (
          <video
            key={current.src}
            className={styles.mediaContent}
            controls
            autoPlay
            playsInline
          >
            <source src={current.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            key={current.src}
            className={styles.mediaContent}
            src={current.src}
            alt={current.label || "Media preview"}
          />
        )}
        {current.label && (
          <p className={styles.mediaLabel}>{current.label}</p>
        )}
      </div>

      {items.length > 1 && (
        <button
          className={`${styles.navBtn} ${styles.navRight}`}
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
        >
          <MdChevronRight />
        </button>
      )}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("root"));
};
