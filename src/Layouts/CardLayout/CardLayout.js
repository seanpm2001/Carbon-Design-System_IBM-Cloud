import React from "react";
import PropTypes from "prop-types";
import { LayoutWrapper, LayoutRequired } from "../../utils/Layouts";

/*
 * LayoutWrapper provides Carbon's grid and generic Layout styles
 * LayoutRequired provides text styles you can use for any required components
 */

const CardLayout = ({
  PageHeader,
  wrapContentInCols,
  colClasses,
  children,
}) => {
  // Check for a required component, this example uses the PageHeader
  if (!PageHeader) {
    return <LayoutRequired>Missing PageHeader component</LayoutRequired>;
  }

  return (
    <LayoutWrapper className="pal--card-layout">
      <div className="cds--row">
        <div className="cds--col">{PageHeader}</div>
      </div>
      <div className="cds--row pal--card-layout--container">
        {wrapContentInCols
          ? children.map((child, index) => (
              <div
                className={`${colClasses[index] || `cds--col`}`}
                key={
                  child.props.id ||
                  child.props.key ||
                  `layoutWrapperContent-${colClasses[index]}-${index}`
                }
              >
                {child}
              </div>
            ))
          : children}
      </div>
    </LayoutWrapper>
  );
};

CardLayout.defaultProps = {
  children: [],
  wrapContentInCols: false,
  colClasses: [],
};

CardLayout.propTypes = {
  /**
   * Header of the page, should be the <PageHeader> component
   */
  PageHeader: PropTypes.element.isRequired,
  /**
   * The Cards to be put inside the layout itself
   */
  children: PropTypes.arrayOf(PropTypes.element),
  wrapContentInCols: PropTypes.bool,
  /**
   * An Array which can contain the classes for the columns to adjust their sizes or their behaviour on different screen sizes.
   * Classes will be applied in the same order as the cards were provided: 1st class(List) will take effect on the 1st Card, 2nd on the 2nd Card, and so on.
   */
  colClasses: PropTypes.arrayOf(PropTypes.string),
};

export default CardLayout;
