import { WarningFilled as WarningFilled16 } from "@carbon/react/icons";
import React from "react";

const warningIcon = (
  <div
    aria-hidden="true"
    style={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      width: "16px",
      height: "16px",
    }}
  >
    <div
      style={{
        position: "absolute",
        backgroundColor: "black",
        borderRadius: "50%",
        width: "12px",
        height: "12px",
        top: "50%",
        marginTop: "-6px",
      }}
    />
    <div style={{ position: "absolute" }}>
      <WarningFilled16 style={{ fill: "#f1c21b" }} />
    </div>
  </div>
);

export default warningIcon;
