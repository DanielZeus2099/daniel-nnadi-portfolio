import { Reveal } from "@/components/utils/Reveal";
import { useAnimation, useInView, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillCrown, AiFillGithub, AiFillStar, AiFillTag, AiOutlineExport } from "react-icons/ai";
import { FaApple, FaGooglePlay, FaSteam } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";
import { ProjectModal } from "./ProjectModal";
import styles from "./projects.module.scss";
import { projectType } from "./Projects";
import Image from "next/image";
import { updateSearchParam, createProjectSlug, removeSearchParam } from "@/components/utils/urlParams";
import { useSearchParams } from "next/navigation";

export const Project = ({
  projectLink,
  description,
  imgSrc,
  title,
  code,
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
  const [hovered, setHovered] = useState(false);
  const projectSlug = createProjectSlug(title);
  const searchParams = useSearchParams();
  const currentProject = searchParams.get('project');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (currentProject === projectSlug) {
      setIsOpen(true);
    }
  }, [currentProject, projectSlug]);

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

  const closeModal = () => {
    removeSearchParam("project");
    setIsOpen(false);
  };

  const openModal = () => {
    updateSearchParam("project", projectSlug);
    setIsOpen(true);
  };

  return (
    <>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.75 }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={openModal}
          className={styles.projectImage}
        >
          <Image
            src={imgSrc}
            alt={`An image of the ${title} project.`}
            width={1000}
            height={500}
            style={{
              rotate: hovered ? "-2deg" : "0deg",
              translate: hovered ? "-50% 10%" : "-50% 20%",
            }}
          />

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
        </div>
        <div className={styles.projectCopy}>
          <Reveal width="100%">
            <div className={styles.projectTitle}>
              <h4>{title}</h4>
              <div className={styles.projectTitleLine} />

              {type !== projectType.professional && code && (
                <Link href={code} target="_blank" rel="nofollow" title="Source Code">
                  <AiFillGithub size="1.8rem" />
                </Link>
              )}

              {typeof projectLink === "object" ? (
                <>
                  {projectLink.playStore && (
                    <Link href={projectLink.playStore} target="_blank" rel="nofollow" title="Google Play Store">
                      <FaGooglePlay size="1.6rem" />
                    </Link>
                  )}
                  {projectLink.appStore && (
                    <Link href={projectLink.appStore} target="_blank" rel="nofollow" title="Apple App Store">
                      <FaApple size="1.8rem" />
                    </Link>
                  )}
                  {projectLink.steam && (
                    <Link href={projectLink.steam} target="_blank" rel="nofollow" title="Steam Store">
                      <FaSteam size="1.8rem" />
                    </Link>
                  )}
                  {projectLink.demo && (
                    <Link href={projectLink.demo} target="_blank" rel="nofollow" title="Live Project / Demo">
                      <AiOutlineExport size="1.8rem" />
                    </Link>
                  )}
                </>
              ) : (
                projectLink && (
                  <Link href={projectLink} target="_blank" rel="nofollow" title="Live Project / Demo">
                    <AiOutlineExport size="1.8rem" />
                  </Link>
                )
              )}
            </div>
          </Reveal>
          <Reveal width="100%">
            <div className={styles.projectTech}>{tech.join(" - ")}</div>
          </Reveal>
          <Reveal width="100%">
            <p className={styles.projectDescription}>
              {description}{" "}
              <span onClick={openModal}>{currentProject} Learn more {">"}</span>
            </p>
          </Reveal>
        </div>
      </motion.div>
      <ProjectModal
        projectLink={projectLink}
        isOpen={isOpen}
        onClose={closeModal}
        imgSrc={imgSrc}
        title={title}
        description={description}
        code={code}
        tech={tech}
        type={type}
        company={company}
        inProgress={inProgress}
        projectSlug={projectSlug}
        devInfo={devInfo}
        about={about}
        responsibilities={responsibilities}
        projectEvolution={projectEvolution}
        devMedia={devMedia}
      />
    </>
  );
};
