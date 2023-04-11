import React from 'react';
import { render } from '@testing-library/react';

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
  it('does not change out of bound props as expected', () => {
    const { baseElement } = render(
      <Counter
        totalSteps={-1}
        currentStep={5}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
  it('does not apply strings as numbers', () => {
    const { baseElement } = render(
      <Counter
        totalSteps="not a number"
        currentStep="another string"
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
