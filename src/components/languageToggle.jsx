import React, { useState } from 'react';

export default function LanguageToggle() {
  const [isJapanese, setIsJapanese] = useState(false);

  const toggleLanguage = () => {
    setIsJapanese(!isJapanese);
  };

  return (
    <div>
      <h1 
        onClick={toggleLanguage} 
        className="text-xs mb-5 cursor-pointer hover:opacity-70"
      >
        {isJapanese ? 'English' : '日本語'}
      </h1>
    </div>
  );
}