/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tag from './Tag';

describe('Tag', () => {
  describe('render classes as expected for Tag component', () => {
    it('renders the Tag base class', () => {
      const { container } = render(
        <div>
          <Tag type="functional">Test Tag</Tag>
        </div>,
      );
      const baseClass = container.querySelector('.cds--tag');

      expect(baseClass.className.search('cds--tag')).toBeGreaterThan(-1);
    });

    it('renders contents correctly', () => {
      render(<Tag type="functional">Test text</Tag>);
      const componentContent = screen.getByText('Test text');
      expect(componentContent).toBeInTheDocument();
    });
  });

  describe('render based on props being passed in', () => {
    it('shortens content when it is too long', () => {
      const { container } = render(
        <div>
          <Tag maxCharacters={4} type="red">
            Test Test
          </Tag>
        </div>,
      );
      const tagContent = container.querySelector('.cds--tag').innerHTML;
      expect(tagContent).toEqual(
        '<span><span title="Test Test" style="max-width: 4ch;" class="pal--tag-truncate">Test Test</span></span>',
      );
    });

    it('does not shorten content when tag content is shorter than maxCharacter value', () => {
      const { container } = render(
        <div>
          <Tag maxCharacters={5} type="red">
            Test
          </Tag>
        </div>,
      );
      const tagContent = container.querySelector('.cds--tag').innerHTML;
      expect(tagContent).toEqual('<span><span title="Test">Test</span></span>');
    });

    it('shortens content for tag containing null content when its text is too long', () => {
      const { container } = render(
        <div>
          <Tag maxCharacters={4} type="red">
            {null}
            Test Test
          </Tag>
        </div>,
      );
      const tagContent = container.querySelector('.cds--tag').innerHTML;
      expect(tagContent).toEqual(
        '<span><span style="max-width: 4ch;" class="pal--tag-truncate">Test Test</span></span>',
      );
    });

    it('shortens content for access tag content when its text is too long', () => {
      const { container } = render(
        <div>
          <Tag maxCharacters={4} type="red">
            {'IAM | '}
            Test
          </Tag>
        </div>,
      );
      const tagContent = container.querySelector('.cds--tag').innerHTML;
      expect(tagContent).toEqual(
        '<span><span style="max-width: 4ch;" class="pal--tag-truncate">IAM | Test</span></span>',
      );
    });

    it('shortens content for complex content when its text is too long', () => {
      const { container } = render(
        <div>
          <Tag maxCharacters={4} type="red">
            <span>Test</span>
            Test
          </Tag>
        </div>,
      );
      const tagContent = container.querySelector('.cds--tag').innerHTML;
      expect(tagContent).toEqual(
        '<span><span style="max-width: 4ch;" class="pal--tag-truncate"><span>Test</span>Test</span></span>',
      );
    });

    it('handles remove function', () => {
      const { container } = render(
        <div>
          <Tag
            className="test"
            isRemovable
            maxCharacters={12}
            type="functional"
            onRemove={function onRemove() {
              return null;
            }}
          >
            Example Removable Tag
          </Tag>
        </div>,
      );
      userEvent.click(container.querySelector('.cds--tag__close-icon'));
      expect(container.querySelector('.pal--tag__removed')).toBeInTheDocument();
    });

    it('handles cancel function - no remove', () => {
      const { container } = render(
        <div>
          <Tag
            className="test"
            isRemovable
            maxCharacters={12}
            type="functional"
          >
            Example Removable Tag
          </Tag>
        </div>,
      );
      userEvent.click(container.querySelector('.cds--tag__close-icon'));
      expect(container.querySelector('.pal--tag__removed')).toBeInTheDocument();
    });

    it('handles click function', () => {
      const onClick = jest.fn(() => {});
      const { container } = render(
        <div>
          <Tag
            className="test"
            maxCharacters={12}
            type="functional"
            onClick={onClick}
          >
            Example Tag
          </Tag>
        </div>,
      );
      userEvent.click(container.querySelector('.pal--tag--clickable'));
      expect(onClick).toHaveBeenCalled();
    });

    it('handles click function - key event: enter', () => {
      const onClick = jest.fn(() => {});
      const { container } = render(
        <div>
          <Tag
            className="test"
            maxCharacters={12}
            type="functional"
            onClick={onClick}
          >
            Example Tag
          </Tag>
        </div>,
      );
      fireEvent.keyDown(container.querySelector('.pal--tag--clickable'), {
        key: 'Enter',
        code: 13,
      });
      expect(onClick).toHaveBeenCalled();
    });

    it('handles click function - key event: spacebar', () => {
      const onClick = jest.fn(() => {});
      const { container } = render(
        <div>
          <Tag
            className="test"
            maxCharacters={12}
            type="functional"
            onClick={onClick}
          >
            Example Tag
          </Tag>
        </div>,
      );
      fireEvent.keyDown(container.querySelector('.pal--tag--clickable'), {
        key: 'Spacebar',
        code: 32,
      });
      expect(onClick).toHaveBeenCalled();
    });

    it('handles click function - key event: tab', () => {
      const onClick = jest.fn(() => {});
      const { container } = render(
        <div>
          <Tag
            className="test"
            maxCharacters={12}
            type="functional"
            onClick={onClick}
          >
            Example Tag
          </Tag>
        </div>,
      );
      fireEvent.keyDown(container.querySelector('.pal--tag--clickable'), {
        key: 'Tab',
        code: 9,
      });
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
