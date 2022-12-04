import getLocale from '.';

describe('getLocale', () => {
  it('returns a supported locale when given an alternative locale', () => {
    const locale = getLocale('de');
    expect(locale).toEqual('de');
  });

  it('returns a supported locale when provided giberrish', () => {
    const locale = getLocale('abcdefghijklmnop');
    expect(locale).toEqual('en');
  });
});
