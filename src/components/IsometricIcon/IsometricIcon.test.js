import React from 'react';
import { render } from '../../../test-utils';

import IsometricIcon from './IsometricIcon';

describe('IsometricIcon', () => {
  describe('render classes as expected for IsometricIcon component', () => {
    it('it renders the IsometricIcon base class', () => {
      const { container } = render(
        <IsometricIcon id="empty-message" icon="EMPTY" />
      );

      const baseClass = container.querySelector('.pal--isometric-icon');

      expect(baseClass).toBeInTheDocument();
    });

    it('renders the error variant as expected', () => {
      const { baseElement } = render(
        <IsometricIcon id="error-message" icon="ERROR" />
      );

      expect(baseElement).toMatchSnapshot();
    });
  });
});
