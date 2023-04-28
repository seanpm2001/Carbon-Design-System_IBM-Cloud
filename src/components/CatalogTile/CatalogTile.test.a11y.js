import React from 'react';
import { render } from '../../../config/jest/test-utils';
import CatalogTile from './CatalogTile';

describe('CatalogTile a11y', () => {
  it('the CatalogTile component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <CatalogTile href="https://ibm.com" offeringName="test" />,
      {
        container: document.body.appendChild(main),
      },
    );

    await expect(container).toBeAccessible('Components: CatalogTile');
  });
});
