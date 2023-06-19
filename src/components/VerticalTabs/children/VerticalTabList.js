import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { TabList } from "@carbon/react";
import VerticalPagination from "./VerticalPagination";
import lodash from 'lodash'


const VerticalTabList = React.forwardRef((props, ref) => {

  const {children, className, withPagination, PaginationProps, ...rest} = props;
  const copiedChildren = lodash.cloneDeep(children)
  const [page, setPage] = useState(PaginationProps.page)
  // const visibleChildren = useMemo(()=> {
  //   return copiedChildren.slice((page - 1) * PaginationProps.pageSize, page * PaginationProps.pageSize)
  // }, [copiedChildren, page, PaginationProps.pageSize])
 
  const classes  = classnames(
    "pal--vertical-tab-list", 
    { "pal--vertical-tab-list--pagination": withPagination },
    className)


  const countChildren = children.length

  const visibleChildren = children.slice((page - 1) * PaginationProps.pageSize, page * PaginationProps.pageSize)


  const handleChange = ({ page: newPage, pageSize}) => {
    setPage(newPage)
  }

  const paginationProps = {
    ...PaginationProps,
    totalItems: PaginationProps.totalItems ? PaginationProps.totalItems : countChildren,
    onChange: handleChange
  }

  return (
    <div className="pal--vertical-tab-list__container">
      <TabList ref={ref} className={classes} {...rest}>{visibleChildren}</TabList>
      {withPagination && <VerticalPagination  {...paginationProps}/>}
    </div>
  );
});

VerticalTabList.propTypes = {
  withPagination: PropTypes.bool,
  PaginationProps: VerticalPagination.propTypes,
  ...TabList.propTypes
};

VerticalTabList.defaultProps = {
  withPagination: false,
  PaginationProps: VerticalPagination.defaultProps,
  ...TabList.defaultProps
};

export default VerticalTabList;
