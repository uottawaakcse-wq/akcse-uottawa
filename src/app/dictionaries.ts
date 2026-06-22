import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  fr: () => import('../dictionaries/fr.json').then((module) => module.default),
  ko: () => import('../dictionaries/ko.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  // Fallback to English if an unsupported locale is passed
  return dictionaries[locale]?.() ?? dictionaries.en();
};