import React from "react";
import { getSubString } from "../../../utils/getSubString";

const Size = {
  lg: {
    width: "100px",
    height: "100px",
  },
  md: {
    width: "70px",
    height: "70px",
  },
  sm: {
    width: "50px",
    height: "50px",
  },
};

const Avatar = ({ photoURL = "", text = "", size = "md" }) => {
  return photoURL ? (
    <img
      style={{ borderRadius: "50%", ...Size[size], objectFit: "cover" }}
      src={photoURL}
      alt=""
    />
  ) : (
    <div
      style={{
        borderRadius: "50%",
        ...Size[size],
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white" }}>{getSubString(text, 1)}</h1>
    </div>
  );
};

export default Avatar;
