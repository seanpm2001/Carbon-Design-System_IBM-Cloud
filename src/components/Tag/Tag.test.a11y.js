import React from 'react';
import { render } from '../../../config/jest/test-utils';
import Tag from './Tag';

describe('Tag a11y', () => {
  it('the Tag component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(<Tag type="functional">Test Tag</Tag>, {
      container: document.body.appendChild(main),
    });

    await expect(container).toBeAccessible('Components: Tag');
  });
});
