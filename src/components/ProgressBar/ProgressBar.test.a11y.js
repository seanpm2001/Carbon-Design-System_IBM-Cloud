import React from 'react';
import { render } from '../../../test-utils';
import ProgressBar from './ProgressBar';

describe('ProgressBar a11y', () => {
  it('the ProgressBar component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <ProgressBar value={100} segments={[{ status: 'green', value: 0 }]} />,
      { container: document.body.appendChild(main) },
    );

    await expect(container).toBeAccessible('Components: ProgressBar');
  });
});
