import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import callIf from "../utils/callIf";

const SidePanelBreadcrumbs = ({
  activePanelId,
  breadcrumbs,
  onBreadCrumbClick,
  onPageSelect,
  onTabToPrev,
}) => {
  return (
    <Breadcrumb
      noTrailingSlash
      className="pal--side-panel__breadcrumbs"
      aria-label="Side Panel Breadcrumbs"
    >
      {breadcrumbs.map(({ id: breadCrumbId, value }, index) => (
        <BreadcrumbItem
          key={breadCrumbId}
          href="#"
          isCurrentPage={breadCrumbId === activePanelId}
          className="pal--side-panel__breadcrumb-item"
          aria-label="Side Panel Breadcrumb Item"
          onClick={(e) => {
            e.preventDefault();
            callIf(onBreadCrumbClick, () => onPageSelect(breadCrumbId))(e);
          }}
          onKeyDown={(e) => {
            if (index === 0) {
              onTabToPrev(e);
            }
          }}
        >
          {value}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

SidePanelBreadcrumbs.propTypes = {
  activePanelId: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  onBreadCrumbClick: PropTypes.func.isRequired,
  onPageSelect: PropTypes.func.isRequired,
  onTabToPrev: PropTypes.func.isRequired,
};

export default SidePanelBreadcrumbs;
