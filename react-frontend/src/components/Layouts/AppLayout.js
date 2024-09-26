import AppSideBar from "./appSideBar/AppSideBar.js";

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AppLayout;
