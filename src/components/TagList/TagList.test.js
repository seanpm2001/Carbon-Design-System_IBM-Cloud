import React from 'react';
import { render, screen } from '../../../test-utils';
import TagList from './TagList';

describe('TagList', () => {
  describe('render classes as expected for TagList component', () => {
    it('it renders the TagList base class', () => {
      const tags = [
        { name: 'test:tag1', type: 'functional' },
        { name: 'tag2' },
      ];
      const { container } = render(
        <div>
          <TagList iconDescription="Yeah" tags={tags} />
        </div>,
      );
      const baseClass = container.querySelectorAll('.pal--tag-list');

      expect(baseClass.length).toEqual(1);
    });

    it('it renders contents correctly', () => {
      const tags = [
        { name: 'test:tag1', type: 'functional' },
        { name: 'tag2', type: 'functional' },
      ];
      render(<TagList iconDescription="Yeah" tags={tags} />);
      const componentContent = screen.getByText('test:tag1');
      expect(componentContent).toBeInTheDocument();
    });

    it('it renders contents correctly - 0 tags displayed', () => {
      const tags = [
        { name: 'test:tag1', type: 'functional' },
        { name: 'tag2', type: 'functional' },
      ];
      render(
        <TagList iconDescription="Yeah" tags={tags} numTagsDisplayed={0} />,
      );
      const componentContent = screen.getByText('2');
      expect(componentContent).toBeInTheDocument();
    });

    it('it renders contents correctly - empty tag list', () => {
      const tags = [];
      render(<TagList iconDescription="" showAddLabelText tags={tags} />);
      const componentContent = screen.getByText('Add tags');
      expect(componentContent).toBeInTheDocument();
    });
  });

  describe('renders props correct', () => {
    const tags = [
      { name: 'test:tag1', type: 'functional' },
      { name: 'test124', type: 'functional' },
      { name: 'test125', type: 'functional' },
      { name: 'test126', type: 'functional' },
      { name: 'test165', type: 'functional' },
      { name: 'test1245', type: 'functional' },
      { name: 'test123756', type: 'functional' },
      { name: 'test1234534', type: 'functional' },
    ];
    it('renders correct number of characters based on maxCharsToolTip', () => {
      const { container } = render(
        <div>
          <TagList
            tags={tags}
            iconDescription="Yeah"
            maxTagsTooltip={2}
            maxCharactersTooltip={3}
          />
        </div>,
      );
      expect(
        container.querySelector('.pal--tag-list--tag-counter'),
      ).toHaveTextContent('+5');
    });
    it('renders correct number of tags based on the maxTagsTooltip - overflow is 1', () => {
      const { container } = render(
        <div>
          <TagList
            tags={tags}
            iconDescription=""
            maxTagsTooltip={4}
            maxCharactersTooltip={3}
          />
        </div>,
      );
      expect(
        container.querySelector('.pal--tag-list--tag-counter'),
      ).toHaveTextContent('+5');
    });
  });
});
