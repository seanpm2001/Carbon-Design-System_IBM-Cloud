import React from 'react';
import { render } from '../../../test-utils';
import Translate from './Translate';

describe('Translate a11y', () => {
  it('the Translate component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <Translate
        tagProps={[
          { href: '/status', target: '_blank' },
          { href: '/unifiedsupport/supportcenter', target: '_blank' },
        ]}
      >
        {
          "Try waiting a few minutes and perform the action again to see if the problem persists. If so, check the <a>status page</a> to see if something else is going on. If you're still experiencing an issue reach out to <a>support</a> for help."
        }
      </Translate>,
      { container: document.body.appendChild(main) },
    );

    await expect(container).toBeAccessible('Components: Translate');
  });
});
