import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MediaLightbox } from "../projects/MediaLightbox";
import styles from "./artmodal.module.scss";

export const ArtModal = ({ item, isOpen, onClose }) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndX = useRef(null);
  const touchEndY = useRef(null);
  const isSwiping = useRef(false);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  // Active media list for this specific project
  const mediaList =
    item?.mediaList && item.mediaList.length > 0
      ? item.mediaList
      : item
      ? [{ type: item.type, src: item.cover, poster: item.poster, label: item.title }]
      : [];

  const imageList = useMemo(() => {
    return mediaList.filter((m) => m.type !== "video");
  }, [mediaList]);

  const hasMultipleMedia = mediaList.length > 1;
  const currentMedia = mediaList[selectedMediaIndex] || mediaList[0];

  // Reset media index and lightbox state whenever a new item is opened
  useEffect(() => {
    setSelectedMediaIndex(0);
    setLightboxOpen(false);
    setLightboxIndex(0);
  }, [item]);

  // Navigate ONLY between media linked to the current project
  const handlePrevMedia = useCallback(() => {
    if (!hasMultipleMedia) return;
    setSelectedMediaIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  }, [hasMultipleMedia, mediaList.length]);

  const handleNextMedia = useCallback(() => {
    if (!hasMultipleMedia) return;
    setSelectedMediaIndex((prev) => (prev + 1) % mediaList.length);
  }, [hasMultipleMedia, mediaList.length]);

  // Expand image into MediaLightbox (matching game image media behavior)
  const handleImageClick = () => {
    if (isSwiping.current) return;
    if (imageList.length === 0) return;
    const idx = imageList.findIndex((img) => img.src === currentMedia.src);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  // Lock page scroll and prevent scroll chaining (matches game ProjectModal behavior)
  useEffect(() => {
    if (!isOpen) return;

    const body = document.body.style;
    const html = document.documentElement.style;
    const original = {
      bodyOverflow: body.overflow,
      htmlOverflow: html.overflow,
      bodyOverscroll: body.overscrollBehavior,
      htmlOverscroll: html.overscrollBehavior,
    };

    body.overflow = "hidden";
    html.overflow = "hidden";
    body.overscrollBehavior = "contain";
    html.overscrollBehavior = "contain";

    const restore = () => {
      body.overflow = original.bodyOverflow;
      html.overflow = original.htmlOverflow;
      body.overscrollBehavior = original.bodyOverscroll;
      html.overscrollBehavior = original.htmlOverscroll;
    };

    const overlayEl = overlayRef.current;
    if (!overlayEl) return restore;

    // The art modal has more than one scroll area (overlay on mobile, info panel on desktop).
    // Walk up from the event target and only allow the scroll if some container inside
    // the modal can still move in that direction; otherwise block it so the page stays put.
    const canScroll = (target, deltaY) => {
      let el = target;
      while (el && el !== overlayEl.parentNode) {
        if (el instanceof HTMLElement) {
          const style = window.getComputedStyle(el);
          const scrollable =
            /(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight;
          if (scrollable) {
            const atTop = el.scrollTop <= 0;
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
            if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
          }
        }
        if (el === overlayEl) break;
        el = el.parentNode;
      }
      return false;
    };

    const handleWheel = (e) => {
      if (!canScroll(e.target, e.deltaY)) e.preventDefault();
    };

    let touchStartY = 0;
    const handleTouchStartLock = (e) => {
      if (e.touches.length > 0) touchStartY = e.touches[0].clientY;
    };
    const handleTouchMoveLock = (e) => {
      if (e.touches.length === 0) return;
      // Finger moving down = content scrolling up (negative delta)
      const deltaY = touchStartY - e.touches[0].clientY;
      if (!canScroll(e.target, deltaY) && e.cancelable) e.preventDefault();
    };

    overlayEl.addEventListener("wheel", handleWheel, { passive: false });
    overlayEl.addEventListener("touchstart", handleTouchStartLock, { passive: true });
    overlayEl.addEventListener("touchmove", handleTouchMoveLock, { passive: false });

    return () => {
      restore();
      overlayEl.removeEventListener("wheel", handleWheel);
      overlayEl.removeEventListener("touchstart", handleTouchStartLock);
      overlayEl.removeEventListener("touchmove", handleTouchMoveLock);
    };
  }, [isOpen]);

  // Keyboard listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Lightbox manages its own keys when active
      if (lightboxOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasMultipleMedia) {
        handlePrevMedia();
      } else if (e.key === "ArrowRight" && hasMultipleMedia) {
        handleNextMedia();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, hasMultipleMedia, handlePrevMedia, handleNextMedia, lightboxOpen]);

  // Touch swipe support for switching between grouped media (only active when swiping directly on media)
  const handleTouchStart = (e) => {
    if (!hasMultipleMedia) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = null;
    touchEndY.current = null;
    isSwiping.current = false;
  };

  const handleTouchMove = (e) => {
    if (!hasMultipleMedia) return;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diffX = Math.abs(touchStartX.current - touchEndX.current);
      const diffY = Math.abs((touchStartY.current || 0) - (touchEndY.current || 0));
      if (diffX > 10 && diffX > diffY) {
        isSwiping.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    if (!hasMultipleMedia || touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const diffY = Math.abs((touchStartY.current || 0) - (touchEndY.current || 0));
    if (Math.abs(diff) > 40 && Math.abs(diff) > diffY) {
      if (diff > 0) handleNextMedia();
      else handlePrevMedia();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
    setTimeout(() => {
      isSwiping.current = false;
    }, 100);
  };

  if (!isOpen || !item || !currentMedia) return null;

  const content = (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {/* Close button */}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <MdClose />
          </button>

          <div className={styles.modalBody}>
            {/* Media Column (Left / Top) with Unity Asset Store Style Gallery */}
            <div className={styles.mediaColumn}>
              {/* Main Media Preview Box */}
              <div
                className={styles.mainPreviewWrapper}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Previous Arrow - Only visible if there are multiple media items in this project */}
                {hasMultipleMedia && (
                  <button
                    className={`${styles.navArrow} ${styles.prev}`}
                    onClick={handlePrevMedia}
                    aria-label="Previous media"
                  >
                    <MdChevronLeft />
                  </button>
                )}

                {/* Main Media element: Video or Image */}
                {currentMedia.type === "video" ? (
                  <div className={styles.videoWrapper}>
                    <video
                      key={currentMedia.src}
                      ref={videoRef}
                      src={currentMedia.src}
                      poster={currentMedia.poster || undefined}
                      controls
                      playsInline
                      autoPlay
                      preload="auto"
                    />
                  </div>
                ) : (
                  <div
                    className={styles.imageWrapper}
                    onClick={handleImageClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleImageClick();
                    }}
                    aria-label={`Expand ${item.title} image in full-screen lightbox`}
                    title="Click image to expand in full-screen view"
                  >
                    <img
                      key={currentMedia.src}
                      src={currentMedia.src}
                      alt={item.title}
                    />
                  </div>
                )}

                {/* Next Arrow - Only visible if there are multiple media items in this project */}
                {hasMultipleMedia && (
                  <button
                    className={`${styles.navArrow} ${styles.next}`}
                    onClick={handleNextMedia}
                    aria-label="Next media"
                  >
                    <MdChevronRight />
                  </button>
                )}
              </div>

              {/* Unity Asset Store Style Gallery Strip (Counter Pill + Thumbnails + Dots) */}
              {hasMultipleMedia && (
                <div className={styles.galleryFooter}>
                  {/* Counter Pill e.g. 1/3 */}
                  <div className={styles.counterPill}>
                    {selectedMediaIndex + 1}/{mediaList.length}
                  </div>

                  {/* Horizontal Thumbnail Strip */}
                  <div className={styles.thumbnailStrip}>
                    {mediaList.map((m, idx) => {
                      const isActive = selectedMediaIndex === idx;
                      const isVid = m.type === "video";
                      const thumbImage = m.poster || (isVid ? null : m.src);

                      return (
                        <button
                          key={m.src + idx}
                          type="button"
                          className={`${styles.thumbBtn} ${isActive ? styles.activeThumb : ""}`}
                          onClick={() => {
                            setSelectedMediaIndex(idx);
                          }}
                          aria-label={`View media ${idx + 1}`}
                        >
                          {thumbImage ? (
                            <img src={thumbImage} alt="" className={styles.thumbMedia} />
                          ) : isVid ? (
                            <video
                              src={m.src}
                              preload="metadata"
                              muted
                              className={styles.thumbMedia}
                            />
                          ) : (
                            <img src={m.src} alt="" className={styles.thumbMedia} />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Pagination Dots */}
                  <div className={styles.paginationDots}>
                    {mediaList.map((_, idx) => (
                      <span
                        key={idx}
                        className={`${styles.dot} ${
                          selectedMediaIndex === idx ? styles.activeDot : ""
                        }`}
                        onClick={() => {
                          setSelectedMediaIndex(idx);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Info Section (Right / Bottom) */}
            <div className={styles.infoSection}>
              <h3 className={styles.itemTitle}>{item.title}</h3>

              {/* Tags joined by ' - ' matching game projects */}
              {item.tags && item.tags.length > 0 && (
                <div className={styles.modalTech}>{item.tags.join(" - ")}</div>
              )}

              {/* Tool and Project Type Details (matching game project devInfo block) */}
              <div className={styles.devInfoBlock}>
                <div className={styles.devInfoList}>
                  <div className={styles.devInfoItem}>
                    <span className={styles.devInfoLabel}>Tool:</span>
                    <span className={styles.devInfoValue}>{item.tools?.join(", ")}</span>
                  </div>
                  <div className={styles.devInfoItem}>
                    <span className={styles.devInfoLabel}>Project Type:</span>
                    <span className={styles.devInfoValue}>{item.projectType}</span>
                  </div>
                  <div className={styles.devInfoItem}>
                    <span className={styles.devInfoLabel}>Category:</span>
                    <span className={styles.devInfoValue}>{item.category}</span>
                  </div>
                </div>
              </div>

              <div className={styles.descriptionBox}>
                <h4>Concept & Breakdown</h4>
                <p>{item.longDescription || item.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Fullscreen Lightbox for Images (matching game image media expand behavior) */}
      {imageList.length > 0 && (
        <MediaLightbox
          items={imageList}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </AnimatePresence>
  );

  const rootElement = typeof document !== "undefined" ? document.getElementById("root") : null;
  if (!rootElement) return null;

  return ReactDOM.createPortal(content, rootElement);
};
