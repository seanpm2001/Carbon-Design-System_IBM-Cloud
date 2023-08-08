import { ButtonSet, IconButton, Search, TabList } from '@carbon/react';
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
import { getRecursiveChildText, search } from '../utils';
import VerticalTabsSidePanel from './VerticalTabsSidePanel';

const VerticalTabList = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    withSearch,
    withAdd,
    withSort,
    SearchProps,
    OverflowMenuProps,
    disabled,
    ...rest
  } = props;

  const { isMobile, setTotalTabs, open, setOpen } =
    useContext(VerticalTabsContext);
  const [filter, setFilter] = useState('');
  const [tabs, setTabs] = useState(children);
  const searchRef = useRef();

  const classes = classnames(
    'pal--vertical-tab-list',
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
    if (props.onAdd) {
      props.onAdd();
    }
  };

  const handleOpen = value => {
    setOpen(value);
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
        <TabList {...rest} scrollIntoView contained ref={ref}>
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
      <TabList contained ref={ref} {...rest}>
        {tabs}
      </TabList>
      <div className="pal--vertical-tab-list__footer">
        {' '}
        Showing {tabs.length} items{' '}
      </div>
    </div>
  );
});

VerticalTabList.propTypes = {
  withSearch: PropTypes.bool,
  SearchProps: Search.propTypes,
  withAdd: PropTypes.bool,
  withSort: PropTypes.bool,
  onAdd: PropTypes.func,
  onSort: PropTypes.func,
  ...TabList.propTypes,
};

VerticalTabList.defaultProps = {
  withSearch: false,
  SearchProps: Search.defaultProps,
  onSort: undefined,
  onAdd: undefined,
  withAdd: false,
  withSort: true,
  ...TabList.defaultProps,
};

export default VerticalTabList;
