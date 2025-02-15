import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRandomFlicker } from '../hooks/useRandomFlicker';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [showEnglish, setShowEnglish] = useState(false);
  const [isPreTransitionFlickering, setIsPreTransitionFlickering] = useState(false);
  const [isPostTransitionFlickering, setIsPostTransitionFlickering] = useState(false);
  const { generateEntranceVariants, containerVariants } = useEntranceAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Start pre-transition flicker after initial entrance
    const preTransitionTimer = setTimeout(() => {
      setIsPreTransitionFlickering(true);
    }, 2000);

    // Schedule language and timezone change
    const transitionTimer = setTimeout(() => {
      setIsPreTransitionFlickering(false);
      setShowEnglish(true);
      setIsPostTransitionFlickering(true);

      // End post-transition flicker
      setTimeout(() => {
        setIsPostTransitionFlickering(false);
      }, 2000);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(preTransitionTimer);
      clearTimeout(transitionTimer);
    };
  }, []);

  // Get times for both timezones
  const tokyoTime = new Date(time.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  const jakartaTime = new Date(time.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const elements = [
    {
      type: 'time',
      japanese: formatTime(tokyoTime),
      english: formatTime(jakartaTime),
      index: 0,
      className: "text-xs text-slate-800"
    },
  ];

  return (
    <motion.div
      className="flex flex-col items-start justify-start space-y-1"
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
            transition: { duration: 0.01 }
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
    </motion.div>
  );
};

export default Clock;