import { useState } from "react";
import { SectionHeader } from "@/components/utils/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./experience.module.scss";

export const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="section-wrapper" id="experience">
      <SectionHeader title="Experience" dir="l" />

      <div className={styles.experienceContainer}>
        {/* Tabs Column */}
        <div className={styles.tabsColumn}>
          {experience.map((item, idx) => (
            <button
              key={`${item.title}-${idx}`}
              onClick={() => setActiveTab(idx)}
              className={`${styles.tabBtn} ${activeTab === idx ? styles.activeTab : ""}`}
            >
              <span className={styles.companyName}>{item.title}</span>
              <span className={styles.companyPeriod}>{item.time}</span>
            </button>
          ))}
        </div>

        {/* Content Column */}
        <div className={styles.contentColumn}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={styles.detailsCard}
            >
              <div className={styles.detailsHeader}>
                <h3 className={styles.jobTitle}>{experience[activeTab].position}</h3>
                <span className={styles.timePill}>{experience[activeTab].time}</span>
              </div>

              <div className={styles.subHeader}>
                <span className={styles.companyAccent}>{experience[activeTab].title}</span>
                <span className={styles.separator}>&bull;</span>
                <span className={styles.location}>{experience[activeTab].location}</span>
              </div>

              <p className={styles.description}>{experience[activeTab].description}</p>

              <div className={styles.techList}>
                {experience[activeTab].tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const experience = [
  {
    title: "Deluxe Creation Studios",
    position: "Game Programmer",
    time: "Dec. 2021 - Present",
    location: "Lagos, Nigeria",
    description:
      "I joined the studio as an intern during my 6-month college industrial training program, where I was mentored and learned the core foundations of game development. Following the internship, I was hired full-time as a Game Programmer, driven by my rapid professional growth and deep-rooted gaming foundation. In this role, I am responsible for prototyping, scripting, and programming core gameplay loops and game systems. Since then, I have contributed to the development and shipping of multiple titles to Steam and the Google Play Store, including Rasta Santa, Grow Farm Garden, Captain EcoGen, Finger Gunner, Dribble Run, and many others.",
    tech: [
      "Unity",
      "C#",
      "Blender",
      "Android",
      "Google Play Console",
      "3D Modeling",
      "Physics Systems",
      "Visual Scripting",
      "Version Control",
    ],
  },
  {
    title: "GDM Group",
    position: "3D Artist (3D Visualization Artist)",
    time: "Oct. 2024 - Dec. 2024",
    location: "Lagos, Nigeria",
    description:
      "Worked at GDM Group, a marketing agency, where I was responsible for conducting site surveys (recceing) of event locations and recreating the venues and event decorations inside a 3D environment to provide clients with precise pre-visualizations. Also visually designed and modeled 3D shopping stands and brand activation spaces.",
    tech: [
      "3D Visualization",
      "3D Modeling",
      "Blender",
      "Brand Activations",
      "Event Design",
      "Rendering",
    ],
  },
  {
    title: "Gidi Creative Centre",
    position: "Facilitator (Game Design)",
    time: "Oct. 2022 - Nov. 2022",
    location: "Lagos, Nigeria",
    description:
      "A one-month contract role instructing and guiding students in the fundamentals of game design, 3D modeling and asset creation. Developed curriculum to introduce beginners to game design principles, core gaming mechanics, scripting, and level structure design.",
    tech: [
      "Game Design",
      "Unity",
      "Blender",
      "3D Modeling",
      "Product Design",
      "Teaching",
    ],
  },
  {
    title: "Qlipit.io",
    position: "Digital Illustrator",
    time: "Aug. 2021 - Nov. 2021",
    location: "Lagos, Nigeria (Remote)",
    description:
      "Designed detailed, African-themed character assets and illustrations for Qlip, an African NFT platform. The created characters and visual styles were utilized for the launch of Qlip's forthcoming NFT gaming series, 'The Beningin'.",
    tech: [
      "Digital Illustration",
      "Character Design",
      "NFT Art",
      "African-themed Design",
      "Photoshop",
    ],
  },
  {
    title: "Digital Artist & Illustrator",
    position: "Freelance Digital Artist",
    time: "2018 - Present",
    location: "Remote",
    description:
      "Long before I discovered the possibility of game programming, art was my first language. Since my younger days, sketching and illustrating have been my primary way to express my thoughts and share my imagination. Over the years, I honed my skills in digital illustration, 3D modeling and animation, translating conceptual ideas into visual stories. This creative foundation led me to participate in and win regional design contests, including the Binance x Bundle Africa Meme Wars and the Qlip meme + sticker contest, before eventually bringing these artistic skills into game development.",
    tech: [
      "Digital Art",
      "3D Modeling",
      "3D Animation",
      "Character Design",
      "Concept Art",
      "Graphic Design",
      "Illustration",
    ],
  },
];