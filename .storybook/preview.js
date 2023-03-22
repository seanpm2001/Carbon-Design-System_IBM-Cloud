/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './preview.scss';
import { configureActions } from '@storybook/addon-actions';
import { white, g10, g90, g100 } from '@carbon/themes';
import { breakpoints } from '@carbon/layout';
import { Theme } from '@carbon/react';
import CarbonForCloudWrapper from "../src/i18n/CarbonForCloudWrapper";
import React, { Suspense } from "react";

configureActions({
  depth: 3,
  limit: 10,
});


const withTheme = (Story, context) => {
  const { locale, theme } = context.globals;

  React.useEffect(() => {
    document.documentElement.setAttribute('data-carbon-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <Theme theme={ theme }>
      <Story {...context} />
    </Theme>
  );
}


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

export const decorators = [withI18next, withTheme];

export const parameters = {
  theme: {
    // https://storybook.js.org/docs/react/essentials/backgrounds#grid
    grid: {
      cellSize: 8,
      opacity: 0.5,
    },
    values: [
      {
        name: 'white',
        value: white.background,
      },
      {
        name: 'g10',
        value: g10.background,
      },
      {
        name: 'g90',
        value: g90.background,
      },
      {
        name: 'g100',
        value: g100.background,
      },
    ],
  },
  status: {
    statuses: {
      experimental: {
        background: '#ec942c',
        color: '#ffffff',
        description: 'This component is experimental',
      },
      core: {
        background: '#339902',
        color: '#ffffff',
        description: 'This component is a Cloud PAL core component',
      },
    },
  },
  controls: {
    // https://storybook.js.org/docs/react/essentials/controls#show-full-documentation-for-each-property
    expanded: true,

    // https://storybook.js.org/docs/react/essentials/controls#specify-initial-preset-color-swatches
    // presetColors: [],

    // https://storybook.js.org/docs/react/essentials/controls#sorting-controls
    sort: 'alpha',

    hideNoControlsWarning: true,
  },
  darkMode: {
    current: 'light',
  },
  // Small (<672)
  // Medium (672 - 1056px)
  // Large (1056 - 1312px)
  // X-Large (1312 - 1584px)
  // Max (>1584)
  viewport: {
    viewports: {
      sm: {
        name: 'Small',
        styles: {
          width: breakpoints.sm.width,
          height: '100%',
        },
      },
      md: {
        name: 'Medium',
        styles: {
          width: breakpoints.md.width,
          height: '100%',
        },
      },
      lg: {
        name: 'Large',
        styles: {
          width: breakpoints.lg.width,
          height: '100%',
        },
      },
      xlg: {
        name: 'X-Large',
        styles: {
          width: breakpoints.xlg.width,
          height: '100%',
        },
      },
      Max: {
        name: 'Max',
        styles: {
          width: breakpoints.max.width,
          height: '100%',
        },
      },
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
        { value: "pt_br", title: "Portugese" },
        { value: "zh_cn", title: "Chinese" },
        { value: "zh_tw", title: "Chinese (Taiwan)" },
      ],
      showName: true,
    },
  },
  theme: {
    name: 'Theme',
    description: 'Set the global theme for displaying components',
    defaultValue: 'white',
    toolbar: {
      icon: 'circlehollow',
      items: ['white', 'g10', 'g90', 'g100'],
    },
  },
};
