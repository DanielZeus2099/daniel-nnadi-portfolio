import styles from "./projectmodal.module.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiFillGithub, AiOutlineExport, AiFillCrown, AiFillStar, AiFillTag } from "react-icons/ai";
import { FaApple, FaGooglePlay, FaSteam } from "react-icons/fa";
import { MdClose, MdConstruction, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { projectType } from "./Projects";
import Image from "next/image";
import Head from "next/head";

/* ─── Image Carousel (inline in modal) ─── */
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);

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
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.imageCarousel}>
      <div className={styles.carouselViewport}>
        {images.length > 1 && (
          <button
            className={`${styles.carouselNav} ${styles.carouselNavLeft}`}
            onClick={goPrev}
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
            />
            {img.label && (
              <span className={styles.carouselLabel}>{img.label}</span>
            )}
          </div>
        ))}

        {images.length > 1 && (
          <button
            className={`${styles.carouselNav} ${styles.carouselNavRight}`}
            onClick={goNext}
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
  useEffect(() => {
    const body = document.querySelector("body");

    if (isOpen) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "scroll";
    }
  }, [isOpen]);

  // Separate videos and images from devMedia
  const videos = devMedia ? devMedia.filter((m) => m.type === "video") : [];
  const images = devMedia ? devMedia.filter((m) => m.type === "image") : [];

  const content = (
    <div className={styles.modal} onClick={onClose}>
      <button className={styles.closeModalBtn} onClick={onClose}>
        <MdClose />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
        <Image
          className={styles.modalImage}
          src={imgSrc}
          alt={`An image of the ${title} project.`}
          width={1000}
          height={500}
        />

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
              <ImageCarousel images={images} />
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

  if (!isOpen) return <></>;

  return <>
    <Head>
      <title>Project - {title}</title>
      <meta name="description" content={description} />
    </Head>
    {ReactDOM.createPortal(content, document.getElementById("root"))}
  </>
};
