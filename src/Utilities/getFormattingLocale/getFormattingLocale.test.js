import getFormattingLocale from '.';

describe('getFormattingLocale', () => {
  it('returns a valid locale', () => {
    const locale = getFormattingLocale('en-US,en;es');
    expect(locale).toEqual('en-US');
  });
});
