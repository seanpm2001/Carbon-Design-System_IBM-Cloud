import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Status, { StatusType, getStatusColor } from './Status';
import StatusSkeleton from './skeleton';

describe('Status', () => {
  describe('Essential component rendering', () => {
    it('renders with default Status classes', () => {
      const { container } = render(<Status />);
      const expectedClasses = [
        '.pal--status',
        '.pal--status__circle--unknown',
        '.pal--status__label',
      ];
      expectedClasses.forEach(c => {
        expect(container.querySelector(c)).toBeInTheDocument();
      });
    });
  });

  describe('Color prop', () => {
    it('renders with blue className when status is custom', () => {
      const { container } = render(<Status status={StatusType.CUSTOM} />);
      expect(
        container.querySelector('.pal--status__circle--blue'),
      ).toBeInTheDocument();
    });

    it('renders with gray className when status is inactive', () => {
      const { container } = render(<Status status={StatusType.INACTIVE} />);
      expect(
        container.querySelector('.pal--status__circle--gray'),
      ).toBeInTheDocument();
    });

    it('renders with unknown className when status is blank', () => {
      const { container } = render(<Status status={StatusType.BLANK} />);
      expect(
        container.querySelector('.pal--status__circle--unknown'),
      ).toBeInTheDocument();
    });

    it('renders with unknown className when status is unknown', () => {
      const { container } = render(<Status status={StatusType.UNKNOWN} />);
      expect(
        container.querySelector('.pal--status__circle--unknown'),
      ).toBeInTheDocument();
    });

    it('renders with green className when status is healthy', () => {
      const { container } = render(<Status status={StatusType.HEALTHY} />);
      expect(
        container.querySelector('.pal--status__circle--green'),
      ).toBeInTheDocument();
    });

    it('renders with red className when status is critical', () => {
      const { container } = render(<Status status={StatusType.CRITICAL} />);
      expect(
        container.querySelector('.pal--status__circle--red'),
      ).toBeInTheDocument();
    });

    it('renders with yellow className when status is warning', () => {
      const { container } = render(<Status status={StatusType.WARNING} />);
      expect(
        container.querySelector('.pal--status__circle--yellow'),
      ).toBeInTheDocument();
    });

    it('renders with loading indicator when status is transition', () => {
      const { container } = render(<Status status={StatusType.TRANSITION} />);
      expect(
        container.querySelector('.cds--inline-loading'),
      ).toBeInTheDocument();
    });

    it('renders with loading indicator when status is transition_static', () => {
      const { container } = render(
        <Status status={StatusType.TRANSITION_STATIC} />,
      );
      expect(
        container.querySelector('.cds--inline-loading'),
      ).toBeInTheDocument();
    });
  });

  describe('Label prop', () => {
    const label = 'Label';
    it('renders expected className', () => {
      const { container } = render(<Status label={label} />);
      expect(
        container.querySelector('.pal--status__label'),
      ).toBeInTheDocument();
    });

    it('renders passed in label', () => {
      render(<Status label={label} />);
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  describe('tooltipMsg prop', () => {
    it('renders string tooltipmsg properly', async () => {
      const { container, getByRole } = render(<Status status={StatusType.HEALTHY} tooltipMsg='my tooltip msg'/>);
      fireEvent.click(getByRole('button', {class: 'cds--tooltip__trigger'}));
      await waitFor(() => expect(document.querySelector('.cds--tooltip__content >p')).toBeInTheDocument());
    });

    it('renders node tooltipmsg properly', async () => {
      const { container, getByRole } = render(<Status status={StatusType.HEALTHY} tooltipMsg={<div>my tooltip div</div>}/>);
      fireEvent.click(getByRole('button', {class: 'cds--tooltip__trigger'}));
      await waitFor(() => expect(document.querySelector('.cds--tooltip__content >p')).not.toBeInTheDocument());
      await waitFor(() => expect(document.querySelector('.cds--tooltip__content >div')).toBeInTheDocument());
    });

  });

  describe('getStatusColor() helper function', () => {
    it('returns green when status is healthy', () => {
      expect(getStatusColor(StatusType.HEALTHY)).toEqual('green');
    });

    it('returns red when status is critical', () => {
      expect(getStatusColor(StatusType.CRITICAL)).toEqual('red');
    });

    it('returns yellow when status is warning', () => {
      expect(getStatusColor(StatusType.WARNING)).toEqual('yellow');
    });

    it('returns blue when status is custom', () => {
      expect(getStatusColor(StatusType.CUSTOM)).toEqual('blue');
    });

    it('returns gray when status is inactive', () => {
      expect(getStatusColor(StatusType.INACTIVE)).toEqual('gray');
    });

    it('returns gray when status is blank', () => {
      expect(getStatusColor(StatusType.BLANK)).toEqual('gray');
    });
  });
});

describe('StatusSkeleton', () => {
  it('renders as expected', () => {
    const { container } = render(<StatusSkeleton />);
    const expectedClasses = [
      '.pal--status',
      '.pal--status__circle',
      '.pal--status__circle--gray',
    ];
    expectedClasses.forEach(c => {
      expect(container.querySelector(c)).toBeInTheDocument();
    });
  });
});
