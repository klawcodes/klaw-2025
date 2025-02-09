import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRandomFlicker } from "../hooks/useRandomFlicker";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import { useTextTransition } from "../hooks/useTextTransition";

const ProjectLink = ({ project, variants, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const flickerAnimation = useRandomFlicker(index, {
    duration: 0.15,
    repeats: 3
  })();

  return (
    <motion.a
      key={project.slug}
      href={`/projects/${project.slug}`}
      className="px-4 py-1 border rounded hover:bg-gray-50 relative group"
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{project.data.title}</h3>
          <p className="text-xs text-gray-500">{project.data.tech}</p>
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              variants={flickerAnimation}
              className="text-gray-500"
            >
              <i class="fa-solid fa-arrow-right w-4 h-4"></i>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  );
};

export default function FeaturedWorks({ projects }) {
  const { generateEntranceVariants, containerVariants } = useEntranceAnimation();
  const showEnglish = useTextTransition(4);

  const textContent = {
    title: {
      japanese: "作品集",
      english: "Featured Works"
    }
  };

  const allSortedProjects = [...projects].sort((a, b) => b.data.order - a.data.order);
  const displayedProjects = allSortedProjects.slice(0, 4);
  const hasMoreProjects = allSortedProjects.length > 4;

  return (
    <motion.div
      className="h-full overflow-auto scrollbar-hide"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        className="text-xl font-bold mb-4"
        variants={generateEntranceVariants(0)}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={showEnglish ? "english-title" : "japanese-title"}
            variants={useRandomFlicker(0)()}
            initial="initial"
            animate="animate"
          >
            {showEnglish ? textContent.title.english : textContent.title.japanese}
          </motion.span>
        </AnimatePresence>
      </motion.h2>
      <motion.div
        className="grid gap-1 text-sm"
        variants={generateEntranceVariants(1)}
      >
        {displayedProjects.map((project, index) => (
          <ProjectLink
            key={project.slug}
            project={project}
            variants={generateEntranceVariants(index + 2, {
              distance: 30,
              duration: 0.4,
            })}
            index={index}
          />
        ))}
        {hasMoreProjects && (
          <motion.a
            href="/projects"
            className="px-4 py-1 border rounded hover:bg-gray-50 text-center"
            variants={generateEntranceVariants(displayedProjects.length + 2)}
          >
            <span className="text-gray-500">Show More</span>
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
}