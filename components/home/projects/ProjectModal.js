import styles from "./projectmodal.module.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiFillGithub, AiOutlineExport, AiFillCrown, AiFillStar, AiFillTag } from "react-icons/ai";
import { FaApple, FaGooglePlay, FaSteam } from "react-icons/fa";
import { MdClose, MdConstruction, MdChevronLeft, MdChevronRight, MdZoomIn } from "react-icons/md";
import { projectType } from "./Projects";
import { MediaLightbox } from "./MediaLightbox";
import Image from "next/image";
import Head from "next/head";

/* ─── Image Carousel (inline in modal) ─── */
const ImageCarousel = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Touch/swipe support
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

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
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.imageCarousel}>
      <div
        className={styles.carouselViewport}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.length > 1 && (
          <button
            className={`${styles.carouselNav} ${styles.carouselNavLeft}`}
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
          >
            <MdChevronLeft />
          </button>
        )}

        {images.map((img, i) => (
          <div
            key={i}
            className={`${styles.carouselSlide} ${i === currentIndex ? styles.carouselSlideActive : ""}`}
          >
            <img
              src={img.src}
              alt={img.label || "Project image"}
              className={styles.carouselImage}
              draggable={false}
              onClick={() => onImageClick && onImageClick(i)}
              title="Tap to view fullscreen"
            />
            {img.label && (
              <span
                className={styles.carouselLabel}
                onClick={() => onImageClick && onImageClick(i)}
                title="Tap to view fullscreen"
              >
                {img.label} <MdZoomIn style={{ verticalAlign: "middle", marginLeft: 4, fontSize: "1.4em", color: "var(--brand)" }} />
              </span>
            )}
          </div>
        ))}

        {images.length > 1 && (
          <button
            className={`${styles.carouselNav} ${styles.carouselNavRight}`}
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

      {images.length > 1 && (
        <div className={styles.carouselDots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.carouselDot} ${i === currentIndex ? styles.carouselDotActive : ""}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Dev Info Item ─── */
const DevInfoItem = ({ label, value }) => (
  <div className={styles.devInfoItem}>
    <span className={styles.devInfoLabel}>{label}:</span>
    <span className={styles.devInfoValue}>{value}</span>
  </div>
);

/* ─── Project Modal ─── */
export const ProjectModal = ({
  projectLink,
  imgSrc,
  isOpen,
  title,
  description,
  code,
  onClose,
  tech,
  type,
  company,
  inProgress,
  devInfo,
  about,
  responsibilities,
  projectEvolution,
  devMedia,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;

    if (isOpen) {
      body.style.overflowY = "hidden";
      // Ensure modal scrolls to the very top when opened
      requestAnimationFrame(() => {
        if (modalRef.current) {
          modalRef.current.scrollTop = 0;
        }
      });
    } else {
      body.style.overflowY = "";
    }
    return () => {
      body.style.overflowY = "";
    };
  }, [isOpen]);

  // Separate videos and images from devMedia
  const videos = devMedia ? devMedia.filter((m) => m.type === "video") : [];
  const images = devMedia ? devMedia.filter((m) => m.type === "image") : [];

  // Combined images for full-screen zoomable lightbox (dev screenshots only, not the header)
  const allLightboxImages = images;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxOpenRef = useRef(false);

  useEffect(() => {
    lightboxOpenRef.current = lightboxOpen;
  }, [lightboxOpen]);

  const pauseAllVideos = () => {
    if (typeof document === "undefined") return;
    const videoElements = document.querySelectorAll("video");
    videoElements.forEach((vid) => {
      try {
        if (!vid.paused) {
          vid.pause();
        }
      } catch (e) {
        // ignore
      }
    });
  };

  // Pause videos when Lightbox opens
  useEffect(() => {
    if (lightboxOpen) {
      pauseAllVideos();
    }
  }, [lightboxOpen]);

  // Pause videos when modal is closed
  useEffect(() => {
    if (!isOpen) {
      pauseAllVideos();
    }
  }, [isOpen]);

  // Pause videos when browser is minimized, tab switched, or window blurred
  useEffect(() => {
    if (!isOpen) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAllVideos();
      }
    };

    const handleBlur = () => {
      pauseAllVideos();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [isOpen]);

  // Handle mobile/browser Back button to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handlePopState = () => {
      if (typeof window !== "undefined" && window.__suppressModalClose) {
        return;
      }
      if (lightboxOpenRef.current) {
        return;
      }
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (!url.searchParams.has("project")) {
          onClose();
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  const handleOpenLightbox = (index) => {
    pauseAllVideos();
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const content = (
    <div ref={modalRef} className={styles.modal} onClick={onClose}>
      <button
        className={styles.closeModalBtn}
        onClick={onClose}
        aria-label="Close project modal"
      >
        <MdClose />
      </button>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className={styles.modalCard}
      >
        {/* ── Badge ── */}
        {inProgress && (
          <div title="Work in Progress" className={styles.projectWip}>
            <MdConstruction />
          </div>
        )}

        {!inProgress && type === projectType.professional && (
          <div title="Professional Project" className={styles.projectCrown}>
            <AiFillTag />
          </div>
        )}
        {!inProgress && type === projectType.personal && (
          <div title="Personal Project" className={styles.projectStar}>
            <AiFillCrown />
          </div>
        )}
        {!inProgress && type === projectType.openSource && (
          <div title="Open Source Project" className={styles.projectOpenSource}>
            <AiFillStar />
          </div>
        )}

        {/* ── Header Image ── */}
        <div className={styles.modalImageWrapper}>
          <img
            className={styles.modalImage}
            src={imgSrc}
            alt={`An image of the ${title} project.`}
          />
        </div>

        <div className={styles.modalContent}>
          {/* ── Title & Tech ── */}
          <h4>{title}</h4>
          <div className={styles.modalTech}>{tech.join(" - ")}</div>

          {/* ── Two-Column: Dev Info (left) + About (right) ── */}
          <div className={styles.twoColumnRow}>
            {devInfo && (
              <div className={styles.devInfoBlock}>
                <h5 className={styles.sectionHeading}>Development Info</h5>
                <div className={styles.devInfoList}>
                  <DevInfoItem label="Game" value={devInfo.game} />
                  <DevInfoItem label="Company" value={devInfo.company} />
                  <DevInfoItem label="Genre" value={devInfo.genre} />
                  <DevInfoItem label="Engine" value={devInfo.engine} />
                  <DevInfoItem label="Platforms" value={devInfo.platforms} />
                  <DevInfoItem label="Role" value={devInfo.role} />
                </div>
              </div>
            )}

            {about && (
              <div className={styles.aboutBlock}>
                <h5 className={styles.sectionHeading}>About the Project</h5>
                <p className={styles.aboutText}>{about}</p>
              </div>
            )}
          </div>

          {/* ── Responsibilities ── */}
          {responsibilities && responsibilities.length > 0 && (
            <div className={styles.responsibilitiesSection}>
              <h5 className={styles.sectionHeading}>Responsibilities</h5>
              <ul className={styles.responsibilitiesList}>
                {responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Project Evolution ── */}
          {projectEvolution && (
            <div className={styles.evolutionSection}>
              <h5 className={styles.sectionHeading}>Project Evolution</h5>
              <p className={styles.evolutionText}>{projectEvolution}</p>
            </div>
          )}

          {/* ── Development Media ── */}
          {devMedia && devMedia.length > 0 && (
            <div className={styles.mediaSection}>
              <h5 className={styles.sectionHeading}>Development Media</h5>

              {/* Inline Videos */}
              {videos.map((video, i) => (
                <div key={i} className={styles.inlineVideoWrapper}>
                  <video
                    className={styles.inlineVideo}
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {video.label && (
                    <span className={styles.mediaLabel}>{video.label}</span>
                  )}
                </div>
              ))}

              {/* Image Carousel */}
              <ImageCarousel
                images={images}
                onImageClick={(idx) => handleOpenLightbox(idx)}
              />
            </div>
          )}

          {/* ── Footer Links ── */}
          <div className={styles.modalFooter}>
            <p className={styles.linksText}>
              Project Links<span>.</span>
            </p>
            <div className={styles.links}>
              {type !== projectType.professional && code && (
                <Link target="_blank" rel="nofollow" href={code}>
                  <AiFillGithub /> source code
                </Link>
              )}
              {typeof projectLink === "object" ? (
                <>
                  {projectLink.playStore && (
                    <Link target="_blank" rel="nofollow" href={projectLink.playStore}>
                      <FaGooglePlay /> Google Play
                    </Link>
                  )}
                  {projectLink.appStore && (
                    <Link target="_blank" rel="nofollow" href={projectLink.appStore}>
                      <FaApple /> App Store
                    </Link>
                  )}
                  {projectLink.steam && (
                    <Link target="_blank" rel="nofollow" href={projectLink.steam}>
                      <FaSteam /> Steam
                    </Link>
                  )}
                  {projectLink.demo && (
                    <Link target="_blank" rel="nofollow" href={projectLink.demo}>
                      <AiOutlineExport /> live project
                    </Link>
                  )}
                </>
              ) : (
                projectLink && (
                  <Link target="_blank" rel="nofollow" href={projectLink}>
                    <AiOutlineExport /> live project
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  if (!isOpen) return null;

  const rootEl = typeof document !== "undefined" ? document.getElementById("root") : null;
  if (!rootEl) return null;

  return (
    <>
      <Head>
        <title>Project - {title}</title>
        <meta name="description" content={description} />
      </Head>
      {ReactDOM.createPortal(content, rootEl)}
      <MediaLightbox
        items={allLightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};
