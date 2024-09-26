import React, { useState } from "react";
import { classNames } from "primereact/utils"; // Ensure classNames is imported
import Edit from "../../../assets/media/Edit.png"; // Import the Trash icon

const ManageTabsPopup = (props) => {
  const { onClose, isEdit, handlePopupToggle } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      style={{
        position: "relative",
        top: "0.1rem",
        zIndex: 1000,
        textAlign: "right", // Align "Manage Chart" to the right
      }}
    >
      {/* Manage Tabs Button */}
      <span
        onClick={toggleDropdown}
        className={classNames("mr-2", { hidden: !isEdit })}
        style={{
          color: "red", // Red color
          cursor: "pointer", // Pointer on hover
          fontWeight: "bold", // Bold text
          fontSize: "0.875rem", // Slightly smaller font
          textDecoration: "none", // No underline
        }}
      >
        Manage Chart
      </span>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "1.5rem", // Distance from the button
            right: "0", // Align to the right side of the container
            width: "150px", // Width of the dropdown
            backgroundColor: "white", // Background color
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for dropdown
            borderRadius: "8px", // Rounded corners
            padding: "5px", // Padding inside the dropdown
            zIndex: 1000, // Ensure it is above other content
          }}
        >
          {/* Remove Card Button */}
          <div
            style={{
              marginBottom: "2px", // Space below the button
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
                src={Edit}
                alt="Edit"
                className={classNames("mr-2")}
                style={{ height: "1rem", marginRight: "0.5rem" }}
              />
              <span style={{ fontSize: "14px", color: "black" }}>
                Edit Chart
              </span>
            </button>
          </div>

          {/* Add more dropdown items here if needed */}
        </div>
      )}
    </div>
  );
};

export default ManageTabsPopup;
