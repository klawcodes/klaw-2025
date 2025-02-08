import { useState, useEffect } from "react";

export const useTextTransition = (initialDelay = 2) => {
  const [showEnglish, setShowEnglish] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnglish(true);
    }, initialDelay * 1000);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  return showEnglish;
};