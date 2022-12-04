import { getPanelId, getPanelDetails } from './getPanelDetails';

describe('getPanelId', () => {
  it('gets the panel id', () => {
    expect(getPanelId(null, 0, false)).toBe(null);
    expect(getPanelId({ props: { id: '1' } }, 0, false)).toBe('1');
    expect(getPanelId({ props: {} }, 0, false)).toBe('pal-side-panel-0');
    expect(getPanelId({ props: {} }, 0, true)).toBe(
      'pal-side-panel-0--is-nested',
    );
  });
});

describe('getPanelDetails', () => {
  it('gets the panel details - no panels', () => {
    expect(
      getPanelDetails({ props: { id: '1' } }, 0, undefined, '2'),
    ).toStrictEqual({
      id: '1',
      nextId: null,
      previousId: null,
      isActive: false,
      isNextActive: false,
      isPreviousActive: false,
      isNestedActive: undefined,
    });
  });
});
