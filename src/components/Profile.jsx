import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRandomFlicker } from '../hooks/useRandomFlicker';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';
import { globalAnimationConfig } from '../config/animation';

const useTextTransition = (initialDelay = 2, flickerDuration = 2) => {
  const [showEnglish, setShowEnglish] = useState(false);
  const [isPreTransitionFlickering, setIsPreTransitionFlickering] = useState(false);
  const [isPostTransitionFlickering, setIsPostTransitionFlickering] = useState(false);

  useEffect(() => {
    // Start pre-transition flicker
    setIsPreTransitionFlickering(true);

    // Schedule language change after pre-transition flicker
    const transitionTimer = setTimeout(() => {
      setIsPreTransitionFlickering(false);
      setShowEnglish(true);
      
      // Start post-transition flicker
      setIsPostTransitionFlickering(true);
      
      // End post-transition flicker
      setTimeout(() => {
        setIsPostTransitionFlickering(false);
      }, flickerDuration * 1000);
    }, (initialDelay + flickerDuration) * 1000);

    return () => clearTimeout(transitionTimer);
  }, [initialDelay, flickerDuration]);

  return { showEnglish, isPreTransitionFlickering, isPostTransitionFlickering };
};

export default function Profile() {
  const { generateEntranceVariants, containerVariants } = useEntranceAnimation(globalAnimationConfig);
  const { showEnglish, isPreTransitionFlickering, isPostTransitionFlickering } = useTextTransition(2, 2);

  const elements = [
    {
      type: 'h1',
      japanese: 'klaw',
      english: 'Muhammad Dimas',
      index: 0,
      className: "text-xl font-bold mb-2"
    },
    {
      type: 'h2',
      japanese: 'ウェブ開発者・ビジュアルデザイナー',
      english: 'Web Developer & Visual Designer',
      index: 1,
      className: "text-sm text-gray-600 mb-4"
    },
    {
      type: 'p',
      japanese: '私は、デザイン、美しいコード、そして魅力的な音楽に優れたセンスを持つ学部生プログラマーです。 視覚的に美しく、機能的なウェブ体験を創り出すことに情熱を注ぎ、創造力と技術力を融合させてアイデアを形にします。 常に新しい技術を探求し、自分のスキルを磨きながら、ユーザーを魅了するシームレスなデジタル体験を提供することを目指しています。',
      english: "I am an undergraduate programmer with a keen eye for design, clean code, and immersive music. Passionate about creating visually stunning and highly functional web experiences, I blend creativity with technical expertise to bring ideas to life. Constantly exploring new technologies and refining my craft, I strive to deliver seamless digital experiences that captivate users.",
      index: 2,
      className: "text-gray-500 mb-4 text-xs"
    }
  ];

  const links = [
    { href: "https://github.com/klawcodes", text: "Github" },
    { href: "https://x.com/RIOTREVENGER", text: "X / Twitter" },
    { href: "https://instagram.com/riotrevenger", text: "Instagram" }
  ];

  return (
    <motion.div
      className="h-full flex flex-col justify-start"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {elements.map((element) => {
        const flickerVariant = useRandomFlicker(element.index)();
        const entranceVariant = generateEntranceVariants(element.index);

        const textVariant = {
          initial: { opacity: 1 },
          animate: {
            opacity: 1,
            transition: { duration: 0.01, ease: "easeInOut" }
          },
          flicker: flickerVariant.animate,
          exit: { opacity: 1, transition: { duration: 0.01 } }
        };

        return (
          <motion.div
            key={element.index}
            variants={entranceVariant}
            className={element.className}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={showEnglish ? 'english' : 'japanese'}
                variants={textVariant}
                initial="initial"
                animate={
                  (isPreTransitionFlickering && !showEnglish) || 
                  (isPostTransitionFlickering && showEnglish) 
                    ? "flicker" 
                    : "animate"
                }
                exit="exit"
              >
                {showEnglish ? element.english : element.japanese}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        );
      })}

      <motion.div
        className="flex gap-4 text-xs"
        variants={generateEntranceVariants(3)}
      >
        {links.map((link, index) => {
          const flickerVariant = useRandomFlicker(3 + index)();
          return (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-gray-900 hover:text-gray-100 select"
              variants={flickerVariant}
              initial="initial"
              animate="animate"
            >
              {link.text}
            </motion.a>
          );
        })}
      </motion.div>
    </motion.div>
  );
}