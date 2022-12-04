import React from 'react';
import {
  Dropdown,
  Checkbox,
  Link,
  InlineNotification,
} from 'carbon-components-react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderSummaryV2 from './OrderSummaryV2';

const defaultProps = {
  totalCost: '$241.00',
  estimateData: {},
  primaryButtonText: 'Create',
  secondaryButtonText: 'Save as quote',
  footnotes: '*Some Terms and conditions may apply',
};

const summaryItemDetails = [
  { name: '4 Cores, 3.80 GHz' },
  { name: '16 GB RAM' },
  { name: 'CentOS 7.x (64 bit)' },
  { name: 'DAL10 - Dallas' },
  {
    name: 'Nessus vulnerability assessment & reporting',
    isHidden: true,
  },
  { name: 'Email and ticket', isHidden: true },
  { name: 'Host ping', isHidden: true },
  { name: 'Automated notification', isHidden: true },
  { name: 'Reboot / KVM over IP', isHidden: true },
];

const metaDetails = [
  { label: 'Region', value: 'Dallas' },
  { label: 'Plan', value: 'Lite' },
  { label: 'Service name', value: 'Machine Learning-qk' },
  { label: 'Resource group', value: 'default' },
];

const nestedItems = [
  {
    name: 'Disk controller - Non-RAID',
    value: '$0.00',
    quantity: 2,
  },
  {
    name: 'Individual',
    details: [{ name: '1.00 TB SATA x 1' }],
  },
  {
    name: 'Network interface',
    details: [
      {
        name: '100 Mbps Redundant Public & Private Network Uplinks',
      },
      { name: '20000 GB', isHidden: true },
      { name: '1 IP address', isHidden: true },
      { name: 'Unlimited SSL VPN users', isHidden: true },
    ],
  },
];

const summaryItems = [
  {
    name: 'Intel Xeon E3-1270 v6',
    quantity: 1,
    value: '$226.00/mo',
    accordionText: 'Add-ons',
    details: summaryItemDetails,
    items: nestedItems,
  },
];

const defaultItemsSummaryProps = {
  ...defaultProps,
  items: summaryItems,
};

const defaultDetailsSummaryProps = {
  ...defaultProps,
  details: {
    title: 'Test Offering',
    attributes: metaDetails,
  },
};

describe('Order Summary V2', () => {
  describe('Order Summary V2 Header', () => {
    it('renders the Order Summary V2 Heading', () => {
      render(<OrderSummaryV2 {...defaultDetailsSummaryProps} />);

      expect(screen.getByText('Summary')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 Country Switcher', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          countrySwitcher={
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
          }
        />
      );

      expect(
        screen.getAllByText('United States of America')[0]
      ).toBeInTheDocument();
    });

    it('renders the Order Summary V2 Currency Switcher', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          currencySwitcher={
            <Dropdown
              label="USD"
              ariaLabel="Select a Currency"
              size="sm"
              id="order-summary-currency-switcher"
              type="inline"
              itemToString={item => item && item.text}
              items={[
                { id: 'US', text: 'USD' },
                { id: 'EU', text: 'EUR' },
              ]}
            />
          }
        />
      );

      expect(screen.getAllByText('USD')[0]).toBeInTheDocument();
    });
  });

  describe('Order Summary V2 Details', () => {
    it('renders the Order Summary V2 offering name', () => {
      render(<OrderSummaryV2 {...defaultDetailsSummaryProps} />);

      expect(screen.getByText('Test Offering')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 details', () => {
      render(<OrderSummaryV2 {...defaultDetailsSummaryProps} />);

      expect(screen.getByText('Region:')).toBeInTheDocument();
      expect(screen.getByText('Dallas')).toBeInTheDocument();
      expect(screen.getByText('Service name:')).toBeInTheDocument();
      expect(screen.getByText('Machine Learning-qk')).toBeInTheDocument();
      expect(screen.getByText('Estimate costs')).toBeInTheDocument();
      expect(screen.queryByText('Free')).not.toBeInTheDocument();
    });

    it('renders the Order Summary V2 free text', () => {
      render(<OrderSummaryV2 {...defaultDetailsSummaryProps} isFree />);

      expect(screen.getByText('Free')).toBeInTheDocument();
    });

    it('renders No "Estimate costs" button when the button is disabled', () => {
      const onEstimateClick = jest.fn();
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          estimateButtonProps={{ disabled: true, onClick: onEstimateClick }}
        />
      );

      expect(screen.queryByText('Estimate costs')).not.toBeInTheDocument();
    });
  });

  describe('Order Summary V2 Notification', () => {
    it('renders the Order Summary V2 Notification', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          notifications={
            <InlineNotification
              statusIconDescription="info:"
              iconDescription="describes the close button"
              kind="info"
              notificationType="inline"
              role="alert"
              subtitle="Upgrade to a Pay-as-you-go account and receive a $200 credit."
              title="This plan is not available with your current account type."
            />
          }
        />
      );

      expect(
        screen.getByText(
          'This plan is not available with your current account type.'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Order Summary V2 Items', () => {
    it('renders the Order Summary V2 Items', () => {
      render(<OrderSummaryV2 {...defaultItemsSummaryProps} />);

      expect(screen.getByText('Intel Xeon E3-1270 v6')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('$226.00/mo')).toBeInTheDocument();
      expect(
        screen.getByText('Disk controller - Non-RAID')
      ).toBeInTheDocument();
      expect(screen.getByText('$0.00')).toBeInTheDocument();
      expect(screen.getByText('Network interface')).toBeInTheDocument();
      expect(screen.getByText('20000 GB')).toBeInTheDocument();
      expect(screen.getByText('4 Cores, 3.80 GHz')).toBeInTheDocument();
      expect(screen.getByText('Email and ticket')).toBeInTheDocument();
    });

    it('does not render the Order Summary V2 Items if an empty array is provided', () => {
      render(<OrderSummaryV2 {...defaultItemsSummaryProps} items={[]} />);

      expect(
        screen.queryByText('Intel Xeon E3-1270 v6')
      ).not.toBeInTheDocument();
      expect(screen.queryByText('1')).not.toBeInTheDocument();
      expect(screen.queryByText('$226.00/mo')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Disk controller - Non-RAID')
      ).not.toBeInTheDocument();
      expect(screen.queryByText('$0.00')).not.toBeInTheDocument();
      expect(screen.queryByText('Network interface')).not.toBeInTheDocument();
      expect(screen.queryByText('20000 GB')).not.toBeInTheDocument();
      expect(screen.queryByText('4 Cores, 3.80 GHz')).not.toBeInTheDocument();
      expect(screen.queryByText('Email and ticket')).not.toBeInTheDocument();
    });

    it('does not add left padding if quantities or nested items are not included', () => {
      const { container } = render(
        <OrderSummaryV2
          {...defaultItemsSummaryProps}
          items={[
            {
              name: 'Intel Xeon E3-1270 v6',
              value: '$226.00/mo',
              accordionText: 'Add-ons',
            },
          ]}
        />
      );

      expect(
        container.querySelector('.pal--order-summary-v2__list--left-pad')
      ).toBeNull();
    });

    it('renders the Order Summary V2 terms text', () => {
      render(
        <OrderSummaryV2
          {...defaultItemsSummaryProps}
          termsText="View terms and conditions"
        />
      );

      expect(screen.getByText('View terms and conditions')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 login', () => {
      render(
        <OrderSummaryV2 {...defaultItemsSummaryProps} loginLink="/login" />
      );

      expect(screen.getByText('Already have an account?')).toBeInTheDocument();
      expect(screen.getByText('Log in')).toBeInTheDocument();
    });
  });

  describe('Order Summary V2 Footer', () => {
    it('renders the Order Summary V2 footer divider', () => {
      const { container } = render(<OrderSummaryV2 estimateData={{}} />);

      const footer = container.querySelector(
        '.pal--order-summary-v2__footer--no-divider'
      );

      expect(footer).toBeInTheDocument();
    });

    it('renders the Order Summary V2 with a promo code', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          submitPromoCode={
            <SubmitPromo
              accountId="ADD ACCOUNT ID HERE"
              handleSubmit={() => {}}
              mock
            />
          }
        />
      );

      expect(screen.getByText('Apply a code')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 subtotals', () => {
      render(
        <OrderSummaryV2
          subTotalItems={[
            { label: 'Subtotal', value: '$30.47', key: 'item-1' },
            { label: 'Discount', value: '$20.47', key: 'item-2' },
          ]}
        />
      );

      expect(screen.getByText('Subtotal')).toBeInTheDocument();
      expect(screen.getByText('$30.47')).toBeInTheDocument();
      expect(screen.getByText('Discount')).toBeInTheDocument();
      expect(screen.getByText('$20.47')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 total cost with default suffix', () => {
      render(<OrderSummaryV2 {...defaultDetailsSummaryProps} />);

      expect(screen.getByText('$241.00/mo')).toBeInTheDocument();
      expect(screen.getByText('Total estimated cost')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 total cost with custom suffix', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          totalCostSuffix="/year"
        />
      );
      expect(screen.getByText('$241.00/year')).toBeInTheDocument();
      expect(screen.getByText('Total estimated cost')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 total cost with no suffix', () => {
      render(
        <OrderSummaryV2 {...defaultDetailsSummaryProps} totalCostSuffix="" />
      );
      expect(screen.getByText('$241.00')).toBeInTheDocument();
      expect(screen.getByText('Total estimated cost')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 without total cost', () => {
      render(
        <OrderSummaryV2 {...defaultDetailsSummaryProps} totalCost={undefined} />
      );

      expect(
        screen.queryByText('$241.00', { exact: false })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('Total estimated cost')
      ).not.toBeInTheDocument();
    });

    it('renders the Order Summary V2 with custom total cost text', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          totalCostText="Total yearly cost*"
        />
      );

      expect(screen.queryByText('$241.00/mo')).not.toBeInTheDocument();
      expect(screen.getByText('$241.00')).toBeInTheDocument();
      expect(screen.getByText('Total yearly cost*')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 with custom total cost text and custom suffix', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          totalCostText="Custom total cost text:"
          totalCostSuffix="/year"
        />
      );
      expect(screen.getByText('$241.00/year')).toBeInTheDocument();
      expect(screen.getByText('Custom total cost text:')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 with footnotes', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          footnotes="footnotes test"
        />
      );

      expect(screen.getByText('footnotes test')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 without footnotes', () => {
      render(
        <OrderSummaryV2 {...defaultDetailsSummaryProps} footnotes={undefined} />
      );

      expect(
        screen.queryByText('*Some Terms and conditions may apply')
      ).not.toBeInTheDocument();
    });

    it('renders the Order Summary V2 with the terms checkbox', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          termsCheckbox={
            <div>
              <Checkbox
                id="order-summary-check-box"
                indeterminate={false}
                labelText="I read and agree to the following Third-Party service Agreements:"
              />
              <div>
                <Link href="/">Agreement 1</Link>
                <Link href="/">Agreement 2</Link>
              </div>
            </div>
          }
        />
      );

      expect(
        screen.getByText(
          'I read and agree to the following Third-Party service Agreements:'
        )
      ).toBeInTheDocument();
    });

    it('renders the Order Summary V2 with the primary button', () => {
      render(<OrderSummaryV2 {...defaultDetailsSummaryProps} />);

      expect(screen.getByText('Create')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 with the primary button loading', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          primaryButtonLoading
          primaryButtonLoadingText="Creating..."
        />
      );

      expect(screen.getByText('Creating...')).toBeInTheDocument();
    });

    it('passes props to the Order Summary V2 primary button', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          primaryButtonProps={{ 'data-testid': 'primary-button' }}
        />
      );

      expect(screen.queryByTestId('primary-button')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 with the secondary button', () => {
      render(<OrderSummaryV2 {...defaultDetailsSummaryProps} />);

      expect(screen.getByText('Save as quote')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 with the secondary button loading', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          secondaryButtonLoading
          secondaryButtonLoadingText="Loading..."
        />
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 without the secondary button', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          secondaryButtonText={undefined}
        />
      );

      expect(screen.queryByText('Save as quote')).not.toBeInTheDocument();
    });

    it('passes props to the Order Summary V2 secondary button', () => {
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          primaryButtonProps={{ 'data-testid': 'secondary-button' }}
        />
      );

      expect(screen.queryByTestId('secondary-button')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 add to estimate button', () => {
      render(<OrderSummaryV2 {...defaultDetailsSummaryProps} />);

      expect(screen.getByText('Add to estimate')).toBeInTheDocument();
    });

    it('renders the Order Summary V2 with the secondary button loading', () => {
      render(
        <OrderSummaryV2 {...defaultDetailsSummaryProps} estimateButtonLoading />
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('calls the Order Summary V2 add to estimate on click function', () => {
      const onEstimateClick = jest.fn();
      render(
        <OrderSummaryV2
          {...defaultDetailsSummaryProps}
          estimateButtonProps={{ onClick: onEstimateClick }}
        />
      );

      userEvent.click(screen.getByText('Add to estimate'));
      expect(onEstimateClick.mock.calls.length).toBe(1);
    });

    it('calls the Order Summary V2 window event', async () => {
      const onLoadCall = jest.fn();
      global.header = { loadEstimatorJS: onLoadCall };
      render(<OrderSummaryV2 {...defaultDetailsSummaryProps} />);

      userEvent.click(screen.getByText('Add to estimate'));
      await waitFor(() => expect(onLoadCall.mock.calls.length).toBe(1));
    });
  });
});
