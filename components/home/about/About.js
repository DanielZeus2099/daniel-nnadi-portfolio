import { MyLinks } from "@/components/nav/components/MyLinks";
import { Reveal } from "@/components/utils/Reveal";
import { SectionHeader } from "@/components/utils/SectionHeader";
import styles from "./about.module.scss";
import { Stats } from "./Stats";
import { AiOutlineArrowRight } from "react-icons/ai";

export const About = () => {
  return (
    <section id="about" className="section-wrapper">
      <SectionHeader title="About" dir="l" />
      <div className={styles.about}>
        <div>
          <Reveal>
            <p className={`${styles.aboutText} ${styles.highlightFirstLetter}`}>
              I am Nnadi Daniel, a Game Programmer and 3D Artist based in Lagos, Nigeria. With over 8 years of experience as a digital artist and 4+ years specializing in 3D modeling and game design, I build interactive experiences that blend rich gameplay mechanics with visual creativity.
            </p>
          </Reveal>
          <Reveal>
            <p className={styles.aboutText}>
              I have worked with Deluxe Creation Studios for over 4 years and in this time, we have developed and shipped several titles to the Google Play Store (like Rasta Santa, Grow Farm Garden, Captain EcoGen, Finger Gunner, and Dribble Run). My journey started during my industrial training there, where I fell in love with setting up game mechanics, building prototypes, and solving technical challenges.
            </p>
          </Reveal>
          <Reveal>
            <p className={styles.aboutText}>
              I believe that Africa&apos;s game industry is an untapped goldmine, and integrating African culture, environments, and stories into modern video games is a formula for incredible success. This inspired my work with Qlipit.io, where I designed African-themed characters for their upcoming gaming series, &quot;The Beningin&quot;, and minted creative pieces on platforms like OpenSea, Paras, and Mintbase.
            </p>
          </Reveal>
          <Reveal>
            <p className={styles.aboutText}>
              I hold a Computer Science degree from Imo State University. When I&apos;m not developing games, I spend a lot of time playing and learning from them. I dive into almost every genre; from fast-paced shooters and cozy simulators to massive open-world RPGs and action-adventures like Elden Ring, Grand Theft Auto, and Assassin&apos;s Creed. Always dissecting their core mechanics and systems to see how they are programmed.
            </p>
          </Reveal>
          <Reveal>
            <p className={styles.aboutText}>
              If you are looking for a developer who cares deeply about gameplay quality, visual storytelling, and cultural representation in gaming, let&apos;s connect.
              🎮
            </p>
          </Reveal>
          <Reveal>
            <div className={styles.links}>
              <div className={styles.linksText}>
                <span>My links</span>
                <AiOutlineArrowRight />
              </div>
              <MyLinks />
            </div>
          </Reveal>
        </div>
        <Stats />
      </div>
    </section>
  );
};
