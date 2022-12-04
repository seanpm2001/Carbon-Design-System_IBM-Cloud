import getDateLocaleFormat from '.';

describe('getDateLocaleFormat', () => {
  it('returns a valid date format given a locale string', () => {
    const dateFormat = getDateLocaleFormat('en');
    expect(dateFormat).toBe('m/d/Y');
  });

  it('returns fallback dateformat given an invalid locale string', () => {
    const dateFormat = getDateLocaleFormat('12341234');
    expect(dateFormat).toBe('m/d/Y');
  });
});
