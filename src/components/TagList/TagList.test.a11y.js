import React from 'react';
import { render } from '../../../test-utils';
import TagList from './TagList';

describe('TagList a11y', () => {
  it('the TagList component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const tags = [
      { name: 'test:tag1', type: 'functional' },
      { name: 'tag2', type: 'functional' },
    ];
    const { container } = render(
      <TagList tags={tags} isEditable="always" iconDescription="Yeah" />,
      { container: document.body.appendChild(main) },
    );

    await expect(container).toBeAccessible('Components: TagList');
  });
});
