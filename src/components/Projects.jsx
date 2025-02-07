import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRandomFlicker } from "../hooks/useRandomFlicker";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import { useTextTransition } from "../hooks/useTextTransition";

export default function FeaturedWorks({ projects }) {
  const { generateEntranceVariants, containerVariants } = useEntranceAnimation();
  const showEnglish = useTextTransition(4); // 4 detik delay

  // Text content untuk judul
  const textContent = {
    title: {
      japanese: "作品集",
      english: "Featured Works"
    }
  };

  // Sort all projects first
  const allSortedProjects = [...projects].sort((a, b) => b.data.order - a.data.order);
  // Then slice for display
  const displayedProjects = allSortedProjects.slice(0, 4);
  // Check total number of projects
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
          <motion.a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="px-4 py-1 border rounded hover:bg-gray-50"
            variants={generateEntranceVariants(index + 2, {
              distance: 30,
              duration: 0.4,
            })}
          >
            <h3 className="font-medium">{project.data.title}</h3>
            <p className="text-xs text-gray-500">{project.data.tech}</p>
          </motion.a>
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