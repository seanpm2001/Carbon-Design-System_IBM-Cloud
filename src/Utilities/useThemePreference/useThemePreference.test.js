import { act, renderHook } from '@testing-library/react-hooks';
import useThemePreference, { themes } from './useThemePreference';

afterEach(() => localStorage.clear());

describe('useThemePreference', () => {
  it('should return the light theme by default', () => {
    const {
      result: { current: theme },
    } = renderHook(() => useThemePreference());

    expect(theme).toEqual(themes.light);
  });

  it('should return the theme when it changes', () => {
    const { result, rerender } = renderHook(() => useThemePreference());

    expect(result.current).toEqual(themes.light);

    act(() => {
      window.dispatchEvent(
        new CustomEvent('header-theme-set', { detail: { theme: 'themeDark' } })
      );
    });

    rerender();

    expect(result.current).toEqual(themes.dark);
  });

  it('should return themeDark when themeDark is read from local storage', () => {
    localStorage.setItem('ibmcloud:theme-switcher', themes.dark);
    const { result } = renderHook(() => useThemePreference());

    expect(result.current).toEqual(themes.dark);
  });

  it('should return themeLight when useThemePreference is set to false and local storage is clear', () => {
    localStorage.clear();
    const { result } = renderHook(() => useThemePreference(false));

    expect(result.current).toEqual(themes.light);
  });

  it('should return themeLight when themeLight is read from local storage', () => {
    localStorage.setItem('ibmcloud:theme-switcher', themes.light);
    const { result } = renderHook(() => useThemePreference());

    expect(result.current).toEqual(themes.light);
  });

  it('should not return themeDefault when themeDefault is read from local storage', () => {
    localStorage.setItem('ibmcloud:theme-switcher', 'themeDefault');
    const { result } = renderHook(() => useThemePreference());

    expect(result.current).not.toEqual('themeDefault');
  });
});
