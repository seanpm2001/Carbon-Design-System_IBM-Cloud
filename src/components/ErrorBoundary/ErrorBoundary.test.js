import React from 'react';
import { render, screen } from '../../../config/jest/test-utils';
import ErrorBoundary from './ErrorBoundary';
import ErrorExample from './examples/Error';
import requestUtils from '../../utils/request';

describe('ErrorBoundary', () => {
  describe('render as expected for ErrorBoundary component', () => {
    beforeEach(() => {
      jest.spyOn(requestUtils, 'post').mockImplementation(() => {});
      jest.spyOn(console, 'error').mockImplementation(() => null);
    });

    it('it renders contents correctly with no error', () => {
      render(<ErrorBoundary>Test text</ErrorBoundary>);
      const componentContent = screen.getByText('Test text');
      expect(componentContent).toBeInTheDocument();
    });

    it('it renders an error message when an error is thrown', () => {
      const { container } = render(
        <ErrorBoundary>
          <ErrorExample />
        </ErrorBoundary>,
      );
      const message = container.querySelector('.pal--message');
      expect(message).toBeInTheDocument();
      expect(requestUtils.post).not.toHaveBeenCalled();
    });

    it('it posts errors to a logging endpoint', () => {
      render(
        <ErrorBoundary
          loggingEndpoint="/log"
          text="override text"
          caption="override caption"
        >
          <ErrorExample />
        </ErrorBoundary>,
      );
      expect(screen.getByText('override text')).toBeInTheDocument();
      expect(screen.getByText('override caption')).toBeInTheDocument();
      expect(requestUtils.post).toHaveBeenCalledWith('/log', {
        body: expect.any(Object),
      });
    });
  });
});
