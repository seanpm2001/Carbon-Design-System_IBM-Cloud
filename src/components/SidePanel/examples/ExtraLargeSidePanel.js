/* eslint-disable react/prop-types */
import React from 'react';
import SidePanel from '../SidePanel';
import SidePanelContainer from '../SidePanelContainer';

const ExtraLargeSidePanel = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      panelSize="xl"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
    >
      <SidePanel title="First Panel" id="panel-1">
        First Panel Content
      </SidePanel>
    </SidePanelContainer>
  );
};

ExtraLargeSidePanel.code = `const ExtraLargeSidePanel = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      panelSize="xl"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
    >
      <SidePanel title="First Panel" id="panel-1">
        First Panel Content
      </SidePanel>
    </SidePanelContainer>
  );
};`;

export default ExtraLargeSidePanel;
