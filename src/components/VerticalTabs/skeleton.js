import React from "react";

const Skeleton = () => {
  return <div className="pal--counter__skeleton>">
          <h1 className="pal--counter__total-steps">0 / 5</h1>
          <p className="pal--counter__label">Steps complete</p>
          <hr className="pal--counter__divider"></hr>
      </div>;
};

export default Skeleton