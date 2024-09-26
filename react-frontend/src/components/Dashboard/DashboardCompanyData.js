import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { connect } from "react-redux";
import RecentComp from "./RecentFavDashComp/RecentComp";
import PinnedItems from "./RecentFavDashComp/FavComponent";
import { TitleDash } from "./TitleDash";
import EditDashComp from "./EditDashComp";
import TotalComponent from "./RecentFavDashComp/TotalComponent";
import StaffInfo from "../../assets/media/StaffInfo.png";
import Mail from "../../assets/media/Mail.png";
import Employees from "../../assets/media/Employees.png";
import Generate from "../../assets/media/GenerateReports.png";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import TeamMembers from "./TabView/TeamMembers";
import Drag from "../../assets/media/Drag.png";
import ChartPopup from "./PopUpComp/ChartPopup";
import MultipleChart from "./TabView/MultipleCharts";

export const DataManagement = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [ActiveTab, setActiveTab] = useState(0);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    get();
  });

  const get = async () => {
    const cache = await props.get();
    console.log(props.cache);
  };

  const handlePopUp = () => {
    setShowCard(!showCard);
  };

  // const recentItems = [
  //   { text: "Staff Info", subtext: "Notification", src: StaffInfo },
  //   { text: "DynaLoader", subtext: "User Management", src: Mail },
  //   { text: "Job Ques", subtext: "Reports", src: Employees },
  // ];

  const recentItems = props.cache.pastTabsAry?.map((i) => {
    return {
      text: i.label,
      subtext: "Notification",
      src: i.src,
    };
  });

  // const pinnedItems = [
  //   { text: "Generate Templates", subtext: "Reports", src: Generate },
  // ];

  const pinnedItems = props.cache.pastTabsAry?.map((i) => {
    return {
      text: i.label,
      subtext: "Messaging",
      src: i.icon,
    };
  });

  const teamMembers = [
    {
      email: "nur.fatin@example.com",
      verificationCode: "1234",
      resendCode: "3",
      name: "Nur Fatin Nabilah",
      status: "Active",
    },
    {
      email: "john.doe@example.com",
      verificationCode: "5678",
      resendCode: "1",
      name: "John Doe",
      status: "Pending set up",
    },
    {
      email: "jane.smith@example.com",
      verificationCode: "9101",
      resendCode: "1",
      name: "Jane Smith",
      status: "Deactivated",
    },
    {
      email: "alice.johnson@example.com",
      verificationCode: "1121",
      resendCode: "2",
      name: "Alice Johnson",
      status: "Active",
    },
  ];

  const tabs = [
    { label: "To User", src: Drag },
    { label: "Content", src: Drag },
    { label: "Read", src: Drag },
  ];

  return (
    <div className="p-2 md:p-4">
      {/* Title and Edit section */}
      <div className="mb-2 flex justify-content-between align-items-center">
        <TitleDash />
        <EditDashComp isEdit={isEdit} setIsEdit={setIsEdit} />
      </div>

      <div className="surface-border border-round surface-card">
        <div className="grid">
          {/* Recent Component */}
          <div className="col-12 md:col-4 mb-3">
            <RecentComp
              title={"Recent"}
              isEdit={isEdit}
              recentItems={recentItems}
            />
          </div>

          {/* Pinned Items Component */}
          <div className="col-12 md:col-4 mb-3">
            <PinnedItems
              Pinned={"Pinned Items"}
              isEdit={isEdit}
              pinnedItems={pinnedItems}
            />
          </div>

          {/* Total Component */}
          <div className="col-12 md:col-4">
            <TotalComponent
              TotalComp={"Workforce Summary"}
              isEdit={isEdit}
              total={250}
            />
          </div>
        </div>
      </div>

      {/* Charts Section with integrated ChartPopup */}
      <div>
        <div className="mb-3">
          <ChartPopup isEdit={isEdit} setIsEdit={setIsEdit} />
        </div>
        {showCard && <PopupCard />}
        <div className="grid">
          {/* Line Chart */}

          {/* <div className="col-12 md:col-8 mb-3 relative">
            <LineChart name={"Sales Orders"} isEdit={isEdit} />
          </div> */}

          {/* Bar Chart */}
          {/* <div className="col-12 md:col-4 mb-3">
            <BarChart total={"Total Users"} isEdit={isEdit} />
          </div> */}
          <div className="col-12 md:col-8 mb-3 relative">
            <MultipleChart />
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div>
        <TeamMembers
          teamMembers={teamMembers}
          tabs={tabs}
          ActiveTab={ActiveTab}
          setActiveTab={setActiveTab}
          isEdit={isEdit}
        />
      </div>
    </div>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  const { cache } = state.cache;
  return { user, isLoggedIn, cache };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  get: () => dispatch.cache.get(),
});

export default connect(mapState, mapDispatch)(DataManagement);

// export default DataManagement;
