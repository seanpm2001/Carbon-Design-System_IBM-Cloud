import formatDateNumeric from '.';

describe('formatDateNumeric', () => {
  it('returns a valid date given an ISO string', () => {
    const date = formatDateNumeric('2019-12-09T17:45:17.369Z');
    expect(date).toEqual('12/9/2019');
  });

  it('returns invalid date given a broken ISO string', () => {
    const date = formatDateNumeric('2019-12-09T17:45:1');
    expect(date).toEqual('Invalid Date');
  });
});
