import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import translations, { DEFAULT_LANGUAGE, LANGUAGES } from './translations';

const STORAGE_KEY = 'portfolio_lang';
const LanguageContext = createContext(null);

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && translations[stored]) return stored;
  } catch {
    // localStorage endisponib (mòd privé, elatriye) — sèvi ak lang pa defo.
  }
  return DEFAULT_LANGUAGE;
}

function resolve(dict, key) {
  return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((code) => {
    if (!translations[code]) return;
    setLanguageState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Pa gen anyen pou fè si stockage a bloke.
    }
  }, []);

  const t = useCallback(
    (key) => {
      const value = resolve(translations[language], key) ?? resolve(translations[DEFAULT_LANGUAGE], key);
      return value ?? key;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t, languages: LANGUAGES }),
    [language, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage dwe itilize anndan yon LanguageProvider');
  return ctx;
}
