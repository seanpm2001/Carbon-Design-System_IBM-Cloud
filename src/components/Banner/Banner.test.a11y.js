/*
  This is a a11y testing file for the Banner connected component
 */
import React from 'react';
import { render } from '@testing-library/react';
import Banner from './Banner';

describe('Banner a11y', () => {
  test('the Banner component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(<Banner>Test text</Banner>, {
      container: document.body.appendChild(main),
    });

    await expect(container).toBeAccessible('Components: Banner');
  });

  test('the dismissible Banner component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <Banner dismissible closeButtonLabel="Close banner">
        Test text
      </Banner>,
      {
        container: document.body.appendChild(main),
      }
    );

    await expect(container).toBeAccessible('Components: Dismissible banner');
  });
});
