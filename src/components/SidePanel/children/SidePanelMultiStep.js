import React from 'react';
import PropTypes from 'prop-types';

const SidePanelMultiStep = React.forwardRef((props, ref) => {
  const {
    id,
    classNames,
    ariaHidden,
    children,
    setActivePanelById,
    ...rest
  } = props;
  let nestedPanelReactContent = null;
  if (children && children.props.children) {
    // if it is a react element
    if (React.isValidElement(children.props.children)) {
      nestedPanelReactContent = React.cloneElement(children.props.children, {
        setActivePanelById,
      });
    }
  }
  return (
    <div
      id={id}
      className={classNames}
      aria-hidden={ariaHidden}
      ref={ref}
      {...rest}
    >
      {nestedPanelReactContent || children}
    </div>
  );
});

SidePanelMultiStep.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string,
  id: PropTypes.string,
  ariaHidden: PropTypes.string,
  setActivePanelById: PropTypes.func,
};

export default SidePanelMultiStep;
