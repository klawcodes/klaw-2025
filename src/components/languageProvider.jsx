import React, { useState } from 'react';

export const LanguageContext = React.createContext({
  isJapanese: false,
  toggleLanguage: () => {},
  getText: () => {}
});

export function LanguageProvider({ children }) {
  const [isJapanese, setIsJapanese] = useState(false);

  // Translations object
  const translations = {
    profile: {
      english: "Profile",
      japanese: "プロフィール"
    },
    skills: {
      english: "Skills",
      japanese: "スキル"
    },
    projects: {
      english: "Projects",
      japanese: "プロジェクト"
    },
    // Add more translations as needed
  };

  const toggleLanguage = () => {
    setIsJapanese(!isJapanese);
  };

  // Function to get translated text
  const getText = (key) => {
    return isJapanese ? translations[key]?.japanese : translations[key]?.english;
  };

  return (
    <LanguageContext.Provider value={{ isJapanese, toggleLanguage, getText }}>
      {children}
    </LanguageContext.Provider>
  );
}