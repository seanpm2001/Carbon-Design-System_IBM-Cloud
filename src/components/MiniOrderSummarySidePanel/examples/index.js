/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Button,
  RadioButton,
  FormGroup,
  RadioButtonGroup,
} from "@carbon/react";
import SinglePanel from "./SinglePanel";
import MultiplePanels from "./MultiplePanels";

const RenderMiniOrderSummaryPanel = ({
  variation,
  showSidePanel,
  setShowSidePanel,
}) => {
  useEffect(() => {
    async function loadStyles() {
      // eslint-disable-next-line no-unused-expressions
      import("../_styles.scss");
    }
    loadStyles();
  }, []);

  const onPanelClose = () => {
    setShowSidePanel(false);
    return true;
  };

  switch (variation) {
    case "single-panel":
      return (
        <>
          <SinglePanel
            showSidePanel={showSidePanel}
            onPanelClose={onPanelClose}
          />
        </>
      );
    case "multiple-panels":
      return (
        <>
          <MultiplePanels
            showSidePanel={showSidePanel}
            onPanelClose={onPanelClose}
          />
        </>
      );
    default:
      return null;
  }
};

const Examples = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [sidePanelVariation, setPanelVariation] = useState("single-panel");
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
            valueSelected={sidePanelVariation}
            onChange={(value) => {
              setPanelVariation(value);
            }}
          >
            <RadioButton
              id="pal--side-panel-radio-single-panel"
              labelText="Single panel"
              value="single-panel"
            />
            <RadioButton
              id="pal--side-panel-radio-multiple-panels"
              labelText="Multiple panels"
              value="multiple-panels"
            />
          </RadioButtonGroup>
        </FormGroup>
        <Button onClick={() => setShowSidePanel(!showSidePanel)} size="default">
          {showSidePanel ? "Hide Side Panel" : "Show Side Panel"}
        </Button>
      </div>
      <RenderMiniOrderSummaryPanel
        variation={sidePanelVariation}
        showSidePanel={showSidePanel}
        setShowSidePanel={setShowSidePanel}
      />
    </>
  );
};

export default Examples;
