import React, { useState, useEffect } from 'react';

const TypewriterEffect = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  const phrases = [
    "Welcome to klaw's website! 👋",
    "Feel free to look around...",
    "fyi, this website is still under construction"
  ];

  useEffect(() => {
    if (currentPhrase >= phrases.length) return;

    if (currentIndex < phrases[currentPhrase].length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + phrases[currentPhrase][currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText('');
        setCurrentIndex(0);
        setCurrentPhrase(prev => prev + 1);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentPhrase]);

  return <div>{text}</div>;
};

export default TypewriterEffect;