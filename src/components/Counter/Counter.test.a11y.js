import React from 'react';
import { render } from '../../../config/jest/test-utils';
import Counter from '.';

describe('Counter a11y', () => {
  it('the Counter component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <Counter
        totalSteps={5}
        currentStep={0}
      />,
      { container: document.body.appendChild(main) },
    );

    await expect(container).toBeAccessible('Components: Counter');
  });
});