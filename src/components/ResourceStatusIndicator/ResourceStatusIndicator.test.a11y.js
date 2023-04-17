import React from 'react';
import { render } from '../../../test-utils';
import ResourceStatusIndicator from './ResourceStatusIndicator';

jest.useFakeTimers();

describe('ResourceStatusIndicator a11y', () => {
  test('the ResourceStatusIndicator component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <ResourceStatusIndicator
        value={100}
        segments={[{ status: 'green', value: 0 }]}
      />,
      {
        container: document.body.appendChild(main),
      },
    );

    await expect(container).toBeAccessible(
      'Components: ResourceStatusIndicator',
    );
  });
});
