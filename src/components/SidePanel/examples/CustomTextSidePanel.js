/* eslint-disable react/prop-types */
import React from 'react';
import SidePanel from '../SidePanel';
import SidePanelContainer from '../SidePanelContainer';

const CustomTextSidePanel = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
      doneText="Mission Complete"
      previousText="Roll it back"
      closePanelText="Shut it down"
      nextText="Move Along"
    >
      <SidePanel title="First Panel" id="panel-1">
        First Panel Content
      </SidePanel>
      <SidePanel title="Second Panel" id="panel-2" previousText="Not so fast">
        Second Panel Content
      </SidePanel>
      <SidePanel title="Third Panel" id="panel-3">
        Third Panel Content
      </SidePanel>
    </SidePanelContainer>
  );
};

const code = `const CustomTextSidePanel = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
      doneText="Mission Complete"
      previousText="Roll it back"
      closeText="Shut it down"
      nextText="Move Along"
    >
      <SidePanel title="First Panel" id="panel-1">
        First Panel Content
      </SidePanel>
      <SidePanel title="Second Panel" id="panel-2" previousText="Not so fast">
        Second Panel Content
      </SidePanel>
      <SidePanel title="Third Panel" id="panel-3">
        Third Panel Content
      </SidePanel>
    </SidePanelContainer>
  );
};`;

CustomTextSidePanel.code = code;

export default CustomTextSidePanel;
