/*
  This is a a11y testing file for the IsometricIcon connected component
 */
import React from 'react';
import { render } from '@testing-library/react';
import IsometricIcon from './IsometricIcon';

describe('IsometricIcon a11y', () => {
  test('the IsometricIcon component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(<IsometricIcon id="icon" />, {
      container: document.body.appendChild(main),
    });

    await expect(container).toBeAccessible('Components: IsometricIcon');
  });
});
