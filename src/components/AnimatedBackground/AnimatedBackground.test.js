import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import AnimatedBackground from './AnimatedBackground';

describe('AnimatedBackground', () => {
  it('renders', () => {
    const { container } = render(<AnimatedBackground />);
    const AnimatedBackgroundClass = container.querySelector('.pal--animated-background');
    expect(AnimatedBackgroundClass).toBeInTheDocument();

    const svgClass = container.querySelector('.pal--animated-background__gradient--motion');
    expect(svgClass).toBeInTheDocument();
  });

  it('renders', () => {
    const { container } = render(<AnimatedBackground motion={false} />);
    const AnimatedBackgroundClass = container.querySelector('.pal--animated-background');
    expect(AnimatedBackgroundClass).toBeInTheDocument();

    const svgClass = container.querySelector('.pal--animated-background__gradient--motion');
    expect(svgClass).not.toBeInTheDocument();
  });
});