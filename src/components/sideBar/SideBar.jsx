import React, {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import plans from "img/plans.png";
import basket from "img/basket.png";
import stock from "img/stock.png";
import clients from "img/clients.png";
import agents from "img/agents.png";
import reports from "img/reports.png";
import settings from "img/settings.png";
import {useTranslation} from "react-i18next";

const SideBar = () => {
    const [t] = useTranslation("global")
    const [currentSide, setCurrentSide] = useState("");
    const location = useLocation();

    return (
        <div className="bg-gray-600 w-[100px] h-[calc(100vh-80px)] flex justify-center items-center">
            <div className="flex flex-col h-[100%]  items-center justify-between">
                <div
                    onClick={() => setCurrentSide(location.pathname)}
                    className={`cursor-pointer    ${
                        currentSide === "/admin/plans" ? "bg-gray-500" : ""
                    } hover:scale-105 transition-all duration-150 hover:bg-gray-500 py-1`}
                >
                    <img
                        className="w-7 h-7 mx-auto  transition-transform transform "
                        src={plans}
                        alt="plans"
                    />
                    <b className="text-white mx-7 text-sm">{t("menu.plans")}</b>
                </div>
                <div
                    onClick={() => setCurrentSide(location.pathname)}
                    className={`cursor-pointer ${
                        currentSide === "/admin/application" ? "bg-gray-500" : ""
                    } hover:scale-105 transition-all duration-150 hover:bg-gray-500 py-1`}
                >
                    <img
                        className=" h-7 mx-auto transition-transform transform "
                        src={basket}
                        alt="basket"
                    />
                    <b className="text-white mx-1 text-sm">{t("menu.applications")}</b>
                </div>
                <div
                    onClick={() => setCurrentSide(location.pathname)}
                    className={`cursor-pointer ${
                        currentSide === "/admin/stock" ? "bg-gray-500" : ""
                    } hover:scale-105 transition-all duration-150 hover:bg-gray-500 py-1`}
                >
                    <img
                        className="w-7 h-7 mx-auto transition-transform transform "
                        src={stock}
                        alt="stock"
                    />
                    <b className="text-white mx-7 text-sm">{t("menu.stock")}</b>
                </div>
                <div className="relative z-[999]  text-white text-sm">
                    <div
                        onClick={() => setCurrentSide(location.pathname)}
                        className={`cursor-pointer peer   ${
                            location.pathname === "/admin/clients" || location.pathname === "/admin/map" ? "bg-gray-500" : ""
                        } hover:scale-105 transition-all duration-150 hover:bg-gray-500 py-1 clients`}
                    >
                        <img
                            className="w-7 h-7 mx-auto transition-transform transform "
                            src={clients}
                            alt="clients"
                        />
                        <b className="mx-6 text-sm">{t("menu.clients.clients")}</b>
                        <div className="h-14 w-auto bg-gray-600 z-[3] absolute top-0 right-[-125px] hidden clintsDrop">
                            <NavLink to={"/admin/clients"}>
                                <p className="font-bold p-1 px-3 hover:bg-slate-400">
                                    {t("menu.clients.clients")}
                                </p>
                            </NavLink>
                            <NavLink to={"/admin/map"}>
                                <p className="font-bold p-1 px-3 hover:bg-slate-400">
                                    {t("menu.clients.clientsOnMap")}
                                </p>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => setCurrentSide(location.pathname)}
                    className={`cursor-pointer ${
                        currentSide === "/admin/agents" ? "bg-gray-500" : ""
                    } hover:scale-105 transition-all duration-150 hover:bg-gray-500 py-1`}
                >
                    <img
                        className="w-7 h-7 mx-auto transition-transform transform "
                        src={agents}
                        alt="agents"
                    />
                    <b className="text-white mx-6 text-sm">{t("menu.agents")}</b>
                </div>
                <div
                    onClick={() => setCurrentSide(location.pathname)}
                    className={`cursor-pointer ${
                        currentSide === "/admin/reports" ? "bg-gray-500" : ""
                    } hover:scale-105 transition-all duration-150 hover:bg-gray-500 py-1`}
                >
                    <img
                        className="w-7 h-7 mx-auto transition-transform transform "
                        src={reports}
                        alt="reports"
                    />
                    <b className="text-white mx-5 text-sm">{t("menu.reports")}</b>
                </div>
                <NavLink to={"/admin/settings"}>
                    <div
                        onClick={() => setCurrentSide(location.pathname)}
                        className={`cursor-pointer ${
                            location.pathname === "/admin/settings" || location.pathname === "/admin/settings/territory" || location.pathname === "/admin/settings/company_profile" || location.pathname === "/admin/settings/customer_category" ? "bg-gray-500" : ""
                        } hover:scale-105 transition-all duration-150 hover:bg-gray-500 py-1`}
                    >
                        <img
                            className="w-7 h-7 mx-auto transition-transform transform "
                            src={settings}
                            alt="settings"
                        />
                        <b className="text-white mx-5 text-sm">{t("menu.settings")}</b>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default SideBar;
