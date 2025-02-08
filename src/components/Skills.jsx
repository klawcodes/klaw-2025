import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRandomFlicker } from "../hooks/useRandomFlicker";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";

const useTextTransition = (initialDelay = 2) => {
  const [showEnglish, setShowEnglish] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnglish(true);
    }, initialDelay * 1000);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  return showEnglish;
};

export default function Skills() {
  const { generateEntranceVariants, containerVariants } =
    useEntranceAnimation();
  const showEnglish = useTextTransition(4);

  const technologies = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg",
      alt: "Javascript",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg",
      alt: "Typescript",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      alt: "React",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      alt: "Next.js",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      alt: "Python",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      alt: "Node.js",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
      alt: "Express",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg",
      alt: "Astro",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
      alt: "PHP",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
      alt: "Laravel",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/codeigniter/codeigniter-plain-wordmark.svg",
      alt: "CodeIgniter",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg",
      alt: "MySQL",
    },
  ];

  const textContent = {
    title: {
      japanese: "テックスタック",
      english: "Tech Stack",
    },
    subtitle: {
      japanese: "(去年から)",
      english: "(past year)",
    },
    footer: {
      japanese:
        "最近は Laravel と Astro JS でウェブプロジェクトを開発しています。",
      english:
        "Been playing around with Laravel & Astro JS for web projects recently.",
    },
  };

  const switchVariant = {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 1,
      transition: {
        duration: 0.01,
      },
    },
  };

  return (
    <motion.div
      className="h-full flex flex-col justify-start"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h1
        className="text-xl font-bold mb-5"
        variants={generateEntranceVariants(0)}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={showEnglish ? "english-title" : "japanese-title"}
            variants={useRandomFlicker(0)()}
            initial="initial"
            animate="animate"
          >
            {showEnglish
              ? textContent.title.english
              : textContent.title.japanese}
          </motion.span>
        </AnimatePresence>{" "}
        <motion.span className="text-xs">
          <AnimatePresence mode="wait">
            <motion.span
              key={showEnglish ? "english-subtitle" : "japanese-subtitle"}
              variants={useRandomFlicker(0)()}
              initial="initial"
              animate="animate"
            >
              {showEnglish
                ? textContent.subtitle.english
                : textContent.subtitle.japanese}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </motion.h1>

      <motion.div
        className="grid grid-cols-4 gap-x-1 gap-y-5"
        variants={generateEntranceVariants(1)}
      >
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.alt}
            className="image-container w-10 h-auto"
            variants={generateEntranceVariants(index + 2, {
              distance: 30,
              duration: 0.4,
            })}
          >
            <motion.img
              src={tech.src}
              alt={tech.alt}
              sizes="4.3vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              className="transition duration-300 filter grayscale hover:filter-none iimage w-[60px] relative"
              variants={useRandomFlicker(index + 2)()}
              initial="initial"
              animate="animate"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="text-gray-500 mb-4 text-xs mt-5"
        variants={generateEntranceVariants(technologies.length)}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={showEnglish ? "english-footer" : "japanese-footer"}
            variants={useRandomFlicker(2)()}
            initial="initial"
            animate="animate"
          >
            {showEnglish
              ? textContent.footer.english
              : textContent.footer.japanese}
          </motion.span>
        </AnimatePresence>
      </motion.p>
    </motion.div>
  );
}
