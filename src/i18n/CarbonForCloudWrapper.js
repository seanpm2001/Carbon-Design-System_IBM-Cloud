import { I18nextProvider } from "react-i18next";
import PropTypes from "prop-types";
import i18n from "./i18n";
import React from "react";

// we use underscore for pt_br, zh_cn, and zh_tw
const checkLocale = (locale) =>
  (locale === "pt-br" && "pt_br") ||
  (locale === "zh-cn" && "zh_cn") ||
  (locale === "zh-tw" && "zh_tw") ||
  locale;

const CarbonForCloudWrapper = ({ children, locale }) => {
  React.useEffect(() => {
    i18n.changeLanguage(checkLocale(locale));
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};


CarbonForCloudWrapper.propTypes = {
  /**
   * Any component's, elements, or strings to be rendered inside of the wrapper component.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  /**
   * document language
   */
  locale: PropTypes.string.isRequired
}

export default CarbonForCloudWrapper;
