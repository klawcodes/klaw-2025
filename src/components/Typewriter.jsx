import { useState, useEffect } from 'react';

export default function TypewriterEffect({ sentences = [
  "Welcome to klaw's website! 👋",
  "Feel free to look around...",
  "fyi, this website still under development"
] }) {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    if (currentPhrase >= sentences.length) return;
    
    if (currentIndex < sentences[currentPhrase].length) {
      // Menambahkan huruf satu per satu
      const timeout = setTimeout(() => {
        setText(prev => prev + sentences[currentPhrase][currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      // Setelah selesai mengetik satu kalimat, reset dan pindah ke kalimat berikutnya
      const timeout = setTimeout(() => {
        setText('');
        setCurrentIndex(0);
        setCurrentPhrase(prev => prev + 1);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentPhrase, sentences]);
  
  // Menggunakan non-breaking space untuk mempertahankan tinggi elemen
  return <div>{text || '\u00A0'}</div>;
}