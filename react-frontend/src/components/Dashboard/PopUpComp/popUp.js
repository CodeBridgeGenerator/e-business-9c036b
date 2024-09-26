import React from "react";
import { classNames } from "primereact/utils";
import Trash from "../../../assets/media/Trash.png";

const PopupCard = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "2.5rem",
        right: "2rem",
        width: "150px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        zIndex: 1,
        padding: "10px",
      }}
    >
      <button
        style={{
          display: "flex",
          alignItems: "center",
          border: "none",
          background: "none",
          cursor: "pointer",
          padding: 0,
          margin: 0,
        }}
      >
        <img
          src={Trash}
          alt="Trash"
          className={classNames("mr-2")}
          style={{ height: "1rem", marginRight: "0.5rem" }}
        />
        <span style={{ fontSize: "14px", color: "black" }}>Remove Card</span>
      </button>
    </div>
  );
};

export default PopupCard;
