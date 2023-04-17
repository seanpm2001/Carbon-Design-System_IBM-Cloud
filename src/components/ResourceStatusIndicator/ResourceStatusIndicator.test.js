import React from 'react';
import { render, screen } from '../../../test-utils';
import { act } from 'react-dom/test-utils';
import ResourceStatusIndicator from './ResourceStatusIndicator';
import ResourceStatusIndicatorSkeleton from './skeleton';

const props = {
  value: 50,
  kind: 'segments',
  segments: [{ value: 0 }, { value: 80 }],
  width: '3rem',
};

jest.useFakeTimers();

describe('ResourceStatusIndicator', () => {
  describe('render classes as expected for ResourceStatusIndicator component', () => {
    it('it renders the ResourceStatusIndicator base class', () => {
      const { container } = render(<ResourceStatusIndicator {...props} />);
      const baseClass = container.querySelector(
        '.pal--resource-status-indicator',
      );
      expect(baseClass).toBeInTheDocument();
    });

    it('it renders the label correctly', () => {
      render(<ResourceStatusIndicator label="Custom label" {...props} />);
      const componentContent = screen.getByText('Custom label');
      expect(componentContent).toBeInTheDocument();
    });

    it('Renders ResourceStatusIndicator segmented', () => {
      const segments = [
        { value: 0 },
        { value: 10 },
        { value: 60 },
        { value: 75 },
      ];
      const { container } = render(
        <ResourceStatusIndicator
          segments={segments}
          kind="segments"
          width="3rem"
          value={50}
        />,
      );
      const segmentSections = container.querySelectorAll(
        '.pal--resource-status-indicator__section__fill',
      );
      expect(segmentSections.length).toBe(4);
      expect(segmentSections[segmentSections.length - 1]).not.toHaveAttribute(
        'data-status',
      );
    });
    it('renders ResourceStatusIndicator icon and label only', () => {
      const { container } = render(
        <ResourceStatusIndicator
          statusIndicator="success"
          label="Successful status"
        />,
      );
      const noBar = container.querySelector(
        '.pal--resource-status-indicator__progress',
      );
      expect(noBar).toBeNull();
    });
  });

  test('Success Icon state is activated from completion of job', async () => {
    const { container, rerender } = render(
      <ResourceStatusIndicator
        value={99}
        segments={[{ status: 'green', value: 0 }]}
        label="Successful operation"
        width="3rem"
      />,
    );
    expect(
      container.querySelector('.pal--resource-status-indicator__progress'),
    ).toBeTruthy();
    await rerender(
      <ResourceStatusIndicator
        value={100}
        segments={[{ status: 'green', value: 0 }]}
        label="Successful operation"
        width="3rem"
      />,
    );
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(
      container.querySelector('.pal--resource-status-indicator__progress'),
    ).toBeNull();
  });

  test('Error Icon state is activated from fatalError', async () => {
    const { container, rerender } = render(
      <ResourceStatusIndicator
        value={50}
        segments={[{ status: 'green', value: 0 }]}
        label="Successful operation"
        width="3rem"
      />,
    );
    expect(
      container.querySelector('.pal--resource-status-indicator__progress'),
    ).toBeTruthy();
    await rerender(
      <ResourceStatusIndicator
        value={50}
        fatalError
        segments={[{ status: 'green', value: 0 }]}
        label="Successful operation"
        width="3rem"
      />,
    );
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(
      container.querySelector('.pal--resource-status-indicator__progress'),
    ).toBeNull();
  });

  test('Renders indeterminate status', () => {
    const { container } = render(
      <ResourceStatusIndicator
        kind="indeterminate"
        label="Indeterminate"
        width="3rem"
      />,
    );

    const section = container.querySelector(
      '.pal--resource-status-indicator__section',
    );
    expect(section).toHaveAttribute('data-status', 'indeterminate-green');
  });

  test('renders the skeleton component', () => {
    const { container } = render(
      <ResourceStatusIndicatorSkeleton label width="3rem" />,
    );
    const mainBar = container.querySelector(
      '.pal--resource-status-indicator--skeleton__progress',
    );
    const label = container.querySelector(
      '.pal--resource-status-indicator--skeleton__label',
    );
    expect(mainBar).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
