import React from 'react';
import { render } from '@testing-library/react';
import MessageV2 from './MessageV2';

const defaultProps = {
  caption: 'ERROR CODE: 502 - Bad Gateway',
  icon: { name: 'ERROR', color: 'BLUE' },
  text: 'Unable to fetch the requested resources at this time.',
};

describe('MessageV2', () => {
  describe('render classes as expected for MessageV2 component', () => {
    it('it renders the MessageV2 base class', () => {
      const { container } = render(<MessageV2 {...defaultProps} />);
      const baseClass = container.querySelector('.pal--message-v2__container');
      expect(baseClass).toBeInTheDocument();
    });
  });
});
