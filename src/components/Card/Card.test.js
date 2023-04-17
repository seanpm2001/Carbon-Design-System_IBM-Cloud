import React from 'react';
import { render, screen, waitFor } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import { Card } from '.';

describe('Card', () => {
  it('renders the Card class', () => {
    const { container } = render(<Card>card child</Card>);
    const cardClass = container.querySelector('.pal--card');
    expect(cardClass).toBeInTheDocument();
  });

  it('renders the Card callout class', () => {
    const { container } = render(<Card callOut>card child</Card>);
    const cardClass = container.querySelector('.pal--card--call-out');
    expect(cardClass).toBeInTheDocument();
  });

  it('renders the Card fade in class', () => {
    const { container } = render(<Card fadeIn>card child</Card>);
    const cardMotionClass = container.querySelector('.pal--card--fade-in');
    expect(cardMotionClass).toBeInTheDocument();
  });

  it('renders the Card with children', () => {
    render(<Card>card child</Card>);
    expect(screen.getByText('card child')).toBeInTheDocument();
  });

  describe('CardHeader', () => {
    it('renders the CardHeader class', () => {
      const { container } = render(
        <Card>
          <Card.header title="Title" />
          card child
        </Card>,
      );
      const cardHeaderClass = container.querySelector('.pal--card__header');
      expect(cardHeaderClass).toBeInTheDocument();
    });

    it('renders the CardHeader title', () => {
      render(
        <Card>
          <Card.header title="Card Header Title" />
          card child
        </Card>,
      );
      const cardHeaderTitle = screen.getByText('Card Header Title');
      expect(cardHeaderTitle).toBeInTheDocument();
    });

    it('renders the CardHeader editing class', () => {
      const { container } = render(
        <Card>
          <Card.header title="Card Header Title" editing />
          card child
        </Card>,
      );
      const cardHeaderClass = container.querySelector(
        '.pal--card__header--editing',
      );
      expect(cardHeaderClass).toBeInTheDocument();
    });

    it('renders the CardHeader editable class', () => {
      const { container } = render(
        <Card>
          <Card.header title="Card Header Title" onSaveClick={() => {}} />
          card child
        </Card>,
      );
      const cardHeaderClass = container.querySelector(
        '.pal--card__header--editable',
      );
      expect(cardHeaderClass).toBeInTheDocument();
    });

    it('renders the CardHeader small class', () => {
      const { container } = render(
        <Card>
          <Card.header title="Card Header Title" small />
          card child
        </Card>,
      );
      const cardHeaderClass = container.querySelector(
        '.pal--card__header--small',
      );
      expect(cardHeaderClass).toBeInTheDocument();
    });

    it('renders the CardHeader subtitle', () => {
      render(
        <Card>
          <Card.header
            title="Card Header Title"
            subtitle="Card Header Subtitle"
          />
          card child
        </Card>,
      );
      const cadHeaderSubtitle = screen.getByText('Card Header Subtitle');
      expect(cadHeaderSubtitle).toBeInTheDocument();
    });

    it('renders the CardHeader subtitle for small cards', () => {
      render(
        <Card>
          <Card.header
            title="Card Header Title"
            subtitle="Card Header Subtitle"
            small
          />
          card child
        </Card>,
      );
      const cadHeaderSubtitle = screen.getByText('Card Header Subtitle');
      expect(cadHeaderSubtitle).toBeInTheDocument();
    });

    it('renders the CardHeader default save text', () => {
      render(
        <Card>
          <Card.header
            onEditClick={() => {}}
            onSaveClick={() => {}}
            title="Title"
          />
          card child
        </Card>,
      );
      const cardHeaderEditNode = screen.getByText('Edit');
      expect(cardHeaderEditNode).toBeInTheDocument();
    });

    it('calls the CardHeader onEditClick', () => {
      const onEditClick = jest.fn(() => {});
      render(
        <Card>
          <Card.header
            onEditClick={onEditClick}
            onSaveClick={() => {}}
            title="Title"
          />
          card child
        </Card>,
      );

      userEvent.click(screen.getByText('Edit'));
      expect(onEditClick).toHaveBeenCalled();
    });

    it('removes the CardHeader edit node from the DOM on click', async () => {
      render(
        <Card>
          <Card.header
            onEditClick={() => {}}
            onSaveClick={() => {}}
            title="Title"
          />
          card child
        </Card>,
      );

      userEvent.click(screen.getByText('Edit'));
      await waitFor(() => {
        expect(screen.queryByText('Edit')).not.toBeInTheDocument();
      });
    });

    it('adds the CardHeader save node to the document', async () => {
      render(
        <Card>
          <Card.header
            onEditClick={() => {}}
            onSaveClick={() => {}}
            title="Title"
          />
          card child
        </Card>,
      );

      userEvent.click(screen.getByText('Edit'));
      const cardHeaderSaveNode = await waitFor(() => screen.getByText('Save'));

      expect(cardHeaderSaveNode).toBeInTheDocument();
    });

    it('adds the CardHeader cancel node to the document', async () => {
      render(
        <Card>
          <Card.header
            onEditClick={() => {}}
            onSaveClick={() => {}}
            onCancelClick={() => {}}
            title="Title"
          />
          card child
        </Card>,
      );

      userEvent.click(screen.getByText('Edit'));
      const cardHeaderCancelNode = await waitFor(() =>
        screen.getByText('Cancel'),
      );

      expect(cardHeaderCancelNode).toBeInTheDocument();
    });

    it('removes the CardHeader cancel node to the document', async () => {
      render(
        <Card>
          <Card.header
            onEditClick={() => {}}
            onSaveClick={() => {}}
            onCancelClick={() => {}}
            title="Title"
          />
          card child
        </Card>,
      );

      userEvent.click(screen.getByText('Edit'));
      const cardHeaderCancelNode = await waitFor(() =>
        screen.getByText('Cancel'),
      );

      userEvent.click(cardHeaderCancelNode);
      expect(cardHeaderCancelNode).not.toBeInTheDocument();
    });

    it('calls onCancelClick', async () => {
      const onCancelClick = jest.fn();
      render(
        <Card>
          <Card.header
            onEditClick={() => {}}
            onSaveClick={() => {}}
            onCancelClick={onCancelClick}
            title="Title"
          />
          card child
        </Card>,
      );

      userEvent.click(screen.getByText('Edit'));
      const cardHeaderCancelNode = await waitFor(() =>
        screen.getByText('Cancel'),
      );
      userEvent.click(cardHeaderCancelNode);

      expect(onCancelClick).toHaveBeenCalled();
    });

    it('calls onSaveClick', async () => {
      const onSaveClick = jest.fn();
      render(
        <Card>
          <Card.header
            onEditClick={() => {}}
            onSaveClick={onSaveClick}
            title="Title"
          />
          card child
        </Card>,
      );

      userEvent.click(screen.getByText('Edit'));
      const cardHeaderSaveNode = await waitFor(() => screen.getByText('Save'));
      userEvent.click(cardHeaderSaveNode);

      await waitFor(() => {
        expect(screen.queryByText('Save')).not.toBeInTheDocument();
      });
    });

    it('removes the CardHeader save node from the document', async () => {
      const onSaveClick = jest.fn();
      render(
        <Card>
          <Card.header
            onEditClick={() => {}}
            onSaveClick={onSaveClick}
            title="Title"
          />
          card child
        </Card>,
      );

      userEvent.click(screen.getByText('Edit'));
      const cardHeaderSaveNode = await waitFor(() => screen.getByText('Save'));
      userEvent.click(cardHeaderSaveNode);

      expect(cardHeaderSaveNode).not.toBeInTheDocument();
      expect(onSaveClick).toHaveBeenCalled();
    });

    it('removes the CardHeader save node from the document when editing is true', () => {
      const onSaveClick = jest.fn();
      render(
        <Card>
          <Card.header
            onEditClick={() => {}}
            onSaveClick={onSaveClick}
            editing
            title="Title"
          />
          card child
        </Card>,
      );

      const cardHeaderSaveNode = screen.getByText('Save');
      userEvent.click(cardHeaderSaveNode);

      expect(cardHeaderSaveNode).toBeInTheDocument();
      expect(onSaveClick).toHaveBeenCalled();
    });
  });

  describe('CardBody', () => {
    it('renders the card body', () => {
      const { container } = render(
        <Card>
          <Card.body>card body child</Card.body>
        </Card>,
      );
      const cardBodyClass = container.querySelector('.pal--card__body');
      expect(cardBodyClass).toBeInTheDocument();
    });

    it('renders the CardBody with the short class', () => {
      const { container } = render(
        <Card>
          <Card.body short>card body child</Card.body>
        </Card>,
      );
      const cardBodyClass = container.querySelector('.pal--card__body--short');
      expect(cardBodyClass).toBeInTheDocument();
    });

    it('renders the CardBody with children', () => {
      render(
        <Card>
          <Card.body>card body child</Card.body>
        </Card>,
      );
      const cardBodyChild = screen.getByText('card body child');
      expect(cardBodyChild).toBeInTheDocument();
    });
  });

  describe('CardImage', () => {
    it('render the CardImage component', () => {
      const { container } = render(
        <Card>
          <Card.image
            src="https://source.unsplash.com/random/500x281"
            alt="a random image"
          />
        </Card>,
      );

      expect(screen.getByAltText('a random image')).toBeInTheDocument();
      expect(
        container.querySelector('.pal--card__image-wrap'),
      ).toBeInTheDocument();
    });
  });

  describe('CardLabeledRows', () => {
    it('render the CardLabeledRows component', () => {
      render(
        <Card>
          <Card.labeledRows>
            <p>label</p>
            <p>value</p>
          </Card.labeledRows>
        </Card>,
      );
      expect(screen.getByText('label')).toBeInTheDocument();
      expect(screen.getByText('value')).toBeInTheDocument();
    });
  });

  describe('CardStackedLabeledRows', () => {
    it('render the CardStackedLabeledRows component', () => {
      render(
        <Card>
          <Card.stackedLabeledRows>
            <Card.labeledItem label="label" value="value" />
          </Card.stackedLabeledRows>
        </Card>,
      );
      expect(screen.getByText('label')).toBeInTheDocument();
      expect(screen.getByText('value')).toBeInTheDocument();
    });
  });
});
