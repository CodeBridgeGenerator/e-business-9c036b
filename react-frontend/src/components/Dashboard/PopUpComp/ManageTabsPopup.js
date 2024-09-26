import React, { useState } from "react";
import Data from "../../../assets/media/Data.png"; // Importing the image
import Users from "../../../assets/media/Users.png";
import { InputSwitch } from "primereact/inputswitch";

const ManageTabsPopup = (props) => {
  const { onClose } = props;

  const [staffInfoChecked, setStaffInfoChecked] = useState(true); // Staff info is initially checked
  const [employeesChecked, setEmployeesChecked] = useState(true); // Employees and User invites checked by default
  const [userInvitesChecked, setUserInvitesChecked] = useState(true);
  const [usersChecked, setUsersChecked] = useState(false);
  const [profilesChecked, setProfilesChecked] = useState(false);
  const [userLoginChecked, setUserLoginChecked] = useState(false);
  const [superiorsChecked, setSuperiorsChecked] = useState(false);
  const [rolesChecked, setRolesChecked] = useState(false);
  const [positionsChecked, setPositionsChecked] = useState(false);

  return (
    <div
      className="absolute bg-white shadow-2 border-round p-4"
      style={{
        top: "2rem",
        right: "2rem",
        width: "350px",
        zIndex: 1000,
        borderRadius: "10px",
      }}
    >
      {/* Title */}
      <div className="mb-3">
        <div className="flex justify-content-between align-items-center mb-2">
          <h3 className="text-lg font-semibold">Manage tabs</h3>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: "bold",
              color: "#6c757d",
            }}
          >
            3/8
          </span>
        </div>

        {/* Data Management Section */}
        <div className="p-2">
          <div
            className="flex items-center mb-3"
            style={{ alignItems: "center" }}
          >
            <img
              src={Data}
              alt="Data Icon"
              style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
            />
            <p className="font-semibold m-0" style={{ fontSize: "1rem" }}>
              Data management
            </p>
          </div>
          <ul className="pl-4" style={{ listStyleType: "none" }}>
            <li className="flex justify-content-between align-items-center mb-2">
              Staff info
              <InputSwitch
                checked={staffInfoChecked}
                onChange={(e) => setStaffInfoChecked(e.value)}
              />
            </li>
          </ul>
        </div>

        <hr style={{ margin: "1rem 0" }} />

        {/* User Management Section */}
        <div className="p-2">
          <div
            className="flex items-center mb-3"
            style={{ alignItems: "center" }}
          >
            <img
              src={Users}
              alt="Users Icon"
              style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
            />
            <p className="font-semibold m-0" style={{ fontSize: "1rem" }}>
              User management
            </p>
          </div>

          <ul className="pl-4" style={{ listStyleType: "none" }}>
            <li className="flex justify-content-between align-items-center mb-2">
              Users
              <InputSwitch
                checked={usersChecked}
                onChange={(e) => setUsersChecked(e.value)}
              />
            </li>
            <li className="flex justify-content-between align-items-center mb-2">
              Profiles
              <InputSwitch
                checked={profilesChecked}
                onChange={(e) => setProfilesChecked(e.value)}
              />
            </li>
            <li className="flex justify-content-between align-items-center mb-2">
              Employees
              <InputSwitch
                checked={employeesChecked}
                onChange={(e) => setEmployeesChecked(e.value)}
              />
            </li>
            <li className="flex justify-content-between align-items-center mb-2">
              User invites
              <InputSwitch
                checked={userInvitesChecked}
                onChange={(e) => setUserInvitesChecked(e.value)}
              />
            </li>
            <li className="flex justify-content-between align-items-center mb-2">
              User login
              <InputSwitch
                checked={userLoginChecked}
                onChange={(e) => setUserLoginChecked(e.value)}
              />
            </li>
            <li className="flex justify-content-between align-items-center mb-2">
              Superiors
              <InputSwitch
                checked={superiorsChecked}
                onChange={(e) => setSuperiorsChecked(e.value)}
              />
            </li>
            <li className="flex justify-content-between align-items-center mb-2">
              Roles
              <InputSwitch
                checked={rolesChecked}
                onChange={(e) => setRolesChecked(e.value)}
              />
            </li>
            <li className="flex justify-content-between align-items-center mb-2">
              Positions
              <InputSwitch
                checked={positionsChecked}
                onChange={(e) => setPositionsChecked(e.value)}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageTabsPopup;
