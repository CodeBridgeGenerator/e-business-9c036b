import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { classNames } from "primereact/utils";
import { useAppSideBar } from "./AppSideBarProvider";

// CHANGE
const AppMenu = (props) => {
  const { menus, menuKey, icon, label, to } = props;
  const { activeKey, setActiveKey, open, activeDropdown } = useAppSideBar();
  const [menuExpand, setMenuExpand] = useState(activeDropdown === menuKey);

  const active = activeKey === menuKey;
  const haveChildren = menus && menus.length > 0;
  return (
    <>
      <Link
        to={to}
        className={classNames(
          "flex items-center justify-between py-[10px] px-3 rounded-md duration-300 group",
          active ? "bg-[#F8ECEC]" : "bg-transparent",
        )}
        onClick={() => {
          if (haveChildren) {
            open && setMenuExpand(!menuExpand);
            return;
          }
          setActiveKey(menuKey);
        }}
      >
        <div className="flex gap-3">
          <span
            className={classNames(
              "duration-300 group-hover:text-primary",
              active ? "text-primary" : "text-secondary",
            )}
          >
            {icon}
          </span>
          <p
            className={classNames(
              "font-semibold duration-300 text-nowrap group-hover:text-primary",
              active ? "text-primary" : "text-secondary",
              open ? "opacity-100" : "opacity-0",
            )}
          >
            {label}
          </p>
        </div>
        {open && haveChildren && (
          <i
            className={classNames(
              "text-xs duration-300 pi pi-chevron-down",
              active ? "text-primary" : "text-secondary",
              menuExpand ? "rotate-180" : "",
            )}
          ></i>
        )}
      </Link>
      <div
        className={classNames("overflow-hidden transition-all duration-300")}
        style={{
          height:
            open && haveChildren && menuExpand
              ? `${menus.length * 47}px`
              : "0px",
        }}
      >
        <div className="flex flex-col gap-1 pl-5">
          {menus &&
            menus.map(({ menus, ...menu }, index) => (
              <AppMenu key={index} {...menu} />
            ))}
        </div>
      </div>
    </>
  );
};

export default AppMenu;
