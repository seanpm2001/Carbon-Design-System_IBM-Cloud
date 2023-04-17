/* eslint-disable react/prop-types */
/*
  This is a a11y testing file for the MiniOrderSummarySidePanel connected component
 */
import React from 'react';
import { render, fireEvent } from '../../../test-utils';
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

describe.skip('MiniOrderSummarySidePanel a11y', () => {
  test('the MiniOrderSummarySidePanel component passes the IBMA ruleset when collapsed', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <MiniOrderSummarySidePanel {...defaultProps}>
        Form
      </MiniOrderSummarySidePanel>,
      {
        container: document.body.appendChild(main),
      },
    );

    await expect(container).toBeAccessible(
      'Components: MiniOrderSummarySidePanel',
    );
  });

  test('the MiniOrderSummarySidePanel component passes the IBMA ruleset when expanded', async () => {
    const main = document.createElement('main');
    const { container, getByLabelText } = render(
      <MiniOrderSummarySidePanel {...defaultProps}>
        Form
      </MiniOrderSummarySidePanel>,
      {
        container: document.body.appendChild(main),
      },
    );

    fireEvent.click(getByLabelText('Expand summary'));

    await expect(container).toBeAccessible(
      'Components: MiniOrderSummarySidePanel',
    );
  });
});
