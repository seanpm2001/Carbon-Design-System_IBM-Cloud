/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SolutionTile, { SolutionTileHeader, SolutionTileDetails, SolutionTileTags, SolutionTileDescription, SolutionTileIcon } from '.';

describe('SolutionTile', () => {
  const tags = [
    { name: 'test:tag1', type: 'functional' },
    { name: 'tag2' },
  ];

  const details= [{value:'detail', key:'foo'}, {value:'detail2', key:'foo2'}]
  describe('render classes as expected for SolutionTile component', () => {
    it('it renders the SolutionTile base class', () => {
      const { container } = render(<SolutionTile />);

      const baseClass = container.querySelector('.pal--solution-tile');

      expect(baseClass).toBeInTheDocument();
    });

    it('it renders the SolutionTile sub classes', () => {
      const { container } = render(
        <SolutionTile>
          <SolutionTileHeader>Header</SolutionTileHeader>
          <SolutionTileDescription>description</SolutionTileDescription>
          <SolutionTileDetails details={details} />
          <SolutionTileTags tags={details} />
          <SolutionTileIcon>icon</SolutionTileIcon>
        </SolutionTile>
      );

      const headerClass = container.querySelector('.pal--solution-tile__header');
      expect(headerClass).toBeInTheDocument();

      const descriptionClass = container.querySelector('.pal--solution-tile__description');
      expect(descriptionClass).toBeInTheDocument();

      const detailsClass = container.querySelector('.pal--solution-tile__details');
      expect(detailsClass).toBeInTheDocument();

      const tagsClass = container.querySelector('.pal--solution-tile__tags');
      expect(tagsClass).toBeInTheDocument();

      const iconClass = container.querySelector('.pal--solution-tile__icon');
      expect(iconClass).toBeInTheDocument();
    });
  });
});
