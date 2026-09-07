import { StandardButton } from "@/components/buttons/StandardButton";
import { Reveal } from "@/components/utils/Reveal";
import { ConstellationWeb } from "./ConstellationWeb";
import styles from "./hero.module.scss";

export const Hero = () => {
  return (
    <section className={`section-wrapper ${styles.hero}`}>
      <div className={styles.copyWrapper}>
        <Reveal>
          <h1 className={styles.title}>
            Hey, I&apos;m Daniel<span>.</span>
          </h1>
        </Reveal>

        <Reveal>
          <h2 className={styles.subTitle}>
            I&apos;m a <span>Game Programmer</span>
          </h2>
        </Reveal>

        <Reveal>
          <p className={styles.aboutCopy}>
            I am a game programmer who loves building gameplay systems and challenging myself with new mechanics. I find genuine joy in playing games, breaking down how they work, and translating those ideas into clean code and fast prototypes.
          </p>
        </Reveal>

        <Reveal>
          <StandardButton
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("hero-trigger-blast"));
              }
              document.getElementById("contact")?.scrollIntoView();
            }}
          >
            Let&apos;s Talk
          </StandardButton>
        </Reveal>
      </div>

      <ConstellationWeb />
    </section>
  );
};
