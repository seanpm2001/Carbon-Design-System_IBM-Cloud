import React from 'react';
import { render } from '../../../config/jest/test-utils';
import AnimatedBackground from './AnimatedBackground';

describe('Animated Background a11y', () => {
  it('the animated background component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <AnimatedBackground />,
      { container: document.body.appendChild(main) },
    );

    await expect(container).toBeAccessible('Components: Animated Background');
  });
});
