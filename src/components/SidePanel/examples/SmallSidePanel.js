/* eslint-disable react/prop-types */
import React from 'react';
import SidePanel from '../SidePanel';
import SidePanelContainer from '../SidePanelContainer';

const SmallSidePanel = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      panelSize="small"
      hasOverlay={false}
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

SmallSidePanel.code = `const SmallSidePanel = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      panelSize="small"
      hasOverlay={false}
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

export default SmallSidePanel;
