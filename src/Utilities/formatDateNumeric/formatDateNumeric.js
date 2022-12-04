import getLocale from '../getLocale';
/*
Configs are controlled here. The config is used to generate an utility and it's documentation.
*/
const formatDateNumeric = dateISO => {
  const date = new Date(dateISO);

  return date.toLocaleDateString(getLocale(), {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC',
  });
};
/*
Documentation aren't required, but help communicate to developers what the expected input and output of this Utility is.
*/
export const documentation = {
  // These are possible inputs the user can pass into an Utility.
  input: {
    type: 'String', // Type of the variable, String, Int etc...
    required: true, // If this param is required or not
    // The Descriptions for documentation purposes of the params
    description: 'A date ISO String. i.e.   "2019-12-09T17:45:17.369Z"',
  },
  output: {
    // This is the output of this utility
    type: 'String', // Type of the variable, String, Int etc...
    // The Descriptions for documentation purposes of the params
    description:
      'Returns a date string formatted numerically by locale. i.e "12/9/2019" All dates are in UTC timezone.',
  },
};

export default formatDateNumeric;
