import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import React from "react";

const CarbonForCloudWrapper = ({ children, locale }) => {
  React.useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default CarbonForCloudWrapper;
