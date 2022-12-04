/* eslint-disable react/prop-types */
import React from 'react';
import SidePanel from '../SidePanel';
import SidePanelContainer from '../SidePanelContainer';

const Content = () => (
  <>
    <p style={{ paddingTop: '1rem' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut eros
      eget purus ultrices efficitur at at augue. Aenean venenatis erat et ante
      ullamcorper porttitor. Nam tincidunt dignissim eleifend. Phasellus eu
      laoreet orci. Morbi consectetur risus in sollicitudin aliquam. Quisque
      quis libero eget mi pellentesque faucibus id id nisi. Vivamus malesuada,
      nisl finibus pretium consectetur, quam dolor cursus ipsum, nec mollis sem
      arcu quis lorem. Proin vel felis tincidunt, vestibulum lectus interdum,
      pretium elit.
    </p>
  </>
);

const ModalSidePanel = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
      focusOnCloseSelector="pal--side-panel-radio-small"
      modalOnDismiss
      dismissalModalBody="Are you sure you want to close the side panel?"
      dismissalModalHeader="Unsaved changes"
      dismissalModalLabel="Are you sure?"
    >
      <SidePanel title="First Panel" id="panel-1">
        <Content />
      </SidePanel>
    </SidePanelContainer>
  );
};

const code = `const ModalSidePanel = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={data => { onPanelClose(data); console.log('on close'); } }
      onDoneClick={data => { onPanelClose(data); console.log('on done'); } }
      onCancelClick={data => { onPanelClose(data); console.log('on cancel'); } }
      focusOnCloseSelector="pal--side-panel-radio-small"
      modalOnDismiss
      dismissalModalBody="Are you sure you want to close the side panel?"
      dismissalModalHeader="Unsaved changes"
      dismissalModalLabel="Are you sure?"
    >
      <SidePanel title="First Panel" id="panel-1">
        <Content />
      </SidePanel>
    </SidePanelContainer>
  );
};
`;

ModalSidePanel.code = code;

export default ModalSidePanel;
