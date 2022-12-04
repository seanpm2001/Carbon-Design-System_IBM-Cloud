/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import SidePanel from "../SidePanel";
import SidePanelContainer from "../SidePanelContainer";
import { TextInput } from "@carbon/react";

const MultiStepSidePanel = ({ showSidePanel, onPanelClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const getContent = useMemo(() => {
    if (currentStep) {
      return <div>Content when currentStep is not 0</div>;
    }
    return <div>Content when currentStep is 0</div>;
  }, [currentStep]);

  return (
    <SidePanelContainer
      isMultiStep
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
    >
      <SidePanel
        id="panel-1"
        title="Multi Step Side Panel"
        getCurrentStepInfo={(stepInfo) => {
          setCurrentStep(stepInfo.currentStep);
        }}
      >
        <div id="step-1" title="Step 1">
          Step 1
          <TextInput id="text-input-1" labelText="sample text input:" />
        </div>
        <div id="step-2" title="Step 2">
          Step 2 {getContent}
        </div>
        <div id="step-3" title="Step 3">
          Step 3
          <TextInput id="text-input-2" labelText="sample text input 2:" />
        </div>
      </SidePanel>
    </SidePanelContainer>
  );
};

const code = `const MultiStepSidePanel = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      isMultiStep
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
    >
      <SidePanel
        id="panel-1"
        title="Multi Step Side Panel"
        getCurrentStepInfo={stepInfo => {
          setCurrentStep(stepInfo.currentStep);
        }}
      >
        <div id="step-1" title="Step 1">
          <h4>Step 1</h4>
        </div>
        <div id="step-2" title="Step 2">
          <h4>Step 2</h4>
          {getContent}
        </div>
        <div id="step-3" title="Step 3">
          <h4>Step 3</h4>
        </div>
      </SidePanel>
    </SidePanelContainer>
  );
};
`;

MultiStepSidePanel.code = code;

export default MultiStepSidePanel;
