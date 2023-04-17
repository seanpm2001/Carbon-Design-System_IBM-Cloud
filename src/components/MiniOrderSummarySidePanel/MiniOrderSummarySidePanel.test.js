/* eslint-disable react/prop-types, object-shorthand, func-names */
import React from 'react';
import { render, screen, waitFor } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import {
  Dropdown,
  Checkbox,
  InlineNotification,
} from '@carbon/react';
import MiniOrderSummarySidePanel from './MiniOrderSummarySidePanel';
import MiniOrderSummary from './children/MiniOrderSummary';

jest.mock('../SidePanel', () => {
  const SidePanel = ({ children, className }) => (
    <div className={`pal--side-panel ${className}`}>
      <div className="pal--side-panel__content">
        <div className="pal--side-panel__body-content">{children}</div>
      </div>
    </div>
  );
  return SidePanel;
});

const countrySwitcher = (
  <Dropdown
    label="United States of America"
    ariaLabel="Select a Country"
    size="sm"
    id="order-summary-country-switcher"
    type="inline"
    itemToString={item => item && item.text}
    items={[
      { id: 'EU', text: 'Europe' },
      { id: 'RU', text: 'Russia' },
      { id: 'CA', text: 'Canada' },
      { id: 'US', text: 'United States of America' },
    ]}
  />
);

const notifications = (
  <InlineNotification
    kind="error"
    title="Missing fields"
    subtitle="All fields are required to complete creation."
  />
);

const termsCheckbox = (
  <Checkbox
    id="checkbox"
    labelText="I agree to the Terms and conditions"
    checked
  />
);

const miniOrderSummaryProps = {
  countrySwitcher,
  items: [
    {
      name: 'Attribute 1',
      value: '$60.00',
      quantity: 1,
      details: [
        {
          name: 'Location',
          value: 'NA West - Equinix',
        },
        {
          name: 'BGP ASN',
          value: '645556',
        },
      ],
    },
  ],
  totalCostText: 'Total Estimated Cost',
  totalCost: '$50.00/mo',
  termsCheckbox,
  notifications,
};

const defaultProps = {
  miniOrderSummary: <MiniOrderSummary {...miniOrderSummaryProps} />,
  id: 'id',
};

describe('MiniOrderSummarySidePanel', () => {
  describe('render classes as expected for MiniOrderSummarySidePanel component', () => {
    it('it renders the MiniOrderSummarySidePanel base class', () => {
      const { container } = render(
        <MiniOrderSummarySidePanel {...defaultProps}>
          Form
        </MiniOrderSummarySidePanel>,
      );
      const baseClass = container.querySelector(
        '.pal--mini-order-summary-side-panel',
      );
      expect(baseClass).toBeInTheDocument();
    });

    it('it renders collapsed contents correctly', () => {
      const { container } = render(
        <MiniOrderSummarySidePanel {...defaultProps}>
          Form
        </MiniOrderSummarySidePanel>,
      );

      expect(
        container.querySelector('.pal--mini-order-summary-side-panel__content'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.pal--mini-order-summary-side-panel__summary'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.pal--mini-order-summary__notifications'),
      ).toBeInTheDocument();

      expect(screen.getByText('Form')).toBeInTheDocument();
      expect(screen.getByLabelText('Expand summary')).toBeInTheDocument();
      expect(screen.getByText('Total Estimated Cost')).toBeInTheDocument();
      expect(screen.getByText('$50.00/mo')).toBeInTheDocument();
      expect(
        screen.getByText('I agree to the Terms and conditions'),
      ).toBeInTheDocument();

      expect(screen.queryByText('Attribute 1')).not.toBeInTheDocument();
      expect(screen.queryByText('$60.00')).not.toBeInTheDocument();
      expect(screen.queryByText('Location')).not.toBeInTheDocument();
      expect(screen.queryByText('NA West - Equinix')).not.toBeInTheDocument();
      expect(screen.queryByText('BGP ASN')).not.toBeInTheDocument();
      expect(screen.queryByText('645556')).not.toBeInTheDocument();
    });

    it('it renders expanded contents correctly', () => {
      const { container } = render(
        <MiniOrderSummarySidePanel {...defaultProps}>
          Form
        </MiniOrderSummarySidePanel>,
      );

      expect(screen.getByText('Form')).toBeInTheDocument();
      expect(screen.getByLabelText('Expand summary')).toBeInTheDocument();

      userEvent.click(screen.getByLabelText('Expand summary'));

      expect(
        container.querySelector(
          '.pal--mini-order-summary-side-panel--expanded',
        ),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.pal--mini-order-summary-side-panel__content'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.pal--mini-order-summary-side-panel__summary'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.pal--mini-order-summary__notifications'),
      ).toBeInTheDocument();

      expect(screen.getByText('Total Estimated Cost')).toBeInTheDocument();
      expect(screen.getByText('$50.00/mo')).toBeInTheDocument();
      expect(
        screen.getByText('I agree to the Terms and conditions'),
      ).toBeInTheDocument();

      expect(screen.getByText('Attribute 1')).toBeInTheDocument();
      expect(screen.getByText('$60.00')).toBeInTheDocument();
      expect(screen.getByText('Location')).toBeInTheDocument();
      expect(screen.getByText('NA West - Equinix')).toBeInTheDocument();
      expect(screen.getByText('BGP ASN')).toBeInTheDocument();
      expect(screen.getByText('645556')).toBeInTheDocument();
    });
  });

  describe('height management', () => {
    let sidePanelHeight = 0;
    let sidePanelHeaderHeight = 0;
    let summaryFooterHeight = 0;
    let summaryHeaderHeight = 0;

    Object.defineProperty(Element.prototype, 'scrollHeight', {
      configurable: true,
      get: function() {
        if (this.className.includes('pal--order-summary-v2__header')) {
          return summaryHeaderHeight;
        }
        if (this.className.includes('pal--order-summary-v2__footer')) {
          return summaryFooterHeight;
        }
        return 0;
      },
      set(val) {
        if (this.className.includes('pal--order-summary-v2__header')) {
          summaryHeaderHeight = val;
        }
        if (this.className.includes('pal--order-summary-v2__footer')) {
          summaryFooterHeight = val;
        }
      },
    });

    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get: function() {
        return sidePanelHeight;
      },
      set(val) {
        sidePanelHeight = val;
      },
    });

    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      get: function() {
        return sidePanelHeaderHeight;
      },
      set(val) {
        sidePanelHeaderHeight = val;
      },
    });

    it('it sets height based on summary footer when collapsed', () => {
      sidePanelHeight = 1000;
      sidePanelHeaderHeight = 32;
      summaryFooterHeight = 50;
      const { container } = render(
        <MiniOrderSummarySidePanel {...defaultProps}>
          Form
        </MiniOrderSummarySidePanel>,
      );

      const content = container.querySelector('.pal--side-panel__content');
      const summary = container.querySelector('.pal--order-summary-v2');

      expect(content.style.height).toBe('882px');
      expect(summary.style.height).toBe('50px');
    });

    it('it sets height based on summary header, content, and footer when expanded', () => {
      sidePanelHeight = 1000;
      sidePanelHeaderHeight = 32;
      summaryFooterHeight = 50;
      summaryHeaderHeight = 48.5;
      const { container } = render(
        <MiniOrderSummarySidePanel {...defaultProps}>
          Form
        </MiniOrderSummarySidePanel>,
      );
      userEvent.click(screen.getByLabelText('Expand summary'));

      const content = container.querySelector('.pal--side-panel__content');
      const summary = container.querySelector('.pal--order-summary-v2');

      expect(content.style.height).toBe('800px');
      expect(summary.style.height).toBe('132px');
    });

    it('it recalculates height when notifications are clicked', () => {
      sidePanelHeight = 1000;
      sidePanelHeaderHeight = 32;
      summaryFooterHeight = 50;
      summaryHeaderHeight = 48.5;
      const { container } = render(
        <MiniOrderSummarySidePanel {...defaultProps}>
          Form
        </MiniOrderSummarySidePanel>,
      );
      userEvent.click(screen.getByLabelText('Expand summary'));

      const content = container.querySelector('.pal--side-panel__content');
      const summary = container.querySelector('.pal--order-summary-v2');

      expect(content.style.height).toBe('800px');
      expect(summary.style.height).toBe('132px');

      summaryFooterHeight = 18;
      expect(content.style.height).toBe('800px');
      expect(summary.style.height).toBe('132px');

      userEvent.click(
        container.querySelector('.pal--mini-order-summary__notifications'),
      );
      expect(content.style.height).toBe('832px');
      expect(summary.style.height).toBe('100px');
    });

    it('it handles missing mini order summary', () => {
      const { container } = render(
        <MiniOrderSummarySidePanel id="id">Form</MiniOrderSummarySidePanel>,
      );

      const content = container.querySelector('.pal--side-panel__content');
      const summary = container.querySelector('.pal--order-summary-v2');
      expect(content.style.height).toBe('');
      expect(summary).toBeNull();
    });
  });

  it('calls onExpandClick', () => {
    const onExpandClick = jest.fn();
    render(
      <MiniOrderSummarySidePanel
        {...defaultProps}
        onExpandClick={onExpandClick}
      >
        Form
      </MiniOrderSummarySidePanel>,
    );
    userEvent.click(screen.getByLabelText('Expand summary'));
    expect(onExpandClick).toBeCalled();
    userEvent.click(screen.getByLabelText('Collapse summary'));
    expect(onExpandClick).toBeCalledTimes(2);
  });

  it('calls onNotificationsClick', () => {
    const onNotificationsClick = jest.fn();
    const { container } = render(
      <MiniOrderSummarySidePanel
        {...defaultProps}
        onNotificationsClick={onNotificationsClick}
      >
        Form
      </MiniOrderSummarySidePanel>,
    );

    userEvent.click(
      container.querySelector('.pal--mini-order-summary__notifications'),
    );
    expect(onNotificationsClick).toBeCalled();
  });
});

describe('MiniOrderSummary', () => {
  it('calls the MiniOrderSummary add to estimate on click function', async () => {
    const onEstimateClick = jest.fn();
    render(
      <MiniOrderSummary
        {...miniOrderSummaryProps}
        estimateButtonProps={{ onClick: onEstimateClick }}
        expanded
      />,
    );
    userEvent.click(screen.getByText('Add to estimate'));
    await waitFor(() => expect(onEstimateClick).toBeCalled());
  });

  it('calls the MiniOrderSummary window event', async () => {
    const onLoadCall = jest.fn();
    global.header = { loadEstimatorJS: onLoadCall };
    render(
      <MiniOrderSummary
        {...miniOrderSummaryProps}
        estimateData={{}}
        expanded
      />,
    );
    userEvent.click(screen.getByText('Add to estimate'));
    await waitFor(() => expect(onLoadCall).toBeCalled());
  });

  it('renders loading estimate button', () => {
    render(
      <MiniOrderSummary
        {...miniOrderSummaryProps}
        estimateButtonLoading
        estimateData={{}}
        expanded
      />,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Add to estimate')).not.toBeInTheDocument();
  });

  it('renders non-indented items', () => {
    const { container } = render(
      <MiniOrderSummary
        {...miniOrderSummaryProps}
        items={[
          {
            name: 'Intel Xeon E3-1270 v6',
            value: '$226.00/mo',
            accordionText: 'Add-ons',
          },
        ]}
      />,
    );

    expect(
      container.querySelector('.pal--order-summary-v2__list--left-pad'),
    ).toBeNull();
  });

  describe('MiniOrderSummary details', () => {
    const metaDetails = [
      { label: 'Region', value: 'Dallas' },
      { label: 'Plan', value: 'Lite' },
      { label: 'Service name', value: 'Machine Learning-qk' },
      { label: 'Resource group', value: 'default' },
    ];

    const defaultDetailsSummaryProps = {
      ...miniOrderSummaryProps,
      details: {
        title: 'Test Offering',
        attributes: metaDetails,
      },
    };

    const arrayDetailsSummaryProps = {
      ...miniOrderSummaryProps,
      details: [
        {
          title: 'Test Offering',
          attributes: metaDetails,
        },
        {
          title: 'Second offering',
          attributes: [
            { label: 'Second Region', value: 'Dallas' },
            { label: 'Second Plan', value: 'Lite' },
            { label: 'Second Service name', value: 'Machine Learning-qk' },
            { label: 'Second Resource group', value: 'default' },
          ],
        },
      ],
    };

    it('renders the MiniOrderSummary offering name', () => {
      render(<MiniOrderSummary {...defaultDetailsSummaryProps} expanded />);

      expect(screen.getByText('Test Offering')).toBeInTheDocument();
    });

    it('renders the MiniOrderSummary detail', () => {
      render(<MiniOrderSummary {...defaultDetailsSummaryProps} expanded />);

      expect(screen.getByText('Region:')).toBeInTheDocument();
      expect(screen.getByText('Dallas')).toBeInTheDocument();
      expect(screen.getByText('Service name:')).toBeInTheDocument();
      expect(screen.getByText('Machine Learning-qk')).toBeInTheDocument();
      expect(screen.queryByText('Free')).not.toBeInTheDocument();
    });

    it('renders the MiniOrderSummary details', () => {
      render(<MiniOrderSummary {...arrayDetailsSummaryProps} expanded />);

      expect(screen.getByText('Second offering')).toBeInTheDocument();
      expect(screen.getByText('Second Region:')).toBeInTheDocument();
      expect(screen.getByText('Second Plan:')).toBeInTheDocument();
      expect(screen.getByText('Second Service name:')).toBeInTheDocument();
      expect(screen.getByText('Second Resource group:')).toBeInTheDocument();
      expect(screen.queryByText('Free')).not.toBeInTheDocument();
    });

    it('renders the MiniOrderSummary free text', () => {
      render(
        <MiniOrderSummary {...defaultDetailsSummaryProps} expanded isFree />,
      );

      expect(screen.getByText('Free')).toBeInTheDocument();
    });
  });
});
