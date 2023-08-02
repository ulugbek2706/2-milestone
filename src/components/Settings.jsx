import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Settings = () => {

  const {settings} =useSelector((state)=>state.settings)

  return (
    <div className="flex ">
      <div className="bg-gray-200 w-80 h-[100vh] ">
        <div className="bg-orange-500 p-4 text-center"><h2 className="text-white font-bold">Settings Panel</h2></div>
        {
          settings.map(item=><div key={item.id} className="bg-blue-400 p-4 text-center hover:bg-blue-700"><h1 className="text-white font-bold font-lg">{item.name}</h1></div>)
        }
      </div>
      <Outlet/>
    </div>
  );
};

export default Settings;
