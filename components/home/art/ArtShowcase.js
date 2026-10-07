import { useState, useEffect, useRef } from "react";
import { artItems } from "./artData";
import { ArtModal } from "./ArtModal";
import styles from "./artshowcase.module.scss";
import { Reveal } from "@/components/utils/Reveal";
import { useAnimation, useInView, motion } from "framer-motion";
import { AiFillCrown, AiFillTag } from "react-icons/ai";
import { MdCollections } from "react-icons/md";

const INITIAL_COUNT = 8;

/* ─── Individual Art Card (matching game Project card structure) ─── */
const ArtCard = ({ item, onOpen, id }) => {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const isVideo = item.type === "video";
  const coverSrc = isVideo
    ? item.poster || item.cover
    : item.cover;

  return (
    <motion.div
      id={id}
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.75 }}
      style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpen(item)}
        className={styles.projectImage}
      >
        {item.isStack && item.mediaList && item.mediaList.length > 1 ? (
          <div className={styles.cardStack}>
            {/* Render back cards first so the front card (index 0) sits on top */}
            {[...item.mediaList].reverse().map((m, revIdx) => {
              const total = item.mediaList.length;
              const depth = total - 1 - revIdx; // 0 = front card
              const isFront = depth === 0;

              // Front card sits lower in the poster at rest, with back cards visibly tiered above it.
              // On hover, the cards expand upward while keeping the front card holding on lower down.
              const restY = 32 - depth * 5;
              const hoverY = 24 - depth * 8;
              const tilt = isFront ? -2 : (depth === 1 ? 0 : depth === 2 ? 1.5 : -1);

              return (
                <img
                  key={m.src || depth}
                  src={m.src}
                  alt={m.label || item.title}
                  loading="lazy"
                  className={isFront ? undefined : styles.stackedCard}
                  style={{
                    zIndex: total - depth,
                    width: "90%",
                    filter: isFront
                      ? "none"
                      : `brightness(${hovered ? 0.95 - depth * 0.05 : 0.82 - depth * 0.1})`,
                    rotate: hovered ? `${tilt}deg` : "0deg",
                    translate: hovered ? `-50% ${hoverY}%` : `-50% ${restY}%`,
                  }}
                />
              );
            })}
          </div>
        ) : isVideo ? (
          <video
            src={item.cover}
            poster={item.poster || undefined}
            preload="metadata"
            muted
            playsInline
            style={{
              rotate: hovered ? "-2deg" : "0deg",
              translate: hovered ? "-50% 10%" : "-50% 20%",
            }}
          />
        ) : (
          <img
            src={coverSrc}
            alt={item.title}
            loading="lazy"
            style={{
              rotate: hovered ? "-2deg" : "0deg",
              translate: hovered ? "-50% 10%" : "-50% 20%",
            }}
          />
        )}

        {/* Stack Collection Indicator Badge */}
        {item.isStack && item.mediaList && item.mediaList.length > 1 && (
          <div className={styles.stackBadge}>
            <MdCollections />
            <span>{item.mediaList.length} Artworks</span>
          </div>
        )}

        {/* Project Type Badge */}
        {item.projectType === "Professional" ? (
          <div title="Professional Project" className={styles.projectCrown}>
            <AiFillTag />
          </div>
        ) : (
          <div title="Personal Project" className={styles.projectStar}>
            <AiFillCrown />
          </div>
        )}
      </div>

      <div className={styles.projectCopy}>
        <Reveal width="100%">
          <div className={styles.projectTitle}>
            <h4>{item.title}</h4>
            <div className={styles.projectTitleLine} />
          </div>
        </Reveal>
        <Reveal width="100%">
          <div className={styles.projectTech}>{item.tags.join(" - ")}</div>
        </Reveal>
        <Reveal width="100%">
          <p className={styles.projectDescription}>
            {item.description}{" "}
            <span onClick={() => onOpen(item)}>Learn more {">"}</span>
          </p>
        </Reveal>
      </div>
    </motion.div>
  );
};

export const ArtShowcase = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const seeMoreRef = useRef(null);
  const justCollapsed = useRef(false);

  const handleOpenModal = (item) => {
    setActiveItem(item);
  };

  const handleCloseModal = () => {
    setActiveItem(null);
  };

  // After collapsing, snap the viewport back to the last initially visible
  // card and restore keyboard focus on the toggle (runs after the DOM commit,
  // so no timer-based race).
  useEffect(() => {
    if (!justCollapsed.current) return;
    justCollapsed.current = false;

    const frame = requestAnimationFrame(() => {
      const lastProject = document.getElementById("last-initial-art-project");
      if (lastProject) {
        lastProject.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      seeMoreRef.current?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [showAll]);

  const handleToggleShowAll = () => {
    if (showAll) {
      justCollapsed.current = true;
      setShowAll(false);
    } else {
      // Expanding appends the new cards below the fold (comment-section
      // behavior): the viewport stays put and the reader scrolls at their
      // own pace. Collapsing is the only case that needs a scroll reset.
      setShowAll(true);
    }
  };

  const visibleItems = showAll ? artItems : artItems.slice(0, INITIAL_COUNT);
  const hiddenCount = Math.max(artItems.length - INITIAL_COUNT, 0);

  return (
    <div className={styles.artSection}>
      {/* Works Grid — matching game projects 2-column layout */}
      <div className={styles.projects} id="art-projects-grid">
        {visibleItems.map((item, index) => (
          <ArtCard
            key={item.id}
            id={index === INITIAL_COUNT - 1 ? "last-initial-art-project" : undefined}
            item={item}
            onOpen={handleOpenModal}
          />
        ))}
      </div>

      {/* Divider line + ...see more text action (comment-section style) */}
      {hiddenCount > 0 && (
        <div className={styles.seeMoreWrapper}>
          <button
            ref={seeMoreRef}
            className={styles.seeMoreBtn}
            onClick={handleToggleShowAll}
            type="button"
            aria-expanded={showAll}
            aria-controls="art-projects-grid"
          >
            {showAll ? "...see less" : "...see more"}
          </button>
          <span className={styles.seeMoreLine} aria-hidden="true" />
        </div>
      )}

      {/* Lightbox / Full-screen Media Modal */}
      <ArtModal
        item={activeItem}
        isOpen={activeItem !== null}
        onClose={handleCloseModal}
      />
    </div>
  );
};
