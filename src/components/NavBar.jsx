import React, { useEffect } from "react";
import logo from "../img/logo.jpg";
import question from "../img/question.png";
import notification from "../img/notification.png";
import DropDown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getPhoneAndNumberSuccess } from "../redux/slices/dashboard/DashboardSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const {data}=useSelector((state)=>state.dashboard)
  
  return (
    <div className="h-[80px] w-full bg-gray-600 flex justify-center items-center ">
      <div className="w-[97%] flex justify-between items-center">
        <img className="w-16 h-16 rounded-full" src={logo} alt="" />
        <ul className="flex gap-12 text-white font-bold">
          <li className="my-7">Supervisor</li>
          <li className="my-7">Sales</li>
          <li className="my-7">
            <select className="bg-gray-600" name="" id="">
              <option value="">Clash register</option>
            </select>
          </li>
          <li className="my-7">
            <select className="bg-gray-600" name="" id="">
              <option value="">GPS</option>
            </select>
          </li>
          <li className="flex justify-center gap-2 items-center w-40 h-20 bg-green-500 hover:bg-green-700">
            <img
              className="w-10 h-10 bg-white rounded-full"
              src={question}
              alt="question"
            />
            <p>Online Help</p>
          </li>
        </ul>
        {
          data.map(item=><div >
            <b>{item.currenDate}</b>
            <b>{item.supportPhone}</b>
          </div>)
        }
        <div className="flex gap-4">
          <img className="w-7 h-7 " src={notification} alt="" />
          <DropDown />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
