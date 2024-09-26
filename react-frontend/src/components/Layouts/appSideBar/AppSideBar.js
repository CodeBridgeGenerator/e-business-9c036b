import AppSideBarProvider from "./AppSideBarProvider";
import Toggle from "../../../assets/icons/Toggle";
import Home from "../../../assets/icons/Home.js";
import Data from "../../../assets/icons/Data.js";
import Messaging from "../../../assets/icons/Messaging.js";
import Report from "../../../assets/icons/Report.js";
import GenAI from "../../../assets/icons/GenAI.js";
import StaffInfo from "../../../assets/icons/StaffInfo.js";
import Stack from "../../../assets/icons/Stack.js";
import DynaLoader from "../../../assets/icons/DynaLoader.js";
import Notification from "../../../assets/icons/Notification.js";
import Server from "../../../assets/icons/Server.js";
import Email from "../../../assets/icons/Email.js";
import MailSent from "../../../assets/icons/MailSent.js";
import Load from "../../../assets/icons/Load.js";
import Chat from "../../../assets/icons/Chat.js";
import Terminal from "../../../assets/icons/Terminal.js";
import Documents from "../../../assets/icons/Documents.js";
import { classNames } from "primereact/utils";
import AppMenu from "./AppMenu";
import { useState } from "react";
import AppFooter from "../AppFooter";

const AppSideBar = (props) => {
  const { activeKey: initialActiveKey, activeDropdown: initialActiveDropdown } =
    props;
  const [activeKey, setActiveKey] = useState(initialActiveKey);
  const [activeDropdown, setActiveDropdown] = useState(initialActiveDropdown);
  const [open, setOpen] = useState(true);
  return (
    <>
      <div
        className={classNames(
          "duration-300",
          open ? "w-[280px]" : "w-[calc(3rem+20px)]",
        )}
      ></div>
      <AppSideBarProvider
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        open={open}
        setOpen={setOpen}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      >
        <div
          className={classNames(
            "fixed flex flex-col top-20 left-0 h-[calc(100vh-5rem)] overflow-y-scroll flex-shrink-0 shadow bg-[#F8F9FA] border-r border-[#DEE2E6] border-solid duration-300",
            open ? "w-[280px]" : "w-[calc(3rem+20px)]",
          )}
        >
          <div className="flex-grow gap-1 p-2 overflow-x-hidden overflow-y-auto">
            <div className="flex gap-3 px-3 py-[10px]">
              <span className="cursor-pointer" onClick={() => setOpen(!open)}>
                <Toggle />
              </span>
            </div>
            <AppMenu
              icon={<Home />}
              label="Dashboard"
              menuKey="dashboard"
              to="/dashboard"
            />
            <AppMenu
              icon={<Data />}
              label="Data management"
              menuKey="data-management"
              menus={[
                {
                  label: "Staff info",
                  icon: <StaffInfo />,
                  menuKey: "staff-info",
                },
                {
                  label: "DynaLoader",
                  icon: <DynaLoader />,
                  menuKey: "dyna-loader",
                },
                {
                  label: "Job ques",
                  icon: <Stack />,
                  menuKey: "job-ques",
                },
              ]}
              setActiveKey={setActiveKey}
            />
            <AppMenu
              icon={<Messaging />}
              label="Messaging"
              menuKey="messaging"
              menus={[
                {
                  label: "Notifications",
                  icon: <Notification />,
                  menuKey: "notifications",
                },
                {
                  label: "Email templates",
                  icon: <Email />,
                  menuKey: "email-templates",
                },
                {
                  label: "Mail sent logs",
                  icon: <MailSent />,
                  menuKey: "mail-sent-logs",
                },
                {
                  label: "Mail job ques",
                  icon: <Stack />,
                  menuKey: "mail-job-ques",
                },
                {
                  label: "Mail warehouse",
                  icon: <Server />,
                  menuKey: "mail-warehouse",
                },
              ]}
            />
            <AppMenu
              icon={<Report />}
              label="Reports"
              menuKey="reports"
              menus={[
                {
                  label: "Generate reports",
                  icon: <Load />,
                  menuKey: "generate-reports",
                },
              ]}
            />
            <AppMenu
              icon={<GenAI />}
              label="Gen AI"
              menuKey="gen-ai"
              menus={[
                {
                  label: "Chat AI",
                  icon: <Chat />,
                  menuKey: "chat-ai",
                },
                {
                  label: "Prompts",
                  icon: <Terminal />,
                  menuKey: "prompts",
                },
                {
                  label: "Usage",
                  icon: <Documents />,
                  menuKey: "usage",
                },
              ]}
            />
          </div>
          <div
            className={classNames(
              "text-center duration-300",
              open ? "opacity-100" : "opacity-0",
            )}
          >
            <AppFooter />
          </div>
        </div>
      </AppSideBarProvider>
    </>
  );
};

export default AppSideBar;
