/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button } from "@carbon/react";
import SidePanel from "../SidePanel";
import SidePanelContainer from "../SidePanelContainer";

const AsyncSidePanel = ({ showSidePanel, onPanelClose }) => {
  const [showInitialContent, setShowInitialContent] = useState(true);
  const [doneIsLoading, setDoneIsLoading] = useState(false);

  return (
    <SidePanelContainer
      panelSize="small"
      hasOverlay={false}
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={() =>
        new Promise((resolve) => {
          setDoneIsLoading(true);
          setTimeout(() => {
            setDoneIsLoading(false);
            return resolve(true);
          }, 1500);
        })
      }
      onCancelClick={onPanelClose}
      doneIsLoading={doneIsLoading}
    >
      <SidePanel title="First Panel" id="panel-1">
        <div style={{ paddingBottom: "1rem" }}>
          {showInitialContent ? "Initial Content" : "Some Other Content"}
        </div>
        <Button
          onClick={() => {
            setShowInitialContent(!showInitialContent);
          }}
        >
          Swap Content
        </Button>
      </SidePanel>
    </SidePanelContainer>
  );
};

AsyncSidePanel.code = `const AsyncSidePanel = ({ showSidePanel, onPanelClose }) => {
  const [showInitialContent, setShowInitialContent] = useState(true);
  return (
    <SidePanelContainer
      panelSize="small"
      hasOverlay={false}
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={() => {
        // some async function
        return true;
      }}
      onCancelClick={onPanelClose}
    >
      <SidePanel title="First Panel" id="panel-1">
        <div style={{ paddingBottom: '1rem' }}>
          {showInitialContent ? 'Initial Content' : 'Some Other Content'}
        </div>
        <Button
          onClick={() => {
            setShowInitialContent(!showInitialContent);
          }}
        >
          Swap Content
        </Button>
      </SidePanel>
    </SidePanelContainer>
  );
};`;

export default AsyncSidePanel;
