import { useCallback } from 'react';

export const useEntranceAnimation = () => {
  const generateEntranceVariants = useCallback((index = 0, customConfig = {}) => {
    const defaultConfig = {
      distance: 50,        // How far the element moves
      duration: 0.6,       // Animation duration
      delay: index * 0.15, // Delay based on element index
      ease: "easeInOut"      // Animation easing
    };

    const config = { ...defaultConfig, ...customConfig };

    return {
      initial: {
        y: config.distance,
        opacity: 0
      },
      animate: {
        y: 0,
        opacity: 1,
        transition: {
          duration: config.duration,
          delay: config.delay,
          ease: config.ease
        }
      }
    };
  }, []);

  const containerVariants = {
    initial: {
      opacity: 1
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return { generateEntranceVariants, containerVariants };
};