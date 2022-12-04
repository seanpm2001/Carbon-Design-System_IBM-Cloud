import React from 'react';
import { render } from '@testing-library/react';
import {
  Dropdown,
  Checkbox,
  Link,
  InlineNotification,
} from 'carbon-components-react';
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

describe.skip('Order Summary V2 - items a11y', () => {
  it('the order summary component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <section>
        <OrderSummaryV2
          {...defaultItemsSummaryProps}
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
          currencySwitcher={
            <Dropdown
              label="USD"
              ariaLabel="Select a Currency"
              titleText="Select a Currency"
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
          submitPromoCode={
            <SubmitPromo
              accountId="ADD ACCOUNT ID HERE"
              handleSubmit={() => {}}
              mock
            />
          }
          termsText={<Link href="/">View Terms and Conditions</Link>}
        />
      </section>,
      { container: document.body.appendChild(main) }
    );

    await expect(container).toBeAccessible(
      'Components: Order Summary V2 - Details'
    );
  });
});

describe.skip('Order Summary V2 - details a11y', () => {
  it('the order summary component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <section>
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
          notification={
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
          termsText={<Link href="/">View Terms and Conditions</Link>}
        />
      </section>,
      { container: document.body.appendChild(main) }
    );

    await expect(container).toBeAccessible(
      'Components: Order Summary V2 - Items'
    );
  });
});
