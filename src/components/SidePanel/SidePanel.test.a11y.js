import React from 'react';
import { render } from '@testing-library/react';
import SidePanel from './SidePanel';
import SidePanelContainer from './SidePanelContainer';

it('side panel component passes the IBMA ruleset', async () => {
  const main = document.createElement('main');
  const { container } = render(
    <SidePanelContainer>
      <SidePanel
        id="panel-one"
        data-testid="panel-one"
        title="First Panel Title"
      >
        Panel One
      </SidePanel>
      <SidePanel
        id="panel-two"
        data-testid="panel-two"
        title="Second Panel Title"
      >
        Panel Two
      </SidePanel>
    </SidePanelContainer>,
    { container: document.body.appendChild(main) },
  );

  await expect(container).toBeAccessible('Components: Side Panel Container');
});
