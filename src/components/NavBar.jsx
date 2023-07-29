import React from "react";
import logo from "../img/logo.jpg";
import question from "../img/question.png";
import notification from "../img/notification.png";
import DropDown from "./DropDown";

const NavBar = () => {
  return (
    <div className="h-[80px] w-full bg-gray-600 flex justify-center items-center ">
      <div className="w-[97%] flex justify-between items-center">
        <img className="w-16 h-16 rounded-full" src={logo} alt="" />
        <ul className="flex gap-12 text-white">
          <li>Supervisor</li>
          <li>Sales</li>
          <li>
            <select className="bg-gray-600" name="" id="">
              <option value="">Clash register</option>
            </select>
          </li>
          <li>
            <select className="bg-gray-600" name="" id="">
              <option value="">GPS</option>
            </select>
          </li>
          <li className="flex justify-center gap-2 items-center w-40 h-10 bg-green-500 hover:bg-green-700">
            <img
              className="w-7 h-7 bg-white rounded-full"
              src={question}
              alt="question"
            />
            <p>Online Help</p>
          </li>
        </ul>
        <div className="flex gap-4">
          <img className="w-7 h-7 " src={notification} alt="" />
          <DropDown/>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
