import React, { useState, useEffect, useRef } from "react";
import user from "img/user.png";
import key from "img/key.png";
import billing from "img/billing.png";
import exit from "img/exit.png";
import { useNavigate } from "react-router-dom";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickDropDown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const handleLogOut = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <div>
      <div className="relative ">
        <button
          onClick={handleClickDropDown}
          ref={dropdownRef}
          className="bg-gray-600 text-white  rounded "
        >
          <img className="w-7 h-7" src={user} alt="" />
        </button>
        {isOpen && (
          <div className="absolute z-50 top-14 right-[-18px] w-[300px] bg-white shadow-lg shadow-gray-800 rounded dropdownBar">
            {/* Add dropdown options here */}
            <p className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-400 hover:text-white">
              <img className="w-5 h-5" src={key} alt="" /> Change login and
              password
            </p>
            <p className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-400 hover:text-white">
              <img className="w-5 h-5" src={billing} alt="" /> Biling
            </p>
            <p
              onMouseDown={handleLogOut}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-400 hover:text-white"
            >
              <img className="w-5 h-5" src={exit} alt="" /> Log Out
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
