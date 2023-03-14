import CarbonForCloudWrapper from "../src/CarbonForCloudWrapper";
import React, { Suspense } from "react";

// Wrap your stories in the I18nextProvider component
const withI18next = (Story, context) => {
  const { locale } = context.globals;
  return (
    // This catches the suspense from components not yet ready (still loading translations)
    // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
    <Suspense fallback={<div>loading translations...</div>}>
      <CarbonForCloudWrapper locale={locale}>
        <Story />
      </CarbonForCloudWrapper>
    </Suspense>
  );
};

export const decorators = [withI18next];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", title: "English" },
        { value: "de", title: "Deutsch" },
        { value: "es", title: "Spanish" },
        { value: "fr", title: "French" },
        { value: "it", title: "Italian" },
        { value: "ja", title: "Japanese" },
        { value: "ko", title: "Korean" },
        { value: "pt-br", title: "Portugese" },
        { value: "zh-cn", title: "Chinese" },
        { value: "zh-tw", title: "Chinese (Taiwan)" },
      ],
      showName: true,
    },
  },
};
