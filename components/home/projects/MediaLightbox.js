import styles from "./medialightbox.module.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 250 : -250,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -250 : 250,
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

export const MediaLightbox = ({ items, initialIndex = 0, isOpen, onClose }) => {
  const [[currentIndex, direction], setPage] = useState([initialIndex, 0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const mountTimeRef = useRef(0);
  const lastTapRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      setPage([initialIndex, 0]);
      setIsZoomed(false);
      mountTimeRef.current = Date.now();
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
    setIsZoomed(false);
    setPage(([prev]) => [(prev + 1) % items.length, 1]);
  }, [items]);

  const goPrev = useCallback(() => {
    if (!items || items.length <= 1) return;
    setIsZoomed(false);
    setPage(([prev]) => [(prev - 1 + items.length) % items.length, -1]);
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
    if (isZoomed) return;
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    if (isZoomed) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isZoomed || touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) goNext();
      else goPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const toggleZoom = (e) => {
    if (e) e.stopPropagation();
    setIsZoomed((prev) => !prev);
  };

  // Double tap detection on touch devices
  const handleImageTouchEnd = (e) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      e.preventDefault();
      e.stopPropagation();
      toggleZoom();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  // Safe overlay click that ignores mobile synthetic click right after opening
  const handleOverlayClick = () => {
    if (Date.now() - mountTimeRef.current < 350) {
      return;
    }
    onClose();
  };

  if (!isOpen || !items || items.length === 0) return null;

  const current = items[currentIndex];

  const content = (
    <div
      className={styles.lightboxOverlay}
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        className={styles.closeBtn}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close image"
      >
        <MdClose />
      </button>

      {items.length > 1 && (
        <div className={styles.counter}>
          {currentIndex + 1} / {items.length}
        </div>
      )}

      {items.length > 1 && (
        <button
          className={`${styles.navBtn} ${styles.navLeft}`}
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
        >
          <MdChevronLeft />
        </button>
      )}

      <div
        className={styles.mediaContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "0.8rem" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {current.type === "video" ? (
                <video
                  className={styles.mediaContent}
                  controls
                  autoPlay
                  playsInline
                >
                  <source src={current.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <motion.img
                  className={styles.mediaContent}
                  src={current.src}
                  alt={current.label || "Media preview"}
                  draggable={false}
                  animate={{
                    scale: isZoomed ? 2.5 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    cursor: isZoomed ? "zoom-out" : "zoom-in",
                    transformOrigin: "center center",
                  }}
                  onDoubleClick={toggleZoom}
                  onTouchEnd={handleImageTouchEnd}
                  title="Double-tap or double-click to zoom in/out"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {current.label && (
          <p className={styles.mediaLabel}>
            {current.label}
            <span style={{ display: "block", fontSize: "1.1rem", opacity: 0.6, marginTop: 4 }}>
              {isZoomed ? "Double-tap to zoom out" : "Double-tap to zoom in"}
            </span>
          </p>
        )}
      </div>

      {items.length > 1 && (
        <button
          className={`${styles.navBtn} ${styles.navRight}`}
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
        >
          <MdChevronRight />
        </button>
      )}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("root"));
};
