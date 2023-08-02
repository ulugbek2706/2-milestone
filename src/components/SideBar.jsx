import React from "react";
import plans from "../img/plans.png";
import basket from "../img/basket.png";
import stock from "../img/stock.png";
import clients from "../img/clients.png";
import agents from "../img/agents.png";
import reports from "../img/reports.png";
import settings from "../img/settings.png";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-gray-600 w-[100px] h-[100vh]  flex justify-center items-center">
      <div className="flex flex-col gap-5  items-center justify-center">
        <div  className="cursor-pointer">
          <img
            className="w-7 h-7 mx-auto  transition-transform transform hover:scale-110"
            src={plans}
            alt="plans"
          />
          <b className="text-white mx-7 text-sm">Plans</b>
          <hr className="w-[100px]"/>
        </div>
        <div  className="cursor-pointer ">
          <img
            className="w-7 h-7 mx-auto transition-transform transform hover:scale-110"
            src={basket}
            alt="basket"
          />
          <b className="text-white mx-6 text-sm">Applications</b>
          <hr className="w-[120px]"/>
        </div>
        <div className="cursor-pointer">
          <img
            className="w-7 h-7 mx-auto transition-transform transform hover:scale-110"
            src={stock}
            alt="stock"
          />
          <b className="text-white mx-8 text-sm">Stock</b>
          <hr className="w-[100px]"/>
        </div>
        <div  className="cursor-pointer">
          <NavLink
            to={"/admin/clients"}
            className="block text-white text-lg px-4 py-2"
          >
            <img
              className="w-7 h-7 mx-auto transition-transform transform hover:scale-110"
              src={clients}
              alt="clients"
            />
            <b className="mx-6 text-sm">Clients</b>
            <hr className="w-[100px]"/>
          </NavLink>
        </div>
        <div  className="cursor-pointer">
          <img
            className="w-7 h-7 mx-auto transition-transform transform hover:scale-110"
            src={agents}
            alt="agents"
          />
          <b className="text-white mx-6 text-sm">Agents</b>
          <hr className="w-[100px]"/>
        </div>
        <div className="cursor-pointer">
          <img
            className="w-7 h-7 mx-auto transition-transform transform hover:scale-110"
            src={reports}
            alt="reports"
          />
          <b className="text-white mx-6 text-sm">Reports</b>
          <hr className="w-[100px]"/>
        </div>
        <div  className="cursor-pointer">
          <NavLink to={"/admin/settings"}>
            <img
              className="w-7 h-7 mx-auto transition-transform transform hover:scale-110"
              src={settings}
              alt="settings"
            />
          </NavLink>
          <b className="text-white mx-6 text-sm">Settings</b>
          <hr className="w-[100px]"/>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
