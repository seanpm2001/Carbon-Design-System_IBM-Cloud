/* eslint-disable react/prop-types, jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  Dropdown,
  Form,
  TextInput,
  InlineNotification,
  Checkbox,
  Link,
} from "@carbon/react";
import MiniOrderSummarySidePanel from "../MiniOrderSummarySidePanel";
import MiniOrderSummary from "../children/MiniOrderSummary";
import SidePanelContainer from "../../SidePanel/SidePanelContainer";

const SinglePanel = ({ showSidePanel, onPanelClose }) => {
  const [name, setName] = useState("");
  const [option, setOption] = useState("");
  const [terms, setTerms] = useState(false);
  const [invalid, setInvalid] = useState({
    name: false,
    dropdown: false,
    terms: false,
  });
  const [isCreating, setIsCreating] = useState(false);

  const onCreate = () => {
    setIsCreating(true);
    return new Promise((resolve) =>
      setTimeout(() => {
        setIsCreating(false);
        resolve(onPanelClose());
      }, 2500)
    );
  };

  const onClose = () => {
    if (isCreating) {
      return false;
    }
    return onPanelClose();
  };

  const validateForm = () => {
    if (name && option && terms) {
      setInvalid({ name: false, dropdown: false, terms: false });
      return onCreate();
    }
    const invalidUpdate = {};
    if (!name) invalidUpdate.name = true;
    if (!option) invalidUpdate.dropdown = true;
    if (!terms) invalidUpdate.terms = true;
    setInvalid(invalidUpdate);
    return false;
  };

  const textInputProps = {
    id: "text-input",
    labelText: "Name",
    placeholder: "Enter name",
    invalidText: "A name is required. Enter a name.",
    onChange: (e) => setName(e.currentTarget.value),
    invalid: invalid.name,
  };

  const dropdownProps = {
    id: "dropdown-input",
    items: [
      { label: "Option 1", cost: 1 },
      { label: "Option 2", cost: 2 },
      { label: "Option 3", cost: 3 },
    ],
    titleText: "Option",
    label: "Select an option",
    invalid: invalid.dropdown,
    invalidText: "An option is required. Select an option.",
    onChange: (e) => setOption(e.selectedItem),
  };

  const form = (
    <Form>
      <TextInput {...textInputProps} />
      <Dropdown {...dropdownProps} />
    </Form>
  );

  const checkbox = (
    <Checkbox
      id="checkbox"
      labelText={
        <span>
          I agree to the <Link href="#">Terms and conditions</Link>
        </span>
      }
      checked={terms}
      onChange={(value) => setTerms(value)}
    />
  );

  const notification =
    invalid.name || invalid.dropdown || invalid.terms ? (
      <InlineNotification
        kind="error"
        title="Missing fields"
        subtitle="All fields are required to complete creation."
      />
    ) : null;

  const orderSummaryItems = [
    {
      name: "Attribute 1",
      value: `$${option ? 250 * option.cost : 0}.00`,
      quantity: 1,
      details: [
        {
          name: "Location",
          value: "NA West - Equinix",
        },
        {
          name: "BGP ASN",
          value: "645556",
        },
      ],
    },
  ];

  if (option) {
    orderSummaryItems[0].details.unshift({
      name: "Option",
      value: option.label,
    });
  }
  if (name) {
    orderSummaryItems[0].details.unshift({ name: "Name", value: name });
  }

  return (
    <SidePanelContainer
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onClose}
      onDoneClick={validateForm}
      onCancelClick={onClose}
      doneText="Create"
      closePanelText="Cancel"
    >
      <MiniOrderSummarySidePanel
        id="single-panel"
        title="Simple Mini Order Summary Panel"
        doneIsLoading={isCreating}
        miniOrderSummary={
          <MiniOrderSummary
            currencySwitcher={
              <Dropdown
                ariaLabel="Select a Currency"
                id="order-summary-currency-switcher"
                itemToString={(item) => item && item.text}
                items={[
                  { id: "US", text: "USD" },
                  { id: "EU", text: "EUR" },
                ]}
                label="USD"
                size="sm"
                type="inline"
              />
            }
            items={orderSummaryItems}
            notifications={notification}
            totalCostText="Total Estimated Cost"
            totalCost={`$${option ? 250 * option.cost : 0}.00/mo`}
            termsCheckbox={checkbox}
            termsCheckboxInvalid={invalid.terms}
          />
        }
      >
        {form}
      </MiniOrderSummarySidePanel>
    </SidePanelContainer>
  );
};

SinglePanel.code = `const SinglePanel = ({ showSidePanel, onPanelClose }) => {
  const [name, setName] = useState('');
  const [option, setOption] = useState('');
  const [terms, setTerms] = useState(false);
  const [invalid, setInvalid] = useState({
    name: false,
    dropdown: false,
    terms: false,
  });
  const [isCreating, setIsCreating] = useState(false);

  const onCreate = () => {
    setIsCreating(true);
    return new Promise(resolve =>
      setTimeout(() => {
        setIsCreating(false);
        resolve(onPanelClose());
      }, 2500),
    );
  };

  const onClose = () => {
    if (isCreating) {
      return false;
    }
    return onPanelClose();
  };

  const validateForm = () => {
    if (name && option && terms) {
      setInvalid({ name: false, dropdown: false, terms: false });
      return onCreate();
    }
    const invalidUpdate = {};
    if (!name) invalidUpdate.name = true;
    if (!option) invalidUpdate.dropdown = true;
    if (!terms) invalidUpdate.terms = true;
    setInvalid(invalidUpdate);
    return false;
  };

  const textInputProps = {
    id: 'text-input',
    labelText: 'Name',
    placeholder: 'Enter name',
    invalidText: 'A name is required. Enter a name.',
    onChange: e => setName(e.currentTarget.value),
    invalid: invalid.name,
  };

  const dropdownProps = {
    id: 'dropdown-input',
    items: [
      { label: 'Option 1', cost: 1 },
      { label: 'Option 2', cost: 2 },
      { label: 'Option 3', cost: 3 },
    ],
    titleText: 'Option',
    label: 'Select an option',
    invalid: invalid.dropdown,
    invalidText: 'An option is required. Select an option.',
    onChange: e => setOption(e.selectedItem),
  };

  const form = (
    <Form>
      <TextInput {...textInputProps} />
      <Dropdown {...dropdownProps} />
    </Form>
  );

  const checkbox = (
    <Checkbox
      id="checkbox"
      labelText={
        <span>
          I agree to the <Link href="#">Terms and conditions</Link>
        </span>
      }
      checked={terms}
      onChange={value => setTerms(value)}
    />
  );

  const notification =
    invalid.name || invalid.dropdown || invalid.terms ? (
      <InlineNotification
        kind="error"
        title="Missing fields"
        subtitle="All fields are required to complete creation."
      />
    ) : null;

  const orderSummaryItems = [
    {
      name: 'Attribute 1',
      value: \`$\${option ? 250 * option.cost : 0}.00\`,
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
  ];

  if (option) {
    orderSummaryItems[0].details.unshift({
      name: 'Option',
      value: option.label,
    });
  }
  if (name) {
    orderSummaryItems[0].details.unshift({ name: 'Name', value: name });
  }

  return (
    <SidePanelContainer
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onClose}
      onDoneClick={validateForm}
      onCancelClick={onClose}
      doneText="Create"
      closePanelText="Cancel"
    >
      <MiniOrderSummarySidePanel
        id="single-panel"
        title="Simple Mini Order Summary Panel"
        doneIsLoading={isCreating}
        miniOrderSummary={
          <MiniOrderSummary
            currencySwitcher={
              <Dropdown
                ariaLabel="Select a Currency"
                id="order-summary-currency-switcher"
                itemToString={item => item && item.text}
                items={[
                  { id: 'US', text: 'USD' },
                  { id: 'EU', text: 'EUR' },
                ]}
                label="USD"
                size="sm"
                type="inline"
              />
            }
            items={orderSummaryItems}
            notifications={notification}
            totalCostText="Total Estimated Cost"
            totalCost={\`$\${option ? 250 * option.cost : 0}.00/mo\`}
            termsCheckbox={checkbox}
            termsCheckboxInvalid={invalid.terms}
          />
        }
      >
        {form}
      </MiniOrderSummarySidePanel>
    </SidePanelContainer>
  );
};`;

export default SinglePanel;
