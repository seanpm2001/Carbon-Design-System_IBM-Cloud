import {
  Button,
  FormGroup,
  RadioButton,
  RadioButtonGroup,
} from "@carbon/react";
import React, { useState } from "react";
import AsyncSidePanel from "./AsyncSidePanel";
import CustomTextSidePanel from "./CustomTextSidePanel";
import ExtraLargeSidePanel from "./ExtraLargeSidePanel";
import HideBottomNav from "./HideBottomNavSidePanel";
import ModalSidePanel from "./ModalSidePanel";
import MultiNestedSidePanel from "./MultiNestedSidePanel";
import MultiStepSidePanel from "./MultiStepSidePanel";
import NestedSidePanel from "./NestedSidePanel";
import SmallSidePanel from "./SmallSidePanel";
import("../_styles.scss");

// eslint-disable-next-line react/prop-types
const RenderPanel = ({ variation, showSidePanel, setShowSidePanel }) => {
  // useEffect(() => {
  //   // eslint-disable-next-line no-unused-expressions
  //   import("../_styles.scss");
  // }, []);
  const onPanelClose = () => {
    setShowSidePanel(false);
    return true;
  };

  if (variation === "nested") {
    return (
      <>
        <NestedSidePanel
          showSidePanel={showSidePanel}
          onPanelClose={onPanelClose}
        />
      </>
    );
  }
  if (variation === "multiNested") {
    return (
      <>
        <MultiNestedSidePanel
          showSidePanel={showSidePanel}
          onPanelClose={onPanelClose}
        />
      </>
    );
  }
  if (variation === "small") {
    return (
      <>
        <SmallSidePanel
          showSidePanel={showSidePanel}
          onPanelClose={onPanelClose}
        />
      </>
    );
  }
  if (variation === "xl") {
    return (
      <>
        <ExtraLargeSidePanel
          showSidePanel={showSidePanel}
          onPanelClose={onPanelClose}
        />
      </>
    );
  }
  if (variation === "customText") {
    return (
      <>
        <CustomTextSidePanel
          showSidePanel={showSidePanel}
          onPanelClose={onPanelClose}
        />
      </>
    );
  }
  if (variation === "hideBottomNav") {
    return (
      <>
        <HideBottomNav
          showSidePanel={showSidePanel}
          onPanelClose={onPanelClose}
        />
      </>
    );
  }
  if (variation === "asyncSidePanel") {
    return (
      <>
        <AsyncSidePanel
          showSidePanel={showSidePanel}
          onPanelClose={onPanelClose}
        />
      </>
    );
  }
  if (variation === "multiStep") {
    return (
      <>
        <MultiStepSidePanel
          showSidePanel={showSidePanel}
          onPanelClose={onPanelClose}
        />
      </>
    );
  }
  if (variation === "modal") {
    return (
      <>
        <ModalSidePanel
          showSidePanel={showSidePanel}
          onPanelClose={onPanelClose}
        />
      </>
    );
  }
  return null;
};

const Examples = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [sidePanelVariation, setSidePanelVariation] = useState("customText");
  return (
    <>
      <div style={{ display: "block", marginBottom: "2rem" }}>
        <FormGroup
          invalid={false}
          legendText="Select a Side Panel"
          message={false}
        >
          <RadioButtonGroup
            labelPosition="right"
            legend="Group Legend"
            name="radio-button-group"
            orientation="vertical"
            valueSelected="customText"
            onChange={(value) => {
              setSidePanelVariation(value);
            }}
          >
            <RadioButton
              id="pal--side-panel-radio-custom-text"
              labelText="Custom Text Side Panel"
              value="customText"
            />
            <RadioButton
              id="pal--side-panel-multi-nested"
              labelText="Multi Nested Side Panel"
              value="multiNested"
            />
            <RadioButton
              id="pal--side-panel-radio-nested"
              labelText="Nested Side Panel"
              value="nested"
            />
            <RadioButton
              id="pal--side-panel-radio-small"
              labelText="Small Side Panel"
              value="small"
            />
            <RadioButton
              id="pal--side-panel-radio-xl"
              labelText="Extra Large Side Panel"
              value="xl"
            />
            <RadioButton
              id="pal--side-panel-radio-hide-nav"
              labelText="Side Panel with no bottom nav"
              value="hideBottomNav"
            />
            <RadioButton
              id="pal--side-panel-radio-async-panel"
              labelText="Async Side Panel"
              value="asyncSidePanel"
            />
            <RadioButton
              id="pal--side-panel-multi-step-panel"
              labelText="Multi Step Side Panel"
              value="multiStep"
            />
            <RadioButton
              id="pal--side-panel-modal-panel"
              labelText="Modal On Dismiss Side Panel"
              value="modal"
            />
          </RadioButtonGroup>
        </FormGroup>
        <Button onClick={() => setShowSidePanel(!showSidePanel)} size="default">
          {showSidePanel ? "Hide Side Panel" : "Show Side Panel"}
        </Button>
      </div>
      <RenderPanel
        variation={sidePanelVariation}
        showSidePanel={showSidePanel}
        setShowSidePanel={setShowSidePanel}
      />
    </>
  );
};

export default Examples;
