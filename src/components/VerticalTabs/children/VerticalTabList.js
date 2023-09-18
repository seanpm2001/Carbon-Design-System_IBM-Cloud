import { ButtonSet, IconButton, Search } from '@carbon/react';
import {
  Add,
  ArrowsVertical,
  Search as SearchIcon,
  TableOfContents,
} from '@carbon/react/icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { VerticalTabsContext } from '../VerticalTabs';
import { getRecursiveChildText, search, getNextIndex } from '../utils';
import VerticalTabsSidePanel from './VerticalTabsSidePanel';

const VerticalTabList = ({
  children,
  className,
  withSearch,
  withAdd,
  withSort,
  SearchProps,
  disabled,
  onSort,
  onAdd,
  'aria-label': label,
  ...rest
}) => {
  const {
    selectedIndex,
    setSelectedIndex,
    isMobile,
    setTotalTabs,
    open,
    setOpen,
    setOnAdd,
  } = useContext(VerticalTabsContext);
  const [filter, setFilter] = useState('');
  const [tabs, setTabs] = useState(children);
  const searchRef = useRef();

  const classes = classnames(
    'pal--vertical-tabs',
    { 'pal--vertical-tabs--search': withSearch },
    { 'pal--vertical-tabs--add': withAdd },
    { 'pal--vertical-tabs--sort': withSort },
    { 'pal--vertical-tabs--open': open },
    { 'pal--vertical-tabs--mobile': isMobile },
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
    if (onAdd) {
      onAdd();
    }
  };

  const handleOpen = value => {
    setOpen(value);
  };

  const handleSort = () => {
    const copiedTabs = [...tabs];
    const reversedTabs = copiedTabs.reverse();
    setTabs([...reversedTabs]);
    if (onSort) {
      onSort();
    }
  };

  function handleKeyDown(event) {
    if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
      event.preventDefault();

      const activeTabs = tabs.filter(tab => !tab.props.disabled);
      const actualSelectedIndex = activeTabs.indexOf(
        activeTabs.find(tab => tab.props.index === selectedIndex)
      );
      const nextIndex = tabs.indexOf(
        activeTabs[getNextIndex(event, activeTabs.length, actualSelectedIndex)]
      );
      const nextTab = tabs[nextIndex].props.index;
      setSelectedIndex(nextTab);

      // tabs.current[nextIndex]?.focus();
    }
  }

  const searchProps = {
    ...SearchProps,
    disabled: disabled,
    onChange: handleSearch,
  };

  useLayoutEffect(() => {
    if (open && searchRef) searchRef?.current?.focus();
  }, [open]);

  useEffect(() => {
    const newTabs = renderTabs(filter);
    setTabs(newTabs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    setTotalTabs(children?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  useEffect(() => {
    // propagate to context
    setTotalTabs(children?.length);
    setOnAdd(() => onAdd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onAdd]);

  const emptyState = (
    <span className="pal--vertical-tabs__empty-state">
      You can find a list of resources here once you create them.
    </span>
  );

  const tablist = (
    <>
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        {...rest}
        aria-label={label}
        className="pal--vertical-tab--list"
        role="tablist"
        onKeyDown={handleKeyDown}>
        {tabs ? tabs : emptyState}
      </div>
      <div className="pal--vertical-tabs__footer">
        {' '}
        Showing {tabs?.length || 0} items{' '}
      </div>
    </>
  );

  const smContent = (
    <div className={classes}>
      <div className="pal--vertical-tabs__header">
        <IconButton onClick={() => handleOpen(!open)} kind="ghost">
          <TableOfContents />
        </IconButton>
        <ButtonSet>
          {withSearch &&
            (open ? (
              <Search
                {...searchProps}
                value={filter}
                ref={searchRef}
                onClear={handleClear}
                className="pal--vertical-tabs__search"
                disabled={!tabs}
              />
            ) : (
              <IconButton
                onClick={() => handleOpen(!open)}
                kind="ghost"
                disabled={!tabs}>
                <SearchIcon />
              </IconButton>
            ))}
          {withSort && (
            <IconButton onClick={handleSort} kind="ghost" disabled={!tabs}>
              <ArrowsVertical />
            </IconButton>
          )}
          {withAdd && (
            <IconButton onClick={handleAdd} kind="primary">
              <Add />
            </IconButton>
          )}
        </ButtonSet>
      </div>
      <VerticalTabsSidePanel open={open} onClose={handleOpen}>
        {tablist}
      </VerticalTabsSidePanel>
    </div>
  );

  if (isMobile) return smContent;

  return (
    <div className={classes}>
      <div className="pal--vertical-tabs__header">
        {withSearch && (
          <Search
            {...searchProps}
            value={filter}
            onClear={handleClear}
            className="pal--vertical-tabs__search"
            disabled={!tabs}
          />
        )}
        {withSort && (
          <IconButton onClick={handleSort} kind="ghost" disabled={!tabs}>
            <ArrowsVertical />
          </IconButton>
        )}

        {withAdd && (
          <IconButton onClick={handleAdd} kind="primary">
            <Add />
          </IconButton>
        )}
      </div>
      {tablist}
    </div>
  );
};

VerticalTabList.propTypes = {
  withSearch: PropTypes.bool,
  SearchProps: Search.propTypes,
  withAdd: PropTypes.bool,
  withSort: PropTypes.bool,
  onAdd: PropTypes.func,
  onSort: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  /**
   * Provide an accessible label to be read when a user interacts with this
   * component
   */
  'aria-label': PropTypes.string.isRequired,
};

VerticalTabList.defaultProps = {
  withSearch: false,
  SearchProps: Search.defaultProps,
  onSort: () => {},
  onAdd: () => {},
  withAdd: false,
  withSort: true,
};

export default VerticalTabList;
