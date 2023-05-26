/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent, act, waitFor } from '../../../config/jest/test-utils';
import SidePanel from './SidePanel';
import SidePanelContainer from './SidePanelContainer';

/**
 * Testing for side panels requires some background knowledge about how navigation of the component works.
 * In order to allow for the animation of the component to function properly (sliding into the viewport if it will be
 * rendered and sliding out of the viewport if it is removed) we render the following panels:
 *
 * 1. The currently active panel
 * 2. The previously active panel (located behind the active panel)
 * 3. The next active panel (located off screen to the right of the active panel)
 * 4. Any panels nested within the active panel (located off screen to the right of the active panel)
 *
 * Therefore, we test for the existence of these panels in the document and whether a panel is active using
 * a data attribute. For backwards compatibility an ID is not required, though passing one into a side panel
 * will override what id gets stored in state to keep track of the currently active panel, the previously active panel
 * and the next active panel. This can be manipulated by using the setActivePanelById render prop that gets passed to
 * functional children of the SidePanel.
 */

afterEach(() => {
  // Reset the class names on the body.
  document.body.classList.remove('pal--no-scroll');
});

const PanelWrapper = ({ setActivePanelById, setTo }) => (
  <button onClick={() => setActivePanelById(setTo)} type="button">
    {`render ${setTo}`}
  </button>
);

const panels = [
  <SidePanel id="panel-one" data-testid="panel-one" key="panel-one">
    Panel One
  </SidePanel>,
  <SidePanel id="panel-two" data-testid="panel-two" key="panel-two">
    Panel Two
  </SidePanel>,
  <SidePanel id="panel-three" data-testid="panel-three" key="panel-three">
    Panel Three
  </SidePanel>,
];

const nestedPanels = [
  <SidePanel
    id="nested-panel-one"
    data-testid="nested-panel-one"
    breadCrumbText="nested breadcrumb one"
    key="nested-panel-one"
    cloneNavProps
  >
    <PanelWrapper setTo="nested-panel-two" />
  </SidePanel>,
  <SidePanel
    id="nested-panel-two"
    data-testid="nested-panel-two"
    breadCrumbText="nested breadcrumb two"
    key="nested-panel-two"
  >
    Nested Two
  </SidePanel>,
];

describe(`Side Panel Container`, () => {
  it('renders a single side panel', () => {
    const { getByText, getByTestId } = render(
      <SidePanelContainer>
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    expect(getByTestId('panel-one')).toHaveAttribute('data-is-active', 'true');
    expect(getByText('Panel One')).toBeInTheDocument();
  });

  it('renders multiple side panels', () => {
    const { getByText, queryByText, getByTestId } = render(
      <SidePanelContainer>{panels}</SidePanelContainer>,
    );

    expect(getByText('Panel One')).toBeInTheDocument();
    expect(getByTestId('panel-one')).toHaveAttribute('data-is-active', 'true');
    expect(getByText('Panel Two')).toBeInTheDocument();
    expect(queryByText('Panel Three')).not.toBeInTheDocument();
  });

  it('Navigates through multiple side panels', async () => {
    const {
      getByText,
      getAllByText,
      queryByText,
      getByTestId,
      findByText,
    } = render(<SidePanelContainer>{panels}</SidePanelContainer>);

    expect(getByText('Panel One')).toBeInTheDocument();
    expect(getByTestId('panel-one')).toHaveAttribute('data-is-active', 'true');
    expect(getByText('Panel Two')).toBeInTheDocument();
    expect(queryByText('Panel Three')).not.toBeInTheDocument();
    expect(getAllByText('Next')).toHaveLength(2);

    // Move forward to panel two
    fireEvent.click(getAllByText('Next')[0]);
    await findByText('Panel One');

    await waitFor(() => expect(getByText('Panel One')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Panel Two')).toBeInTheDocument());
    await waitFor(() => expect(getByTestId('panel-two')).toHaveAttribute('data-is-active', 'true'));
    await waitFor(() => expect(getByText('Panel Three')).toBeInTheDocument());

    // Move forward to panel three
    fireEvent.click(getAllByText('Next')[1]);
    await findByText('Panel Three');

    await waitFor(() => expect(queryByText('Panel One')).not.toBeInTheDocument());
    await waitFor(() => expect(getByText('Panel Two')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Panel Three')).toBeInTheDocument());
    await waitFor(() => { expect(getByTestId('panel-three')).toHaveAttribute(
      'data-is-active',
      'true',
    )});
    await waitFor(() => expect(getByText('Done')).toBeInTheDocument());

    // Move backward to panel two
    fireEvent.click(getAllByText('Previous')[1]);
    await findByText('Panel One');

    await waitFor(() => expect(getByText('Panel One')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Panel Two')).toBeInTheDocument());
    await waitFor(() => expect(getByTestId('panel-two')).toHaveAttribute('data-is-active', 'true'));
    await waitFor(() => expect(getByText('Panel Three')).toBeInTheDocument());
  });

  it('Navigates through multiple nested side panels using setActivePanelById', async () => {
    const {
      getByText,
      getAllByText,
      getByTestId,
      queryByText,
      findByText,
    } = render(
      <SidePanelContainer>
        <SidePanel
          nestedPanels={nestedPanels}
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="breadcrumb one"
          cloneNavProps
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
        <SidePanel id="panel-two" data-testid="panel-two">
          Panel Two
        </SidePanel>
        <SidePanel id="panel-three" data-testid="panel-three">
          Panel Three
        </SidePanel>
      </SidePanelContainer>,
    );

    // Renders the initial panels
    await waitFor(() => expect(getByText('render nested-panel-one')).toBeInTheDocument());
    await waitFor(() => expect(getByTestId('panel-one')).toHaveAttribute('data-is-active', 'true'));
    await waitFor(() => expect(getByText('Panel Two')).toBeInTheDocument());
    await waitFor(() => expect(getByText('render nested-panel-two')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Nested Two')).toBeInTheDocument());
    await waitFor(() => expect(queryByText('Panel Three')).not.toBeInTheDocument());

    // Navigate to first nested panel
    fireEvent.click(getByText('render nested-panel-one'));
    await findByText('render nested-panel-two');

    await waitFor(() => { expect(getByTestId('nested-panel-one')).toHaveAttribute(
      'data-is-active',
      'true',
    )});
    await waitFor(() => expect(queryByText('Panel Two')).not.toBeInTheDocument());

    // Navigate to second nested panel
    fireEvent.click(getAllByText('render nested-panel-two')[0]);
    await findByText('Nested Two');

    await waitFor(() => { expect(getByTestId('nested-panel-two')).toHaveAttribute(
      'data-is-active',
      'true',
    )});

    // Navigate to previous nested panel
    fireEvent.click(getAllByText('Previous')[1]);
    await findByText('render nested-panel-one');

    await waitFor(() => { expect(getByTestId('nested-panel-one')).toHaveAttribute(
      'data-is-active',
      'true',
    )});
    await waitFor(() => expect(queryByText('Panel Two')).not.toBeInTheDocument());

    // Navigate back to the original panel
    fireEvent.click(getAllByText('Previous')[0]);
    await findByText('Panel Two');

    await waitFor(() => expect(getByTestId('panel-one')).toHaveAttribute('data-is-active', 'true'));
    await waitFor(() => expect(getByText('Panel Two')).toBeInTheDocument());

    // Navigate to second panel
    fireEvent.click(getAllByText('Next')[0]);
    await findByText('Panel Two');

    await waitFor(() => expect(getByText('render nested-panel-one')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Panel Two')).toBeInTheDocument());
    await waitFor(() => expect(getByTestId('panel-two')).toHaveAttribute('data-is-active', 'true'));

    // Navigate to third panel
    fireEvent.click(getAllByText('Next')[1]);
    await findByText('Panel Three');

    await waitFor(() => expect(queryByText('render nested-panel-one')).not.toBeInTheDocument());
    await waitFor(() => expect(queryByText('render nested-panel-two')).not.toBeInTheDocument());
    await waitFor(() => expect(queryByText('Nested Two')).not.toBeInTheDocument());
    await waitFor(() => expect(getByText('Panel Two')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Panel Three')).toBeInTheDocument());
    await waitFor(() => { expect(getByTestId('panel-three')).toHaveAttribute(
      'data-is-active',
      'true',
    )});
  });

  it('Sets the active panel to the previous panel if done is clicked on a nested panel and onDoneClick is provided', async () => {
    const {
      getByText,
      getAllByText,
      getByTestId,
      queryByText,
      findByText,
    } = render(
      <SidePanelContainer>
        <SidePanel
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested breadcrumb one"
              key="nested-panel-one"
              cloneNavProps
            >
              <PanelWrapper setTo="nested-panel-two" />
            </SidePanel>,
            <SidePanel
              id="nested-panel-two"
              data-testid="nested-panel-two"
              breadCrumbText="nested breadcrumb two"
              key="nested-panel-two"
              onDoneClick={() => true}
            >
              Nested Two
            </SidePanel>,
          ]}
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="breadcrumb one"
          cloneNavProps
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
        <SidePanel id="panel-two" data-testid="panel-two">
          Panel Two
        </SidePanel>
        <SidePanel id="panel-three" data-testid="panel-three">
          Panel Three
        </SidePanel>
      </SidePanelContainer>,
    );

    // Renders the initial panels
    expect(getByText('render nested-panel-one')).toBeInTheDocument();
    expect(getByTestId('panel-one')).toHaveAttribute('data-is-active', 'true');
    expect(getByText('Panel Two')).toBeInTheDocument();
    expect(getByText('render nested-panel-two')).toBeInTheDocument();
    expect(getByText('Nested Two')).toBeInTheDocument();
    expect(queryByText('Panel Three')).not.toBeInTheDocument();

    // Navigate to first nested panel
    fireEvent.click(getByText('render nested-panel-one'));
    await findByText('render nested-panel-two');

    expect(getByTestId('nested-panel-one')).toHaveAttribute(
      'data-is-active',
      'true',
    );
    expect(queryByText('Panel Two')).not.toBeInTheDocument();

    // Navigate to second nested panel
    fireEvent.click(getAllByText('render nested-panel-two')[0]);
    await findByText('Nested Two');

    expect(getByTestId('nested-panel-two')).toHaveAttribute(
      'data-is-active',
      'true',
    );

    // Navigate to previous nested panel using done
    act(() => {
      fireEvent.click(getByText('Done'));
    });

    await findByText('Nested Two');

    await waitFor(() =>
      expect(getByTestId('nested-panel-one')).toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
  });

  it('Navigates through multiple nested side panels by adding / removing nested panels', async () => {
    const { getByTestId, rerender, findByText } = render(
      <SidePanelContainer>
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="breadcrumb one"
        >
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    expect(getByTestId('panel-one')).toHaveAttribute('data-is-active', 'true');

    // Add a single nested side panel
    rerender(
      <SidePanelContainer>
        <SidePanel
          nestedPanels={[nestedPanels[0]]}
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="breadcrumb one"
        >
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    await findByText('render nested-panel-two');
    expect(getByTestId('nested-panel-one')).toHaveAttribute(
      'data-is-active',
      'true',
    );

    // Add a second nested side panel
    rerender(
      <SidePanelContainer>
        <SidePanel
          nestedPanels={nestedPanels}
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="breadcrumb one"
        >
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    await findByText('Nested Two');
    expect(getByTestId('nested-panel-two')).toHaveAttribute(
      'data-is-active',
      'true',
    );

    // Remove the second side panel
    rerender(
      <SidePanelContainer>
        <SidePanel
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested breadcrumb one"
              cloneNavProps
            >
              <PanelWrapper setTo="nested-panel-two" />
            </SidePanel>,
            <SidePanel
              id="nested-panel-two"
              data-testid="nested-panel-two"
              breadCrumbText="nested breadcrumb two"
              willClose
            >
              Nested Two
            </SidePanel>,
          ]}
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="breadcrumb one"
        >
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    rerender(
      <SidePanelContainer>
        <SidePanel
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested breadcrumb one"
              cloneNavProps
            >
              <PanelWrapper setTo="nested-panel-two" />
            </SidePanel>,
          ]}
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="breadcrumb one"
        >
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    await findByText('render nested-panel-two');
    expect(getByTestId('nested-panel-one')).toHaveAttribute(
      'data-is-active',
      'true',
    );

    // Add the second panel back
    rerender(
      <SidePanelContainer>
        <SidePanel
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested breadcrumb one"
              cloneNavProps
            >
              <PanelWrapper setTo="nested-panel-two" />
            </SidePanel>,
            <SidePanel
              id="nested-panel-two"
              data-testid="nested-panel-two"
              breadCrumbText="nested breadcrumb two"
            >
              Nested Two
            </SidePanel>,
          ]}
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="breadcrumb one"
        >
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    // Remove both panels
    rerender(
      <SidePanelContainer>
        <SidePanel
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested breadcrumb one"
              cloneNavProps
              willClose
            >
              <PanelWrapper setTo="nested-panel-two" />
            </SidePanel>,
            <SidePanel
              id="nested-panel-two"
              data-testid="nested-panel-two"
              breadCrumbText="nested breadcrumb two"
              willClose
            >
              Nested Two
            </SidePanel>,
          ]}
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="breadcrumb one"
        >
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    rerender(
      <SidePanelContainer>
        <SidePanel
          nestedPanels={[]}
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="breadcrumb one"
        >
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    await findByText('Panel One');
    expect(getByTestId('panel-one')).toHaveAttribute('data-is-active', 'true');
  });

  it('Navigates through multiple nested side panels using breadcrumbs', async () => {
    const {
      getByText,
      getAllByText,
      getByTestId,
      queryByText,
      findByText,
    } = render(
      <SidePanelContainer>
        <SidePanel
          nestedPanels={nestedPanels}
          id="panel-one"
          data-testid="panel-one"
          breadCrumbText="first panel breadcrumb"
          cloneNavProps
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
        <SidePanel id="panel-two" data-testid="panel-two">
          Panel Two
        </SidePanel>
        <SidePanel id="panel-three" data-testid="panel-three">
          Panel Three
        </SidePanel>
      </SidePanelContainer>,
    );

    // Navigate to first nested panel
    fireEvent.click(getByText('render nested-panel-one'));
    await findByText('render nested-panel-two');

    // Navigate to second nested panel
    fireEvent.click(getAllByText('render nested-panel-two')[0]);
    await findByText('Nested Two');

    await waitFor(() => { expect(getByTestId('nested-panel-two')).toHaveAttribute(
      'data-is-active',
      'true',
    )});

    // Navigate to previous nested panel
    fireEvent.click(getAllByText('nested breadcrumb one')[0]);
    await findByText('render nested-panel-one');

    await waitFor(() => { expect(getByTestId('nested-panel-one')).toHaveAttribute(
      'data-is-active',
      'true',
    )});
    await waitFor(() => expect(queryByText('Panel Two')).not.toBeInTheDocument());

    // Navigate to original panel
    fireEvent.click(getAllByText('first panel breadcrumb')[0]);
    await findByText('render nested-panel-one');

    await waitFor(() => expect(getByTestId('panel-one')).toHaveAttribute('data-is-active', 'true'));
    await waitFor(() => expect(getByText('Panel Two')).toBeInTheDocument());
  });

  it('opens the side panel when the isOpen prop changes', () => {
    const { rerender, getByTestId } = render(
      <SidePanelContainer isOpen={false} data-testid="panel-container">
        <SidePanel id="panel-one">Panel One</SidePanel>
      </SidePanelContainer>,
    );

    expect(getByTestId('panel-container')).not.toHaveClass(
      'pal--side-panel-container--open',
    );

    rerender(
      <SidePanelContainer isOpen data-testid="panel-container">
        <SidePanel id="panel-one">Panel One</SidePanel>
      </SidePanelContainer>,
    );

    expect(getByTestId('panel-container')).toHaveClass(
      'pal--side-panel-container--open',
    );
  });

  it('closes the side panel when the done button is clicked', async () => {
    const { getByTestId, getByText } = render(
      <SidePanelContainer data-testid="panel-container">
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    act(() => {
      fireEvent.click(getByText('Done'));
    });

    await waitFor(() =>
      expect(getByTestId('panel-container')).not.toHaveClass(
        'pal--side-panel-container--open',
      ),
    );
  });

  it('closes the side panel when the cancel button is clicked', async () => {
    const { getByTestId, getByText } = render(
      <SidePanelContainer data-testid="panel-container">
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    act(() => {
      fireEvent.click(getByText('Cancel'));
    });

    await waitFor(() =>
      expect(getByTestId('panel-container')).not.toHaveClass(
        'pal--side-panel-container--open',
      ),
    );
  });

  it('closes the side panel when the cancel button is clicked - no overlay', async () => {
    const { getByTestId, getByText } = render(
      <SidePanelContainer data-testid="panel-container" hasOverlay={false}>
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    act(() => {
      fireEvent.click(getByText('Cancel'));
    });

    await waitFor(() =>
      expect(getByTestId('panel-container')).not.toHaveClass(
        'pal--side-panel-container--open',
      ),
    );
  });

  it('closes the side panel when the close button is clicked', async () => {
    const { getByTestId, container } = render(
      <SidePanelContainer data-testid="panel-container">
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    act(() => {
      fireEvent.click(
        container.querySelector('.pal--side-panel__button-close'),
      );
    });

    await waitFor(() =>
      expect(getByTestId('panel-container')).not.toHaveClass(
        'pal--side-panel-container--open',
      ),
    );
  });

  it('closes the side panel when the overlay is clicked', async () => {
    const { getByTestId } = render(
      <SidePanelContainer hasOverlay data-testid="panel-container">
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    act(() => {
      fireEvent.mouseDown(getByTestId('panel-container'));
    });

    await waitFor(() =>
      expect(getByTestId('panel-container')).not.toHaveClass(
        'pal--side-panel-container--open',
      ),
    );
  });

  it('closes the side panel when the escape key is pressed', async () => {
    const { getByTestId } = render(
      <SidePanelContainer hasOverlay data-testid="panel-container">
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    act(() => {
      fireEvent.keyDown(getByTestId('panel-container'), { key: 'Escape' });
    });

    await waitFor(() =>
      expect(getByTestId('panel-container')).not.toHaveClass(
        'pal--side-panel-container--open',
      ),
    );
  });

  it('resets the active panel to the first panel if the panel closes', async () => {
    const { getByText, getByTestId, findByText } = render(
      <SidePanelContainer data-testid="panel-container">
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
        <SidePanel id="panel-two" data-testid="panel-two">
          Panel Two
        </SidePanel>
      </SidePanelContainer>,
    );

    act(() => {
      fireEvent.click(getByText('Next'));
    });

    await findByText('Panel Two');
    await waitFor(() => expect(getByTestId('panel-two')).toHaveAttribute('data-is-active', 'true'));

    act(() => {
      fireEvent.click(getByText('Done'));
    });

    await waitFor(() =>
      expect(getByTestId('panel-one')).toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
  });

  it('resets the active panel to the first panel if the panel closes using props', async () => {
    const { getByText, getByTestId, findByText, rerender } = render(
      <SidePanelContainer data-testid="panel-container" isOpen>
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
        <SidePanel id="panel-two" data-testid="panel-two">
          Panel Two
        </SidePanel>
      </SidePanelContainer>,
    );

    act(() => {
      fireEvent.click(getByText('Next'));
    });

    await findByText('Panel Two');
    await waitFor(()=>{expect(getByTestId('panel-two')).toHaveAttribute('data-is-active', 'true')});

    rerender(
      <SidePanelContainer data-testid="panel-container" isOpen={false}>
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
        <SidePanel id="panel-two" data-testid="panel-two">
          Panel Two
        </SidePanel>
      </SidePanelContainer>,
    );

    await waitFor(() =>
      expect(getByTestId('panel-one')).toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
  });

  it('adds and removes the scroll lock form the body', async () => {
    const { rerender } = render(
      <SidePanelContainer isOpen>
        <SidePanel id="panel-one">Panel One</SidePanel>
      </SidePanelContainer>,
    );

    await waitFor(() => expect(document.body).toHaveClass('pal--no-scroll'));

    rerender(
      <SidePanelContainer isOpen={false}>
        <SidePanel id="panel-one">Panel One</SidePanel>
      </SidePanelContainer>,
    );

    await waitFor(() =>
      expect(document.body).not.toHaveClass('pal--no-scroll'),
    );
  });

  it('sets focus to the originally active element when toggling isOpen', async () => {
    const { rerender, getByText, findByText } = render(
      <>
        <button type="button">Test Button</button>
        <SidePanelContainer isOpen={false}>
          <SidePanel id="panel-one">Panel One</SidePanel>
        </SidePanelContainer>
      </>,
    );

    getByText('Test Button').focus();
    await findByText('Test Button');

    // Toggle the panel open and closed.
    rerender(
      <>
        <button type="button">Test Button</button>
        <SidePanelContainer isOpen>
          <SidePanel id="panel-one">Panel One</SidePanel>
        </SidePanelContainer>
      </>,
    );

    rerender(
      <>
        <button type="button">Test Button</button>
        <SidePanelContainer isOpen={false}>
          <SidePanel id="panel-one">Panel One</SidePanel>
        </SidePanelContainer>
      </>,
    );

    await findByText('Test Button');
    expect(getByText('Test Button')).toHaveFocus();
  });

  it('sets focus to the originally active element when clicking done', async () => {
    const { rerender, getByText } = render(
      <>
        <button type="button">Test Button</button>
        <SidePanelContainer isOpen={false}>
          <SidePanel id="panel-one">Panel One</SidePanel>
        </SidePanelContainer>
      </>,
    );

    getByText('Test Button').focus();

    // // Toggle the panel open and closed.
    rerender(
      <>
        <button type="button">Test Button</button>
        <SidePanelContainer isOpen>
          <SidePanel id="panel-one">Panel One</SidePanel>
        </SidePanelContainer>
      </>,
    );

    act(() => {
      fireEvent.click(getByText('Done'));
    });

    await waitFor(() => expect(getByText('Test Button')).toHaveFocus());
  });

  it('sets focus to the originally active element when clicking cancel', async () => {
    const { rerender, getByText } = render(
      <>
        <button type="button">Test Button</button>
        <SidePanelContainer isOpen={false}>
          <SidePanel id="panel-one">Panel One</SidePanel>
        </SidePanelContainer>
      </>,
    );

    getByText('Test Button').focus();

    // // Toggle the panel open and closed.
    rerender(
      <>
        <button type="button">Test Button</button>
        <SidePanelContainer isOpen>
          <SidePanel id="panel-one">Panel One</SidePanel>
        </SidePanelContainer>
      </>,
    );

    act(() => {
      fireEvent.click(getByText('Cancel'));
    });

    await waitFor(() => expect(getByText('Test Button')).toHaveFocus());
  });

  it('sets focus to the originally active element when clicking close', async () => {
    const { rerender, getByText, container } = render(
      <>
        <button type="button">Test Button</button>
        <SidePanelContainer isOpen={false}>
          <SidePanel id="panel-one">Panel One</SidePanel>
        </SidePanelContainer>
      </>,
    );

    getByText('Test Button').focus();

    // // Toggle the panel open and closed.
    rerender(
      <>
        <button type="button">Test Button</button>
        <SidePanelContainer isOpen>
          <SidePanel id="panel-one">Panel One</SidePanel>
        </SidePanelContainer>
      </>,
    );

    act(() => {
      fireEvent.click(
        container.querySelector('.pal--side-panel__button-close'),
      );
    });

    await waitFor(
      () => expect(getByText('Test Button')).toHaveFocus(),
      expect(getByText('Test Button')).toHaveFocus(),
    );
  });

  it('gets the page index using getPageRef', () => {
    let info = null;
    const getPageRef = data => {
      info = data;
    };
    render(
      <>
        <button type="button">Test Button</button>
        <SidePanelContainer
          isOpen={false}
          getPageRef={data => getPageRef(data)}
        >
          <SidePanel id="panel-one">Panel One</SidePanel>
        </SidePanelContainer>
      </>,
    );

    expect(info).toMatchObject({ activePanelId: 'panel-one', index: 0 });
  });

  it('gets the page index using setPageRef', () => {
    let setPageRef;
    const { getByTestId } = render(
      <SidePanelContainer
        isOpen={false}
        setPageRef={ref => {
          setPageRef = ref;
        }}
      >
        <SidePanel id="panel-one" data-testid="panel-one">
          Panel One
        </SidePanel>
        <SidePanel id="panel-two" data-testid="panel-two">
          Panel Two
        </SidePanel>
      </SidePanelContainer>,
    );

    expect(getByTestId('panel-one')).toHaveAttribute('data-is-active', 'true');

    act(() => {
      setPageRef(1);
    });

    expect(getByTestId('panel-two')).toHaveAttribute('data-is-active', 'true');
  });
});
