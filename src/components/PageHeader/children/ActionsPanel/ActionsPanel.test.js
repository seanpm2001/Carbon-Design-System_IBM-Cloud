import React, { Component } from 'react';

import { queryAllByLabelText, render } from '../../../../../config/jest/test-utils';
import ActionsPanel from '.';

// eslint-disable-next-line react/prefer-stateless-function
class ListItem extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    return <li>{children}</li>;
  }
}

describe('ActionsPanel', () => {
  it('renders the action panel', () => {
    const { queryAllByLabelText, debug } = render(<ActionsPanel className="custom" />);
    const actionsElements = queryAllByLabelText('Actions... icon'); // in test svg icon is not rendered
    debug()
    expect(actionsElements.length).toBe(2);
    expect(actionsElements[0]).toBeInTheDocument();
    expect(actionsElements[1]).toBeInTheDocument();
  });

  it('does not render the children when closed', () => {
    const { queryByText } = render(
      <ActionsPanel className="custom">
        <ListItem>child</ListItem>
      </ActionsPanel>,
    );
    expect(queryByText('child')).not.toBeInTheDocument();
  });

  it('renders the children once in small visibleBreakpoint', () => {
    const { queryByText } = render(
      <ActionsPanel className="custom" open>
        <ListItem visibleBreakpoint="small">child</ListItem>
      </ActionsPanel>,
    );
    expect(queryByText('child')).toBeInTheDocument();
  });
});
