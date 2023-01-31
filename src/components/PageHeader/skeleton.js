import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// Carbon Components
import { SkeletonText, BreadcrumbSkeleton, IconSkeleton } from "@carbon/react";
// Icon Skeleton

const PageHeaderSkeleton = ({
  breadcrumbs,
  title,
  actions,
  icon,
  isProvisioningV2,
}) => {
  const headerClassNames = classNames(
    "pal--page-header",
    "pal--page-header--skeleton",
    {
      "pal--page-header--v2": isProvisioningV2,
      "pal--page-header--provisioning": isProvisioningV2,
    }
  );
  const content = (
    <React.Fragment>
      <div className="pal--page-header__main">
        <div className="pal--page-header__breadcrumb">
          {breadcrumbs && <BreadcrumbSkeleton />}
        </div>
        <div className="pal--page-header__title-container">
          <div className="pal--page-header__title">
            {title && (
              <SkeletonText
                className="pal--page-header__title--skeleton"
                heading
                width="400px"
              />
            )}
          </div>
        </div>
      </div>
      {actions && (
        <div className="pal--page-header__actions">
          <button
            type="button"
            className="cds--btn cds--btn--field cds--skeleton"
          />
        </div>
      )}
    </React.Fragment>
  );
  return (
    <div className={headerClassNames}>
      {isProvisioningV2 ? (
        <div className="cds--row">
          {icon && (
            <div className="pal--page-header__icon-container cds--col-md-2 cds--col-lg-2">
              <div className="pal--page-header__icon">
                <IconSkeleton />
              </div>
            </div>
          )}
          <div className="pal--page-header__main-container">{content}</div>
        </div>
      ) : (
        content
      )}
    </div>
  );
};

PageHeaderSkeleton.defaultProps = {
  breadcrumbs: false,
  title: true,
  actions: false,
  icon: false,
  isProvisioningV2: false,
};

PageHeaderSkeleton.propTypes = {
  breadcrumbs: PropTypes.bool,
  title: PropTypes.bool,
  actions: PropTypes.bool,
  icon: PropTypes.bool,
  isProvisioningV2: PropTypes.bool,
};

export default PageHeaderSkeleton;
