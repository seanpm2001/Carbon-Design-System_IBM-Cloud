import getDateLocalePlaceholder from '.';

describe('getDateLocalePlaceholder', () => {
  it('returns a valid date format given a locale string', () => {
    const dateFormat = getDateLocalePlaceholder('en');
    expect(dateFormat).toBe('mm/dd/yyyy');
  });

  it('returns fallback dateformat given an invalid locale string', () => {
    const dateFormat = getDateLocalePlaceholder('12341234');
    expect(dateFormat).toBe('mm/dd/yyyy');
  });
});
