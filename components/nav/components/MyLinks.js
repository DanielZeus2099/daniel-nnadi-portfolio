import styles from "./headinglinks.module.scss";
import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillGithub,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export const MyLinks = () => {
  return (
    <div className={styles.links}>
      <motion.span
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.0 }}
        title="Linkedin"
      >
        <Link href="https://www.linkedin.com/in/daniel-nnadi-760462215" target="_blank" rel="nofollow"> 
          <AiFillLinkedin size="2.4rem" />
        </Link>
      </motion.span>

      <motion.span
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        title="GitHub"
      >
        <Link href="https://github.com/DanielZeus2099" target="_blank" rel="nofollow">
          <AiFillGithub size="2.4rem" />
        </Link>
      </motion.span>

      <motion.span
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        title="Twitter / X"
      >
        <Link href="https://x.com/DanielZeus2099" target="_blank" rel="nofollow">
          <AiFillTwitterCircle size="2.4rem" />
        </Link>
      </motion.span>

      <motion.span
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        title="Instagram"
      >
        <Link href="https://www.instagram.com/daniel_zeus1" target="_blank" rel="nofollow">
          <AiFillInstagram size="2.4rem" />
        </Link>
      </motion.span>

      <motion.span
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        title="TikTok"
      >
        <Link href="https://www.tiktok.com/@daniel_zeus2099" target="_blank" rel="nofollow">
          <FaTiktok size="2.0rem" />
        </Link>
      </motion.span>
    </div>
  );
};
