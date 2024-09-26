import React, { useState } from "react";
import { classNames } from "primereact/utils";
import Drag from "../../../assets/media/Drag.png";
import Employees from "../../../assets/media/Employees.png";
import Ellipsis from "../../../assets/media/Ellipsis Vertical.png";
import Increase from "../../../assets/media/Increase.svg";
import PopupCard from "../PopUpComp/popUp";

const TotalComponent = (props) => {
  const { TotalComp, total, isEdit } = props;
  const [showCard, setShowCard] = useState(false);

  const handlePopUp = () => {
    setShowCard(!showCard);
  };

  return (
    <div
      className="surface-card shadow-2 border-round p-3"
      style={{ height: "10rem", position: "relative" }}
    >
      <div className="flex justify-content-between align-items-center">
        <div className="flex align-items-center">
          <img
            src={Drag}
            alt="Drag Icon"
            className={classNames("mr-2", { hidden: !isEdit })}
            style={{ width: "1rem", height: "1rem" }}
          />
          <img
            src={Employees}
            alt="Employees Icon"
            className="mr-2"
            style={{ width: "1.2rem", height: "1.2rem" }} // Slightly larger icon
          />
          <span
            className="block"
            style={{ fontWeight: "600", fontSize: "1rem", color: "#2A4454" }} // Darker color for title
          >
            {TotalComp}
          </span>
        </div>

        <img
          src={Ellipsis}
          alt="Ellipsis"
          className={classNames("mr-2", { hidden: !isEdit })}
          style={{
            height: "1rem",
            cursor: "pointer",
          }}
          onClick={handlePopUp}
        />
      </div>

      {showCard && <PopupCard />}

      <div className="mt-6">
        <div
          className="flex align-items-center"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "1rem",
          }}
        >
          <div className="flex align-items-center">
            <strong
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#2A4454",
              }}
            >
              {total}
            </strong>
          </div>
          <div
            className="flex align-items-center mt-2"
            style={{ color: "green" }}
          >
            <img
              src={Increase}
              alt="Increase"
              style={{ width: "1rem", height: "1rem", marginRight: "0.3rem" }}
            />
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                color: "green",
                marginRight: "0.2rem",
              }}
            >
              +5%
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#6c757d",
              }}
            >
              last month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalComponent;
