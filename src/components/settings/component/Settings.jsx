import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch({ type: "settings/getSettings", payload: settings });
  }, []);
  const { settings } = useSelector((state) => state.settings);
  const [currentClick, setCurrentClick] = useState(-1);

  const handleSettings = (name, index) => {
    navigate(name.toLowerCase().replace(" ", "_"));
    setCurrentClick(index);
  };

  return (
    <div className="flex gap-6">
      <div className="bg-gray-200 w-80 h-[100vh] flex flex-col items-center">
        <div className="bg-orange-500 w-[92%] p-4 text-center mt-1">
          <h2 className="text-white font-bold">Settings Panel</h2>
        </div>
        {settings
          ? settings.map((item, index) => (
              <div
                onClick={() => handleSettings(item.name, index)}
                key={index}
                className={`bg-blue-400 ${
                  location.pathname ===
                  `/admin/settings/${item.name.toLowerCase().replace(" ", "_")}`
                    ? "bg-blue-700"
                    : ""
                }  p-2 text-center w-[92%] my-1 cursor-pointer hover:bg-blue-700  transform  transition-all duration-300`}
              >
                <h2 className="text-white font-bold ">{item.name}</h2>
              </div>
            ))
          : ""}
      </div>
      <div className=" w-full" >
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
