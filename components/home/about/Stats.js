import styles from "./stats.module.scss";
import { AiFillCode, AiFillSmile, AiFillPushpin } from "react-icons/ai";
import { Reveal } from "@/components/utils/Reveal";

export const Stats = () => {
  return (
    <div className={styles.stats}><Reveal>
      <div className={styles.statColumn}>
        <h4>
          <AiFillPushpin size="2.4rem" color="var(--brand)" />
          <span>Currently Exploring</span>
        </h4>
        <div className={styles.statGrid}>
          <span className="chip">Unreal Engine</span>
          <span className="chip">Multiplayer Networking</span>
        </div>
      </div>
    </Reveal>
      <Reveal>
        <div className={styles.statColumn}>
          <h4>
            <AiFillCode size="2.4rem" color="var(--brand)" />
            <span>Use at work</span>
          </h4>
          <div className={styles.statGrid}>
            <span className="chip">Unity</span>
            <span className="chip">C#</span>
            <span className="chip">Visual Scripting</span>
            <span className="chip">Game Design</span>
            <span className="chip">Game Programming</span>
            <span className="chip">Game UI/UX</span>
            <span className="chip">AI Behavior</span>
            <span className="chip">Blender</span>
            <span className="chip">3D Modeling</span>
            <span className="chip">3D Animation</span>
            <span className="chip">Mobile Development</span>
            <span className="chip">Android</span>
            <span className="chip">Google Play Console</span>
            <span className="chip">GitHub</span>
            <span className="chip">Performance Optimization</span>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div className={styles.statColumn}>
          <h4>
            <AiFillSmile size="2.4rem" color="var(--brand)" />
            <span>Use for fun</span>
          </h4>
          <div className={styles.statGrid}>
            <span className="chip">Gaming</span>
            <span className="chip">Content Creation</span>
            <span className="chip">Video Editing</span>
            <span className="chip">Photoshop</span>
            <span className="chip">Digital Art</span>
            <span className="chip">Product Design</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
