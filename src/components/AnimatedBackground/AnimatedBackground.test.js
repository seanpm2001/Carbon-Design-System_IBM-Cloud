import '@testing-library/jest-dom'

import React from 'react';
import { render } from '@testing-library/react';
import AnimatedBackground from './AnimatedBackground';

describe('AnimatedBackground', () => {
  it('renders', () => {
    const { container } = render(<AnimatedBackground />);
    const AnimatedBackgroundClass = container.querySelector('.pal--animated-background');
    expect(AnimatedBackgroundClass).toBeInTheDocument();
  });
});