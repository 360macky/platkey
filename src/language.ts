import esMessages from "./locales/es.json";
import enMessages from "./locales/en.json";
import ptMessages from "./locales/pt.json";

type SupportedLanguages = "en" | "es" | "pt";

/**
 * Get the language based on the browser.
 */
export function getLanguage(): SupportedLanguages {
  let rawLanguage = window.navigator.language.slice(0, 2);
  if (["en", "es", "pt"].includes(rawLanguage)) {
    return rawLanguage as SupportedLanguages;
  }
  return "en";
}

type TranslationKeys = keyof (typeof enMessages & typeof esMessages & typeof ptMessages);

/**
 * Based on the language, get the messages.
 * @param key
 */
export function t(key: TranslationKeys): string {
  let language = getLanguage();
  if (language === "es") {
    return esMessages[key];
  }
  if (language === "pt") {
    return ptMessages[key];
  }
  return enMessages[key];
}
