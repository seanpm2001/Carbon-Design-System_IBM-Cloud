import React from 'react';
import { render } from '@testing-library/react';
// Components, constants, helper functions
import Status, { StatusType } from './Status';

describe('Status a11y', () => {
  it('the status component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const label = 'Label';
    const { container } = render(
      <Status status={StatusType.WARNING} label={label} />,
      {
        container: document.body.appendChild(main),
      },
    );

    await expect(container).toBeAccessible('Components: Status');
  });
});
