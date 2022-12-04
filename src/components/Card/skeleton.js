import React from "react";
import PropTypes from "prop-types";

import { SkeletonText } from "@carbon/react";
import Card from "./Card";

const CardSkeleton = ({ stacked, className }) => {
  const skeletonItem = stacked ? (
    <Card.labeledItem
      label={<SkeletonText style={{ width: "50%" }} />}
      value={<SkeletonText style={{ width: "75%" }} />}
    />
  ) : (
    <>
      <div>
        <SkeletonText style={{ width: "50%" }} />
      </div>
      <div>
        <SkeletonText style={{ width: "75%" }} />
      </div>
    </>
  );
  const ContainerRow = stacked ? Card.stackedLabeledRows : Card.labeledRows;
  return (
    <Card className={className}>
      <SkeletonText style={{ width: "50%", height: "2rem", margin: "1rem" }} />
      <Card.body>
        <ContainerRow>
          {[...new Array(4)].map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>{skeletonItem}</React.Fragment>
          ))}
        </ContainerRow>
      </Card.body>
    </Card>
  );
};
CardSkeleton.propTypes = {
  /**
   * If stacked the card skeleton will look like the CardStackedLabeledRows
   */
  stacked: PropTypes.bool,
  className: PropTypes.string,
};
CardSkeleton.defaultProps = {
  stacked: true,
  className: undefined,
};
export default CardSkeleton;
