import React from "react";
import { SkeletonText } from "@carbon/react";

const CatalogTileSkeleton = () => {
  return (
    <div className="pal--catalog-tile__skeleton">
      <SkeletonText lineCount={3} width="30%" />
      <SkeletonText lineCount={3} width="80%" />
    </div>
  );
};

export default CatalogTileSkeleton;
