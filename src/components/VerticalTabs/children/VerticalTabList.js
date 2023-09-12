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
  } = useContext(VerticalTabsContext);
  const [filter, setFilter] = useState('');
  const [tabs, setTabs] = useState(children);
  const searchRef = useRef();

  const classes = classnames(
    'pal--vertical-tab-list',
    'cds--tabs',
    'cds--tabs--contained',
    { 'pal--vertical-tab-list--search': withSearch },
    { 'pal--vertical-tab-list--add': withAdd },
    { 'pal--vertical-tab-list--sort': withSort },
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
      console.log(nextIndex);
      const nextTab = tabs[nextIndex].props.index;
      console.log(tabs[nextIndex]);
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
    setTotalTabs(children.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  const smContent = (
    <div className={classes}>
      <div className="pal--vertical-tab-list__header">
        <IconButton onClick={() => handleOpen(!open)} kind="ghost">
          <TableOfContents />
        </IconButton>
        <ButtonSet>
          {withSearch &&
            (open ? (
              <Search
                value={filter}
                ref={searchRef}
                onClear={handleClear}
                className="pal--vertical-tab-list__search"
                {...searchProps}
              />
            ) : (
              <IconButton onClick={() => handleOpen(!open)} kind="ghost">
                <SearchIcon />
              </IconButton>
            ))}
          {withSort && (
            <IconButton onClick={handleSort} kind="ghost">
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
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <div
          {...rest}
          aria-label={label}
          className="cds--tab--list"
          role="tablist"
          onKeyDown={handleKeyDown}>
          {' '}
          {tabs}
        </div>
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
      <div className="pal--vertical-tab-list__header">
        {withSearch && (
          <Search
            value={filter}
            onClear={handleClear}
            className="pal--vertical-tab-list__search"
            {...searchProps}
          />
        )}
        {withSort && (
          <IconButton onClick={handleSort} kind="ghost">
            <ArrowsVertical />
          </IconButton>
        )}

        {withAdd && (
          <IconButton onClick={handleAdd} kind="primary">
            <Add />
          </IconButton>
        )}
      </div>
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        {...rest}
        aria-label={label}
        className="cds--tab--list"
        role="tablist"
        onKeyDown={handleKeyDown}>
        {tabs}
      </div>
      <div className="pal--vertical-tab-list__footer">
        {' '}
        Showing {tabs.length} items{' '}
      </div>
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
  onSort: undefined,
  onAdd: undefined,
  withAdd: false,
  withSort: true,
};

export default VerticalTabList;
