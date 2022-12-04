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

const MultiplePanels = ({ showSidePanel, onPanelClose }) => {
  const [name, setName] = useState("");
  const [option, setOption] = useState("");
  const [option2, setOption2] = useState("");
  const [terms, setTerms] = useState(false);
  const [invalid, setInvalid] = useState({
    name: false,
    option: false,
  });
  const [invalid2, setInvalid2] = useState({
    option2: false,
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
    if (name && option) {
      setInvalid({ name: false, option: false });
      return true;
    }
    const invalidUpdate = {};
    if (!name) invalidUpdate.name = true;
    if (!option) invalidUpdate.option = true;
    setInvalid(invalidUpdate);
    return false;
  };

  const validateForm2 = () => {
    if (option2 && terms) {
      setInvalid2({ option2: false, terms: false });
      return onCreate();
    }
    const invalidUpdate = {};
    if (!option2) invalidUpdate.option = true;
    if (!terms) invalidUpdate.terms = true;
    setInvalid2(invalidUpdate);
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
    invalid: invalid.option,
    invalidText: "An option is required. Select an option.",
    onChange: (e) => setOption(e.selectedItem),
  };

  const dropdown2Props = {
    id: "dropdown2-input",
    items: [
      { label: "Option 1", cost: 1 },
      { label: "Option 2", cost: 2 },
      { label: "Option 3", cost: 3 },
    ],
    titleText: "Second Option",
    label: "Select an option",
    invalid: invalid2.option2,
    invalidText: "An option is required. Select an option.",
    onChange: (e) => setOption2(e.selectedItem),
  };

  const form = (
    <Form>
      <TextInput {...textInputProps} />
      <Dropdown {...dropdownProps} />
    </Form>
  );

  const form2 = (
    <Form>
      <Dropdown {...dropdown2Props} />
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
    invalid.name || invalid.option || invalid2.option2 || invalid2.terms ? (
      <InlineNotification
        kind="error"
        title="Missing fields"
        subtitle="All fields are required to complete creation."
      />
    ) : null;

  const value = option ? 250 * option.cost : 0;
  const value2 = option2 ? 100 * option2.cost : 0;
  const orderSummaryItems = [
    {
      name: "Attribute 1",
      value: `$${value}.00`,
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
    {
      name: "Attribute 2",
      value: `$${value2}.00`,
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

  if (option2) {
    orderSummaryItems[1].details.unshift({
      name: "Second option",
      value: option2.label,
    });
  }

  const miniOrderSummary = (
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
      termsCheckboxInvalid={invalid2.terms}
    />
  );

  return (
    <SidePanelContainer
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onClose}
      onDoneClick={validateForm2}
      onCancelClick={onClose}
      onNextClick={validateForm}
      doneText="Create"
      closePanelText="Cancel"
    >
      <MiniOrderSummarySidePanel
        id="multiple-panels-0"
        title="Configure"
        miniOrderSummary={miniOrderSummary}
      >
        {form}
      </MiniOrderSummarySidePanel>
      <MiniOrderSummarySidePanel
        id="multiple-panels-1"
        title="Finalize"
        doneIsLoading={isCreating}
        miniOrderSummary={miniOrderSummary}
      >
        {form2}
      </MiniOrderSummarySidePanel>
    </SidePanelContainer>
  );
};

MultiplePanels.code = `const MultiplePanels = ({ showSidePanel, onPanelClose }) => {
  const [name, setName] = useState('');
  const [option, setOption] = useState('');
  const [option2, setOption2] = useState('');
  const [terms, setTerms] = useState(false);
  const [invalid, setInvalid] = useState({
    name: false,
    option: false,
  });
  const [invalid2, setInvalid2] = useState({
    option2: false,
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
    if (name && option) {
      setInvalid({ name: false, option: false });
      return true;
    }
    const invalidUpdate = {};
    if (!name) invalidUpdate.name = true;
    if (!option) invalidUpdate.option = true;
    setInvalid(invalidUpdate);
    return false;
  };

  const validateForm2 = () => {
    if (option2 && terms) {
      setInvalid2({ option2: false, terms: false });
      return onCreate();
    }
    const invalidUpdate = {};
    if (!option2) invalidUpdate.option = true;
    if (!terms) invalidUpdate.terms = true;
    setInvalid2(invalidUpdate);
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
    invalid: invalid.option,
    invalidText: 'An option is required. Select an option.',
    onChange: e => setOption(e.selectedItem),
  };

  const dropdown2Props = {
    id: 'dropdown2-input',
    items: [
      { label: 'Option 1', cost: 1 },
      { label: 'Option 2', cost: 2 },
      { label: 'Option 3', cost: 3 },
    ],
    titleText: 'Second Option',
    label: 'Select an option',
    invalid: invalid2.option2,
    invalidText: 'An option is required. Select an option.',
    onChange: e => setOption2(e.selectedItem),
  };

  const form = (
    <Form>
      <TextInput {...textInputProps} />
      <Dropdown {...dropdownProps} />
    </Form>
  );

  const form2 = (
    <Form>
      <Dropdown {...dropdown2Props} />
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
    invalid.name || invalid.option || invalid2.option2 || invalid2.terms ? (
      <InlineNotification
        kind="error"
        title="Missing fields"
        subtitle="All fields are required to complete creation."
      />
    ) : null;

  const value = option ? 250 * option.cost : 0;
  const value2 = option2 ? 100 * option2.cost : 0;
  const orderSummaryItems = [
    {
      name: 'Attribute 1',
      value: \`$\${value}.00\`,
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
    {
      name: 'Attribute 2',
      value: \`$\${value2}.00\`,
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

  if (option2) {
    orderSummaryItems[1].details.unshift({
      name: 'Second option',
      value: option2.label,
    });
  }

  const miniOrderSummary = (
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
      termsCheckboxInvalid={invalid2.terms}
    />
  );

  return (
    <SidePanelContainer
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onClose}
      onDoneClick={validateForm2}
      onCancelClick={onClose}
      onNextClick={validateForm}
      doneText="Create"
      closePanelText="Cancel"
    >
      <MiniOrderSummarySidePanel
        id="multiple-panels-0"
        title="Configure"
        miniOrderSummary={miniOrderSummary}
      >
        {form}
      </MiniOrderSummarySidePanel>
      <MiniOrderSummarySidePanel
        id="multiple-panels-1"
        title="Finalize"
        doneIsLoading={isCreating}
        miniOrderSummary={miniOrderSummary}
      >
        {form2}
      </MiniOrderSummarySidePanel>
    </SidePanelContainer>
  );
};`;

export default MultiplePanels;
