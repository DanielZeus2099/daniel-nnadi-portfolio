import styles from "./medialightbox.module.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { MdClose, MdChevronLeft, MdChevronRight, MdZoomIn, MdZoomOut } from "react-icons/md";
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
  const pointerDownOnOverlayRef = useRef(false);
  const lastTapRef = useRef({ time: 0, x: 0, y: 0 });
  const touchStartDataRef = useRef({ time: 0, x: 0, y: 0, hasMoved: false });

  const isZoomedRef = useRef(isZoomed);
  useEffect(() => {
    isZoomedRef.current = isZoomed;
    if (isZoomed) {
      touchStartX.current = null;
      touchEndX.current = null;
    }
  }, [isZoomed]);

  // Keep stable reference to onClose to prevent popstate effect re-running
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setPage([initialIndex, 0]);
      setIsZoomed(false);
      mountTimeRef.current = Date.now();
      pointerDownOnOverlayRef.current = false;
      lastTapRef.current = { time: 0, x: 0, y: 0 };
    }
  }, [isOpen, initialIndex]);

  // Reset zoom when navigating between slides
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  // Handle phone hardware/browser Back button to close lightbox
  useEffect(() => {
    if (!isOpen) return;

    let poppedByBack = false;
    window.history.pushState({ lightbox: true }, "");

    const handlePopState = () => {
      poppedByBack = true;
      if (onCloseRef.current) {
        onCloseRef.current();
      }
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
  }, [isOpen]);

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

  // Swipe navigation on overlay (strictly disabled when zoomed)
  const handleTouchStart = (e) => {
    if (isZoomedRef.current || e.touches.length !== 1) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    if (isZoomedRef.current || e.touches.length !== 1) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isZoomedRef.current || touchStartX.current === null || touchEndX.current === null) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) goNext();
      else goPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const toggleZoom = useCallback((e) => {
    if (e) e.stopPropagation();
    setIsZoomed((prev) => !prev);
  }, []);

  // Image touch handlers: distinguishes taps from panning drag
  // While zoomed in, stops event propagation so overlay never receives swipe/pan moves
  const handleImageTouchStart = (e) => {
    if (isZoomedRef.current) {
      e.stopPropagation();
    }
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStartDataRef.current = {
        time: Date.now(),
        x: touch.clientX,
        y: touch.clientY,
        hasMoved: false,
      };
    } else {
      touchStartDataRef.current.hasMoved = true;
    }
  };

  const handleImageTouchMove = (e) => {
    if (isZoomedRef.current) {
      e.stopPropagation();
    }
    if (e.touches.length === 1 && !touchStartDataRef.current.hasMoved) {
      const touch = e.touches[0];
      const dist = Math.hypot(
        touch.clientX - touchStartDataRef.current.x,
        touch.clientY - touchStartDataRef.current.y
      );
      if (dist > 8) {
        touchStartDataRef.current.hasMoved = true;
      }
    }
  };

  const handleImageTouchEnd = (e) => {
    if (isZoomedRef.current) {
      e.stopPropagation();
    }

    // If user dragged to pan, it is not a tap - do not trigger double-tap zoom
    if (touchStartDataRef.current.hasMoved) {
      return;
    }

    const duration = Date.now() - touchStartDataRef.current.time;
    if (duration > 320) {
      return;
    }

    const now = Date.now();
    const timeDiff = now - lastTapRef.current.time;
    const dist = Math.hypot(
      touchStartDataRef.current.x - lastTapRef.current.x,
      touchStartDataRef.current.y - lastTapRef.current.y
    );

    if (timeDiff > 40 && timeDiff < 380 && dist < 40) {
      // Recognized genuine double tap!
      if (e.cancelable) e.preventDefault();
      setIsZoomed((prev) => !prev);
      lastTapRef.current = { time: 0, x: 0, y: 0 };
    } else {
      lastTapRef.current = {
        time: now,
        x: touchStartDataRef.current.x,
        y: touchStartDataRef.current.y,
      };
    }
  };

  const handleImageDoubleClick = (e) => {
    e.stopPropagation();
    setIsZoomed((prev) => !prev);
  };

  // Safe overlay click handler
  // Only closes if pointerdown started directly on the overlay AND ended on the overlay
  // Eliminates synthetic ghost-clicks generated by the tap that opened the lightbox
  const handleOverlayPointerDown = (e) => {
    if (e.target === e.currentTarget) {
      pointerDownOnOverlayRef.current = true;
    } else {
      pointerDownOnOverlayRef.current = false;
    }
  };

  const handleOverlayClick = (e) => {
    const isGenuineClick = pointerDownOnOverlayRef.current;
    pointerDownOnOverlayRef.current = false;

    if (Date.now() - mountTimeRef.current < 350) {
      return;
    }

    if (isGenuineClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !items || items.length === 0) return null;

  const current = items[currentIndex];
  const isImage = current.type !== "video";

  const content = (
    <div
      className={styles.lightboxOverlay}
      onPointerDown={handleOverlayPointerDown}
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

      {isImage && (
        <button
          className={styles.zoomToggleBtn}
          onClick={toggleZoom}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          title={isZoomed ? "Zoom out (or double-tap)" : "Zoom in (or double-tap)"}
        >
          {isZoomed ? <MdZoomOut /> : <MdZoomIn />}
        </button>
      )}

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
        <div className={styles.mediaWrapper}>
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
                <motion.div
                  drag={isZoomed}
                  dragMomentum={false}
                  dragConstraints={{ left: -380, right: 380, top: -280, bottom: 280 }}
                  dragElastic={0.08}
                  animate={{
                    scale: isZoomed ? 2.4 : 1,
                    x: isZoomed ? undefined : 0,
                    y: isZoomed ? undefined : 0,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  style={{
                    cursor: isZoomed ? "grab" : "zoom-in",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    touchAction: "none",
                  }}
                  whileDrag={{ cursor: "grabbing" }}
                  onTouchStart={handleImageTouchStart}
                  onTouchMove={handleImageTouchMove}
                  onTouchEnd={handleImageTouchEnd}
                  onDoubleClick={handleImageDoubleClick}
                >
                  <img
                    className={styles.mediaContent}
                    src={current.src}
                    alt={current.label || "Media preview"}
                    draggable={false}
                    title="Double-tap or double-click to zoom in/out"
                  />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {current.label && (
          <p className={styles.mediaLabel}>
            {current.label}
            {isImage && (
              <span style={{ display: "block", fontSize: "1.1rem", opacity: 0.6, marginTop: 4 }}>
                {isZoomed
                  ? "Double-tap to zoom out • Drag to pan"
                  : "Double-tap to zoom in"}
              </span>
            )}
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
