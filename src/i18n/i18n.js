import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "./translations";

const newInstance = i18n.createInstance();

newInstance.use(LanguageDetector).init(
  {
    fallbackLng: "en",
    lng: "en",
    resources,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  },
  (err) => {
    if (err) return console.log(err);
  }
);

export default newInstance;
