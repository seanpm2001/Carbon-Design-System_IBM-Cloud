import React from 'react';
import { render } from '../../../config/jest/test-utils';
import Message from '.';

describe('Message a11y', () => {
  it('the message component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <Message
        id="error-message"
        icon="UNAUTHORIZED"
        text="This is empty"
        caption="Deal with it"
        isTileWrapped
        isLarge
      />,
      { container: document.body.appendChild(main) },
    );

    await expect(container).toBeAccessible('Components: Message');
  });
});
