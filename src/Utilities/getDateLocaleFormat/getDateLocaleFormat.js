const getDateLocaleFormat = locale => {
  let localeDate;
  try {
    localeDate = new Intl.DateTimeFormat(locale, { timeZone: 'UTC' }).format(
      new Date('2012-12-21T00:00:00.000+00:00'),
    );
  } catch (err) {
    return 'm/d/Y';
  }

  //  The following regex is testing for any delimiter listed, basically no letters or numbers
  //  if it can't find any matches, it'll fall back to '/'
  //  This is an issue in ie11 with zh, they show the date as 1970‎年‎10‎月‎30‎日
  const separator =
    localeDate[localeDate.search(/[~`!#$%^&*+=\-[\]';,./{}|\\":<>?]/)] || '/';

  const dateOrder = ['2012', '12', '21'].sort(
    (a, b) => localeDate.indexOf(a) - localeDate.indexOf(b),
  );

  return dateOrder
    .join(separator)
    .replace(/2012/, 'Y')
    .replace(/12/, 'm')
    .replace(/21/, 'd');
};

export const documentation = {
  input: {
    type: 'String',
    required: false,
    description: 'locale - defaults to en',
  },
  output: {
    type: 'String',
    description: 'returns the locales date format',
  },
};

export default getDateLocaleFormat;
