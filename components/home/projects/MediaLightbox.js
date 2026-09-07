import styles from "./medialightbox.module.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";

export const MediaLightbox = ({ items, initialIndex = 0, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Handle phone hardware/browser Back button to close lightbox
  useEffect(() => {
    if (!isOpen) return;

    let poppedByBack = false;
    window.history.pushState({ lightbox: true }, "");

    const handlePopState = () => {
      poppedByBack = true;
      onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (!poppedByBack && window.history.state?.lightbox) {
        if (typeof window !== "undefined") {
          window.__suppressModalClose = true;
          window.history.back();
          setTimeout(() => {
            window.__suppressModalClose = false;
          }, 300);
        }
      }
    };
  }, [isOpen, onClose]);

  const goNext = useCallback(() => {
    if (!items || items.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items]);

  const goPrev = useCallback(() => {
    if (!items || items.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items]);

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
    const minSwipeDistance = 40;

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
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close image">
        <MdClose />
      </button>

      {items.length > 1 && (
        <div className={styles.counter}>
          {currentIndex + 1} / {items.length}
        </div>
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
            draggable={false}
          />
        )}
        {current.label && (
          <p className={styles.mediaLabel}>{current.label}</p>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("root"));
};
