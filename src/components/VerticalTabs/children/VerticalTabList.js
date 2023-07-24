import {
  ButtonSet,
  IconButton,
  OverflowMenu,
  Search,
  TabList,
} from '@carbon/react';
import {
  Add,
  ArrowsVertical,
  Search as SearchIcon,
  TableOfContents,
} from '@carbon/react/icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { VerticalTabsContext } from '../VerticalTabs';
import { getRecursiveChildText, search } from '../utils';
import VerticalTabsSidePanel from './VerticalTabsSidePanel';

const VerticalTabList = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    withSearch,
    withAdd,
    fullHeight,
    SearchProps,
    OverflowMenuProps,
    disabled,
    ...rest
  } = props;

  const { isMobile, setTotalTabs } = useContext(VerticalTabsContext);
  const [filter, setFilter] = useState('');
  const [tabs, setTabs] = useState(children);
  const [open, setOpen] = useState(false);
  const classes = classnames(
    'pal--vertical-tab-list',
    { 'pal--vertical-tab-list--search': withSearch },
    { 'pal--vertical-tab-list--full-height': fullHeight },
    { 'pal--vertical-tab-list--open': open },
    className
  );

  const fuzzySearchChildren = (filter, children) => {
    const searchableTexts = children.map((child, idx) => {
      return getRecursiveChildText(child);
    });

    const results = search(searchableTexts, filter);
    // unveil filtered children
    return results;
  };
  const renderTabs = useCallback(
    filter => {
      // filter children
      const searchedChildren =
        filter !== '' ? fuzzySearchChildren(filter, tabs) : undefined;
      if (!searchedChildren) return children;

      const searchedChildrenIndices = searchedChildren.map(
        child => child.refIndex
      );
      return tabs.filter((child, index) =>
        searchedChildrenIndices.includes(index)
      );
    },
    [tabs, children]
  );

  const handleSearch = event => {
    setFilter(event.target.value);

    const newTabs = renderTabs(event.target.value);
    setTabs(newTabs);
    if (SearchProps?.onChange) {
      SearchProps.onChange(event);
    }
  };

  const handleClear = () => {
    setFilter('');

    const newTabs = renderTabs('');
    setTabs(newTabs);
    if (SearchProps?.onChange) {
      SearchProps.onClear();
    }
  };

  const handleAdd = () => {
    if (props.onAdd) {
      props.onAdd();
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSort = () => {
    const copiedTabs = [...tabs];
    const reversedTabs = copiedTabs.reverse();
    setTabs([...reversedTabs]);
    if (props.onSort) {
      props.onSort();
    }
  };

  const searchProps = {
    ...SearchProps,
    disabled: disabled,
    onChange: handleSearch,
  };

  useEffect(() => {
    const newTabs = renderTabs(filter);
    setTabs(newTabs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    setTotalTabs(children.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  const smContent = (
    <div className={classes}>
      {!fullHeight && (
        <div className="pal--vertical-tab-list__header">
          <IconButton onClick={handleOpen} kind="ghost">
            <TableOfContents />
          </IconButton>
          <ButtonSet>
            {open ? (
              <Search
                onClear={handleClear}
                className="pal--vertical-tab-list__search"
                {...searchProps}
              />
            ) : (
              <IconButton onClick={handleOpen} kind="ghost">
                <SearchIcon />
              </IconButton>
            )}
            <IconButton onClick={handleSort} kind="ghost">
              <ArrowsVertical />
            </IconButton>
            {withAdd && (
              <IconButton onClick={handleAdd} kind="primary">
                <Add />
              </IconButton>
            )}
          </ButtonSet>
        </div>
      )}
      <VerticalTabsSidePanel open={open}>
        <TabList contained ref={ref} {...rest}>
          {tabs}
        </TabList>
        {withSearch && (
          <div className="pal--vertical-tab-list__footer">
            {' '}
            Showing {tabs.length} items{' '}
          </div>
        )}
      </VerticalTabsSidePanel>
    </div>
  );

  if (isMobile) return smContent;

  return (
    <div className={classes}>
      {!fullHeight && (
        <div className="pal--vertical-tab-list__header">
          <Search
            onClear={handleClear}
            className="pal--vertical-tab-list__search"
            {...searchProps}
          />
          <IconButton onClick={handleSort} kind="ghost">
            <ArrowsVertical />
          </IconButton>
          {withAdd && (
            <IconButton onClick={handleAdd} kind="primary">
              <Add />
            </IconButton>
          )}
        </div>
      )}
      <TabList contained ref={ref} {...rest}>
        {tabs}
      </TabList>
      {withSearch && (
        <div className="pal--vertical-tab-list__footer">
          {' '}
          Showing {tabs.length} items{' '}
        </div>
      )}
    </div>
  );
});

VerticalTabList.propTypes = {
  withSearch: PropTypes.bool,
  SearchProps: Search.propTypes,
  OverflowMenuProps: OverflowMenu.propTypes,
  withAdd: PropTypes.bool,
  onAdd: PropTypes.func,
  onSort: PropTypes.func,
  /**
   * Determines whether Tabs span whole height or not.
   */
  fullHeight: PropTypes.bool,
  ...TabList.propTypes,
};

VerticalTabList.defaultProps = {
  withSearch: false,
  SearchProps: Search.defaultProps,
  OverflowMenuProps: OverflowMenu.defaultProps,
  fullHeight: false,
  onSort: undefined,
  onAdd: undefined,
  withAdd: false,
  ...TabList.defaultProps,
};

export default VerticalTabList;
