import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '.';

describe('Card component a11y', () => {
  it('the card components passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <section>
        <Card>
          <Card.header title="Title" subtitle="subtitle" small />
          <Card.image
            src="https://source.unsplash.com/random/500x281"
            alt="a random image"
          />
          <Card.labeledRows>
            <p>label</p>
            <p>value</p>
          </Card.labeledRows>
          <Card.stackedLabeledRows>
            <Card.labeledItem label="label" value="value" />
          </Card.stackedLabeledRows>
          <Card.body>card body child</Card.body>
        </Card>
      </section>,
      { container: document.body.appendChild(main) },
    );

    await expect(container).toBeAccessible('Components: Card');
  });
});
