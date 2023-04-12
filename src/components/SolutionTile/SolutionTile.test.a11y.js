import React from 'react';
import { render } from '@testing-library/react';
import SolutionTile, { SolutionTileHeader, SolutionTileDetails, SolutionTileTags, SolutionTileDescription, SolutionTileIcon } from './SolutionTile';

describe('SolutionTile a11y', () => {
  it('the SolutionTile component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const tags = [
      { name: 'test:tag1', type: 'functional' },
      { name: 'tag2', type: 'functional' },
    ];

    const details = [{value:'detail',key:'key1'}]
    const { container } = render(
      <SolutionTile>
        <SolutionTileHeader>Header</SolutionTileHeader>
        <SolutionTileDescription>description</SolutionTileDescription>
        <SolutionTileDetails details={details} />
        <SolutionTileTags tags={tags} />
      </SolutionTile>,
      { container: document.body.appendChild(main) },
    );

    await expect(container).toBeAccessible('Components: SolutionTile');
  });
});
