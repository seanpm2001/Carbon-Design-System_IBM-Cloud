import React from 'react';
import { render } from '@testing-library/react';
import MessageV2 from './MessageV2';

jest.mock('./icons/error--blue.svg', () => <svg />);

const defaultProps = {
  caption: 'ERROR CODE: 502 - Bad Gateway',
  icon: { name: 'ERROR', color: 'BLUE' },
  text: 'Unable to fetch the requested resources at this time.',
};

describe('MessageV2 a11y', () => {
  it('the MessageV2 component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(<MessageV2 {...defaultProps} />, {
      container: document.body.appendChild(main),
    });

    await expect(container).toBeAccessible('Components: MessageV2');
  });
});
