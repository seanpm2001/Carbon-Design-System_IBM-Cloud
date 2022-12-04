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
    <p style={{ paddingTop: '1rem' }}>
      Vivamus suscipit, turpis ut facilisis sodales, neque sapien bibendum leo,
      nec sagittis odio mauris nec metus. Aliquam fermentum est a lorem sodales
      imperdiet. Phasellus mi mi, molestie quis commodo eget, pretium sit amet
      eros. Cras sollicitudin lorem pretium velit venenatis congue. Mauris eu
      tincidunt leo. Morbi eu enim urna. Nulla urna lacus, fermentum at neque
      vel, eleifend maximus arcu. Aliquam luctus sapien id ante vehicula
      posuere. Fusce fermentum mi est, et luctus velit tincidunt sollicitudin.
      Etiam quis lorem a enim placerat semper. Ut finibus neque in lectus
      faucibus tristique. Suspendisse potenti. Phasellus elit lorem, hendrerit a
      tristique at, auctor vitae risus.
    </p>
    <p style={{ paddingTop: '1rem' }}>
      In sed bibendum ex. Suspendisse suscipit blandit rhoncus. Ut finibus ipsum
      vitae velit facilisis dictum. Sed bibendum enim vel interdum imperdiet.
      Vivamus ac ex sagittis, ullamcorper erat et, consequat turpis. Maecenas
      condimentum, erat non faucibus dapibus, libero metus accumsan turpis, sit
      amet consectetur mauris lorem eu elit. Nam id ullamcorper massa,
      sollicitudin feugiat nisi.
    </p>
  </>
);

const HideBottomNav = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
      hideBottomNav
      focusOnCloseSelector="pal--side-panel-radio-small"
    >
      <SidePanel hasScrollContent title="First Panel" id="panel-1">
        <Content />
      </SidePanel>
    </SidePanelContainer>
  );
};

const code = `const HideBottomNav = ({ showSidePanel, onPanelClose }) => {
  return (
    <SidePanelContainer
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
      hideBottomNav
    >
      <SidePanel title="First Panel" id="panel-1">
        <Content />
      </SidePanel>
    </SidePanelContainer>
  );
};
`;

HideBottomNav.code = code;

export default HideBottomNav;
