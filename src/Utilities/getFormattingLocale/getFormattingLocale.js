const getFormattingLocale = locale => {
  if (typeof locale === 'string') return locale.split(/[,;]/)[0];
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language.split(/[,;]/)[0];
  }
  return (
    (typeof document !== 'undefined' && document.documentElement.lang) || 'en'
  );
};

export const documentation = {
  input: {
    type: 'String',
    description:
      'Optional preferred locale to use for formatting dates and numbers.',
  },
  output: {
    type: 'String',
    description: 'A locale to use for formatting dates and numbers.',
  },
};

export default getFormattingLocale;
