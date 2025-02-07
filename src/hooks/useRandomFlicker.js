import { useCallback } from 'react';

export const useRandomFlicker = (index = 0, customConfig = {}) => {
  const generateRandomFlicker = useCallback(() => {
    const defaultConfig = {
      duration: Math.random() * (0.15 - 0.1) + 0.1,  // Random duration between 0.1s and 0.3s
      repeats: Math.floor(Math.random() * 5) + 1,    // Random repeats between 1 and 5
      baseDelay: index * 0.15,                       // Base delay synced with entrance animation
      additionalDelay: Math.random() * 0.2,          // Additional random delay
      ...customConfig
    };

    return {
      initial: { opacity: 1 },
      animate: {
        opacity: [1, 0, 1, 0, 1],
        transition: {
          duration: defaultConfig.duration,
          times: [0, 0.2, 0.4, 0.6, 1],
          repeat: defaultConfig.repeats,
          delay: defaultConfig.baseDelay + defaultConfig.additionalDelay,
        }
      }
    };
  }, [index, customConfig]);

  return generateRandomFlicker;
};
