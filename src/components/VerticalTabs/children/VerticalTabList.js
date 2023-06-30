import { OverflowMenu, Search, TabList } from "@carbon/react";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { getRecursiveChildText, search } from "../utils";


const VerticalTabList = React.forwardRef((props, ref) => {

  const {children, className, withSearch, SearchProps, OverflowMenuProps, disabled, ...rest} = props;
  const [filter, setFilter] = useState("")
  const classes  = classnames(
    "pal--vertical-tab-list", 
    { "pal--vertical-tab-list--search": withSearch },
    className)

  const tabsRef = useRef({})

  
  const fuzzySearchChildren = (filter, children) => {
    const searchableTexts = children.map((child, idx) => {
      return getRecursiveChildText(child)
    })

    const results = search(searchableTexts, filter)
    // unveil filtered children
    return results
  } 

  const exactSearchChildren = (filter) => {
    return children.filter((child, idx) => {
      const searchableText = getRecursiveChildText(child)
      return searchableText.toLowerCase().includes(filter.toLowerCase());
    })
  }

  const setTabAt = (index, tabRef) => {
    tabsRef.current[`tab${index}`] = tabRef;
  };

  
  const handleSearch  = (event) => {
    setFilter(event.target.value)
    if (SearchProps?.onChange) {
      SearchProps.onChange(event)
    }
  }


  const searchedChildren = withSearch && filter !== "" ? fuzzySearchChildren(filter, children) : undefined
  const totalItems = searchedChildren?.length || children.length

  const renderChildren = () => {
    // filter children
    if (!searchedChildren) return children

    const searchedChildrenIndices = searchedChildren.map((child) => child.refIndex)
    return children.filter((child, index) => searchedChildrenIndices.includes(index))
  }

  const tabsWithProps = children.map((tab, index) => {
    const tabIndex = 0;
    const className = classnames(
      tab.props.className,
      "pal--vertical-tab--hidden"
    );
    const cn = searchedChildren?.find((item) => item.refIndex !== index) ? className : tab.props.className
    const newTab = React.cloneElement(tab, {
      index,
      handleTabClick: props.onSelectionChange,
      tabIndex,
      className: cn,
      ref: (e) => {
        console.log(e)
        setTabAt(index, e);
      },
      handleTabKeyDown: props.onSelectionChange,
      ...tab.props
    });

    return newTab;
  });

  const searchProps = {
    ...SearchProps,
    disabled: disabled,
    onChange: handleSearch
  }

  const overflowMenuProps = {
    ...OverflowMenuProps,
    disabled: disabled,
    onChange: handleSearch
  }

  return (
    <div className={classes}>
      {withSearch && <Search className="pal--vertical-tab-list__search" {...searchProps} />}
        <TabList contained ref={ref} {...rest}>
          {renderChildren()}
        </TabList>

      {/* <div className="pal--vertical-tab-list--sm">
        <OverflowMenu>
          <TabList ref={ref} className={classes} {...rest}>
            {tabsWithProps}
          </TabList>
          {withSearch && <div> Showing {totalItems} items </div>}
        </OverflowMenu>
      </div> */}
      {withSearch && <div className="pal--vertical-tab-list__footer"> Showing {totalItems} items </div>}

    </div>
  );
});

VerticalTabList.propTypes = {
  withSearch: PropTypes.bool,
  SearchProps: Search.propTypes,
  OverflowMenuProps: OverflowMenu.propTypes,
  ...TabList.propTypes
};

VerticalTabList.defaultProps = {
  withSearch: false,
  SearchProps: Search.defaultProps,
  OverflowMenuProps: OverflowMenu.defaultProps,
  ...TabList.defaultProps
};

export default VerticalTabList;
