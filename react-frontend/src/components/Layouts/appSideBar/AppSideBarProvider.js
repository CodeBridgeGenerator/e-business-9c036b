import { createContext, useContext, useState } from "react";

const AppSideBarContext = createContext();

// Create a provider for the sidebar
const AppSideBarProvider = ({
  children,
  activeKey: activeKey,
  setActiveKey,
  open,
  setOpen,
  activeDropdown,
  setActiveDropdown,
}) => {
  return (
    <AppSideBarContext.Provider
      value={{
        open,
        setOpen,
        activeKey,
        setActiveKey,
        activeDropdown,
        setActiveDropdown,
      }}
    >
      {children}
    </AppSideBarContext.Provider>
  );
};

export default AppSideBarProvider;

export const useAppSideBar = () => {
  const context = useContext(AppSideBarContext);
  if (!context) {
    throw new Error("useAppSideBar must be used within a AppSideBarProvider");
  }
  return context;
};
