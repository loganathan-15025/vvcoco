import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);

function getValueByPath(obj, path) {
  return path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return acc[part];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.classList.toggle("lang-ta", language === "ta");
    document.documentElement.classList.toggle("lang-en", language === "en");
    document.body.classList.toggle("lang-ta", language === "ta");
    document.body.classList.toggle("lang-en", language === "en");
  }, [language]);

  const value = useMemo(() => {
    const localeData = translations[language] || translations.en;

    const t = (key) => {
      const localizedValue = getValueByPath(localeData, key);
      if (localizedValue !== undefined) {
        return localizedValue;
      }

      const englishValue = getValueByPath(translations.en, key);
      return englishValue !== undefined ? englishValue : key;
    };

    return {
      language,
      isTamil: language === "ta",
      setLanguage,
      toggleLanguage: () =>
        setLanguage((currentLanguage) =>
          currentLanguage === "en" ? "ta" : "en",
        ),
      t,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
