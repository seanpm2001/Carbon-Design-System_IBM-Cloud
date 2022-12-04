/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "@carbon/react";
import SidePanel from "../SidePanel";
import SidePanelContainer from "../SidePanelContainer";

const panelId = "panel-1";
const nestedPanelOneId = "nested-panel-1";
const nestedPanelTwoId = "nested-panel-2";

const SecondPanelContent = ({ setActivePanelById }) => (
  <Button onClick={() => setActivePanelById(nestedPanelOneId)} data-focus-first>
    Render First Nested Side Panel
  </Button>
);

const NestedPanelOneContent = ({ setActivePanelById }) => (
  <>
    <Button
      onClick={() => setActivePanelById(nestedPanelTwoId)}
      data-focus-first
    >
      Render Second Nested Panel
    </Button>
    <p style={{ paddingTop: "1rem" }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut eros
      eget purus ultrices efficitur at at augue. Aenean venenatis erat et ante
      ullamcorper porttitor. Nam tincidunt dignissim eleifend. Phasellus eu
      laoreet orci. Morbi consectetur risus in sollicitudin aliquam. Quisque
      quis libero eget mi pellentesque faucibus id id nisi. Vivamus malesuada,
      nisl finibus pretium consectetur, quam dolor cursus ipsum, nec mollis sem
      arcu quis lorem. Proin vel felis tincidunt, vestibulum lectus interdum,
      pretium elit.
    </p>
    <p style={{ paddingTop: "1rem" }}>
      Quisque maximus, purus eu maximus ultrices, lectus quam euismod est, vitae
      mattis justo quam quis sem. Phasellus auctor pellentesque posuere.
      Maecenas dui metus, placerat at sem vel, viverra tempus elit. Mauris
      gravida tincidunt tellus, ac commodo est viverra a. Aliquam nec iaculis
      augue, et porta tellus. Morbi id accumsan orci, at condimentum nisl. Nulla
      bibendum elit id lacus lacinia condimentum. Ut vel volutpat nibh, non
      varius diam. Nulla sit amet aliquam velit.
    </p>
    <p style={{ paddingTop: "1rem" }}>
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
    <p style={{ paddingTop: "1rem" }}>
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
    <p style={{ paddingTop: "1rem" }}>
      In sed bibendum ex. Suspendisse suscipit blandit rhoncus. Ut finibus ipsum
      vitae velit facilisis dictum. Sed bibendum enim vel interdum imperdiet.
      Vivamus ac ex sagittis, ullamcorper erat et, consequat turpis. Maecenas
      condimentum, erat non faucibus dapibus, libero metus accumsan turpis, sit
      amet consectetur mauris lorem eu elit. Nam id ullamcorper massa,
      sollicitudin feugiat nisi.
    </p>
    <p style={{ paddingTop: "1rem" }}>
      Vivamus quis lacus id dolor faucibus ultrices sed a sem. Nulla id
      consequat quam. Nam luctus dolor sed malesuada ultrices. Mauris vehicula
      sapien a facilisis semper. Quisque posuere volutpat vulputate. Ut semper
      porta massa vitae ullamcorper. Morbi ut dictum enim, a convallis magna.
      Donec interdum viverra erat, tristique sollicitudin leo molestie rhoncus.
      Integer sollicitudin faucibus tortor non molestie. Nullam sed velit velit.
      Sed et felis libero. Suspendisse massa arcu, vestibulum eget sagittis
      vitae, egestas eget nisl. Sed vestibulum lobortis velit tincidunt varius.
      Ut congue tempor luctus. Fusce quis velit eu mi tristique sollicitudin sed
      non nisl.
    </p>
  </>
);

const NestedPanelTwoContent = ({ setActivePanelById }) => (
  <Button
    onClick={() => {
      setActivePanelById(panelId);
    }}
  >
    Render Second Panel
  </Button>
);

const MultiNestedSidePanel = ({ showSidePanel, onPanelClose }) => {
  const nestedPanels = [
    <SidePanel
      title="First Nested Panel"
      key="panel-2-1"
      id={nestedPanelOneId}
      breadCrumbText="First Nested"
      cloneNavProps
    >
      <NestedPanelOneContent />
    </SidePanel>,
    <SidePanel
      title="Second Nested Panel"
      key="panel-2-2"
      id={nestedPanelTwoId}
      breadCrumbText="Second Nested"
      cloneNavProps
    >
      <NestedPanelTwoContent />
    </SidePanel>,
  ];

  return (
    <SidePanelContainer
      isMultiStep
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
      doneText="done did it!"
    >
      <SidePanel
        title="First Panel"
        nestedPanels={nestedPanels}
        id={panelId}
        breadCrumbText="First Panel"
        cloneNavProps
      >
        <div id="step-1" title="Step 1">
          <SecondPanelContent />
        </div>
        <div id="step-2" title="Step 2">
          Content of Second Step
        </div>
        <div id="step-3">Content of Third Step</div>
      </SidePanel>
    </SidePanelContainer>
  );
};

MultiNestedSidePanel.code = `const MultiNestedSidePanel = ({ showSidePanel, onPanelClose }) => {
  const nestedPanels = [
    <SidePanel
      title="First Nested Panel"
      key="panel-2-1"
      id={nestedPanelOneId}
      breadCrumbText="First Nested"
      cloneNavProps
    >
      <NestedPanelOneContent />
    </SidePanel>,
    <SidePanel
      title="Second Nested Panel"
      key="panel-2-2"
      id={nestedPanelTwoId}
      breadCrumbText="Second Nested"
      cloneNavProps
    >
      <NestedPanelTwoContent />
    </SidePanel>,
  ];

  return (
    <SidePanelContainer
      isMultiStep
      panelSize="medium"
      isOpen={showSidePanel}
      onCloseClick={onPanelClose}
      onDoneClick={onPanelClose}
      onCancelClick={onPanelClose}
      doneText="done did it!"
    >
      <SidePanel
        title="First Panel"
        nestedPanels={nestedPanels}
        id={panelId}
        breadCrumbText="First Panel"
        cloneNavProps
      >
        <div id="step-1" title="Step 1">
          <SecondPanelContent />
        </div>
        <div id="step-2" title="Step 2">
          Second Step
        </div>
        <div id="step-3">Third Step</div>
      </SidePanel>
    </SidePanelContainer>
  );
};`;

export default MultiNestedSidePanel;
