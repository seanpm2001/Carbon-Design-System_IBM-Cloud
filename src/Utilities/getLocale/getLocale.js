/*
Configs are controlled here. The config is used to generate an utility and it's documentation.
*/
// import { bcp47 as getLocale } from '@console/console-i18n/dist/utils';
//
// need to fix locale
const getLocale = () => 'en';

/*
Documentation aren't required, but help communicate to developers what the expected input and output of this Utility is.
*/
export const documentation = {
  input: "A locale value, 'en', 'en-us', 'de', 'cn', etc...",
  output: 'A IBM Cloud support locale value.',
};

export default getLocale;
