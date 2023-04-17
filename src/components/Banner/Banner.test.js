import React from 'react';
import { render, screen } from '../../../config/jest/test-utils';
import Banner from './Banner';

describe('Banner', () => {
  describe('render classes as expected for Banner component', () => {
    it('it renders the Banner base class', () => {
      const { container } = render(<Banner>Test text</Banner>);
      const baseClass = container.querySelector('.pal--banner');
      expect(baseClass).toBeInTheDocument();
    });

    it('it renders contents correctly', () => {
      render(<Banner>Test text</Banner>);
      const componentContent = screen.getByText('Test text');
      expect(componentContent).toBeInTheDocument();
    });
  });
});
