import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <div>
      <NavBar />
      <div className="flex gap-9">
        <div>
          <SideBar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
