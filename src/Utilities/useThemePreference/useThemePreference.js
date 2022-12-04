import { useEffect, useLayoutEffect, useState } from "react";
import canUseDOM from "../../utils/canUseDom";

const themeSetEventName = "header-theme-set";
const key = "ibmcloud:theme-switcher";

// useIsomorphicLayoutEffect will check that window is defined and
// switch to the appropriate hook since useLayoutEffect does not
// work with server-side rendering.
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

export const themes = {
  light: "themeLight",
  dark: "themeDark",
};

function getOSThemePreference() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return themes.dark;
  }
  return themes.light;
}

function getThemePreference(savedPreference, getOSTheme) {
  if (savedPreference === "themeDefault") {
    return getOSThemePreference();
  }

  if (!savedPreference && getOSTheme === true) {
    return getOSThemePreference();
  }

  if (savedPreference) {
    return savedPreference;
  }

  return themes.light;
}

function useThemePreference(getOSTheme = true) {
  const [theme, setTheme] = useState(themes.light);

  useIsomorphicLayoutEffect(() => {
    const savedPreference = localStorage.getItem(key);
    setTheme(getThemePreference(savedPreference, getOSTheme));
  }, []);

  useEffect(() => {
    const updateTheme = ({ detail }) => {
      setTheme(detail.theme);
    };

    window.addEventListener(themeSetEventName, updateTheme);

    return () => window.removeEventListener(themeSetEventName, updateTheme);
  }, []);

  return theme;
}

export const documentation = {
  input: {
    type: Boolean,
    description: "param getOSTheme",
  },
  output: {
    type: "String",
    description: "Returns the theme preference from local storage",
  },
};

export default useThemePreference;
