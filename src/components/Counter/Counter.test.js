import React from 'react';
import { render } from '../../../config/jest/test-utils';

import Counter from '.';

describe('<Counter />', () => {
  it('renders the component as expected', () => {
    const { baseElement } = render(
      <Counter
        totalSteps={5}
        currentStep={3}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
  
  it('renders the new props as expected', () => {
    const { baseElement } = render(
      <Counter
        totalSteps={0}
        currentStep={10}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
  it('does not change out of bound props as expected', () => {
    const { baseElement } = render(
      <Counter
        totalSteps={11}
        currentStep={10}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
