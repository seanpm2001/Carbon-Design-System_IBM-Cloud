import React, { useState, useEffect, useRef } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import useWindowResize from '.';

// eslint-disable-next-line react/prop-types
const MyComponent = ({ label }) => {
  const [resizeEvent, setResizeEvent] = useState();
  const [className, setClassName] = useState('resized-0');
  const resizeCount = useRef(0);

  useWindowResize(setResizeEvent);

  useEffect(() => {
    if (resizeEvent) {
      resizeCount.current += 1;
      setClassName(`resized-${resizeCount.current}`);
    }
  }, [resizeEvent, resizeCount]);

  return <div className={`my-component ${className}`}>{label}</div>;
};

describe('useWindowResize', () => {
  it('returns a supported locale when given an alternative locale', async () => {
    const { unmount: unmount1 } = render(<MyComponent label="Test 1" />);
    expect(screen.getByText('Test 1')).toHaveClass('resized-0');

    fireEvent(window, new Event('resize'));
    await waitFor(() =>
      expect(screen.getByText('Test 1')).toHaveClass('resized-1'),
    );

    render(<MyComponent label="Test 2" />);
    expect(screen.getByText('Test 1')).toHaveClass('resized-1');
    expect(screen.getByText('Test 2')).toHaveClass('resized-0');

    fireEvent(window, new Event('resize'));
    await waitFor(() =>
      expect(screen.getByText('Test 1')).toHaveClass('resized-2'),
    );
    expect(screen.getByText('Test 2')).toHaveClass('resized-1');

    unmount1();
    fireEvent(window, new Event('resize'));
    await waitFor(() =>
      expect(screen.getByText('Test 2')).toHaveClass('resized-2'),
    );
  });
});
