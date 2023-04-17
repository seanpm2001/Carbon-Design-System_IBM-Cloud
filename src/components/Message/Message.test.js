import React from 'react';
import { render } from '../../../test-utils';

import Message from '.';

describe('<Message />', () => {
  it('renders the error variant as expected', () => {
    const { baseElement } = render(
      <Message
        id="error-message"
        icon="ERROR"
        text="Something went wrong"
        caption="Error code"
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders the unauthorized variant as expected', () => {
    const { baseElement } = render(
      <Message
        id="unauthorized-message"
        icon="UNAUTHORIZED"
        text="You do not have access"
        caption="Permission needed"
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders the empty variant as expected', () => {
    const { baseElement } = render(
      <Message
        id="empty-message"
        icon="EMPTY"
        text="This is empty"
        caption="Deal with it"
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('uses the empty icon as the default', () => {
    const { baseElement } = render(
      <Message
        id="empty-message-2"
        text="This is empty"
        caption="Deal with it"
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('can take react nodes as props', () => {
    const Text = () => (
      <>
        Something went wrong. <strong>Try reloading the page</strong> to see
        this information.
      </>
    );

    const { baseElement } = render(
      <Message
        id="unauthorized-message-2"
        icon="UNAUTHORIZED"
        text={<Text />}
        caption="Error code"
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders the message in a tile with tileWrapped prop', () => {
    const { baseElement } = render(
      <Message
        id="empty-message-3"
        text="This is empty"
        caption="Deal with it"
        isTileWrapped
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders large icon the large prop', () => {
    const { baseElement } = render(
      <Message
        id="empty-message-4"
        text="This is empty"
        caption="Deal with it"
        isLarge
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('does not render icon when the icon string is invalid', () => {
    const { baseElement } = render(
      <Message
        id="invalid-icon"
        icon="ThisIsNotAValidIcon"
        text="This is empty"
        caption="Deal with it"
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  const customIcon = (
    <svg width="400" height="110">
      <rect width="300" height="100" />
    </svg>
  );

  it('can take react node as icon prop', () => {
    const { baseElement } = render(
      <Message
        id="node-icon"
        icon={customIcon}
        text="This is a custom icon"
        caption="Deal with it"
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('can take react node as icon that gets larger', () => {
    const { baseElement } = render(
      <Message
        id="node-icon"
        icon={customIcon}
        text="This is custom large icon"
        caption="Deal with it"
        isLarge
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
