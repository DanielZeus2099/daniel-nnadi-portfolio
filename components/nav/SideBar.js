import { useEffect, useState } from "react";
import styles from "./sidebar.module.scss";
import { motion } from "framer-motion";

export const SideBar = () => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".section-wrapper"));
    if (!sections.length) return;

    let ticking = false;

    const checkActiveSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // If scrolled to the bottom of the page, highlight the last section (contact)
      if (windowHeight + scrollY >= scrollHeight - 60) {
        const lastSection = sections[sections.length - 1];
        if (lastSection && lastSection.id) {
          setSelected(lastSection.id);
          return;
        }
      }

      // If at the top of the page before the first section (hero section)
      const firstSection = sections[0];
      if (firstSection) {
        const firstRect = firstSection.getBoundingClientRect();
        if (firstRect.top > windowHeight * 0.5) {
          setSelected("");
          return;
        }
      }

      // Focal point: 35% from the top of the viewport
      const focalPoint = windowHeight * 0.35;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        // Check if section covers the focal point (handles tall sections like projects reliably)
        if (rect.top <= focalPoint && rect.bottom >= focalPoint) {
          if (section.id) {
            setSelected(section.id);
          }
          return;
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run initially to set active section on mount
    checkActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ x: -70 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.sideBar}
    >
      <span className={styles.logo}>
        Dn<span>.</span>
      </span>
      <motion.a
        initial={{ x: -70 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        href="#about"
        onClick={() => {
          setSelected("about");
        }}
        className={selected === "about" ? styles.selected : ""}
      >
        About
      </motion.a>
      <motion.a
        initial={{ x: -70 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        href="#projects"
        onClick={() => setSelected("projects")}
        className={selected === "projects" ? styles.selected : ""}
      >
        Projects
      </motion.a>
      <motion.a
        initial={{ x: -70 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        href="#experience"
        onClick={() => setSelected("experience")}
        className={selected === "experience" ? styles.selected : ""}
      >
        Exp.
      </motion.a>
      <motion.a
        initial={{ x: -70 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        href="#contact"
        onClick={() => setSelected("contact")}
        className={selected === "contact" ? styles.selected : ""}
      >
        Contact
      </motion.a>
    </motion.nav>
  );
};
