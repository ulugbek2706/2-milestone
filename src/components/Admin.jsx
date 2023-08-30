import React from "react";
import NavBar from "./navbar/NavBar";
import SideBar from "./sideBar/SideBar";
import { Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <div className="h-[calc(100vh-80px)]">
          <SideBar />
        </div>
        <div className="w-full  h-[calc(100vh-80px)] px-2 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
