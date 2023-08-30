import React from "react";
import notification from "img/notification.png";
import DropDown from "./component/DropDown";
import Logo from "./component/Logo";
import NavbarMenu from "./component/NavbarMenu";
import DateAndPhone from "./component/DateAndPhone";

const NavBar = () => {
    return (
        <div className="h-[80px] w-full bg-gray-600 flex justify-center items-center ">
            <div className="w-[97%] flex justify-between items-center">
                <Logo/>
                <NavbarMenu/>
                <DateAndPhone/>
                <div className="flex gap-4">
                    <img className="w-7 h-7 cursor-pointer" src={notification} alt=""/>
                    <DropDown/>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
