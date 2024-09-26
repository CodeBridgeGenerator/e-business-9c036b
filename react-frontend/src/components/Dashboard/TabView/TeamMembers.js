import React, { useState } from "react";
import { classNames } from "primereact/utils";
import ManageTabsPopup from "../PopUpComp/ManageTabsPopup";
import Sort from "../../../assets/media/Sort.png"; // Importing the sort image
import EllipsisHorizontal from "../../../assets/media/Ellipsis Horizontal.png"; // Importing ellipsis horizontal image

const TeamMembers = (props) => {
  const {
    teamMembers = [],
    tabs = [],
    ActiveTab,
    setActiveTab,
    isEdit,
    setIsEdit,
  } = props;
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleToggle = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div
      className="surface-card shadow-2 border-round p-4"
      style={{ position: "relative" }}
    >
      <div style={{ position: "absolute", top: "10px", right: "20px" }}>
        <span
          onClick={handlePopupToggle}
          className={classNames("mr-2", { hidden: !isEdit })}
          style={{
            color: "red", // Red color
            cursor: "pointer", // Pointer on hover
            fontWeight: "bold", // Bold text
            fontSize: "0.875rem", // Slightly smaller font
            textDecoration: "none", // No underline
          }}
        >
          Manage tabs
        </span>
      </div>

      {showPopup && <ManageTabsPopup onClose={handlePopupToggle} />}

      <div className="overflow-x-auto">
        <ul className="surface-card p-2 m-0 list-none flex overflow-x-auto select-none text-sm">
          {tabs.map((tab, index) => (
            <React.Fragment key={index}>
              <li className="px-4">
                <a
                  className={classNames(
                    "p-ripple cursor-pointer px-5 py-3 flex items-center border-b-2 transition-colors duration-150",
                    {
                      "border-red-500 text-red-500 hover:border-blue-500":
                        ActiveTab === index,
                      "text-700 border-transparent": ActiveTab !== index,
                    },
                  )}
                  onClick={() => setActiveTab(index)}
                >
                  {isEdit && ( // Conditionally hide the image when isEdit is true
                    <img
                      src={tab.src}
                      alt={tab.label}
                      style={{
                        width: "1rem",
                        height: "1rem",
                        marginRight: "15px",
                      }}
                    />
                  )}
                  <span className="font-medium">{tab.label}</span>
                </a>
              </li>
              {index < tabs.length - 1 && (
                <li className="flex items-center">
                  <div
                    style={{ width: "1px", height: "50%" }}
                    className="border-r border-gray-300"
                  ></div>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div className="text-600 font-medium mt-3">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">
                <div className="flex items-center">
                  User
                  <img
                    src={Sort}
                    alt="Sort Icon"
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  />
                </div>
              </th>
              <th className="p-2">
                <div className="flex items-center">
                  Email
                  <img
                    src={Sort}
                    alt="Sort Icon"
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  />
                </div>
              </th>
              <th className="p-2">
                <div className="flex items-center">
                  Name
                  <img
                    src={Sort}
                    alt="Sort Icon"
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  />
                </div>
              </th>
              <th className="p-2">
                <div className="flex items-center">
                  Status
                  <img
                    src={Sort}
                    alt="Sort Icon"
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{member.name}</td>
                <td className="p-2">{member.email}</td>
                <td className="p-2">{member.name}</td>
                <td className="p-2">
                  <div className="flex items-center justify-between">
                    <div
                      className={classNames(
                        "flex items-center justify-center p-2",
                        {
                          "bg-green-100 text-green-500":
                            member.status === "Active",
                          "bg-orange-100 text-orange-500":
                            member.status === "Pending set up",
                          "bg-red-100 text-red-500":
                            member.status === "Deactivated",
                        },
                      )}
                      style={{
                        minWidth: "120px",
                        textAlign: "right",
                        borderRadius: "30px",
                        fontWeight: "bold",
                        display: "inline-block",
                      }}
                    >
                      {member.status}
                    </div>
                    <img
                      src={EllipsisHorizontal}
                      alt="Ellipsis Icon"
                      style={{
                        marginLeft: "auto",
                        marginRight: "0",
                        width: "15px",
                        height: "15px",
                        marginTop: "10px",
                      }} // Adjust spacing
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamMembers;
