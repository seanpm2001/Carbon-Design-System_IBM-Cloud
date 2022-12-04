import React from 'react';
import { render } from '@testing-library/react';
import Translate from './Translate';

describe('Translate', () => {
  test('it renders a translated string with links in it', () => {
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
    );
    const links = container.querySelectorAll('.cds--link');
    expect(links.length).toBe(2);
    expect(links[0].innerHTML).toBe('status page');
    expect(links[0]).toHaveAttribute('href', '/status');
    expect(links[1].innerHTML).toBe('support');
    expect(links[1]).toHaveAttribute('href', '/unifiedsupport/supportcenter');
  });

  test('it renders a translated string with code in it', () => {
    const { container } = render(
      <Translate tagProps={[{ className: 'inline-code-block' }]}>
        {
          'Choose a release name and install the chart. Specify parameters by appending the <code>--set key=value[,key=value]</code> argument to the helm install command.'
        }
      </Translate>,
    );
    const code = container.querySelectorAll('code');
    expect(code.length).toBe(1);
    expect(code[0].innerHTML).toBe('--set key=value[,key=value]');
    expect(code[0].className).toBe('inline-code-block');
  });

  test('it renders a translated string with a custom component in it', () => {
    const Link = () => <p>This is a Link component</p>;
    const { container } = render(
      <Translate tagMap={{ a: Link }}>
        {
          'It can take a few minutes for your cluster to be ready. While you wait, try <a>creating a registry</a>!'
        }
      </Translate>,
    );
    const link = container.querySelectorAll('p');
    expect(link.length).toBe(1);
    expect(link[0].innerHTML).toBe('This is a Link component');
  });

  test('it renders a translated string with a span in it', () => {
    const { container } = render(
      <Translate tagProps={[{ style: { fontSize: '125%', fontWeight: 600 } }]}>
        {
          'This is a string with <span>a few words</span> that we want to emphasize.'
        }
      </Translate>,
    );
    const span = container.querySelectorAll('.pal--translate span');
    expect(span.length).toBe(1);
    expect(span[0].innerHTML).toBe('a few words');
    expect(span[0].style.fontSize).toBe('125%');
    expect(span[0].style.fontWeight).toBe('600');
  });
});
