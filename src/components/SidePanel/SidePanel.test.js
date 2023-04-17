/* eslint-disable react/prop-types */
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '../../../config/jest/test-utils';
import userEvent from '@testing-library/user-event';
import SidePanel from './SidePanel';
import SidePanelContainer from './SidePanelContainer';

afterEach(() => {
  // Reset the class names on the body.
  document.body.classList.remove('pal--no-scroll');
});

const PanelWrapper = ({ setActivePanelById, setTo }) => (
  <button onClick={() => setActivePanelById(setTo)} type="button">
    {`render ${setTo}`}
  </button>
);

describe(`Side Panel`, () => {
  it('renders the side panel with the default strings if none are provided', () => {
    render(
      <SidePanelContainer>
        <SidePanel id="panel-one" data-testid="panel-one" title="title one">
          Panel One
        </SidePanel>
        <SidePanel id="panel-two" data-testid="panel-two" title="title two">
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    expect(screen.getByText('title one')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('renders a loading state when doneIsLoading is true', () => {
    const { container } = render(
      <SidePanelContainer>
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          doneIsLoading
        >
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(container.querySelector('.pal--side-panel__button')).toHaveClass(
      'cds--btn--disabled',
    );
  });

  it('renders the side panel with the provided strings', () => {
    render(
      <SidePanelContainer>
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          nextText="Custom Next"
        >
          Panel One
        </SidePanel>
        <SidePanel
          id="panel-two"
          data-testid="panel-one"
          doneText="Custom Done"
        >
          Panel One
        </SidePanel>
      </SidePanelContainer>,
    );

    expect(screen.getByText('Custom Next')).toBeInTheDocument();
    expect(screen.getByText('Custom Done')).toBeInTheDocument();
  });

  it('focuses on the first element in a side panel if the data-focus-first is provided', async () => {
    render(
      <SidePanelContainer>
        <SidePanel id="panel-one" data-testid="panel-one" title="title one">
          <button data-focus-first type="button">
            Focus
          </button>
        </SidePanel>
      </SidePanelContainer>,
    );

    await waitFor(() => expect(screen.getByText('Focus')).toHaveFocus());
  });

  it('focuses on the element that is specified in selectorPrimaryFocus', async () => {
    render(
      <SidePanelContainer>
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          selectorPrimaryFocus=".button"
        >
          <button className="button" type="button">
            Focus
          </button>
        </SidePanel>
      </SidePanelContainer>,
    );

    await waitFor(() => expect(screen.getByText('Focus')).toHaveFocus());
  });

  it('focuses on the last button in the nav controls if the bottom nav is not hidden and there is not internal focusable content', async () => {
    render(
      <SidePanelContainer>
        <SidePanel id="panel-one" data-testid="panel-one" title="title one">
          Content
        </SidePanel>
      </SidePanelContainer>,
    );

    await waitFor(() => expect(screen.getByText('Done')).toHaveFocus());
  });

  it('focuses on the close button if the bottom nav is hidden and there is no internal content to focus on', async () => {
    const { container } = render(
      <SidePanelContainer>
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          hideBottomNav
        >
          Content
        </SidePanel>
      </SidePanelContainer>,
    );

    await waitFor(() =>
      expect(document.activeElement.innerHTML).toEqual(
        container.querySelector('.pal--side-panel__button-close').innerHTML,
      ),
    );
  });

  it('focuses on the the first focusable element if there is internal content', async () => {
    render(
      <SidePanelContainer>
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          hideBottomNav
        >
          <button type="button">Focus</button>
        </SidePanel>
      </SidePanelContainer>,
    );

    await waitFor(() => expect(screen.getByText('Focus')).toHaveFocus());
  });

  it('prevents closing the side panel if onCloseClick returns false', async () => {
    const { container } = render(
      <SidePanelContainer
        onCloseClick={() => false}
        data-testid="panel-container"
      >
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          hideBottomNav
        >
          Content
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.click(container.querySelector('.pal--side-panel__button-close'));
    await waitFor(() => screen.getByTestId('panel-container'));
    expect(screen.getByTestId('panel-container')).toHaveClass(
      'pal--side-panel-container--open',
    );
  });

  it('prevents closing the side panel if onCancelClick returns false', async () => {
    render(
      <SidePanelContainer
        onCancelClick={() => false}
        data-testid="panel-container"
      >
        <SidePanel id="panel-one" data-testid="panel-one" title="title one">
          Content
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => screen.getByTestId('panel-container'));
    expect(screen.getByTestId('panel-container')).toHaveClass(
      'pal--side-panel-container--open',
    );
  });

  it('prevents closing the side panel if onDoneClick returns false', async () => {
    render(
      <SidePanelContainer
        onDoneClick={() => false}
        data-testid="panel-container"
      >
        <SidePanel id="panel-one" data-testid="panel-one" title="title one">
          Content
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.click(screen.getByText('Done'));
    await waitFor(() => screen.getByTestId('panel-container'));
    expect(screen.getByTestId('panel-container')).toHaveClass(
      'pal--side-panel-container--open',
    );
  });

  it('prevents going to the next page if onNextClick returns false', async () => {
    render(
      <SidePanelContainer
        onNextClick={() => false}
        data-testid="panel-container"
      >
        <SidePanel id="panel-one" data-testid="panel-one" title="title one">
          Content
        </SidePanel>
        <SidePanel id="panel-two" data-testid="panel-two" title="title two">
          Content
        </SidePanel>
        <SidePanel
          id="panel-three"
          data-testid="panel-three"
          title="title three"
        >
          Panel Three
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.click(screen.getAllByText('Next')[0]);
    await waitFor(() =>
      expect(screen.getByTestId('panel-one')).toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
    await waitFor(() =>
      expect(screen.getByTestId('panel-two')).not.toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
    expect(screen.queryByText('Panel Three')).not.toBeInTheDocument();
  });

  it('prevents going to the previous page if onPreviousClick returns false', async () => {
    render(
      <SidePanelContainer
        onPreviousClick={() => false}
        data-testid="panel-container"
      >
        <SidePanel id="panel-one" data-testid="panel-one" title="title one">
          Content
        </SidePanel>
        <SidePanel id="panel-two" data-testid="panel-two" title="title two">
          Content
        </SidePanel>
        <SidePanel
          id="panel-three"
          data-testid="panel-three"
          title="title three"
        >
          Panel Three
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.click(screen.getAllByText('Next')[0]);
    await waitFor(() =>
      expect(screen.getByTestId('panel-two')).toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
    fireEvent.click(screen.getAllByText('Previous')[0]);
    await waitFor(() =>
      expect(screen.getByTestId('panel-two')).toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
    await waitFor(() =>
      expect(screen.getByTestId('panel-one')).not.toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
    expect(screen.getByText('Panel Three')).toBeInTheDocument();
  });

  it('prevents going to the previous panel if onBreadCrumbClick returns false', async () => {
    render(
      <SidePanelContainer
        onPreviousClick={() => false}
        data-testid="panel-container"
      >
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          breadCrumbText="go back"
          cloneNavProps
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested bread crumb"
              onBreadCrumbClick={() => false}
            >
              Nested Content
            </SidePanel>,
          ]}
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.click(screen.getByText('render nested-panel-one'));
    await waitFor(() =>
      expect(screen.getByTestId('nested-panel-one')).toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
    fireEvent.click(screen.getByText('go back'));
    await waitFor(() =>
      expect(screen.getByTestId('panel-one')).not.toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
    await waitFor(() =>
      expect(screen.getByTestId('nested-panel-one')).toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
  });

  it('tabs to the last focusable element if shift tab is pressed on the breadcrumb', async () => {
    render(
      <SidePanelContainer
        onPreviousClick={() => false}
        data-testid="panel-container"
        hasOverlay
      >
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          breadCrumbText="go back"
          cloneNavProps
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested bread crumb"
              onBreadCrumbClick={() => false}
            >
              Nested Content
            </SidePanel>,
          ]}
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
      </SidePanelContainer>,
    );

    userEvent.click(screen.getByText('render nested-panel-one'));
    await waitFor(() =>
      expect(screen.getByTestId('nested-panel-one')).toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
    fireEvent.focus(screen.getByText('go back'));
    fireEvent.keyDown(screen.getByText('go back'), {
      key: 'Tab',
      shiftKey: true,
    });

    await waitFor(() => expect(screen.getByText('Previous')).toHaveFocus());
  });

  it('does not tab to the last focusable element if shift tab is pressed on the nested panel breadcrumb', async () => {
    render(
      <SidePanelContainer
        onPreviousClick={() => false}
        data-testid="panel-container"
        hasOverlay
      >
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          breadCrumbText="go back"
          cloneNavProps
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested bread crumb"
              onBreadCrumbClick={() => false}
            >
              Nested Content
            </SidePanel>,
          ]}
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.focus(screen.getByText('nested bread crumb'));
    fireEvent.keyDown(screen.getByText('nested bread crumb'), {
      key: 'Tab',
      shiftKey: true,
    });

    await waitFor(() => expect(screen.getByText('Previous')).not.toHaveFocus());
  });

  it('tabs to the last focusable element if shift tab is pressed on the close button', async () => {
    const { container } = render(
      <SidePanelContainer
        onPreviousClick={() => false}
        data-testid="panel-container"
        hasOverlay
      >
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          breadCrumbText="go back"
          cloneNavProps
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.focus(container.querySelector('.pal--side-panel__button-close'));
    fireEvent.keyDown(
      container.querySelector('.pal--side-panel__button-close'),
      {
        key: 'Tab',
        shiftKey: true,
      },
    );

    await waitFor(() =>
      expect(document.activeElement.innerHTML).toBe(
        container.querySelector('.cds--btn--primary').innerHTML,
      ),
    );
  });

  it('does not tab to the last focusable element if shift tab is pressed on the close button if there is no overlay', async () => {
    const { container } = render(
      <SidePanelContainer
        onPreviousClick={() => false}
        data-testid="panel-container"
        hasOverlay={false}
      >
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          breadCrumbText="go back"
          cloneNavProps
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.focus(container.querySelector('.pal--side-panel__button-close'));
    fireEvent.keyDown(
      container.querySelector('.pal--side-panel__button-close'),
      {
        key: 'Tab',
        shiftKey: true,
      },
    );

    await waitFor(() => expect(screen.getByText('Done')).not.toHaveFocus());
  });

  it('tabs to the first focusable element if tab is pressed on a nested side panels previous button', async () => {
    const { container } = render(
      <SidePanelContainer data-testid="panel-container" hasOverlay>
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          breadCrumbText="go back"
          cloneNavProps
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested bread crumb"
            >
              Nested Content
            </SidePanel>,
          ]}
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
      </SidePanelContainer>,
    );

    userEvent.click(screen.getByText('render nested-panel-one'));
    await waitFor(() =>
      expect(screen.getByTestId('nested-panel-one')).toHaveAttribute(
        'data-is-active',
        'true',
      ),
    );
    fireEvent.focus(screen.getByText('Previous'));
    await waitFor(() => expect(screen.getByText('Previous')).toHaveFocus());
    userEvent.tab({ shift: false, focusTrap: container });

    await waitFor(() => expect(screen.getByText('go back')).toHaveFocus());
  });

  it('does not tab to the first focusable element if tab is pressed on the cancel button', async () => {
    render(
      <SidePanelContainer data-testid="panel-container" hasOverlay>
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          breadCrumbText="go back"
          cloneNavProps
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested bread crumb"
            >
              Nested Content
            </SidePanel>,
          ]}
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.focus(screen.getByText('Cancel'));
    fireEvent.keyDown(screen.getByText('Cancel'), { key: 'Tab' });

    await waitFor(() => expect(screen.getByText('go back')).not.toHaveFocus());
  });

  it('does not tab to the first focusable element if tab is pressed on the cancel button - primary button disabled', async () => {
    render(
      <SidePanelContainer data-testid="panel-container" hasOverlay>
        <SidePanel
          id="panel-one"
          data-testid="panel-one"
          title="title one"
          breadCrumbText="go back"
          cloneNavProps
          primaryButtonDisabled
          nestedPanels={[
            <SidePanel
              id="nested-panel-one"
              data-testid="nested-panel-one"
              breadCrumbText="nested bread crumb"
            >
              Nested Content
            </SidePanel>,
          ]}
        >
          <PanelWrapper setTo="nested-panel-one" />
        </SidePanel>
      </SidePanelContainer>,
    );

    fireEvent.focus(screen.getByText('Cancel'));
    fireEvent.keyDown(screen.getByText('Cancel'), { key: 'Tab' });

    await waitFor(() => expect(screen.getByText('go back')).not.toHaveFocus());
  });

  it('does not refocus if there are no other focusable elements in the panel', async () => {
    const { container } = render(
      <>
        <button type="button">Focusable</button>
        <SidePanelContainer
          onPreviousClick={() => false}
          data-testid="panel-container"
          hasOverlay
          hideBottomNav
        >
          <SidePanel
            id="panel-one"
            data-testid="panel-one"
            title="title one"
            hideBottomNav
          >
            Content
          </SidePanel>
        </SidePanelContainer>
      </>,
    );

    fireEvent.focus(container.querySelector('.pal--side-panel__button-close'));
    fireEvent.keyDown(
      container.querySelector('.pal--side-panel__button-close'),
      {
        key: 'Tab',
      },
    );

    await waitFor(() =>
      expect(
        container.querySelector('.pal--side-panel__button-close'),
      ).toHaveFocus(),
    );
  });

  it('set the step conditionally', () => {
    let setStep;
    const { container } = render(
      <SidePanelContainer isMultiStep>
        <SidePanel
          setStep={ref => {
            setStep = ref;
          }}
          title="Multi Step Side Panel"
          id="panel-1"
        >
          <div id="step-1" label="Step 1" data-testid="panel-one">
            Hello
          </div>
          <div id="step-2" label="Step 2">
            Hi
          </div>
          <div id="step-3" data-testid="panel-three">
            Okay
          </div>
        </SidePanel>
      </SidePanelContainer>,
    );
    const stepOne = container.querySelector(
      '.pal--side-panel__multi-step-content--open',
    );
    expect(stepOne.innerHTML).toContain('Hello');

    act(() => {
      setStep(2);
    });

    const stepTwo = container.querySelector(
      '.pal--side-panel__multi-step-content--open',
    );
    expect(stepTwo.innerHTML).toContain('Okay');
  });

  it('Get current step info on re-render', () => {
    let returnedData = null;
    let setStep;
    const getInfo = data => {
      returnedData = data;
    };
    // eslint-disable-next-line no-unused-vars
    const { container } = render(
      <SidePanelContainer isMultiStep>
        <SidePanel
          setStep={ref => {
            setStep = ref;
          }}
          getCurrentStepInfo={data => getInfo(data)}
          title="Multi Step Side Panel"
          id="panel-1"
        >
          <div id="step-1" title="Step 1" data-testid="panel-one">
            Hello
          </div>
          <div id="step-2" title="Step 2">
            Hi
          </div>
          <div id="step-3" data-testid="panel-three">
            Okay
          </div>
        </SidePanel>
      </SidePanelContainer>,
    );
    expect(returnedData).toMatchObject({
      currentStep: 0,
      currentStepId: 'step-1',
      currentStepLabel: 'Step 1',
    });

    act(() => {
      setStep(2);
    });

    expect(returnedData).toMatchObject({
      currentStep: 2,
      currentStepId: 'step-3',
    });
  });
});
