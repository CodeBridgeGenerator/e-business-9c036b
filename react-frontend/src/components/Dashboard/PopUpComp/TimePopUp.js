// src/components/ChartComponents/ThisWeek.js
import React, { useState } from "react";
import { classNames } from "primereact/utils";
import Down from "../../../assets/media/Down Small.png";
import Ellipsis from "../../../assets/media/Ellipsis Vertical.png";
import PopupCard from "./popUp";

const ThisWeek = ({ isEdit, onClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (option) => {
    console.log(`Selected: ${option}`);
    // Handle menu item click, e.g., filter data based on the selected option
    setDropdownOpen(false);
  };

  const handlePopUp = () => {
    setShowCard(!showCard);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "1rem",
        right: "0.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        className="block text-900 font-medium mb-1"
        style={{
          marginRight: "0.5rem",
          color: "rgba(0, 0, 0, 0.6)",
          fontSize: "14px",
        }}
      >
        This week
      </span>

      <img
        src={Down}
        alt="DropDown"
        className={classNames("mr-2")}
        style={{
          height: "1rem",
          marginRight: "0.5rem",
          cursor: "pointer",
        }}
        onClick={handleDropdownToggle}
      />
      {isDropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "#fff",
            border: "none",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            width: "120px",
            borderRadius: "10px",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li
              onClick={() => handleMenuItemClick("Today")}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
            >
              Today
            </li>
            <li
              onClick={() => handleMenuItemClick("Today")}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
            >
              This Month
            </li>
            <li
              onClick={() => handleMenuItemClick("Today")}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
            >
              This Year
            </li>
          </ul>
        </div>
      )}

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
      {showCard && <PopupCard />}
    </div>
  );
};

export default ThisWeek;
