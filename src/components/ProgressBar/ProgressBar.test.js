import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from './ProgressBar';
import ProgressBarSkeleton from './skeleton';

describe('ProgressBar', () => {
  test('it renders the ProgressBar', () => {
    const { container } = render(
      <ProgressBar value={100} segments={[{ status: 'green', value: 0 }]} />,
    );
    expect(container.querySelector('.pal--progress-bar')).toBeInTheDocument();
    const sections = container.querySelectorAll('.pal--progress-bar__section');
    expect(sections.length).toBe(1);
    expect(sections[0]).toHaveAttribute('data-status', 'green');
  });

  test('it renders multiple segments', () => {
    const { container } = render(
      <ProgressBar
        value={35}
        segments={[
          { status: 'green', value: 0 },
          { status: 'blue', value: 50 },
        ]}
      />,
    );
    const sections = container.querySelectorAll('.pal--progress-bar__section');
    expect(sections.length).toBe(2);
    expect(sections[0]).toHaveAttribute('data-status', 'indeterminate-green');
    expect(sections[1]).toHaveAttribute('data-status', '');
  });

  test('it renders correct segment, green', () => {
    const { container } = render(
      <ProgressBar
        kind="percent"
        value={35}
        segments={[
          { status: 'green', value: 0 },
          { status: 'red', value: 50 },
          { status: 'blue', value: 75 },
        ]}
      />,
    );
    const sections = container.querySelectorAll('.pal--progress-bar__section');
    expect(sections.length).toBe(2);
    expect(sections[0]).toHaveAttribute('data-status', 'green');
    expect(sections[1]).not.toHaveAttribute('data-status');
  });

  test('it renders correct segment, red', () => {
    const { container } = render(
      <ProgressBar
        kind="percent"
        value={55}
        segments={[
          { status: 'green', value: 0 },
          { status: 'red', value: 50 },
        ]}
      />,
    );
    const sections = container.querySelectorAll('.pal--progress-bar__section');
    expect(sections.length).toBe(2);
    expect(sections[0]).toHaveAttribute('data-status', 'red');
    expect(sections[1]).not.toHaveAttribute('data-status');
  });

  test('it renders correct segment, gray', () => {
    const { container } = render(
      <ProgressBar
        kind="percent"
        value={85}
        segments={[
          { status: 'green', value: 0 },
          { status: 'red', value: 50 },
          { status: 'gray', value: 75 },
        ]}
      />,
    );
    const sections = container.querySelectorAll('.pal--progress-bar__section');
    expect(sections.length).toBe(2);
    expect(sections[0]).toHaveAttribute('data-status', 'gray');
    expect(sections[1]).not.toHaveAttribute('data-status');
  });

  test('it renders indeterminate', () => {
    const { container } = render(
      <ProgressBar
        kind="percent"
        value={100}
        segments={[{ status: 'blue', value: 0, indeterminate: true }]}
      />,
    );
    const sections = container.querySelectorAll('.pal--progress-bar__section');
    expect(sections.length).toBe(2);
    expect(sections[0]).toHaveAttribute('data-status', 'indeterminate-blue');
    expect(sections[1]).not.toHaveAttribute('data-status');
  });

  test('renders the skeleton component', () => {
    const { container } = render(<ProgressBarSkeleton label />);
    const main = container.querySelector('.pal--progress-bar--skeleton');
    const progress = container.querySelector(
      '.pal--progress-bar--skeleton__progress',
    );
    const label = container.querySelector(
      '.pal--progress-bar--skeleton__label',
    );

    expect(main).toBeInTheDocument();
    expect(progress).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
