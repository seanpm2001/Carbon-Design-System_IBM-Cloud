import getDateLocaleFormat from '../getDateLocaleFormat';

const getDateLocalePlaceholder = locale => {
  const formattedDate = getDateLocaleFormat(locale);

  return formattedDate
    .replace(/Y/, 'yyyy')
    .replace(/m/, 'mm')
    .replace(/d/, 'dd');
};

export const documentation = {
  input: {
    type: 'String',
    required: false,
    description: 'locale - defaults to en',
  },
  output: {
    type: 'String',
    description: 'returns the locales date placeholder',
  },
};

export default getDateLocalePlaceholder;
