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
    <div className="bg-gray-600 w-[100px] h-[100vh] flex justify-center items-center ">
      <div className="flex flex-col gap-8 items-center">
        <div>
          <img
            className="w-10 h-10  transition-transform transform hover:scale-110"
            src={plans}
            alt="plans"
          />
          <b className="text-white">Plans</b>
        </div>
        <div>
          <img
            className="w-10 h-10 transition-transform transform hover:scale-110"
            src={basket}
            alt="basket"
          />
          <b className="text-white">Basket</b>
        </div>
        <div>
          <img
            className="w-10 h-10 transition-transform transform hover:scale-110"
            src={stock}
            alt="stock"
          />
          <b className="text-white">Stock</b>
        </div>
        <div>
          <NavLink
            to={"/admin/clients"}
            className="block text-white text-lg px-4 py-2"
          >
            <img
              className="w-10 h-10 transition-transform transform hover:scale-110"
              src={clients}
              alt="clients"
            />
            Clients
          </NavLink>
        </div>
        <div>
          <img
            className="w-10 h-10 transition-transform transform hover:scale-110"
            src={agents}
            alt="agents"
          />
          <b className="text-white">Agents</b>
        </div>
        <div>
          <img
            className="w-10 h-10 transition-transform transform hover:scale-110"
            src={reports}
            alt="reports"
          />
          <b className="text-white">Reports</b>
        </div>
        <div>
          <NavLink to={"/admin/settings"}>
            <img
              className="w-10 h-10 transition-transform transform hover:scale-110"
              src={settings}
              alt="settings"
            />
          </NavLink>
          <b className="text-white">Settings</b>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
